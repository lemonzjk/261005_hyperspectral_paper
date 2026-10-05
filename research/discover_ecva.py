"""Register keyword discoveries from the official ECVA proceedings archive."""
import json,re,urllib.request
from pathlib import Path
from urllib.parse import urljoin
from bs4 import BeautifulSoup
root=Path(__file__).resolve().parent
url='https://www.ecva.net/papers.php'
soup=BeautifulSoup(urllib.request.urlopen(url,timeout=40).read(),'html.parser')
links=soup.select('.ptitle a')
if not links:raise ValueError('No titles; coverage unverified')
results=[];counts={}
for link in links:
 title=link.get_text(' ',strip=True);href=urljoin(url,link['href']);match=re.search(r'eccv[_/]?(20\d\d)',href,re.I)
 year=int(match[1]) if match else None
 counts[str(year)]=counts.get(str(year),0)+1
 if not re.search(r'hyperspectral|multispectral|multi-spectral|spectral|spectrum',title,re.I):continue
 entry=dict(title=title,year=year,venue='ECCV',url=href,status='pending_scope',discovery='official_ECVA_archive')
 results.append(entry)
 survey=json.loads((root/'survey.json').read_text())
 if not any(e['title'].casefold()==title.casefold() for e in survey['candidates']):
  survey['candidates'].append(entry);(root/'survey.json').write_text(json.dumps(survey,ensure_ascii=False,indent=2)+'\n')
(root/'sources/ecva-proceedings.json').write_text(json.dumps(dict(url=url,retrievedAt='2026-10-06',titleCount=len(links),yearTitleCounts=counts,matches=results),ensure_ascii=False,indent=2)+'\n')
print('ECVA',len(links),'titles',counts,len(results),'keyword candidates')
