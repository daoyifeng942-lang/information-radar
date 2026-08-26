import {NextResponse} from 'next/server';
import {sources} from '../../../lib/sources.js';
import {scoreLocal} from '../../../lib/radar.js';
import {saveItems} from '../../../lib/store.js';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export async function GET(req){
 const auth=req.headers.get('authorization'); if(process.env.CRON_SECRET&&auth!==`Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({error:'Unauthorized'},{status:401});
 // Safe baseline: the app records the configured source registry. Individual public RSS/API adapters can be added without bypassing access controls.
 const now=new Date().toISOString();
 const items=sources.map(s=>({category:s.category,title:`${s.name}：来源扫描入口`,summary:`已纳入${s.category}指定来源。正式采集时仅使用公开 RSS、API、公开列表或搜索入口。`,publishedAt:now,url:s.url,source:s.name,sourcePriority:s.priority,...scoreLocal({category:s.category,title:s.name,summary:''}),collectedAt:now}));
 const saved=saveItems(items);
 return NextResponse.json({ok:true,scannedSources:sources.length,saved:saved.length,mode:'safe-source-registry'});
}