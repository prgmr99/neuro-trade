// 라우트별 정적 HTML 생성.
//
// SPA라 모든 주소가 같은 index.html을 받는다. 그 결과 사이트맵에 올린 6개 URL이
// 전부 같은 title/description/canonical을 내보내고, 구글은 5개를 "대체 페이지"로
// 제외한다. 여기서 라우트마다 head를 갈아끼운 사본을 구워 그 문제를 없앤다.
//
// 본문은 src/content/routeAbout.json 한 곳에서만 나온다. React의 RouteAbout이
// 같은 파일을 읽으므로, 크롤러가 보는 글과 사용자가 보는 글이 갈라지지 않는다.
// 정적 블록은 #root 안에 들어가고, ReactDOM.createRoot(...).render()가 첫 렌더에서
// 컨테이너 자식을 교체하므로 마운트 시 사라진다(hydrateRoot였다면 불일치로 깨진다).

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://neuro-trade.yeomniverse.com';

const routes = JSON.parse(
  readFileSync(join(ROOT, 'src/content/routeAbout.json'), 'utf8'),
);

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => esc(s).replace(/"/g, '&quot;');

/** 라우트 본문. 영문을 먼저 두고 한국어를 잇는 기존 <noscript> 관례를 따른다. */
function staticBody(route) {
  const section = (copy, lang) => `
      <section class="route-about" lang="${lang}">
        <h2>${esc(copy.heading)}</h2>
        ${copy.blocks
          .map((b) => {
            const paras = (Array.isArray(b.p) ? b.p : [b.p])
              .map((t) => `<p>${esc(t)}</p>`)
              .join('\n        ');
            return b.h ? `<h3>${esc(b.h)}</h3>\n        ${paras}` : paras;
          })
          .join('\n        ')}
      </section>`;

  return `<div class="splash-screen"><div class="splash-content glass-card">${section(
    route.en,
    'en',
  )}${section(route.ko, 'ko')}
      <p class="route-about-links">${
        route.en.hub
          ? `<a href="https://yeomniverse.com">${esc(route.en.hub)}</a>`
          : `<a href="/">All NeuroTrade modes</a> &middot;
        <a href="https://yeomniverse.com">Yeomniverse</a>`
      }</p>
    </div></div>`;
}

function replaceTag(html, pattern, replacement, label, name) {
  if (!pattern.test(html)) {
    throw new Error(`[prerender] ${name}: ${label} 를 찾지 못했다. index.html 구조가 바뀌었는지 확인할 것.`);
  }
  return html.replace(pattern, replacement);
}

const indexPath = join(DIST, 'index.html');
if (!existsSync(indexPath)) {
  throw new Error('[prerender] dist/index.html 이 없다. vite build 뒤에 실행할 것.');
}
const index = readFileSync(indexPath, 'utf8');

let count = 0;
for (const [name, route] of Object.entries(routes)) {
  const url = `${SITE}${route.path}`;
  let html = index;

  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`, '<title>', name);
  html = replaceTag(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escAttr(route.description)}" />`, 'description', name);
  html = replaceTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`, 'canonical', name);
  html = replaceTag(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`, 'og:url', name);
  html = replaceTag(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escAttr(route.title)}" />`, 'og:title', name);
  html = replaceTag(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escAttr(route.description)}" />`, 'og:description', name);
  html = replaceTag(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escAttr(route.title)}" />`, 'twitter:title', name);
  html = replaceTag(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${escAttr(route.description)}" />`, 'twitter:description', name);

  // hreflang 세 줄은 전부 루트를 가리키고 있다. 라우트 사본에서는 자기 주소로 바꾼다.
  html = html.replace(
    /<link rel="alternate" hreflang="([^"]+)" href="[^"]*"\s*\/?>/g,
    (_m, lang) => `<link rel="alternate" hreflang="${lang}" href="${url}" />`,
  );

  html = replaceTag(html, /<div id="root"><\/div>/, `<div id="root">${staticBody(route)}</div>`, '#root', name);

  writeFileSync(join(DIST, `${route.file ?? name}.html`), html);
  count += 1;
}

console.log(`[prerender] ${count}개 라우트 HTML 생성 완료`);
