import { News, LocalizedString } from '../types';

export interface ClassicScenarioArc {
  id: string;
  name: LocalizedString;
  news: News[];
}

/**
 * Select a classic scenario arc deterministically from the seed.
 * Uses pure modulo arithmetic — zero PRNG consumption.
 */
export function selectClassicArc(arcs: ClassicScenarioArc[], seed: number): ClassicScenarioArc {
  const index = Math.abs(seed) % arcs.length;
  return arcs[index];
}

// ---------------------------------------------------------------------------
// Arc Chains — narrative-coherent sequences for LiveCompetition
// ---------------------------------------------------------------------------

export interface ArcChain {
  id: string;
  name: LocalizedString;
  arcIds: string[];
  transitions: Record<string, { title: LocalizedString; content: LocalizedString }>;
}

/**
 * 5 chains × 4 arcs each = 20 arcs (full coverage, no duplicates).
 * Each chain tells a macro-economic story arc with natural cause → effect progression.
 */
export const CLASSIC_CHAINS: ArcChain[] = [
  {
    id: 'tech-cycle',
    name: { en: 'Tech Rise & Fall', ko: '테크 흥망성쇠' },
    arcIds: ['tech-bubble', 'chip-shortage', 'ai-regulation', 'dotcom-crash'],
    transitions: {
      'tech-bubble->chip-shortage': {
        title: {
          en: 'Tech Boom Strains Supply Chains',
          ko: '기술 붐이 공급망을 압박하다',
        },
        content: {
          en: 'The explosive growth in tech demand has created critical semiconductor shortages worldwide. Factories struggle to keep up as every industry scrambles for chips.',
          ko: '폭발적인 기술 수요 증가가 전 세계적으로 심각한 반도체 부족 사태를 초래했습니다. 모든 산업이 칩 확보에 나서면서 공장이 수요를 따라가지 못하고 있습니다.',
        },
      },
      'chip-shortage->ai-regulation': {
        title: {
          en: 'Chip Crisis Sparks AI Oversight Debate',
          ko: '칩 위기가 AI 규제 논의를 촉발하다',
        },
        content: {
          en: 'As chip allocation battles intensify, governments begin questioning who controls AI development. Calls for regulation grow louder amid concerns over concentrated tech power.',
          ko: '칩 배분 경쟁이 심화되면서 각국 정부가 AI 개발 통제권에 의문을 제기하기 시작했습니다. 기술 권력 집중에 대한 우려로 규제 목소리가 커지고 있습니다.',
        },
      },
      'ai-regulation->dotcom-crash': {
        title: {
          en: 'Regulation Wave Triggers Tech Selloff',
          ko: '규제 물결이 기술주 매도를 촉발하다',
        },
        content: {
          en: 'Sweeping AI regulations have shattered investor confidence. Tech valuations that once seemed unstoppable are now in freefall as the market reprices risk.',
          ko: '광범위한 AI 규제가 투자자 신뢰를 무너뜨렸습니다. 한때 멈출 수 없어 보였던 기술주 밸류에이션이 시장의 리스크 재평가로 급락하고 있습니다.',
        },
      },
    },
  },
  {
    id: 'global-crisis',
    name: { en: 'Global Crisis', ko: '글로벌 위기' },
    arcIds: ['pandemic', 'supply-chain-shock', 'financial-crisis', 'sovereign-debt'],
    transitions: {
      'pandemic->supply-chain-shock': {
        title: {
          en: 'Pandemic Aftermath Disrupts Global Trade',
          ko: '팬데믹 여파가 글로벌 무역을 마비시키다',
        },
        content: {
          en: 'As the pandemic recedes, its aftermath reveals crippled supply chains. Port backlogs, labor shortages, and logistics bottlenecks create a new wave of economic uncertainty.',
          ko: '팬데믹이 물러가면서 그 여파로 마비된 공급망이 드러나고 있습니다. 항만 적체, 노동력 부족, 물류 병목현상이 새로운 경제 불확실성을 만들어내고 있습니다.',
        },
      },
      'supply-chain-shock->financial-crisis': {
        title: {
          en: 'Supply Shortages Cascade Into Financial Turmoil',
          ko: '공급 부족이 금융 혼란으로 확산되다',
        },
        content: {
          en: 'Persistent supply disruptions have pushed costs to breaking point. Banks report surging defaults as businesses buckle under inflation and broken contracts.',
          ko: '지속적인 공급 차질이 비용을 한계점까지 밀어올렸습니다. 인플레이션과 계약 불이행에 기업들이 무너지면서 은행들의 부실 대출이 급증하고 있습니다.',
        },
      },
      'financial-crisis->sovereign-debt': {
        title: {
          en: 'Bank Bailouts Balloon National Debts',
          ko: '은행 구제금융이 국가 부채를 폭증시키다',
        },
        content: {
          en: 'Massive government bailouts have stabilized banks but at enormous cost. Sovereign debt levels hit record highs, raising fears of a new kind of crisis.',
          ko: '대규모 정부 구제금융이 은행을 안정시켰지만 막대한 비용이 들었습니다. 국가 부채가 사상 최고치를 기록하며 새로운 종류의 위기에 대한 우려가 커지고 있습니다.',
        },
      },
    },
  },
  {
    id: 'energy-wars',
    name: { en: 'Energy Wars', ko: '에너지 전쟁' },
    arcIds: ['oil-price-war', 'energy-crisis', 'climate-summit', 'nuclear-disaster'],
    transitions: {
      'oil-price-war->energy-crisis': {
        title: {
          en: 'Oil War Fallout Sparks Energy Emergency',
          ko: '석유 전쟁 여파가 에너지 비상사태를 초래하다',
        },
        content: {
          en: 'The devastating oil price war has left energy producers crippled. With investment dried up and reserves depleted, a full-blown energy crisis emerges.',
          ko: '파괴적인 석유 가격 전쟁이 에너지 생산업체들을 무력화시켰습니다. 투자가 고갈되고 비축량이 소진되면서 본격적인 에너지 위기가 발생했습니다.',
        },
      },
      'energy-crisis->climate-summit': {
        title: {
          en: 'Energy Crisis Forces Climate Action',
          ko: '에너지 위기가 기후 행동을 강제하다',
        },
        content: {
          en: 'The energy crisis has made the case for renewables undeniable. World leaders convene an emergency climate summit to accelerate the green transition.',
          ko: '에너지 위기가 재생에너지의 필요성을 부인할 수 없게 만들었습니다. 세계 지도자들이 녹색 전환을 가속화하기 위한 긴급 기후 정상회의를 소집했습니다.',
        },
      },
      'climate-summit->nuclear-disaster': {
        title: {
          en: 'Rush to Nuclear Power Ends in Catastrophe',
          ko: '원자력 발전 서두르다 대재앙으로 끝나다',
        },
        content: {
          en: 'In the desperate push for carbon-free energy, safety shortcuts were taken. A major nuclear incident now threatens to derail the entire clean energy movement.',
          ko: '탄소 없는 에너지를 향한 다급한 추진 과정에서 안전 절차가 생략되었습니다. 주요 원자력 사고가 청정에너지 운동 전체를 위협하고 있습니다.',
        },
      },
    },
  },
  {
    id: 'market-mania',
    name: { en: 'Market Mania', ko: '시장 광풍' },
    arcIds: ['meme-stock', 'crypto-meltdown', 'rate-hike-storm', 'real-estate-collapse'],
    transitions: {
      'meme-stock->crypto-meltdown': {
        title: {
          en: 'Meme Stock Profits Flood Into Crypto',
          ko: '밈 주식 수익이 암호화폐로 밀려들다',
        },
        content: {
          en: 'Retail traders flush with meme stock gains pile into cryptocurrency. But the speculative frenzy creates a bubble far larger than anyone imagined.',
          ko: '밈 주식으로 수익을 올린 개인 투자자들이 암호화폐로 몰려들고 있습니다. 하지만 투기 광풍이 누구도 상상하지 못한 거대한 버블을 만들어내고 있습니다.',
        },
      },
      'crypto-meltdown->rate-hike-storm': {
        title: {
          en: 'Crypto Collapse Forces Central Bank Response',
          ko: '암호화폐 붕괴가 중앙은행 대응을 강제하다',
        },
        content: {
          en: 'The crypto meltdown has exposed systemic risk in the financial system. Central banks respond with aggressive rate hikes to cool speculation and restore stability.',
          ko: '암호화폐 붕괴가 금융 시스템의 체계적 위험을 드러냈습니다. 중앙은행이 투기를 진정시키고 안정을 회복하기 위해 공격적인 금리 인상으로 대응하고 있습니다.',
        },
      },
      'rate-hike-storm->real-estate-collapse': {
        title: {
          en: 'Rate Hikes Crush Property Markets',
          ko: '금리 인상이 부동산 시장을 무너뜨리다',
        },
        content: {
          en: 'Relentless rate increases have made mortgages unaffordable. The property market, long considered a safe haven, begins its steepest decline in a generation.',
          ko: '끊임없는 금리 인상으로 주택담보대출이 감당할 수 없게 되었습니다. 오랫동안 안전자산으로 여겨졌던 부동산 시장이 한 세대 만에 가장 가파른 하락을 시작하고 있습니다.',
        },
      },
    },
  },
  {
    id: 'geopolitics',
    name: { en: 'Geopolitics', ko: '지정학' },
    arcIds: ['trade-war', 'currency-crisis', 'space-race', 'aviation-safety'],
    transitions: {
      'trade-war->currency-crisis': {
        title: {
          en: 'Trade War Destabilizes Currencies',
          ko: '무역 전쟁이 통화를 불안정하게 만들다',
        },
        content: {
          en: 'Escalating tariffs and trade barriers have weaponized currencies. Nations engage in competitive devaluation, triggering a global currency crisis.',
          ko: '확대되는 관세와 무역 장벽이 통화를 무기화했습니다. 각국이 경쟁적 평가절하에 나서면서 글로벌 통화 위기가 발생하고 있습니다.',
        },
      },
      'currency-crisis->space-race': {
        title: {
          en: 'Nations Pivot to Space for Economic Edge',
          ko: '각국이 경제적 우위를 위해 우주로 전환하다',
        },
        content: {
          en: 'With traditional economies battered, major powers bet on the space economy as the next frontier. A fierce competition for orbital dominance begins.',
          ko: '전통 경제가 타격을 입으면서 주요 강국들이 우주 경제를 차세대 전선으로 선택했습니다. 궤도 패권을 위한 치열한 경쟁이 시작됩니다.',
        },
      },
      'space-race->aviation-safety': {
        title: {
          en: 'Space Rush Exposes Aviation Risks',
          ko: '우주 개발 경쟁이 항공 안전 위험을 드러내다',
        },
        content: {
          en: 'The frantic pace of space launches has strained aerospace manufacturing. Safety concerns mount as quality control failures begin affecting commercial aviation.',
          ko: '우주 발사의 급박한 속도가 항공우주 제조업에 부담을 주고 있습니다. 품질 관리 실패가 상업 항공에 영향을 미치기 시작하면서 안전 우려가 커지고 있습니다.',
        },
      },
    },
  },
];

