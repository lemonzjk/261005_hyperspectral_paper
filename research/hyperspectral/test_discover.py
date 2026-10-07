"""Verify that CVF day pagination cannot silently certify a partial inventory."""
import unittest
from unittest.mock import patch

import discover


class Response:
    def __init__(self, text):
        self.text = text
        self.content = text.encode()

    def raise_for_status(self):
        pass


class DirectoryTests(unittest.TestCase):
    def fetch(self, pages):
        self.requested = []

        def get(url, timeout):
            self.requested.append(url)
            return Response(pages[url])

        return patch.object(discover.requests, 'get', side_effect=get)

    def test_all_linked_days_are_read_and_repeated_urls_are_deduplicated(self):
        base = 'https://openaccess.thecvf.com/CVPR2018'
        a = '<div class="ptitle"><a href="/a.html">Paper A</a></div>'
        b = '<div class="ptitle"><a href="/b.html">Paper B</a></div>'
        pages = {
            base + '?day=all': '<html></html>',
            base: '<a href="CVPR2018.py?day=one">1</a><a href="CVPR2018.py?day=two">2</a><a href="CVPR2018.py?day=one">1</a>',
            base + '.py?day=one': a,
            base + '.py?day=two': a + b,
        }
        with self.fetch(pages):
            titles, evidence = discover.fetch_directory(base + '?day=all', 'CVPR')
        self.assertEqual([paper['title'] for paper in titles], ['Paper A', 'Paper B'])
        self.assertEqual(self.requested, list(pages))
        self.assertEqual([page['titleCount'] for page in evidence], [0, 0, 1, 2])

    def test_an_empty_linked_day_prevents_success(self):
        base = 'https://openaccess.thecvf.com/ICCV2017'
        pages = {
            base + '?day=all': '',
            base: '<a href="?day=one">1</a><a href="?day=two">2</a>',
            base + '?day=one': '<div class="ptitle"><a href="/a.html">Paper A</a></div>',
            base + '?day=two': '',
        }
        with self.fetch(pages), self.assertRaisesRegex(ValueError, 'No titles in linked day'):
            discover.fetch_directory(base + '?day=all', 'ICCV')

    def test_conflicting_titles_for_same_url_prevent_success(self):
        base = 'https://openaccess.thecvf.com/CVPR2018'
        pages = {
            base + '?day=all': '',
            base: '<a href="?day=one">1</a><a href="?day=two">2</a>',
            base + '?day=one': '<div class="ptitle"><a href="/a.html">Paper A</a></div>',
            base + '?day=two': '<div class="ptitle"><a href="/a.html">Different paper</a></div>',
        }
        with self.fetch(pages), self.assertRaisesRegex(ValueError, 'Conflicting duplicate title'):
            discover.fetch_directory(base + '?day=all', 'CVPR')

    def test_empty_neurips_directory_is_not_reported_as_zero_papers(self):
        url = 'https://proceedings.neurips.cc/paper_files/paper/2023'
        with self.fetch({url: ''}), self.assertRaisesRegex(ValueError, 'No titles'):
            discover.fetch_directory(url, 'NeurIPS')


if __name__ == '__main__':
    unittest.main()
