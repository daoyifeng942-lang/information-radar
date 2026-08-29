import Parser from 'rss-parser';
const parser=new Parser({timeout:8000});
const headers={'user-agent':'InformationRadar/1.0 (+public-content-reader)'};
function clean(s=''){return s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim()}
function abs(base,href){try{return new URL(href,base).href}catch{return ''}}
async function get(url){const c=new AbortController();const t=setTimeout(()=>c.abort(),7000);try{const r=await fetch(url,{headers,signal:c.signal,redirect:'follow'});if(!r.ok)return null;return {url:r.url,text:await r.text()}}finally{clearTimeout(t)}}
function mapFeed(feed,source){return (feed.items||[]).slice(0,30).map(x=>({title:x.title||'',summary:clean(x.contentSnippet||x.content||x.summary||''),publishedAt:x.isoDate||x.pubDate||null,url:x.link||'',source:source.name,category:source.category,sourcePriority:source.priority})).filter(x=>x.title&&x.url)}
export async function collectSource(source){
 if(source.feedUrl){try{const feed=await parser.parseURL(source.feedUrl);const items=mapFeed(feed,source);if(items.length)return items}catch{}}
 const page=await get(source.url);if(!page)return [];
 const feedMatch=page.text.match(/<link[^>]+type=["']application\/(?:rss\+xml|atom\+xml)["'][^>]+href=["']([^"']+)/i);
 if(feedMatch){try{const feed=await parser.parseURL(abs(page.url,feedMatch[1]));const items=mapFeed(feed,source);if(items.length)return items}catch{}}
 const out=[];const re=/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;let m;
 while((m=re.exec(page.text))&&out.length<20){const title=clean(m[2]);const url=abs(page.url,m[1]);if(title.length>=8&&title.length<=140&&url&&/^https?:/.test(url))out.push({title,summary:'公开页面条目',publishedAt:null,url,source:source.name,category:source.category,sourcePriority:source.priority})}
 return out;
}
export async function collectMany(sources){const all=[];const errors=[];const results=await Promise.allSettled(sources.map(collectSource));results.forEach((r,i)=>r.status==='fulfilled'?all.push(...r.value):errors.push({source:sources[i].name,error:String(r.reason)}));const seen=new Set();const unique=all.filter(x=>{const k=x.url||x.title;if(!k||seen.has(k))return false;seen.add(k);return true});return {items:unique,errors};}