// Effect dampening schedule for arc transitions (dayIdx 1-5 within each phase)
// Day 1-2 of a new arc have reduced effects to smooth the transition
export const ARC_TRANSITION_DAMPENING = [0.5, 0.75, 1.0, 1.0, 1.0];

/**
 * Select an arc from a narrative chain, deterministically.
 * seed → chain selection, phase → arc within chain.
 * Pure arithmetic — zero PRNG consumption.
 */
export function selectArcFromChain(
  chains: ArcChain[],
  arcs: ClassicScenarioArc[],
  seed: number,
  phase: number,
): { arc: ClassicScenarioArc; chain: ArcChain; arcIndexInChain: number } {
  const chainIndex = Math.abs(seed) % chains.length;
  const chain = chains[chainIndex];
  const arcIndex = phase % chain.arcIds.length;
  const arcId = chain.arcIds[arcIndex];
  const arc = arcs.find(a => a.id === arcId);
  if (!arc) {
    // Fallback: use selectClassicArc if chain references a missing arc
    console.error(`Arc "${arcId}" not found in CLASSIC_ARCS, falling back to seed selection`);
    return { arc: selectClassicArc(arcs, seed + phase), chain, arcIndexInChain: arcIndex };
  }
  return { arc, chain, arcIndexInChain: arcIndex };
}

