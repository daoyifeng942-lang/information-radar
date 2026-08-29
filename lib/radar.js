export const rubrics={
文化:{criteria:['美感','诗性','原创性','精神价值','文化意义','可信度','时效性'],instruction:'文化领域不以商业实用性为核心。优先判断美感、诗性、原创性、精神价值和文化意义。'},
科技:{criteria:['技术突破','原创性','可信度','产业影响','科研意义','长期潜力'],instruction:'重点区分真实技术进展与营销炒作，重视可信度、原创性和长期影响。'},
社会:{criteria:['公共价值','影响范围','紧迫性','可信度','长期影响'],instruction:'重视公共价值、影响范围、紧迫性、可信度和结构性长期影响。'}
};

function words(text, pattern, label){return pattern.test(text)?label:''}

export function buildReason(item){
 const t=`${item.title||''} ${item.summary||''}`.replace(/\s+/g,' ');
 const source=item.source?`来自「${item.source}」`:'来自本轮扫描的公开来源';
 if(item.category==='文化'){
   const tags=[
     words(t,/文学|小说|诗|诗歌|散文|作家|经典/,'文学与诗性表达'),
     words(t,/艺术|美术|绘画|戏剧|音乐|电影|舞蹈/,'艺术审美价值'),
     words(t,/思想|哲学|文明|文化|精神/,'思想与精神深度'),
     words(t,/古籍|历史|传统|遗产|博物|文物/,'历史与文化记忆'),
     words(t,/原创|创作|新作|首发/,'原创性')
   ].filter(Boolean);
   const main=tags.length?tags.slice(0,2).join('、'):'具有较高的文化主题相关性';
   return `${source}，内容重点呈现${main}。结合标题与摘要，它不只是资讯更新，还可能帮助理解相关文化议题，因此按文化领域的审美、诗性、原创性与精神深度标准推荐。`;
 }
 if(item.category==='科技'){
   const tags=[
     words(t,/AI|人工智能|大模型|算法/,'人工智能进展'),
     words(t,/研究|论文|实验|科研/,'研究与可验证成果'),
     words(t,/芯片|算力|半导体/,'关键技术基础设施'),
     words(t,/发布|推出|开源|产品/,'新技术或产品动向'),
     words(t,/突破|创新|首次|领先/,'潜在技术突破')
   ].filter(Boolean);
   const main=tags.length?tags.slice(0,2).join('、'):'技术发展与行业变化';
   return `${source}，内容涉及${main}。它具有一定的新颖性或后续影响空间，并优先考虑可信来源、技术实质与长期产业影响，因此进入科技推荐。`;
 }
 const tags=[
   words(t,/政策|法规|规定|条例|通知/,'政策与制度变化'),
   words(t,/教育|就业|医疗|住房|养老/,'重要公共议题'),
   words(t,/经济|市场|企业|消费/,'社会经济变化'),
   words(t,/事故|灾害|安全|风险/,'公共风险与安全'),
   words(t,/改革|人口|城市|乡村|治理/,'结构性社会变化')
 ].filter(Boolean);
 const main=tags.length?tags.slice(0,2).join('、'):'公共议题';
 return `${source}，内容涉及${main}。结合信息的公共影响、时效性与事实价值判断，它有助于理解近期社会变化，因此进入社会领域推荐。`;
}

export function scoreLocal(item){
 const t=`${item.title||''} ${item.summary||''}`;
 const cultural=item.category==='文化';
 const hit=cultural?/诗|文学|艺术|美术|戏剧|音乐|古籍|传统|审美|文明|思想|博物/.test(t):/突破|创新|研究|政策|改革|社会|科技|AI|人工智能/.test(t);
 const value=hit?8:6;
 const urgency=/截止|明日|明天|今日|即将|生效|报名|最后期限|限时/.test(t)?9:4;
 return {value,urgency,score:Number((value*.75+urgency*.25).toFixed(1)),reason:buildReason(item)};
}
