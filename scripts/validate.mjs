import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
export const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const source = path.join(repository, 'promocodefinders-seo-updated');
export const walk = dir => fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]);
const decode = text => text.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'");
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w-]+)\s*=\s*"([^"]*)"/g)].map(m=>[m[1],decode(m[2])]));
export function validate(root=source) {
  const origin='https://promocodefinders.com';
  const docs=new Map(walk(root).filter(f=>f.endsWith('.html')).map(f=>{
    const relative=path.relative(root,f).replaceAll('\\','/');
    return [relative==='404.html'?'/404.html':'/'+relative.replace(/index\.html$/,''), fs.readFileSync(f,'utf8')];
  }));
  const titles=new Set(), descriptions=new Set(), indexable=new Set(), graph=new Map();
  let anchors=0;
  for(const [route,html] of docs) {
    const check=(condition,message)=>assert.ok(condition,route+': '+message);
    check((html.match(/<h1\b/g)||[]).length===1,'exactly one H1');
    check(/<html lang="en"/.test(html),'document language');
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
    check(ids.length===new Set(ids).size,'no duplicate IDs');
    const title=html.match(/<title>(.*?)<\/title>/)?.[1];
    check(title&&!titles.has(title),'unique nonempty title');titles.add(title);
    const meta=[...html.matchAll(/<meta\b[^>]*>/g)].map(m=>attrs(m[0]));
    const desc=meta.find(m=>m.name==='description')?.content;
    check(desc&&!descriptions.has(desc),'unique nonempty description');descriptions.add(desc);
    const canonical=[...html.matchAll(/<link\b[^>]*>/g)].map(m=>attrs(m[0])).filter(a=>a.rel==='canonical');
    const noindex=meta.some(m=>m.name==='robots'&&m.content.includes('noindex'));
    if(route==='/404.html'){check(noindex,'404 is noindex');check(canonical.length===0,'404 has no canonical');}
    else {
      check(!noindex,'content is indexable');indexable.add(origin+route);
      check(canonical.length===1&&canonical[0].href===origin+route,'self canonical');
      check(meta.find(m=>m.property==='og:url')?.content===origin+route,'OG URL matches canonical');
      check(meta.find(m=>m.property==='og:description')?.content===desc,'OG description matches metadata');
      const scripts=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
      check(scripts.length===1,'one structured data graph');
      const data=JSON.parse(scripts[0][1]);
      check(data['@context']==='https://schema.org','schema context');
      check(data['@graph'].some(n=>['WebPage','CollectionPage'].includes(n['@type'])&&n.url===origin+route),'matching page entity');
      check(!/"(?:Offer|Product|AggregateRating|Review|FAQPage)"/.test(scripts[0][1]),'no unsupported commercial or rich-result claims');
      if(route!=='/') {
        const crumbs=data['@graph'].find(n=>n['@type']==='BreadcrumbList')?.itemListElement;
        check(crumbs?.length>=2,'breadcrumb schema');
        check(crumbs.at(-1).item===origin+route,'breadcrumb ends at canonical');
        crumbs.forEach((c,i)=>{check(c.position===i+1&&docs.has(new URL(c.item).pathname),'valid breadcrumb positions and destinations');});
        check(html.includes('aria-label="Breadcrumb"'),'visible breadcrumbs');
      }
    }
    for(const m of html.matchAll(/<img\b[^>]*>/g)) {const a=attrs(m[0]);check(a.alt&&a.width&&a.height,'images have alt and dimensions');}
    for(const m of html.matchAll(/<script\b[^>]*src="[^"]+"[^>]*>/g)) check(/\bdefer\b|\btype="module"/.test(m[0]),'nonblocking JavaScript');
    const internal=[];
    for(const m of html.matchAll(/<(?:a|link|img|script)\b[^>]*>/g)) {
      const a=attrs(m[0]); const ref=a.href||a.src;if(!ref||/^(mailto:|tel:)/.test(ref))continue;
      const url=new URL(ref,origin+route);
      if(url.origin!==origin) {
        if(/temu\.to|global\.oliveyoung\.com/.test(url.hostname)) check(a.rel?.includes('sponsored')&&a.rel.includes('noopener'),'affiliate qualification');
        continue;
      }
      if(a.rel==='canonical')continue;
      const target=url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname;
      check(fs.existsSync(path.join(root,target)),'local target exists: '+ref);
      if(url.hash){const targetDoc=docs.get(url.pathname);check(targetDoc?.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),'fragment exists: '+ref);}
      if(m[0].startsWith('<a')&&docs.has(url.pathname)){internal.push(url.pathname);anchors++;}
    }
    graph.set(route,internal);
    const codes=[...html.matchAll(/data-copy="([^"]+)" data-retailer="([^"]+)"/g)];
    for(const [,code,retailer] of codes) check(['ALE832781','ALI240834','ALI015848','USEME123'].includes(code)&&(code==='USEME123'?retailer==='Olive Young':retailer==='Temu'),'known code and retailer');
    if(html.includes('data-copy=')){check(codes.length===(html.match(/data-copy=/g)||[]).length,'all copy buttons have retailer context');check(html.includes('Codes are not independently verified.'),'visible code status');}
    check(!html.includes('Before publishing:'),'no setup placeholders');
  }
  const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
  const locations=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
  assert.equal(locations.length,new Set(locations).size,'no duplicate sitemap URLs');
  assert.deepEqual(new Set(locations),indexable,'sitemap exactly matches indexable pages');
  assert.ok(!sitemap.includes('<lastmod>'),'no invented modification dates');
  const robots=fs.readFileSync(path.join(root,'robots.txt'),'utf8');
  assert.match(robots,/Allow: \//);assert.match(robots,/Sitemap: https:\/\/promocodefinders.com\/sitemap.xml/);
  const depths=new Map([['/',0]]); const queue=['/'];
  for(const route of queue)for(const target of graph.get(route)||[])if(!depths.has(target)){depths.set(target,depths.get(route)+1);queue.push(target);}
  for(const url of indexable)assert.ok(depths.has(new URL(url).pathname),'reachable from home: '+url);
  const maxDepth=Math.max(...[...indexable].map(u=>depths.get(new URL(u).pathname)));
  assert.ok(maxDepth<=3,'all indexable pages reachable within three clicks');
  const redirects=fs.readFileSync(path.join(root,'_redirects'),'utf8').trim().split('\n');
  for(const line of redirects){const [from,to,status]=line.split(/\s+/);assert.equal(status,'301');assert.ok(docs.has(to));assert.equal(from+'/',to);}
  const css=fs.statSync(path.join(root,'assets/styles.css')).size;
  const js=fs.statSync(path.join(root,'assets/app.js')).size;
  assert.ok(css<25000&&js<6000,'CSS/JS size budgets');
  const products=JSON.parse(fs.readFileSync(path.join(repository,'data/products.json'),'utf8')).products;
  assert.ok(products.length>0,'product catalog is not empty');
  for(const product of products){
    const html=docs.get('/categories/'+product.category+'/');
    assert.ok(html?.includes(`id="${product.id}"`),'product has an addressable section');
    assert.ok(html.includes(`href="${product.url}"`),'exact supplied product destination retained');
    assert.ok(!html.includes(product.referencePrice),'unverified price is not published as current');
  }
  assert.ok(!fs.existsSync(path.join(root,'data/products.json')),'reference price records stay outside the public site');
  const report={htmlDocuments:docs.size,indexablePages:indexable.size,internalAnchors:anchors,maxClicksFromHome:maxDepth,cssBytes:css,jsBytes:js};
  console.log('Validation passed:',JSON.stringify(report));return report;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))validate();
