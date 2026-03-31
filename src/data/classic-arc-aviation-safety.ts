import { ClassicScenarioArc } from './classic-arcs';

export const AVIATION_SAFETY_ARC: ClassicScenarioArc = {
  id: 'aviation-safety',
  name: { en: 'Aviation Safety Crisis', ko: '항공 안전 위기' },
  news: [
    // Day 1: Two crashes in 5 months lead to worldwide grounding
    {
      id: 'as-1-1',
      dayIdx: 1,
      title: {
        en: 'Worldwide Grounding of SkyLiner 800 After Two Fatal Crashes',
        ko: '두 건의 치명적 추락 사고로 스카이라이너 800 전 세계 운항 중단',
      },
      content: {
        en: 'Aviation regulators worldwide ordered the immediate grounding of the SkyLiner 800, the bestselling commercial jet, after two crashes in five months killed 346 people. Over 400 aircraft were pulled from service.',
        ko: '전 세계 항공 규제 당국이 5개월간 2건의 추락사고로 346명이 사망한 베스트셀러 상업용 항공기 스카이라이너 800의 즉각적인 운항 중단을 명령했다. 400대 이상의 항공기가 운항에서 제외됐다.',
      },
      read: false,
      effect: { AERO: 0.85 },
    },
    {
      id: 'as-1-2',
      dayIdx: 1,
      title: {
        en: 'AeroSpace Dynamics Stock Plummets on Safety Scandal',
        ko: '안전 스캔들에 에어로스페이스 주가 급락',
      },
      content: {
        en: 'Shares of AeroSpace Dynamics, the manufacturer of the SkyLiner 800, fell 15% in early trading as investors assessed the potential cost of compensation, fixes, and lost orders.',
        ko: '스카이라이너 800 제조사 에어로스페이스 다이내믹스의 주가가 보상금, 수정 작업, 수주 감소의 잠재적 비용을 평가하는 투자자들에 의해 장 초반 15% 급락했다.',
      },
      read: false,
      effect: { AERO: 0.88 },
    },
    {
      id: 'as-1-3',
      dayIdx: 1,
      title: {
        en: 'Airlines Scramble for Alternative Aircraft',
        ko: '항공사들, 대체 기종 확보 분주',
      },
      content: {
        en: 'Airlines operating the grounded SkyLiner 800 began emergency leasing of alternative aircraft from competitors, driving up lease rates and disrupting flight schedules globally.',
        ko: '스카이라이너 800을 운영하던 항공사들이 경쟁사로부터 대체 기종의 긴급 리스를 시작해 리스 요율이 급등하고 전 세계 운항 일정에 혼란이 발생했다.',
      },
      read: false,
      effect: { ECOM: 0.95 },
    },
    {
      id: 'as-1-4',
      dayIdx: 1,
      title: {
        en: 'Tech Companies Offer AI Safety Solutions',
        ko: '기술 기업들, AI 안전 솔루션 제안',
      },
      content: {
        en: 'Several technology firms pitched AI-powered flight safety systems as a potential solution to the crisis. Investors bet on increased demand for advanced avionics software.',
        ko: '여러 기술 기업이 위기 해결책으로 AI 기반 항공 안전 시스템을 제안했다. 투자자들은 첨단 항공전자 소프트웨어 수요 증가에 베팅했다.',
      },
      read: false,
      effect: { TECH: 1.06 },
    },
    {
      id: 'as-1-5',
      dayIdx: 1,
      title: {
        en: 'Travel Insurance Claims Surge After Grounding',
        ko: '운항 중단 이후 여행 보험 청구 급증',
      },
      content: {
        en: 'Travel disruptions from the grounding triggered a wave of insurance claims and booking cancellations. Healthcare and pharmaceutical stocks rose as investors sought defensive positions.',
        ko: '운항 중단으로 인한 여행 차질이 보험 청구와 예약 취소 쇄도를 촉발했다. 투자자들이 방어적 포지션을 찾으면서 헬스케어와 제약주가 상승했다.',
      },
      read: false,
      effect: { HEALTH: 1.05 },
    },

    // Day 2: Investigation reveals software design flaw
    {
      id: 'as-2-1',
      dayIdx: 2,
      title: {
        en: 'Investigation Reveals Critical Software Design Flaw in SkyLiner',
        ko: '스카이라이너 핵심 소프트웨어 설계 결함 밝혀져',
      },
      content: {
        en: 'Crash investigators revealed that a flawed automated flight control system repeatedly pushed the aircraft\'s nose down based on a single faulty sensor reading. Pilots were not informed about the system\'s existence.',
        ko: '사고 조사단이 결함이 있는 자동 비행 제어 시스템이 단일 센서의 오류 데이터를 기반으로 기수를 반복적으로 내렸다고 밝혔다. 조종사들은 이 시스템의 존재 자체를 통보받지 못했다.',
      },
      read: false,
      effect: { AERO: 0.87 },
    },
    {
      id: 'as-2-2',
      dayIdx: 2,
      title: {
        en: 'Manufacturer CEO Faces Congressional Hearing',
        ko: '제조사 CEO, 의회 청문회 출석',
      },
      content: {
        en: 'The CEO of AeroSpace Dynamics was summoned to testify before a congressional committee on aviation safety. Leaked internal emails suggested the company knew about the flaw and prioritized speed to market.',
        ko: '에어로스페이스 다이내믹스의 CEO가 항공 안전에 관한 의회 청문회에 소환됐다. 유출된 내부 이메일에서 회사가 결함을 인지하면서도 출시 속도를 우선시한 정황이 드러났다.',
      },
      read: false,
      effect: { AERO: 0.90 },
    },
    {
      id: 'as-2-3',
      dayIdx: 2,
      title: {
        en: 'Rival Jet Manufacturers See Order Surge',
        ko: '경쟁 항공기 제조사, 수주 급증',
      },
      content: {
        en: 'Competing aircraft manufacturers reported a flood of inquiries from airlines looking to switch their fleet orders. Industry analysts predicted a major shift in market share lasting years.',
        ko: '경쟁 항공기 제조사들이 기종 전환을 검토하는 항공사들의 문의가 쇄도하고 있다고 발표했다. 업계 분석가들은 수년간 지속될 시장 점유율 대이동을 예측했다.',
      },
      read: false,
      effect: { TECH: 1.04, GREEN: 1.03 },
    },
    {
      id: 'as-2-4',
      dayIdx: 2,
      title: {
        en: 'E-Commerce Benefits from Reduced Air Cargo Competition',
        ko: '항공 화물 경쟁 감소로 이커머스 수혜',
      },
      content: {
        en: 'With passenger aircraft grounded, dedicated cargo carriers gained pricing power. E-commerce companies with their own logistics fleets capitalized on reduced competition for air freight capacity.',
        ko: '여객기 운항 중단으로 전용 화물 운송사가 가격 결정력을 확보했다. 자체 물류 함대를 보유한 이커머스 기업들이 줄어든 항공 화물 경쟁에서 반사이익을 얻었다.',
      },
      read: false,
      effect: { ECOM: 1.05 },
    },
    {
      id: 'as-2-5',
      dayIdx: 2,
      title: {
        en: 'Green Energy Firms Pitch Electric Aviation Future',
        ko: '친환경 에너지 기업, 전기 항공 미래 제시',
      },
      content: {
        en: 'Renewable energy companies seized the moment to promote electric and hydrogen-powered aircraft concepts as a safer alternative. Several firms announced increased R&D spending on aviation batteries.',
        ko: '재생에너지 기업들이 더 안전한 대안으로 전기·수소 동력 항공기 개념을 홍보하며 기회를 포착했다. 여러 기업이 항공용 배터리 R&D 투자 확대를 발표했다.',
      },
      read: false,
      effect: { GREEN: 1.06 },
    },

    // Day 3: Airlines scramble for alternatives, defense contracts unaffected
    {
      id: 'as-3-1',
      dayIdx: 3,
      title: {
        en: 'Airlines Announce Billions in Fleet Restructuring Costs',
        ko: '항공사들, 수십억 달러 규모 기종 재편 비용 발표',
      },
      content: {
        en: 'Major airlines disclosed that the SkyLiner grounding will cost the industry an estimated $4 billion in schedule disruptions, emergency leases, and passenger compensation.',
        ko: '주요 항공사들은 스카이라이너 운항 중단이 일정 차질, 긴급 리스, 승객 보상 등으로 업계에 약 40억 달러의 비용을 발생시킬 것이라고 공시했다.',
      },
      read: false,
      effect: { AERO: 0.93 },
    },
    {
      id: 'as-3-2',
      dayIdx: 3,
      title: {
        en: 'Defense Division Revenue Shields AeroSpace Bottom Line',
        ko: '방위 부문 매출이 에어로스페이스 실적 방어',
      },
      content: {
        en: 'AeroSpace Dynamics\' defense division reported record quarterly revenue, partially offsetting commercial aviation losses. Military contracts operate under separate certification standards.',
        ko: '에어로스페이스 다이내믹스의 방위 부문이 사상 최고 분기 매출을 보고하며 민항 부문 손실을 일부 상쇄했다. 군사 계약은 별도의 인증 기준으로 운영된다.',
      },
      read: false,
      effect: { AERO: 1.06 },
    },
    {
      id: 'as-3-3',
      dayIdx: 3,
      title: {
        en: 'NeoTech Wins Avionics Safety System Contract',
        ko: '네오테크, 항공전자 안전 시스템 수주 계약 체결',
      },
      content: {
        en: 'NeoTech Industries secured a major contract to develop next-generation flight safety software with redundant sensor fusion. The deal positions the company as a critical aviation technology supplier.',
        ko: '네오테크 산업이 이중 센서 융합을 활용한 차세대 비행 안전 소프트웨어 개발 대형 계약을 수주했다. 이번 계약으로 핵심 항공 기술 공급업체로서의 입지가 강화됐다.',
      },
      read: false,
      effect: { TECH: 1.08 },
    },
    {
      id: 'as-3-4',
      dayIdx: 3,
      title: {
        en: 'Healthcare Stocks Extend Gains as Safe Haven',
        ko: '안전자산 수요에 헬스케어 주가 상승세 연장',
      },
      content: {
        en: 'The continued aviation crisis drove further defensive rotation into healthcare. VitaPharma hit a 52-week high as the sector attracted investors seeking stability amid industrial turmoil.',
        ko: '지속되는 항공 위기가 헬스케어로의 추가 방어적 순환매를 촉발했다. 산업 혼란 속 안정성을 추구하는 투자자 유입으로 비타파마가 52주 신고가를 달성했다.',
      },
      read: false,
      effect: { HEALTH: 1.06 },
    },
    {
      id: 'as-3-5',
      dayIdx: 3,
      title: {
        en: 'Online Retail Surges as Consumers Avoid Air Travel',
        ko: '항공 여행 기피에 온라인 소매 급증',
      },
      content: {
        en: 'Consumer surveys revealed a significant increase in online shopping as travel anxiety caused many to cancel vacations and redirect spending to e-commerce platforms.',
        ko: '소비자 조사에서 항공 여행 불안으로 많은 소비자가 휴가를 취소하고 소비를 이커머스 플랫폼으로 전환하면서 온라인 쇼핑이 크게 증가한 것으로 나타났다.',
      },
      read: false,
      effect: { ECOM: 1.07 },
    },

    // Day 4: Manufacturer announces comprehensive fix, regulators skeptical
    {
      id: 'as-4-1',
      dayIdx: 4,
      title: {
        en: 'AeroSpace Dynamics Unveils Comprehensive Software Fix',
        ko: '에어로스페이스, 포괄적 소프트웨어 수정안 공개',
      },
      content: {
        en: 'AeroSpace Dynamics presented a complete overhaul of the SkyLiner\'s flight control system, including triple-sensor redundancy and mandatory pilot training programs. The fix reportedly took 10,000 engineering hours.',
        ko: '에어로스페이스 다이내믹스가 3중 센서 중복성과 의무 조종사 훈련 프로그램을 포함한 스카이라이너 비행 제어 시스템의 전면 개편안을 발표했다. 수정 작업에 1만 시간의 엔지니어링이 투입됐다.',
      },
      read: false,
      effect: { AERO: 1.10 },
    },
    {
      id: 'as-4-2',
      dayIdx: 4,
      title: {
        en: 'Regulators Demand Extended Testing Period',
        ko: '규제 당국, 연장된 시험 기간 요구',
      },
      content: {
        en: 'Aviation regulators responded cautiously to the fix, demanding a minimum 90-day testing period before any recertification. Shares gave back some gains as the return-to-service timeline extended.',
        ko: '항공 규제 당국이 수정안에 신중한 반응을 보이며 재인증 전 최소 90일의 시험 기간을 요구했다. 운항 재개 일정이 늘어나면서 주가가 상승분 일부를 반납했다.',
      },
      read: false,
      effect: { AERO: 0.96 },
    },
    {
      id: 'as-4-3',
      dayIdx: 4,
      title: {
        en: 'Tech Firms See Growing Aviation Safety Market',
        ko: '기술 기업들, 항공 안전 시장 성장 전망',
      },
      content: {
        en: 'Industry analysts projected the aviation safety technology market would triple in size over five years as regulators mandated more sophisticated software oversight systems.',
        ko: '산업 분석가들은 규제 당국이 더 정교한 소프트웨어 감시 시스템을 의무화하면서 항공 안전 기술 시장이 5년 내 3배로 성장할 것이라고 전망했다.',
      },
      read: false,
      effect: { TECH: 1.05 },
    },
    {
      id: 'as-4-4',
      dayIdx: 4,
      title: {
        en: 'Green Energy Aviation Research Gets Government Funding',
        ko: '친환경 에너지 항공 연구, 정부 자금 확보',
      },
      content: {
        en: 'The government announced a $2 billion research fund for sustainable aviation technologies, including electric propulsion and hydrogen fuel cells, accelerating the clean aviation transition.',
        ko: '정부가 전기 추진 및 수소 연료전지를 포함한 지속 가능한 항공 기술을 위해 20억 달러 규모의 연구 기금을 발표하며 청정 항공 전환을 가속화했다.',
      },
      read: false,
      effect: { GREEN: 1.08 },
    },
    {
      id: 'as-4-5',
      dayIdx: 4,
      title: {
        en: 'Healthcare Maintains Altitude as Crisis Stabilizes',
        ko: '위기 안정화 속에서도 헬스케어 고공행진 유지',
      },
      content: {
        en: 'Healthcare stocks maintained their elevated levels even as the aviation crisis showed signs of resolution. Fund managers cited the sector\'s crisis-proven resilience as justification for sustained premiums.',
        ko: '항공 위기가 해소 조짐을 보이는 가운데서도 헬스케어 주가는 높은 수준을 유지했다. 펀드매니저들은 위기에서 입증된 회복력이 지속적인 프리미엄의 근거라고 밝혔다.',
      },
      read: false,
      effect: { HEALTH: 1.03 },
    },

    // Day 5: Partial recertification begins, industry reforms restore confidence
    {
      id: 'as-5-1',
      dayIdx: 5,
      title: {
        en: 'First Regulator Grants Conditional Recertification',
        ko: '첫 규제 당국, 조건부 재인증 승인',
      },
      content: {
        en: 'The Continental Aviation Authority became the first regulator to grant conditional recertification for the SkyLiner 800, subject to mandatory software updates and enhanced pilot training.',
        ko: '대륙항공청이 의무적 소프트웨어 업데이트와 강화된 조종사 훈련을 조건으로 스카이라이너 800에 최초 조건부 재인증을 승인했다.',
      },
      read: false,
      effect: { AERO: 1.12 },
    },
    {
      id: 'as-5-2',
      dayIdx: 5,
      title: {
        en: 'Sweeping Aviation Safety Reforms Announced',
        ko: '전면적 항공 안전 개혁안 발표',
      },
      content: {
        en: 'International regulators jointly announced comprehensive reforms including independent software audits, whistleblower protections, and a ban on manufacturer self-certification of safety-critical systems.',
        ko: '국제 규제 당국들이 독립적 소프트웨어 감사, 내부 고발자 보호, 안전 핵심 시스템의 제조사 자체 인증 금지를 포함한 포괄적 개혁안을 공동 발표했다.',
      },
      read: false,
      effect: { AERO: 1.05, TECH: 1.06 },
    },
    {
      id: 'as-5-3',
      dayIdx: 5,
      title: {
        en: 'Airlines Resume SkyLiner Operations Gradually',
        ko: '항공사들, 스카이라이너 운항 단계적 재개',
      },
      content: {
        en: 'Several major airlines announced plans to return the SkyLiner 800 to service within weeks, with enhanced safety protocols. Passenger booking data showed cautious but growing acceptance.',
        ko: '여러 주요 항공사가 강화된 안전 프로토콜과 함께 수주 내 스카이라이너 800의 운항 재개 계획을 발표했다. 승객 예약 데이터는 조심스럽지만 점진적인 수용을 보여줬다.',
      },
      read: false,
      effect: { ECOM: 1.04, AERO: 1.04 },
    },
    {
      id: 'as-5-4',
      dayIdx: 5,
      title: {
        en: 'Green Aviation Technology Firms Attract Record Investment',
        ko: '친환경 항공 기술 기업, 사상 최대 투자 유치',
      },
      content: {
        en: 'The crisis catalyzed a wave of investment into sustainable aviation startups. Venture capital funding for electric and hydrogen aircraft companies reached $5 billion in committed capital.',
        ko: '위기가 지속 가능한 항공 스타트업에 대한 투자 물결을 촉발했다. 전기 및 수소 항공기 기업에 대한 벤처캐피털 자금이 50억 달러의 약정 자본에 도달했다.',
      },
      read: false,
      effect: { GREEN: 1.07 },
    },
    {
      id: 'as-5-5',
      dayIdx: 5,
      title: {
        en: 'Markets Close Crisis Week with Restored Confidence',
        ko: '위기의 한 주, 회복된 신뢰감으로 마감',
      },
      content: {
        en: 'All major indices ended the week higher as the aviation safety crisis transformed from a source of panic into a catalyst for long-overdue industry reforms and technological innovation.',
        ko: '항공 안전 위기가 패닉의 원인에서 오래 미뤄진 산업 개혁과 기술 혁신의 촉매제로 전환되면서 모든 주요 지수가 주간 상승 마감했다.',
      },
      read: false,
      effect: { HEALTH: 1.04, TECH: 1.03 },
    },
  ],
};
