import {rubrics} from './radar.js';
export async function aiScore(item){
 if(!process.env.AI_API_KEY||!process.env.AI_MODEL)return null;
 const base=(process.env.AI_BASE_URL||'https://api.openai.com/v1').replace(/\/$/,'');
 const rubric=rubrics[item.category]||rubrics.社会;
 const prompt=`你是信息雷达编辑。领域：${item.category}。评价标准：${rubric.instruction}。指标：${rubric.criteria.join('、')}。请阅读下面内容并只返回JSON：{"score":0-10,"urgency":0-10,"reason":"不超过60字"}。标题：${item.title}\n摘要：${item.summary||''}`;
 const r=await fetch(`${base}/chat/completions`,{method:'POST',headers:{'content-type':'application/json',authorization:`Bearer ${process.env.AI_API_KEY}`},body:JSON.stringify({model:process.env.AI_MODEL,messages:[{role:'system',content:'只输出合法JSON。'},{role:'user',content:prompt}],temperature:0.1})});
 if(!r.ok)return null;const j=await r.json();const text=j.choices?.[0]?.message?.content||'';try{return JSON.parse(text)}catch{return null}
}