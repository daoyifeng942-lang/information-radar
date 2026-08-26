# 信息雷达 Information Radar

一个面向个人阅读的高价值信息筛选器：指定来源优先，同时允许全网发现；文化、科技、社会使用不同评价体系。

## 当前 V1
- Next.js 网站
- 文化 / 科技 / 社会分区
- 40+ 个文化指定来源与科技、社会权威来源登记
- 公开 RSS/Atom 自动发现
- 公开网页列表采集（不绕过登录、验证码、付费墙或反爬限制）
- 去重
- 领域独立评分规则
- 原文跳转
- `/api/scan` 扫描接口
- `/api/items` 数据接口
- Vercel Cron 每日自动扫描配置

## 评分原则
### 文化
美感、诗性、原创性、精神价值、文化意义优先；不以商业实用性作为核心标准。
### 科技
技术突破、原创性、可信度、产业影响、科研意义、长期潜力。
### 社会
公共价值、影响范围、紧迫性、可信度、长期结构性影响。

## 生产环境说明
当前 store 使用运行时内存，适合 V1 演示和开发验证。正式长期运行应接入 Postgres/其他持久数据库，并将 `scoreLocal` 替换为真实模型 API。模型密钥、数据库连接串和 CRON_SECRET 只能通过 Vercel Environment Variables 配置，不能提交到仓库。

## 运行
`npm install`
`npm run dev`

打开 `/`；点击“立即扫描”即可触发公开来源扫描。

## Deployment
This repository is the canonical source for the Vercel `information-radar` project. Deploy production from `main`.
