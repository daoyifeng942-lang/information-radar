const cards=[
 {category:'文化',title:'文化雷达正在初始化',score:'—',source:'指定来源优先',reason:'系统将优先扫描你指定的文化来源，再通过 AI 按美感、诗性、原创性、精神价值与文化意义筛选。'},
 {category:'科技',title:'科技雷达即将接入',score:'—',source:'国内外权威来源',reason:'将按技术突破、可信度、创新程度、产业影响与长期价值排序。'},
 {category:'社会',title:'社会雷达即将接入',score:'—',source:'权威媒体与公开来源',reason:'将按公共价值、影响范围、紧迫性、可信度与长期影响排序。'}
];
export default function Page(){return <main><header><div className="eyebrow">INFORMATION RADAR</div><h1>今日信息雷达</h1><p>指定来源优先 · AI 筛选 · 高价值信息 · 原文直达</p></header><nav><button className="active">今日</button><button>文化</button><button>科技</button><button>社会</button></nav><section className="grid">{cards.map((x,i)=><article key={i}><div className="meta">{x.category} · {x.source}</div><h2>{x.title}</h2><div className="score">{x.score}</div><p>{x.reason}</p><span>系统搭建中</span></article>)}</section><footer>V1 · 自动扫描、AI 评分、数据库与定时任务将在后续版本接入。</footer></main>}