/**
 * Build a bridge news item for the transition between two arcs.
 * Has empty effect — zero PRNG impact, purely narrative.
 */
export function buildBridgeNews(
  chain: ArcChain,
  fromArcId: string,
  toArcId: string,
  dayIdx: number,
  phase: number,
): News | null {
  const key = `${fromArcId}->${toArcId}`;
  const transition = chain.transitions[key];
  if (!transition) return null;

  return {
    id: `bridge-${key}-phase${phase}`,
    dayIdx,
    title: transition.title,
    content: transition.content,
    read: false,
    effect: {},
    isBridgeNews: true,
  };
}

/**
 * Build phase news with dampening and optional bridge news.
 * Shared by both fast-forward and live day-change handlers to ensure determinism.
 */
export function buildPhaseNews(
  arcs: ClassicScenarioArc[],
  chains: ArcChain[],
  seed: number,
  phase: number,
): News[] {
  const { arc, chain, arcIndexInChain } = selectArcFromChain(chains, arcs, seed, phase);
  const phaseStartDay = phase * 5 + 1;

  // Build dampened + shifted news
  const shiftedNews: News[] = arc.news.map(n => {
    const dampen = ARC_TRANSITION_DAMPENING[n.dayIdx - 1] ?? 1.0;
    const dampenedEffect: Record<string, number> = {};
    for (const [sym, mult] of Object.entries(n.effect)) {
      dampenedEffect[sym] = 1 + (mult - 1) * dampen;
    }

    return {
      ...n,
      id: `${n.id}-phase${phase}`,
      dayIdx: n.dayIdx + phaseStartDay - 1,
      effect: dampenedEffect,
      ...(n.whipsaw ? {
        whipsaw: {
          nextDayEffect: Object.fromEntries(
            Object.entries(n.whipsaw.nextDayEffect).map(
              ([sym, mult]) => [sym, 1 + (mult - 1) * dampen]
            )
          ),
        },
      } : {}),
    };
  });

  // Prepend bridge news if this isn't the first arc in the chain
  if (arcIndexInChain > 0) {
    const prevArcId = chain.arcIds[arcIndexInChain - 1];
    const bridgeNews = buildBridgeNews(chain, prevArcId, arc.id, phaseStartDay, phase);
    if (bridgeNews) {
      shiftedNews.unshift(bridgeNews);
    }
  }

  return shiftedNews;
}
