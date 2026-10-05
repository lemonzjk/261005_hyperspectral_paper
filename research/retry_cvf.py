"""Retry failed official CVF indexes using the older .py URL convention."""
import json,re,concurrent.futures,urllib.request
from pathlib import Path
from urllib.parse import urljoin
from bs4 import BeautifulSoup
root=Path(__file__).resolve().parent
path=root/'sources/cvf-proceedings.json'
manifest=json.loads(path.read_text())
def fetch(entry):
 url=f'https://openaccess.thecvf.com/{entry["venue"]}{entry["year"]}.py?day=all'
 try:
  soup=BeautifulSoup(urllib.request.urlopen(url,timeout=30).read(),'html.parser');links=soup.select('.ptitle a')
  if not links:
   soup=BeautifulSoup(urllib.request.urlopen(url.split('?')[0],timeout=30).read(),'html.parser')
   day_urls=sorted({urljoin(url,a['href']) for a in soup.select('a[href]') if '?day=' in a['href'] and 'all' not in a['href'] and 'workshop' not in a['href'].lower()})
   for day_url in day_urls:
    page=BeautifulSoup(urllib.request.urlopen(day_url,timeout=30).read(),'html.parser')
    day_links=page.select('.ptitle a')
    if not day_links:raise ValueError('Day page contains no titles: '+day_url)
    links.extend(day_links)
   if not links:raise ValueError('No titles; coverage unverified')
   links=list({a['href']:a for a in links}.values())
  matches=[dict(title=a.get_text(' ',strip=True),venue=entry['venue'],year=entry['year'],url=urljoin(url,a['href']),status='pending_scope',discovery='official_CVF_proceedings') for a in links if re.search(r'hyperspectral|multispectral|multi-spectral|spectral|spectrum',a.get_text(),re.I)]
  return dict(venue=entry['venue'],year=entry['year'],url=url,status='scanned',titleCount=len(links),matches=matches)
 except Exception as error:
  return dict(entry,retryUrl=url,retryError=str(error))
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 for entry in pool.map(fetch,[e for e in manifest if e['status']=='failed']):
  manifest=[e for e in manifest if (e['venue'],e['year'])!=(entry['venue'],entry['year'])]+[entry]
  path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
  s=json.loads((root/'survey.json').read_text())
  for e in entry.get('matches',[]):
   if not any(p['title'].casefold()==e['title'].casefold() for p in s['candidates']):s['candidates'].append(e)
  (root/'survey.json').write_text(json.dumps(s,ensure_ascii=False,indent=2)+'\n')
  print(entry['venue'],entry['year'],entry['status'],entry.get('titleCount'),flush=True)
