export const dailyQuotes=[
  {work:'《牛虻》',author:'E. L. 伏尼契',en:'E. L. Voynich',quote:'I will go my own way, and follow the light that I see.',cn:'我要走自己的路，追随我所见到的光明。',note:'这是《牛虻》里坚定的自我宣言。不盲从、不妥协，坚定走向内心所见的光明。'},
  {work:'《追忆似水年华》',author:'马塞尔·普鲁斯特',en:'Marcel Proust',quote:'Let the sharp spring breeze unfurl the first rose in Jerusalem for the colorful butterfly that has waited at the gate since dawn.',cn:'就让料峭春风，为一早就等在门口的彩蝶，吹开耶路撒冷的第一朵玫瑰。',note:'普鲁斯特式的浪漫笔触，以春风、玫瑰和彩蝶写出对美好邂逅与纯粹温柔的向往。'},
  {work:'《小王子》',author:'安托万·德·圣埃克苏佩里',en:'Antoine de Saint-Exupéry',quote:'It is only with the heart that one can see rightly; what is essential is invisible to the eye.',cn:'只有用心才能看得清，真正重要的东西，肉眼是看不见的。',note:'把“看见”从视觉引向心灵，提醒我们珍惜那些无法用尺度衡量的关系与意义。'},
  {work:'《沉思录》',author:'马可·奥勒留',en:'Marcus Aurelius',quote:'You have power over your mind — not outside events. Realize this, and you will find strength.',cn:'你拥有的是对自己心灵的支配，而非对外界事物的支配。明白这一点，你就会获得力量。',note:'斯多葛主义的核心提醒：真正能够训练和改变的，是自己的判断、选择与行动。'},
  {work:'《瓦尔登湖》',author:'亨利·戴维·梭罗',en:'Henry David Thoreau',quote:'The mass of men lead lives of quiet desperation.',cn:'大多数人过着一种平静的绝望生活。',note:'一句冷峻而有穿透力的观察，提醒人重新审视习以为常的生活方式与内心真正需要的东西。'},
  {work:'《理想国》',author:'柏拉图',en:'Plato',quote:'The beginning is the most important part of the work.',cn:'开始是工作的最重要部分。',note:'从哲学的角度提醒我们：方向、起点与最初的选择，往往决定一件事后来能够走多远。'}
];
export function todayQuote(){const start=new Date(2026,0,1);const now=new Date();const day=Math.floor((Date.UTC(now.getFullYear(),now.getMonth(),now.getDate())-Date.UTC(start.getFullYear(),start.getMonth(),start.getDate()))/86400000);return dailyQuotes[((day%dailyQuotes.length)+dailyQuotes.length)%dailyQuotes.length]}
