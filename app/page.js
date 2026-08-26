'use client';
import {useEffect,useMemo,useState} from 'react';

const tabs=['今日','文化','科技','社会'];
const categoryTabs=['全部','文化','科技','社会'];

export default function Page(){
  const [tab,setTab]=useState('今日');
  const [filter,setFilter]=useState('全部');
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(true);
  const [urgentOnly,setUrgentOnly]=useState(false);
  const [sort,setSort]=useState('value');
  const [source,setSource]=useState('all');
  const [lastUpdated,setLastUpdated]=useState('');

  async function load(){
    setLoading(true);
    try{
      const q=tab==='今日'?'':'?category='+encodeURIComponent(tab);
      const r=await fetch('/api/items'+q,{cache:'no-store'});
      const j=await r.json();
      setItems(j.items||[]);
      setLastUpdated(new Date().toLocaleString('zh-CN',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'}));
    }catch(e){setItems([])}
    finally{setLoading(false)}
  }
  useEffect(()=>{load()},[tab]);

  const sources=useMemo(()=>['all',...new Set(items.map(x=>x.source).filter(Boolean))],[items]);
  const visible=useMemo(()=>{
    let list=items.filter(x=>filter==='全部'||x.category===filter);
    if(urgentOnly) list=list.filter(x=>Number(x.urgency||0)>=7);
    if(source!=='all') list=list.filter(x=>x.source===source);
    list=[...list].sort((a,b)=>{
      if(sort==='urgency') return Number(b.urgency||0)-Number(a.urgency||0);
      if(sort==='fresh') return Number(b.timeliness||b.freshness||0)-Number(a.timeliness||a.freshness||0);
      return Number(b.score||b.value||0)-Number(a.score||a.value||0);
    });
    return list;
  },[items,filter,urgentOnly,source,sort]);

  async function scan(){
    setLoading(true);
    try{await fetch('/api/scan',{method:'GET',cache:'no-store'}); await load()}finally{setLoading(false)}
  }

  return <main>
    <header className="topbar">
      <div>
        <div className="eyebrow">INFORMATION RADAR</div>
        <h1>今日信息雷达</h1>
        <p>指定来源优先 · AI 筛选 · 高价值信息 · 原文直达</p>
      </div>
      <div className="header-actions">
        <button className="scan" onClick={scan} disabled={loading}>{loading?'扫描中…':'↻ 立即扫描'}</button>
        <span className="updated">◷ 最近更新：{lastUpdated||'尚未扫描'}</span>
      </div>
    </header>

    <nav className="main-tabs">{tabs.map(t=><button key={t} className={tab===t?'active':''} onClick={()=>{setTab(t);setFilter(t==='今日'?'全部':t)}}>{t}</button>)}</nav>

    <section className="toolbar">
      <div className="filters">
        {categoryTabs.map(t=><button key={t} className={filter===t?'pill active-pill':''} onClick={()=>setFilter(t)}>{t}</button>)}
        <span className="divider" />
        <label className="select">价值排序
          <select value={sort} onChange={e=>setSort(e.target.value)}><option value="value">价值最高</option><option value="fresh">时效最高</option><option value="urgency">紧急最高</option></select>
        </label>
        <label className="select">来源
          <select value={source} onChange={e=>setSource(e.target.value)}><option value="all">全部来源</option>{sources.slice(1).map(s=><option key={s} value={s}>{s}</option>)}</select>
        </label>
        <label className="urgent"><input type="checkbox" checked={urgentOnly} onChange={e=>setUrgentOnly(e.target.checked)}/> 仅看紧急信息</label>
      </div>
      <div className="view-toggle"><span className="view-active">☷</span><span>☾</span></div>
    </section>

    <section className="feed-head"><span>{tab} · {visible.length} 条</span><span>价值 / 时效 / 紧急度</span></section>
    <section className="feed">
      {loading?<div className="empty">正在读取雷达…</div>:visible.length?visible.map((x,i)=><article className="feed-row" key={x.url||i}>
        <div className={'dot '+String(x.category||'').toLowerCase()} />
        <div className="category-tag">{x.category||'综合'}</div>
        <div className="story">
          <h2>{x.title}</h2>
          <div className="source-line">{x.source||'未知来源'} · {x.time||x.publishedAt||'近期'}</div>
          <p>{x.reason||x.summary||'AI 正在为这条信息生成价值摘要。'}</p>
        </div>
        <div className="metrics"><div><small>价值</small><strong>{Number(x.score??x.value??0).toFixed(1)}</strong></div><div><small>时效</small><strong>{Number(x.timeliness??x.freshness??0).toFixed(1)}</strong></div><div><small>紧急度</small><strong>{Number(x.urgency??0).toFixed(1)}</strong></div></div>
        {Number(x.urgency||0)>=7&&<span className="urgent-badge">紧急信息</span>}
        <a className="read" href={x.url} target="_blank" rel="noreferrer">阅读原文 ↗</a>
      </article>):<div className="empty">尚无扫描结果。点击右上角“立即扫描”开始。</div>}
    </section>
    <footer>信息雷达 V1 · 每日为您筛选高价值信息 <span>关于我们　·　反馈建议</span></footer>
  </main>
}