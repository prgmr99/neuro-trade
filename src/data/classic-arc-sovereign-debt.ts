import { ClassicScenarioArc } from './classic-arcs';

export const SOVEREIGN_DEBT_ARC: ClassicScenarioArc = {
  id: 'sovereign-debt',
  name: { en: 'Sovereign Debt Crisis', ko: '국가 채무 위기' },
  news: [
    // Day 1: Southern nation reveals hidden debt levels
    {
      id: 'sd-1-1',
      dayIdx: 1,
      title: {
        en: 'Meridia Reveals National Debt Three Times Official Figures',
        ko: '메리디아, 국가 부채 공식 수치의 3배 달하는 것으로 밝혀져',
      },
      content: {
        en: 'The Republic of Meridia stunned global markets by disclosing that its actual national debt stands at 340% of GDP, roughly three times previously reported figures. A new government audit revealed years of systematic accounting fraud at the treasury ministry.',
        ko: '메리디아 공화국이 실제 국가 부채가 GDP의 340%로 기존 공식 수치의 약 3배에 달한다고 밝히며 글로벌 시장에 충격을 줬다. 새로운 정부 감사에서 재무부의 수년간 체계적 회계 부정이 드러났다.',
      },
      read: false,
      effect: { ECOM: 0.91 },
    },
    {
      id: 'sd-1-2',
      dayIdx: 1,
      title: {
        en: 'Meridian Bond Yields Spike to Unsustainable Levels',
        ko: '메리디아 국채 금리, 지속 불가능 수준으로 급등',
      },
      content: {
        en: 'Meridian 10-year government bond yields surged past 25%, effectively locking the nation out of international capital markets. Credit rating agencies downgraded the sovereign to junk status within hours of the disclosure.',
        ko: '메리디아 10년 만기 국채 금리가 25%를 돌파하며 사실상 국제 자본시장 접근이 차단됐다. 신용평가사들은 공시 수시간 만에 국가 신용등급을 투기등급으로 강등했다.',
      },
      read: false,
      effect: { TECH: 0.93 },
    },
    {
      id: 'sd-1-3',
      dayIdx: 1,
      title: {
        en: 'Contagion Fears Hit Regional Banking Stocks',
        ko: '전염 우려에 역내 금융주 타격',
      },
      content: {
        en: 'Banks across the Meridian economic zone saw their shares plunge as investors assessed exposure to Meridian sovereign bonds. The sell-off spread to e-commerce firms with significant regional operations.',
        ko: '투자자들이 메리디아 국채 노출도를 점검하면서 메리디아 경제권 전역의 은행 주가가 급락했다. 매도세는 역내 사업 비중이 큰 이커머스 기업으로까지 확산됐다.',
      },
      read: false,
      effect: { ECOM: 0.93 },
    },
    {
      id: 'sd-1-4',
      dayIdx: 1,
      title: {
        en: 'Defense Stocks Rise on Geopolitical Instability Premium',
        ko: '지정학적 불안정 프리미엄에 방위주 상승',
      },
      content: {
        en: 'Aerospace and defense stocks gained as investors priced in heightened geopolitical risk from the Meridian crisis. Analysts noted that sovereign instability historically boosts defense spending commitments among allied nations.',
        ko: '메리디아 위기에 따른 지정학적 리스크 확대를 반영하면서 항공우주·방위주가 상승했다. 애널리스트들은 국가 불안정이 역사적으로 동맹국 간 방위비 지출 확대를 촉진한다고 분석했다.',
      },
      read: false,
      effect: { AERO: 1.06 },
    },
    {
      id: 'sd-1-5',
      dayIdx: 1,
      title: {
        en: 'Healthcare Rallies as Classic Defensive Play',
        ko: '전통적 방어주 헬스케어, 위기 속 랠리',
      },
      content: {
        en: 'Pharmaceutical stocks climbed as risk-averse investors sought shelter in the healthcare sector\'s stable cash flows. VitaPharma benefited from having zero revenue exposure to the Meridian economic zone.',
        ko: '위험 회피 성향 투자자들이 헬스케어 업종의 안정적 현금흐름에 피난하면서 제약주가 상승했다. 비타파마는 메리디아 경제권 매출 노출이 전혀 없다는 점에서 수혜를 입었다.',
      },
      read: false,
      effect: { HEALTH: 1.07 },
    },

    // Day 2: Bond market contagion, trade sectors hit
    {
      id: 'sd-2-1',
      dayIdx: 2,
      title: {
        en: 'Debt Contagion Spreads to Three Neighboring Nations',
        ko: '채무 위기, 인접 3개국으로 전염 확산',
      },
      content: {
        en: 'Bond yields in three nations bordering Meridia spiked as investors feared similar hidden debt problems. The contagion triggered a broader emerging-market sell-off, hammering export-dependent industries worldwide.',
        ko: '유사한 부채 은폐 가능성을 우려한 투자자들 때문에 메리디아 인접 3개국 국채 금리가 급등했다. 전염이 광범위한 신흥국 매도세를 촉발하며 전 세계 수출 의존 산업에 타격을 줬다.',
      },
      read: false,
      effect: { ECOM: 0.90, TECH: 0.92 },
    },
    {
      id: 'sd-2-2',
      dayIdx: 2,
      title: {
        en: 'Global Trade Routes Disrupted by Meridian Port Closures',
        ko: '메리디아 항만 폐쇄로 글로벌 무역 경로 차질',
      },
      content: {
        en: 'Meridia\'s three largest commercial ports suspended operations due to unpaid government subsidies to dock workers. Supply chain analysts warned of weeks-long delays for goods transiting the key shipping corridor.',
        ko: '메리디아 3대 상업 항만이 항만 노동자 정부 보조금 미지급으로 운영을 중단했다. 공급망 분석가들은 주요 해운 통로를 경유하는 물품의 수주간 지연을 경고했다.',
      },
      read: false,
      effect: { AERO: 0.94 },
    },
    {
      id: 'sd-2-3',
      dayIdx: 2,
      title: {
        en: 'Green Energy Firms Weather Crisis on Domestic Revenue',
        ko: '친환경 에너지 기업, 내수 매출로 위기 버텨',
      },
      content: {
        en: 'Renewable energy companies proved resilient as their predominantly domestic revenue base shielded them from the Meridian crisis. EcoEnergy Corp reaffirmed full-year guidance, calling its business model "crisis-proof."',
        ko: '재생에너지 기업들이 내수 매출 중심의 사업 구조 덕분에 메리디아 위기에서 견조한 흐름을 보였다. 에코에너지는 자사 비즈니스 모델을 "위기에 강하다"며 연간 가이던스를 재확인했다.',
      },
      read: false,
      effect: { GREEN: 1.04 },
    },
    {
      id: 'sd-2-4',
      dayIdx: 2,
      title: {
        en: 'Pharma Sector Posts Third Straight Day of Gains',
        ko: '제약 업종, 3일 연속 상승 기록',
      },
      content: {
        en: 'Healthcare stocks continued their defensive rally as sovereign debt fears intensified. Institutional portfolio managers reported maximum overweight positions in pharmaceuticals for the first time since the pandemic.',
        ko: '국가 채무 우려가 심화되면서 헬스케어주가 방어적 랠리를 이어갔다. 기관 포트폴리오 매니저들은 팬데믹 이후 처음으로 제약 업종 최대 비중 확대를 보고했다.',
      },
      read: false,
      effect: { HEALTH: 1.05 },
    },
    {
      id: 'sd-2-5',
      dayIdx: 2,
      title: {
        en: 'Currency Markets Rocked by Emerging-Market Sell-Off',
        ko: '신흥국 매도세에 외환시장 요동',
      },
      content: {
        en: 'Emerging-market currencies plummeted against safe-haven currencies as the debt crisis deepened. Technology firms with emerging-market revenue exposure warned of significant foreign exchange headwinds in upcoming earnings.',
        ko: '채무 위기가 심화되면서 신흥국 통화가 안전통화 대비 급락했다. 신흥국 매출 비중이 높은 기술 기업들이 향후 실적에서 상당한 환율 역풍을 경고했다.',
      },
      read: false,
      effect: { TECH: 0.95 },
    },

    // Day 3: International monetary body announces bailout talks
    {
      id: 'sd-3-1',
      dayIdx: 3,
      title: {
        en: 'International Stability Fund Announces Emergency Bailout Talks',
        ko: '국제안정기금, 긴급 구제금융 협상 개시 발표',
      },
      content: {
        en: 'The International Stability Fund convened an emergency session to discuss a multi-billion-dollar bailout package for Meridia. The announcement immediately calmed bond markets, with regional yields falling 300 basis points.',
        ko: '국제안정기금이 메리디아에 대한 수백억 달러 규모 구제금융 패키지 논의를 위한 긴급 회의를 소집했다. 이 발표로 즉시 채권시장이 안정을 되찾으며 역내 금리가 300bp 하락했다.',
      },
      read: false,
      effect: { TECH: 1.05, ECOM: 1.06 },
    },
    {
      id: 'sd-3-2',
      dayIdx: 3,
      title: {
        en: 'Markets Rally on Coordinated Central Bank Intervention',
        ko: '중앙은행 공조 개입에 시장 반등',
      },
      content: {
        en: 'Central banks across the region announced coordinated currency swap lines and emergency lending facilities. The decisive action arrested the contagion spiral and restored a measure of confidence to battered markets.',
        ko: '역내 중앙은행들이 공조 통화 스와프 라인과 긴급 대출 창구 설치를 발표했다. 단호한 조치가 전염 확산을 저지하고 타격을 입은 시장에 일정 수준의 신뢰를 회복시켰다.',
      },
      read: false,
      effect: { ECOM: 1.04 },
    },
    {
      id: 'sd-3-3',
      dayIdx: 3,
      title: {
        en: 'Aerospace Rebounds on Restored Shipping Routes',
        ko: '해운 경로 재개에 항공우주 반등',
      },
      content: {
        en: 'Meridian ports partially reopened under international supervision, easing supply chain bottlenecks. Aerospace firms confirmed that critical component shipments would resume within 48 hours.',
        ko: '메리디아 항만이 국제 감독 하에 부분 재개되면서 공급망 병목이 완화됐다. 항공우주 기업들은 핵심 부품 운송이 48시간 내 재개될 것이라고 확인했다.',
      },
      read: false,
      effect: { AERO: 1.06 },
    },
    {
      id: 'sd-3-4',
      dayIdx: 3,
      title: {
        en: 'Green Energy Sector Gains on Infrastructure Rebuilding Plans',
        ko: '인프라 재건 계획에 친환경 에너지 상승',
      },
      content: {
        en: 'The bailout framework includes provisions requiring Meridia to invest in renewable energy infrastructure as part of economic modernization. EcoEnergy Corp is positioned to bid on several large-scale solar projects in the region.',
        ko: '구제금융 프레임워크에 경제 현대화의 일환으로 메리디아의 재생에너지 인프라 투자 의무 조항이 포함됐다. 에코에너지가 역내 대규모 태양광 프로젝트 다수에 입찰할 위치를 확보했다.',
      },
      read: false,
      effect: { GREEN: 1.07 },
    },
    {
      id: 'sd-3-5',
      dayIdx: 3,
      title: {
        en: 'Healthcare Profit-Taking as Risk Appetite Returns',
        ko: '위험 선호 회복에 헬스케어 차익 실현',
      },
      content: {
        en: 'Investors began rotating out of defensive healthcare positions as bailout optimism restored risk appetite. VitaPharma pulled back modestly but analysts maintained their bullish long-term outlook.',
        ko: '구제금융 낙관론이 위험 선호를 회복시키면서 투자자들이 방어적 헬스케어 포지션에서 자금을 빼기 시작했다. 비타파마가 소폭 하락했지만 애널리스트들은 장기 강세 전망을 유지했다.',
      },
      read: false,
      effect: { HEALTH: 0.97 },
    },

    // Day 4: Austerity package agreed, social unrest but market relief
    {
      id: 'sd-4-1',
      dayIdx: 4,
      title: {
        en: 'Meridia Agrees to Sweeping Austerity Package',
        ko: '메리디아, 광범위한 긴축 패키지 합의',
      },
      content: {
        en: 'After marathon negotiations, Meridia agreed to a comprehensive austerity program including pension reform, tax increases, and privatization of state enterprises in exchange for a $85 billion bailout. Markets surged on the deal.',
        ko: '마라톤 협상 끝에 메리디아가 850억 달러 구제금융 대가로 연금 개혁, 증세, 국영기업 민영화를 포함한 포괄적 긴축 프로그램에 합의했다. 이 합의에 시장이 급등했다.',
      },
      read: false,
      effect: { TECH: 1.07, ECOM: 1.06 },
    },
    {
      id: 'sd-4-2',
      dayIdx: 4,
      title: {
        en: 'Social Unrest in Meridia Raises Implementation Doubts',
        ko: '메리디아 사회 불안, 이행 가능성에 의문 제기',
      },
      content: {
        en: 'Mass protests erupted across Meridian cities over the austerity measures, raising questions about the government\'s ability to implement reforms. Markets wobbled briefly before analysts assured that bailout disbursement was already secured.',
        ko: '긴축 조치에 반발하는 대규모 시위가 메리디아 전역에서 발생하며 정부의 개혁 이행 능력에 의문이 제기됐다. 시장이 잠시 흔들렸으나 구제금융 자금 집행이 이미 확보됐다는 애널리스트 분석에 안정을 찾았다.',
      },
      read: false,
      effect: { ECOM: 0.97 },
    },
    {
      id: 'sd-4-3',
      dayIdx: 4,
      title: {
        en: 'Defense Spending Commitments Surge Across Region',
        ko: '역내 방위비 지출 약속 급증',
      },
      content: {
        en: 'Six nations announced increased defense budgets in response to the instability generated by the Meridian crisis. AeroSpace Dynamics secured preliminary commitments for three new multi-year procurement contracts.',
        ko: '메리디아 위기로 초래된 불안정에 대응해 6개국이 국방 예산 확대를 발표했다. 에어로스페이스 다이내믹스가 3건의 다년 조달 계약에 대한 예비 약정을 확보했다.',
      },
      read: false,
      effect: { AERO: 1.08 },
    },
    {
      id: 'sd-4-4',
      dayIdx: 4,
      title: {
        en: 'Green Energy Privatization Bids Open in Meridia',
        ko: '메리디아 친환경 에너지 민영화 입찰 개시',
      },
      content: {
        en: 'Meridia\'s state-owned energy company opened privatization bids as part of the austerity deal. International renewable energy firms including EcoEnergy Corp expressed strong interest in acquiring the assets at distressed valuations.',
        ko: '메리디아 국영 에너지 기업이 긴축 합의의 일환으로 민영화 입찰을 개시했다. 에코에너지를 포함한 국제 재생에너지 기업들이 저평가된 자산 인수에 강한 관심을 표명했다.',
      },
      read: false,
      effect: { GREEN: 1.06 },
    },
    {
      id: 'sd-4-5',
      dayIdx: 4,
      title: {
        en: 'Pharma Stocks Stabilize as Crisis Premium Fades',
        ko: '위기 프리미엄 소멸에 제약주 안정',
      },
      content: {
        en: 'Healthcare stocks traded sideways as the acute crisis phase passed and investors no longer required maximum defensive positioning. Analysts maintained sector ratings, noting pharma fundamentals remain solid regardless of macro conditions.',
        ko: '급성 위기 국면이 지나고 최대 방어 포지션이 더 이상 필요 없어지면서 헬스케어주가 횡보세를 보였다. 애널리스트들은 거시 환경과 무관하게 제약 펀더멘털이 견고하다며 업종 등급을 유지했다.',
      },
      read: false,
      effect: { HEALTH: 1.02 },
    },

    // Day 5: Stabilization fund created, broader reforms boost confidence
    {
      id: 'sd-5-1',
      dayIdx: 5,
      title: {
        en: 'Regional Stabilization Fund Formally Established',
        ko: '역내 안정화 기금 공식 설립',
      },
      content: {
        en: 'Twenty nations formally established a $500 billion Regional Stabilization Fund to prevent future sovereign debt crises. The permanent backstop mechanism was hailed as a landmark in multilateral financial cooperation.',
        ko: '20개국이 향후 국가 채무 위기를 방지하기 위한 5,000억 달러 규모의 역내 안정화 기금을 공식 설립했다. 이 영구적 안전장치는 다자간 금융 협력의 이정표로 평가받았다.',
      },
      read: false,
      effect: { TECH: 1.08, ECOM: 1.07 },
    },
    {
      id: 'sd-5-2',
      dayIdx: 5,
      title: {
        en: 'Cross-Border E-Commerce Booms on Stabilized Currencies',
        ko: '통화 안정에 국경간 이커머스 호황',
      },
      content: {
        en: 'Currency stabilization across the region unlocked pent-up cross-border commerce demand. GlobalMart reported a 28% surge in international transactions as exchange rate volatility returned to normal levels.',
        ko: '역내 통화 안정으로 억눌렸던 국경간 상거래 수요가 폭발했다. 글로벌마트는 환율 변동성이 정상 수준으로 돌아오면서 국제 거래가 28% 급증했다고 보고했다.',
      },
      read: false,
      effect: { ECOM: 1.09 },
    },
    {
      id: 'sd-5-3',
      dayIdx: 5,
      title: {
        en: 'Green Energy Wins Major Meridian Reconstruction Contracts',
        ko: '친환경 에너지, 메리디아 재건 대형 계약 수주',
      },
      content: {
        en: 'EcoEnergy Corp and international partners won contracts to build 4GW of renewable energy capacity in Meridia as part of the economic reconstruction program. The deals are valued at over $12 billion across the next five years.',
        ko: '에코에너지와 국제 파트너사들이 경제 재건 프로그램의 일환으로 메리디아에 4GW 규모의 재생에너지 발전 시설을 건설하는 계약을 수주했다. 향후 5년간 120억 달러 이상의 가치로 평가된다.',
      },
      read: false,
      effect: { GREEN: 1.10 },
    },
    {
      id: 'sd-5-4',
      dayIdx: 5,
      title: {
        en: 'Aerospace Sector Rides Multi-Year Defense Boom',
        ko: '항공우주 업종, 다년간 방위 호황 진입',
      },
      content: {
        en: 'Defense analysts projected a sustained multi-year increase in regional military spending driven by the geopolitical lessons of the Meridian crisis. AeroSpace Dynamics raised its five-year revenue guidance by 20%.',
        ko: '방위 분석가들은 메리디아 위기의 지정학적 교훈에 힘입어 역내 군사비 지출이 수년간 지속적으로 증가할 것으로 전망했다. 에어로스페이스 다이내믹스가 5개년 매출 가이던스를 20% 상향했다.',
      },
      read: false,
      effect: { AERO: 1.09 },
    },
    {
      id: 'sd-5-5',
      dayIdx: 5,
      title: {
        en: 'Economists Praise Crisis Response, Upgrade Global Growth',
        ko: '경제학자들 위기 대응 호평… 세계 성장률 상향',
      },
      content: {
        en: 'Leading economists praised the coordinated crisis response as a model for multilateral cooperation, upgrading global growth forecasts by 0.3 percentage points. Market confidence indices hit their highest levels in over a year.',
        ko: '주요 경제학자들이 이번 공조 위기 대응을 다자간 협력의 모범 사례로 평가하며 세계 성장률 전망을 0.3%포인트 상향했다. 시장 신뢰지수가 1년 이상 만에 최고치를 기록했다.',
      },
      read: false,
      effect: { TECH: 1.04, HEALTH: 1.05 },
    },
  ],
};
