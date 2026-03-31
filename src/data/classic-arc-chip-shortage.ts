import { ClassicScenarioArc } from './classic-arcs';

export const CHIP_SHORTAGE_ARC: ClassicScenarioArc = {
  id: 'chip-shortage',
  name: { en: 'Global Chip Shortage', ko: '글로벌 반도체 대란' },
  news: [
    // Day 1: Major chip foundry fire halts production
    {
      id: 'cs-1-1',
      dayIdx: 1,
      title: {
        en: 'Massive Fire Devastates Pinnacle Semiconductor Foundry',
        ko: '피너클 반도체 파운드리, 대형 화재로 가동 중단',
      },
      content: {
        en: 'A catastrophic fire at Pinnacle Semiconductor\'s largest fabrication plant has knocked out roughly 12% of global chip production capacity. Industry analysts warn the outage could last months, sending shockwaves through every sector dependent on advanced silicon.',
        ko: '피너클 반도체 최대 생산 시설에서 발생한 대형 화재로 전 세계 반도체 생산 능력의 약 12%가 마비됐다. 업계 전문가들은 복구에 수개월이 걸릴 수 있다며 첨단 반도체에 의존하는 모든 산업에 충격파가 퍼질 것이라고 경고했다.',
      },
      read: false,
      effect: { TECH: 0.88 },
    },
    {
      id: 'cs-1-2',
      dayIdx: 1,
      title: {
        en: 'Automakers Halt Assembly Lines Amid Chip Panic',
        ko: '자동차 업계, 반도체 부족에 조립 라인 전면 중단',
      },
      content: {
        en: 'Leading automakers announced immediate production halts as semiconductor inventories run dry. Electric vehicle manufacturers are particularly hard hit, with key battery management chips now on 26-week backorder.',
        ko: '반도체 재고가 바닥나면서 주요 완성차 업체들이 즉시 생산 중단에 들어갔다. 특히 배터리 관리 핵심 칩의 납기가 26주 이상 지연되며 전기차 제조업체들이 직격탄을 맞았다.',
      },
      read: false,
      effect: { GREEN: 0.90 },
    },
    {
      id: 'cs-1-3',
      dayIdx: 1,
      title: {
        en: 'Consumer Electronics Prices Set to Spike',
        ko: '가전제품 가격 급등 불가피 전망',
      },
      content: {
        en: 'Supply chain analysts predict a 15-30% increase in consumer electronics prices as chip scarcity cascades through production pipelines. Retailers are scrambling to secure remaining inventory before costs climb further.',
        ko: '공급망 분석가들은 반도체 부족이 생산 라인 전반에 확산되면서 가전 가격이 15~30% 상승할 것으로 전망했다. 유통업체들은 추가 비용 상승 전에 남은 재고 확보에 사활을 걸고 있다.',
      },
      read: false,
      effect: { ECOM: 0.92 },
    },
    {
      id: 'cs-1-4',
      dayIdx: 1,
      title: {
        en: 'Aerospace Firms Warn of Avionics Chip Delays',
        ko: '항공우주 업계, 항공전자 칩 납품 지연 경고',
      },
      content: {
        en: 'AeroSpace Dynamics and rival firms disclosed that critical avionics chipsets are now backordered for at least four months. Several defense contracts face penalty clauses as delivery timelines slip.',
        ko: '에어로스페이스 다이내믹스를 비롯한 항공우주 업체들이 핵심 항공전자 칩셋 납기가 최소 4개월 이상 지연된다고 밝혔다. 복수의 방위 계약에서 납기 지연에 따른 위약금 조항이 발동될 우려가 커지고 있다.',
      },
      read: false,
      effect: { AERO: 0.91 },
    },
    {
      id: 'cs-1-5',
      dayIdx: 1,
      title: {
        en: 'Healthcare Device Makers Pivot to Legacy Chips',
        ko: '의료기기 업체, 구세대 칩으로 긴급 전환',
      },
      content: {
        en: 'Medical device manufacturers announced emergency redesigns to use older-generation chips still available from secondary suppliers. The pivot is expected to maintain production at near-normal levels despite the broader shortage.',
        ko: '의료기기 제조업체들이 보조 공급사에서 확보 가능한 구세대 칩을 활용하기 위한 긴급 설계 변경에 돌입했다. 이를 통해 광범위한 반도체 대란 속에서도 거의 정상 수준의 생산을 유지할 것으로 예상된다.',
      },
      read: false,
      effect: { HEALTH: 1.04 },
    },

    // Day 2: Consumer electronics prices surge, e-commerce disrupted
    {
      id: 'cs-2-1',
      dayIdx: 2,
      title: {
        en: 'NeoTech Industries Suspends New Product Launches',
        ko: '네오텍 인더스트리즈, 신제품 출시 전면 연기',
      },
      content: {
        en: 'NeoTech Industries announced an indefinite delay on all upcoming product launches due to chip allocation shortfalls. The company\'s stock fell sharply as analysts slashed revenue forecasts for the next two quarters.',
        ko: '네오텍 인더스트리즈가 반도체 할당 부족으로 모든 신제품 출시를 무기한 연기한다고 발표했다. 애널리스트들이 향후 2개 분기 매출 전망을 대폭 하향하면서 주가가 급락했다.',
      },
      read: false,
      effect: { TECH: 0.90 },
    },
    {
      id: 'cs-2-2',
      dayIdx: 2,
      title: {
        en: 'GlobalMart Reports Record Inventory Shortages',
        ko: '글로벌마트, 사상 최악 재고 부족 사태 보고',
      },
      content: {
        en: 'E-commerce giant GlobalMart reported that electronics inventory levels have fallen to historic lows. Customer complaints surged 340% as popular items show multi-week shipping delays.',
        ko: '이커머스 대기업 글로벌마트가 전자제품 재고 수준이 역대 최저로 떨어졌다고 보고했다. 인기 상품의 배송 지연이 수주에 달하면서 고객 불만이 340% 급증했다.',
      },
      read: false,
      effect: { ECOM: 0.89 },
    },
    {
      id: 'cs-2-3',
      dayIdx: 2,
      title: {
        en: 'Secondary Chip Makers See Orders Surge 500%',
        ko: '2선 반도체 업체, 주문량 500% 폭증',
      },
      content: {
        en: 'Smaller semiconductor manufacturers reported a five-fold surge in new orders as companies desperately seek alternative sources. Share prices of secondary chipmakers rallied double digits.',
        ko: '기업들이 대체 공급원을 필사적으로 찾으면서 중소 반도체 업체들의 신규 주문이 5배로 급증했다. 2선 반도체 업체 주가가 두 자릿수 상승을 기록했다.',
      },
      read: false,
      effect: { TECH: 1.05 },
    },
    {
      id: 'cs-2-4',
      dayIdx: 2,
      title: {
        en: 'Defense Ministry Fast-Tracks Chip Procurement',
        ko: '국방부, 반도체 긴급 조달 절차 가동',
      },
      content: {
        en: 'The defense ministry invoked emergency procurement authority to secure priority chip allocations for military programs. Aerospace defense contractors received guaranteed supply commitments, easing investor concerns.',
        ko: '국방부가 군사 프로그램 우선 반도체 확보를 위해 긴급 조달 권한을 발동했다. 항공우주 방위 계약업체들이 공급 보장을 받으면서 투자자 우려가 다소 완화됐다.',
      },
      read: false,
      effect: { AERO: 1.05 },
    },
    {
      id: 'cs-2-5',
      dayIdx: 2,
      title: {
        en: 'VitaPharma Gains on Defensive Rotation',
        ko: '비타파마, 방어적 자금 이동에 강세',
      },
      content: {
        en: 'Investors piled into pharmaceutical stocks as the chip crisis widened uncertainty across technology-dependent sectors. VitaPharma rose to a three-month high on record institutional inflows.',
        ko: '반도체 위기가 기술 의존 업종 전반의 불확실성을 키우면서 투자자들이 제약주로 대거 몰렸다. 비타파마가 기관 매수 자금 유입에 힘입어 3개월 최고가를 경신했다.',
      },
      read: false,
      effect: { HEALTH: 1.06 },
    },

    // Day 3: Government announces emergency semiconductor investment
    {
      id: 'cs-3-1',
      dayIdx: 3,
      title: {
        en: 'Government Unveils $52B Emergency Semiconductor Act',
        ko: '정부, 520억 달러 규모 긴급 반도체 육성법 발표',
      },
      content: {
        en: 'Lawmakers passed an emergency semiconductor investment bill allocating $52 billion to domestic chip production and research. Technology stocks surged on expectations of accelerated fab construction timelines.',
        ko: '의회가 국내 반도체 생산 및 연구에 520억 달러를 배정하는 긴급 반도체 투자법을 통과시켰다. 파운드리 건설 일정 단축 기대감에 기술주가 급등했다.',
      },
      read: false,
      effect: { TECH: 1.10 },
    },
    {
      id: 'cs-3-2',
      dayIdx: 3,
      title: {
        en: 'Green Energy Gets Priority in Chip Allocation Framework',
        ko: '친환경 에너지, 반도체 배분 우선순위 확보',
      },
      content: {
        en: 'The new semiconductor act designates renewable energy and electric vehicle manufacturing as priority sectors for chip allocation. EcoEnergy Corp shares jumped on the favorable policy treatment.',
        ko: '신규 반도체법이 재생에너지 및 전기차 제조를 반도체 배분 우선 업종으로 지정했다. 에코에너지 주가가 우호적 정책 대우에 힘입어 급등했다.',
      },
      read: false,
      effect: { GREEN: 1.08 },
    },
    {
      id: 'cs-3-3',
      dayIdx: 3,
      title: {
        en: 'E-Commerce Platforms Launch Chip-Free Product Categories',
        ko: '이커머스 플랫폼, 비반도체 제품군 전면 확대',
      },
      content: {
        en: 'Major online retailers pivoted marketing efforts toward non-electronics categories to maintain revenue momentum. The strategy helped stabilize e-commerce stock prices after days of selling pressure.',
        ko: '주요 온라인 유통업체들이 매출 유지를 위해 비전자제품 카테고리로 마케팅을 집중 전환했다. 이 전략이 연일 하락세를 보이던 이커머스 주가 안정에 기여했다.',
      },
      read: false,
      effect: { ECOM: 1.03 },
    },
    {
      id: 'cs-3-4',
      dayIdx: 3,
      title: {
        en: 'Aerospace Lobbies for Military Chip Fab Line',
        ko: '항공우주 업계, 전용 군사 반도체 라인 설립 로비',
      },
      content: {
        en: 'Defense contractors lobbied successfully for a dedicated military-grade chip fabrication line within the semiconductor act. Analysts see this as a long-term structural positive for the aerospace sector.',
        ko: '방위 계약업체들이 반도체법 내 군사용 전용 반도체 생산 라인 설립을 관철시켰다. 애널리스트들은 이를 항공우주 업종의 장기 구조적 호재로 평가했다.',
      },
      read: false,
      effect: { AERO: 1.06 },
    },
    {
      id: 'cs-3-5',
      dayIdx: 3,
      title: {
        en: 'Medical Device Chip Supply Stabilizes Early',
        ko: '의료기기 반도체 공급, 예상보다 빠른 안정화',
      },
      content: {
        en: 'Healthcare manufacturers confirmed that their early pivot to legacy chips has fully stabilized supply chains. VitaPharma maintained its full-year guidance, reinforcing the sector\'s resilient image.',
        ko: '의료기기 제조업체들은 구세대 칩 전환 전략이 공급망을 완전히 안정시켰다고 확인했다. 비타파마가 연간 실적 가이던스를 유지하면서 업종의 견조한 이미지가 더욱 강화됐다.',
      },
      read: false,
      effect: { HEALTH: 1.03 },
    },

    // Day 4: Alternative suppliers ramp up, partial recovery
    {
      id: 'cs-4-1',
      dayIdx: 4,
      title: {
        en: 'Alternative Foundries Hit Record Production Volumes',
        ko: '대체 파운드리, 사상 최대 생산량 달성',
      },
      content: {
        en: 'Second-tier chip foundries reported record monthly output after emergency capacity expansions. While still short of pre-crisis levels, the ramp-up signals the worst of the shortage may be passing.',
        ko: '2선 파운드리 업체들이 긴급 증산 이후 월간 사상 최대 생산량을 기록했다. 위기 이전 수준에는 못 미치지만 최악의 부족 사태가 지나가고 있다는 신호로 해석된다.',
      },
      read: false,
      effect: { TECH: 1.07 },
    },
    {
      id: 'cs-4-2',
      dayIdx: 4,
      title: {
        en: 'EV Makers Resume Limited Production',
        ko: '전기차 업체, 제한적 생산 재개',
      },
      content: {
        en: 'Electric vehicle manufacturers restarted assembly lines at reduced capacity using chips from alternative suppliers. EcoEnergy Corp confirmed it would meet 70% of its original quarterly delivery target.',
        ko: '전기차 제조업체들이 대체 공급사 칩을 활용해 감산 체제로 조립 라인을 재가동했다. 에코에너지는 당초 분기 납품 목표의 70%를 달성할 것이라고 확인했다.',
      },
      read: false,
      effect: { GREEN: 1.06 },
    },
    {
      id: 'cs-4-3',
      dayIdx: 4,
      title: {
        en: 'GlobalMart Electronics Sales Partially Recover',
        ko: '글로벌마트 전자제품 매출, 부분 회복세',
      },
      content: {
        en: 'E-commerce platforms reported a modest recovery in electronics sales as some product categories saw inventory replenishment. Analysts cautioned that full normalization remains months away.',
        ko: '일부 제품군의 재고가 보충되면서 이커머스 플랫폼의 전자제품 매출이 소폭 회복됐다. 다만 애널리스트들은 완전한 정상화까지 수개월이 더 걸릴 것이라고 경고했다.',
      },
      read: false,
      effect: { ECOM: 1.04 },
    },
    {
      id: 'cs-4-4',
      dayIdx: 4,
      title: {
        en: 'Aerospace Secures Long-Term Chip Supply Contracts',
        ko: '항공우주 업계, 장기 반도체 공급 계약 체결',
      },
      content: {
        en: 'Major aerospace firms signed multi-year chip supply agreements with three foundries, eliminating future shortage risk. The contracts include priority allocation clauses during any supply disruption.',
        ko: '주요 항공우주 기업들이 3개 파운드리와 다년간 반도체 공급 계약을 체결해 향후 부족 리스크를 제거했다. 계약에는 공급 차질 시 우선 배분 조항이 포함됐다.',
      },
      read: false,
      effect: { AERO: 1.04 },
    },
    {
      id: 'cs-4-5',
      dayIdx: 4,
      title: {
        en: 'Pharma Stocks Slip on Sector Rotation Back to Tech',
        ko: '기술주 복귀 자금에 제약주 소폭 하락',
      },
      content: {
        en: 'As semiconductor supply fears eased, investors rotated capital back into beaten-down tech names. Healthcare stocks gave back some defensive gains but remained above pre-crisis levels.',
        ko: '반도체 공급 우려가 완화되면서 투자자들이 낙폭 과대 기술주로 자금을 이동시켰다. 헬스케어주가 방어적 상승분의 일부를 반납했지만 위기 이전 수준은 여전히 웃돌고 있다.',
      },
      read: false,
      effect: { HEALTH: 0.97 },
    },

    // Day 5: New domestic fab construction, long-term optimism
    {
      id: 'cs-5-1',
      dayIdx: 5,
      title: {
        en: 'Three New Domestic Chip Fabs Break Ground',
        ko: '국내 반도체 파운드리 3곳 동시 착공',
      },
      content: {
        en: 'Ground-breaking ceremonies were held for three state-of-the-art domestic semiconductor fabrication plants. The facilities will add 20% to national chip production capacity within 18 months, marking the start of a reshoring era.',
        ko: '최첨단 국내 반도체 파운드리 3곳의 착공식이 동시에 열렸다. 18개월 내에 국내 반도체 생산 능력을 20% 확충하며 리쇼어링 시대의 개막을 알렸다.',
      },
      read: false,
      effect: { TECH: 1.12 },
    },
    {
      id: 'cs-5-2',
      dayIdx: 5,
      title: {
        en: 'E-Commerce Boom as Pent-Up Demand Unleashes',
        ko: '억눌린 수요 폭발에 이커머스 호황',
      },
      content: {
        en: 'As chip supply normalizes, pent-up consumer demand drove a massive surge in electronics orders. GlobalMart posted its highest single-day revenue since its founding.',
        ko: '반도체 공급이 정상화되면서 억눌렸던 소비 수요가 전자제품 주문 급증으로 이어졌다. 글로벌마트는 창사 이래 최고 일일 매출을 기록했다.',
      },
      read: false,
      effect: { ECOM: 1.10 },
    },
    {
      id: 'cs-5-3',
      dayIdx: 5,
      title: {
        en: 'Green Energy Sector Upgraded on Chip Priority Status',
        ko: '반도체 우선 배분 지위에 친환경 에너지 업종 등급 상향',
      },
      content: {
        en: 'Wall Street analysts upgraded the entire renewable energy sector, citing permanent priority status in the semiconductor allocation framework. EcoEnergy Corp is expected to exceed pre-crisis production levels by next quarter.',
        ko: '월스트리트 애널리스트들이 반도체 배분 체계 내 영구적 우선 지위를 근거로 재생에너지 업종 전체의 투자 등급을 상향했다. 에코에너지는 다음 분기까지 위기 이전 생산 수준을 초과할 전망이다.',
      },
      read: false,
      effect: { GREEN: 1.09 },
    },
    {
      id: 'cs-5-4',
      dayIdx: 5,
      title: {
        en: 'Defense Sector Celebrates Supply Chain Independence',
        ko: '방위 산업, 공급망 자립 달성 선언',
      },
      content: {
        en: 'The defense ministry declared that the new domestic fab initiative will make the military supply chain fully self-sufficient within two years. Aerospace stocks rallied to 52-week highs on the strategic milestone.',
        ko: '국방부가 신규 국내 파운드리 사업으로 2년 내 군사 공급망의 완전한 자립을 달성할 것이라고 선언했다. 항공우주 주가가 전략적 이정표에 힘입어 52주 신고가를 기록했다.',
      },
      read: false,
      effect: { AERO: 1.08 },
    },
    {
      id: 'cs-5-5',
      dayIdx: 5,
      title: {
        en: 'Market Strategists Call Chip Crisis a Catalyst for Growth',
        ko: '시장 전략가들 "반도체 위기가 성장의 촉매"',
      },
      content: {
        en: 'Leading market strategists declared that the chip shortage, while painful, has accelerated domestic manufacturing investment that will drive economic growth for a decade. Broad market indices closed at record highs.',
        ko: '주요 시장 전략가들은 반도체 부족 사태가 고통스러웠지만 향후 10년간 경제 성장을 이끌 국내 제조 투자를 앞당기는 촉매 역할을 했다고 평가했다. 주요 지수가 사상 최고치로 마감했다.',
      },
      read: false,
      effect: { TECH: 1.05, ECOM: 1.03, HEALTH: 1.02 },
    },
  ],
};
