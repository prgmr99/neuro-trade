import { useTranslation } from '../../../i18n/translations';
import routeAbout from '../../../content/routeAbout.json';
import './RouteAbout.css';

export type RouteAboutKey = keyof typeof routeAbout;

interface Props {
  route: RouteAboutKey;
}

/**
 * 모드 화면에 붙는 설명 섹션.
 *
 * 문구는 routeAbout.json 한 곳에서만 나온다. scripts/prerender-routes.mjs가
 * 같은 파일을 읽어 정적 HTML을 굽기 때문에, 여기서 따로 문구를 쓰면 크롤러가
 * 보는 내용과 사용자가 보는 내용이 어긋난다.
 */
export default function RouteAbout({ route }: Props) {
  const { language } = useTranslation();
  const copy = routeAbout[route][language === 'ko' ? 'ko' : 'en'];

  return (
    <section className="route-about">
      <h2>{copy.heading}</h2>
      {copy.blocks.map((block) => (
        <div key={block.h}>
          <h3>{block.h}</h3>
          <p>{block.p}</p>
        </div>
      ))}
      <p className="route-about-links">
        <a href="/">
          {language === 'ko' ? 'NeuroTrade 모드 전체 보기' : 'All NeuroTrade modes'}
        </a>
        {' · '}
        <a href="https://yeomniverse.com">Yeomniverse</a>
      </p>
    </section>
  );
}
