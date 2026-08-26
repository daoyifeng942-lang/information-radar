import {NextResponse} from 'next/server';
import {listItems} from '../../../lib/store.js';
export const dynamic='force-dynamic';
export async function GET(req){const category=new URL(req.url).searchParams.get('category')||'';return NextResponse.json({items:listItems(category)});}