import {NextResponse} from 'next/server';
import {sources} from '../../../lib/sources.js';
import {collectMany} from '../../../lib/collector.js';
import {scoreLocal} from '../../../lib/radar.js';
import {saveItems} from '../../../lib/store.js';
export const runtime='nodejs';export const dynamic='force-dynamic';
export async function GET(req){
 const auth=req.headers.get('authorization');if(process.env.CRON_SECRET&&auth!==`Bearer ${process.env.CRON_SECRET}`)return NextResponse.json({error:'Unauthorized'},{status:401});
 const started=Date.now();const {items,errors}=await collectMany(sources);const scored=items.map(x=>({...x,...scoreLocal(x),collectedAt:new Date().toISOString()}));const saved=saveItems(scored);
 return NextResponse.json({ok:true,mode:'public-web-and-rss',sources:sources.length,collected:items.length,saved:saved.length,errors,durationMs:Date.now()-started});
}