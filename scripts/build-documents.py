from pathlib import Path
import json,base64,html
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from PIL import Image
import re
root=Path(__file__).resolve().parents[1]
rows=json.loads((root/'docs/portfolio-data.json').read_text())
out=root/'career'
pdfmetrics.registerFont(TTFont('DVS','/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('DVSB','/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
W,H=595.28,841.89
ink=HexColor('#142337');muted=HexColor('#64778b');teal=HexColor('#137c85')
c=canvas.Canvas(str(out/'Daniil-Barilotti-Portfolio-DE.pdf'),pagesize=(W,H),pageCompression=1)
c.setTitle('Daniil Barilotti — Projektportfolio');c.setAuthor('Daniil Barilotti');c.showOutline()
styles={k:ParagraphStyle(k,fontName='DVS',fontSize=size,leading=leading,textColor=color) for k,size,leading,color in [('body',10,16,ink),('small',8,12,muted)]}
def para(text,y,kind='body'):
 p=Paragraph(text,styles[kind]);_,h=p.wrap(499,H);p.drawOn(c,48,y-h);return y-h-12
def frame():
 c.setFillColor(HexColor('#f3f6f8'));c.rect(0,0,W,H,fill=1,stroke=0);c.setFillColor(teal);c.rect(0,H-7,W,7,fill=1,stroke=0)
 c.setFont('DVS',8);c.setFillColor(muted);c.drawString(48,H-34,'DANIIL BARILOTTI / PROJECT PORTFOLIO');c.drawString(48,25,'Projektübersicht');c.drawRightString(W-48,25,f'{c.getPageNumber():02d}');c.linkRect('Overview','index',(48,20,190,38),thickness=0)
def title(text,sub):
 c.setFillColor(ink);c.setFont('DVSB',25);c.drawString(48,H-82,text);c.setFont('DVS',10);c.setFillColor(muted);c.drawString(48,H-106,sub)
def heading(text,y):
 c.setFillColor(teal);c.setFont('DVSB',11);c.drawString(48,y,text);return y-20
frame();c.bookmarkPage('cover');c.addOutlineEntry('Start','cover',0)
c.setFillColor(ink);c.setFont('DVSB',37);c.drawString(48,682,'Daniil');c.drawString(48,634,'Barilotti.');c.setFillColor(teal);c.setFont('DVSB',17);c.drawString(48,589,'Projektportfolio')
para('Frontend-Entwicklung mit einem Fundament in Cybersicherheit. Sieben ausgewählte Projekte: responsive Websites, React-Anwendungen, Filmentdeckung und eine Sicherheitsoberfläche.',548)
para('Alfeld (Leine), Deutschland<br/>React · TypeScript · JavaScript · SCSS · REST · Git',450)
para('Jedes Kapitel zeigt Oberfläche, Umfang, Architektur und zentrale Entscheidungen. Das Hochschulpraktikum bei DevBrother ist im PromptGuard-Kapitel dokumentiert.',345)
para('Navigation: Ein Kapitel in der Übersicht auswählen oder die PDF-Lesezeichen öffnen. Die Projekt-Lesezeichen sind eingeklappt. Die separate HTML-Version bietet ein- und ausklappbare Projektblöcke.',220,'small')
para('Stand: 6. Oktober 2026<br/>Kontakt: daniilbarilotti@gmail.com',130,'small');c.showPage()
frame();c.bookmarkPage('index');c.addOutlineEntry('Projektübersicht','index',0);title('Selected work.','Sieben Projekte / klickbare Kapitel');y=684
for i,p in enumerate(rows):
 c.setFillColor(HexColor('#ffffff'));c.roundRect(48,y-63,499,68,8,fill=1,stroke=0);c.setFillColor(ink);c.setFont('DVSB',14);c.drawString(65,y-17,f'{i+1:02d}  {p["name"]}');c.setFont('DVS',8);c.setFillColor(muted);c.drawString(65,y-35,p['tag']);c.drawString(65,y-50,p['role']);c.linkRect(p['name'],p['kind'],(48,y-63,547,y+5),thickness=0);y-=77
para('CineDrop: öffentliche Demo, privater Anwendungsquellcode. Projektbeschreibungen und Screenshots sind hier vollständig lesbar.',y-7,'small');c.showPage()
for p in rows:
 key=p['kind'];frame();c.bookmarkPage(key);c.addOutlineEntry(p['name'],key,0,closed=True);c.bookmarkPage(key+'-overview');c.addOutlineEntry('Oberfläche & Funktionsumfang',key+'-overview',1);title(p['name'],p['tag']);y=para(p['intro'],704)
 image=root/'assets'/p['image']
 if image.exists():
  iw,ih=Image.open(image).size;h=min(295,499*ih/iw);w=h*iw/ih;c.drawImage(str(image),48+(499-w)/2,y-h,width=w,height=h);y-=h+8;y=para(p.get('caption','Browseraufnahme der veröffentlichten Demo · 6. Oktober 2026'),y,'small')
 y=heading('FUNKTIONSUMFANG',y-2)
 for f in p['features']:y=para('• '+html.escape(f),y)
 para('<b>Projektart:</b> '+p['role'],y,'small');c.showPage()
 frame();c.bookmarkPage(key+'-technical');c.addOutlineEntry('Architektur, Entscheidungen & Grenzen',key+'-technical',1);title(p['name'],'Technischer Einblick');y=698
 for label,field in [('ARCHITEKTUR','architecture'),('ENTSCHEIDUNGEN','decisions'),('DEMO-ABLAUF','walkthrough'),('PROJEKTGRENZEN','limits')]:y=heading(label,y);y=para(p[field],y);y-=7
 y=heading('QUELLCODE & DEMO',y)
 for link in [p.get('url'),p.get('live')]:
  if link:y=para(f'<link href="{link}" color="#137c85">{link}</link>',y,'small')
 if y<40:raise ValueError('Page overflow: '+key)
 c.showPage()
c.save()
# Keep the established portable layout; replace its seven chapter blocks.
path=out/'Daniil-Barilotti-Portfolio.html';document=re.sub(r'<details\b.*?</details>','',path.read_text(),flags=re.S).replace('Sechs ausgewählte','Sieben ausgewählte');blocks=[]
for i,p in enumerate(rows):
 esc=html.escape;photo=root/'assets'/p['image'];pic=f'<img alt="Screenshot: {esc(p["name"])}" src="data:image/jpeg;base64,{base64.b64encode(photo.read_bytes()).decode()}" loading="lazy">' if photo.exists() else ''
 sections=''.join(f'<h3>{label}</h3><p>{esc(p[field])}</p>' for label,field in [('Architektur','architecture'),('Entscheidungen','decisions'),('Demo-Ablauf','walkthrough'),('Projektgrenzen','limits')])
 features=''.join('<li>'+esc(f)+'</li>' for f in p['features'])
 links=(f'<a href="{p["url"]}">GitHub ↗</a>' if p.get('url') else '')+(f'<a href="{p["live"]}">Demo ↗</a>' if p.get('live') else '')
 block=f'<details id="{p["kind"]}"><summary><span class="number">{i+1:02d}</span><span><strong>{esc(p["name"])}</strong><small>{esc(p["tag"])} · {esc(p["role"])}</small></span><span class="plus" aria-hidden="true">+</span></summary><div class="content"><p class="intro">{esc(p["intro"])}</p>{pic}<p class="caption">{esc(p.get("caption","Browseraufnahme der veröffentlichten Demo · 6. Oktober 2026"))}</p><h3>Funktionsumfang</h3><ul>{features}</ul>{sections}<div class="links">{links}</div></div></details>'
 blocks.append(block)
path.write_text(document.replace('<footer>',''.join(blocks)+'<footer>',1))
print('Generated 16-page PDF and seven-section HTML')
