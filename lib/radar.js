export const rubrics={
文化:{criteria:['美感','诗性','原创性','精神价值','文化意义','可信度','时效性'],instruction:'文化领域不以商业实用性为核心。优先判断美感、诗性、原创性、精神价值和文化意义。'},
科技:{criteria:['技术突破','原创性','可信度','产业影响','科研意义','长期潜力'],instruction:'重点区分真实技术进展与营销炒作，重视可信度、原创性和长期影响。'},
社会:{criteria:['公共价值','影响范围','紧迫性','可信度','长期影响'],instruction:'重视公共价值、影响范围、紧迫性、可信度和结构性长期影响。'}
};
export function scoreLocal(item){
 const r=rubrics[item.category]||rubrics.社会; const t=`${item.title||''} ${item.summary||''}`;
 const cultural=item.category==='文化';
 const hit=cultural?/诗|文学|艺术|美术|戏剧|音乐|古籍|传统|审美|文明|思想|博物/.test(t):/突破|创新|研究|政策|改革|社会|科技|AI|人工智能/.test(t);
 const value=hit?8:6; const urgency=/截止|明日|明天|今日|即将|生效|报名|最后期限|限时/.test(t)?9:4;
 return {value,urgency,score:Number((value*.75+urgency*.25).toFixed(1)),reason:cultural?'以美感、诗性、原创性、精神价值与文化意义为主要判断轴。':r.instruction};
}