# 臧子茗 · 学术主页

一个**零依赖、零构建**的静态学术主页，视觉与信息结构参考了
[Zhoujun Ye 的学术主页](https://zhoujun-ye.github.io)：顶部导航、侧边个人资料栏，以及 About Me、Research Interests、News、Publications 等学术主页板块。

采用纯 HTML/CSS/JS，无需 Ruby、Jekyll 或构建步骤；**双击 `index.html` 即可打开**，也可以直接托管到 GitHub Pages / Netlify / Vercel。

## 目录结构

```
Academic-web/
├── index.html              首页（About）：个人简介、最新动态、研究兴趣、代表论文、联系方式
├── publications.html       论文发表
├── projects.html           科研与项目经历
├── cv.html                 完整简历（支持打印 / 导出 PDF）
├── assets/
│   ├── css/main.css        全部样式（含深色模式与打印样式）
│   ├── js/site.js          主题切换、移动端菜单、导航高亮、回到顶部
│   └── img/portrait.jpg    个人头像（方块裁切版）
└── README.md
```

## 功能特性

| 功能 | 说明 |
| --- | --- |
| 中英双语切换 | 导航栏 `中` / `EN` 按钮一键互切，默认（首次访问）为英文；`<html>` 上的 `data-lang` 在静态标记里就写好了，禁用 JS 也能正确显示英文 |
| 深色 / 浅色主题 | 右上角按钮切换，选择保存在 `localStorage`；首次访问跟随系统偏好，且已在 `<head>` 内联脚本中提前应用，无闪白 |
| 响应式 | 三档断点：>900px 双栏、720–900px 单栏、<720px 折叠导航 + 侧栏上移 |
| 返回顶部 | 滚动超过 420px 后出现 |
| 打印 / PDF | 在 `cv.html` 点击「打印 / 导出 PDF」，导航、侧栏、页脚会自动隐藏并输出 A4 友好排版 |
| SEO / 分享 | 每页独立的 `title`、`description`、`theme-color` 与内联 SVG favicon，均随语言切换 |

## 双语机制（i18n）

站内**没有构建步骤**，双语采用「同一条内容写两份、CSS 按语言隐藏」的方式：

```html
<h2>
  <span data-lang-block="en">News</span>
  <span data-lang-block="zh">最新动态</span>
</h2>
```

- `assets/css/main.css` 里的两条规则负责显隐：
  `html[data-lang="en"] [data-lang-block="zh"] { display: none; }`（反之亦然）
- 语言状态存在 `<html data-lang>` 上，静态默认值就是 `en`，因此**页面优先英文展示**、且不依赖 JS
- `assets/js/site.js` 只负责做三件 JS 才能做的事：切换 `data-lang`、同步 `<title>` / `<meta description>` / `<img alt>` / `aria-label`，以及把选择写入 `localStorage`（键名 `zz-lang`）
- `<title>`、`<meta>`、`<img>` 这类无法用 DOM 节点表达的文字，用成对属性承载：
  ```html
  <title data-en="CV | Ziming Zang" data-zh="简历 CV | 臧子茗 Ziming Zang">CV | Ziming Zang</title>
  ```

> 新增内容时，**两个语言的块都要写**，否则切换语言后该处会消失。

## 本地预览

直接双击 `index.html` 即可；若需本地服务器：

```powershell
# 任选其一
python -m http.server 8000
npx serve .
```

## 如何修改内容

- **个人信息 / 研究兴趣 / News** → 编辑 `index.html`
- **论文列表** → 编辑 `publications.html`（每条论文是一个 `<li class="pub">`）
- **项目经历** → 编辑 `projects.html`（每条是一个 `<div class="entry">`）
- **简历** → 编辑 `cv.html`
- **配色** → 修改 `assets/css/main.css` 顶部 `:root` 与 `html[data-theme="dark"]` 中的
  `--accent`（主色）、`--gold`、`--bg`、`--surface` 等变量即可全局换肤
- **头像** → 替换 `assets/img/portrait.jpg`（建议正方形、≥400×400）

## 部署到 GitHub Pages

```powershell
git init
git add .gitignore README.md index.html publications.html projects.html cv.html assets
git commit -m "Add academic homepage"
git branch -M main
git remote add origin https://github.com/Evruc-zang/Evruc-zang.github.io.git
git push -u origin main
```

然后在仓库 **Settings → Pages** 中选择 `main` 分支的 `/ (root)` 目录即可。

> 请先在 GitHub 创建名为 `Evruc-zang.github.io` 的仓库。仓库 Pages 设置为 `main` 分支的 `/ (root)` 后，主页地址为 `https://Evruc-zang.github.io`。

## 备注

- 站点中未提供 DOI / PDF 直链的条目留白待补；拿到正式 DOI 后，可在
  `publications.html` 的 `<ul class="badges">` 中按现有 `class="badge"` 的写法补充链接。
- *Plants* 2026 条目的作者信息依据个人简历内容填写，
  正式发表后建议核对作者顺序与卷期页码。
