import { ClassicScenarioArc } from './classic-arcs';

export const SPACE_RACE_ARC: ClassicScenarioArc = {
  id: 'space-race',
  name: { en: 'New Space Race', ko: '새로운 우주 경쟁' },
  news: [
    // Day 1: Private company announces Mars mission, AERO soars
    {
      id: 'sr-1-1',
      dayIdx: 1,
      title: {
        en: 'Private Company Announces Crewed Mars Mission for 2028',
        ko: '민간 기업, 2028년 유인 화성 탐사 계획 발표',
      },
      content: {
        en: 'A leading aerospace startup unveiled detailed plans for the first crewed Mars mission, backed by $50 billion in committed funding from sovereign wealth funds and tech billionaires.',
        ko: '선도적인 항공우주 스타트업이 국부펀드와 기술 업계 억만장자들의 500억 달러 투자를 확보한 최초 유인 화성 탐사의 상세 계획을 공개했다.',
      },
      read: false,
      effect: { AERO: 1.14 },
    },
    {
      id: 'sr-1-2',
      dayIdx: 1,
      title: {
        en: 'Aerospace Supply Chain Ignites on Mars Mission Demand',
        ko: '화성 탐사 수요에 항공우주 공급망 들썩',
      },
      content: {
        en: 'Aerospace component manufacturers reported a flood of new orders as the Mars mission requires thousands of specialized parts, lifting the entire supply chain.',
        ko: '화성 탐사에 수천 종의 특수 부품이 필요해지면서 항공우주 부품 제조업체들에 신규 주문이 쏟아졌다. 공급망 전체가 활기를 되찾았다.',
      },
      read: false,
      effect: { AERO: 1.08, TECH: 1.04 },
    },
    {
      id: 'sr-1-3',
      dayIdx: 1,
      title: {
        en: 'Tech Stocks Rise on Space Computing Opportunities',
        ko: '우주 컴퓨팅 수요 기대에 기술주 상승',
      },
      content: {
        en: 'Technology companies positioned to provide radiation-hardened computing systems and AI navigation software for deep-space missions saw their shares jump on the announcement.',
        ko: '심우주 임무를 위한 방사선 차폐 컴퓨팅 시스템과 AI 항법 소프트웨어를 제공할 기술 기업들의 주가가 이번 발표에 힘입어 상승했다.',
      },
      read: false,
      effect: { TECH: 1.06 },
    },
    {
      id: 'sr-1-4',
      dayIdx: 1,
      title: {
        en: 'Space Medicine Research Drives Healthcare Interest',
        ko: '우주의학 연구 수요에 헬스케어 관심 급증',
      },
      content: {
        en: 'Pharmaceutical companies announced partnerships to develop radiation-protection drugs and long-duration spaceflight health solutions, opening a new market segment.',
        ko: '제약사들이 방사선 방호 약물과 장기 우주비행 건강 솔루션 개발을 위한 파트너십을 발표하며 새로운 시장을 개척하기 시작했다.',
      },
      read: false,
      effect: { HEALTH: 1.05 },
    },
    {
      id: 'sr-1-5',
      dayIdx: 1,
      title: {
        en: 'E-Commerce Giants Eye Space Logistics Opportunities',
        ko: '이커머스 대기업, 우주 물류 사업 기회 모색',
      },
      content: {
        en: 'Major e-commerce and logistics companies expressed interest in the emerging space supply chain, though analysts noted meaningful revenue impact remains years away.',
        ko: '주요 이커머스 및 물류 기업들이 신생 우주 공급망에 관심을 표명했으나 애널리스트들은 실질적인 매출 효과까지는 수년이 걸릴 것이라고 분석했다.',
      },
      read: false,
      effect: { ECOM: 1.02 },
    },

    // Day 2: Space-based internet disrupts telecom, satellite manufacturing surge
    {
      id: 'sr-2-1',
      dayIdx: 2,
      title: {
        en: 'Space-Based Internet Constellation Threatens Terrestrial Telecom',
        ko: '우주 인터넷 위성군, 지상 통신사에 위협',
      },
      content: {
        en: 'A second aerospace firm announced a 10,000-satellite internet constellation offering gigabit speeds globally, threatening to disrupt the entire terrestrial telecommunications industry.',
        ko: '또 다른 항공우주 기업이 전 세계에 기가비트급 속도를 제공하는 1만 기 위성 인터넷 프로젝트를 발표하며 지상 통신 산업 전체를 뒤흔들 조짐이다.',
      },
      read: false,
      effect: { AERO: 1.10, TECH: 1.05 },
    },
    {
      id: 'sr-2-2',
      dayIdx: 2,
      title: {
        en: 'Satellite Manufacturing Capacity Strained by Unprecedented Demand',
        ko: '전례 없는 수요에 위성 제조 역량 한계 도달',
      },
      content: {
        en: 'Satellite manufacturers reported order backlogs stretching to 2030 as multiple space internet and Earth observation projects compete for limited production capacity.',
        ko: '다수의 우주 인터넷 및 지구 관측 프로젝트가 제한된 생산 역량을 놓고 경쟁하면서 위성 제조업체들의 수주 잔고가 2030년까지 연장됐다.',
      },
      read: false,
      effect: { AERO: 1.06 },
    },
    {
      id: 'sr-2-3',
      dayIdx: 2,
      title: {
        en: 'E-Commerce Platforms Bet Big on Satellite Internet Reach',
        ko: '이커머스, 위성 인터넷으로 미개척 시장 공략 선언',
      },
      content: {
        en: 'E-commerce giants announced plans to expand into previously unreachable markets using satellite internet coverage, projecting 500 million new potential customers.',
        ko: '이커머스 대기업들이 위성 인터넷 커버리지를 활용해 기존 도달 불가 시장에 진출하겠다고 발표하며 5억 명의 잠재 신규 고객을 전망했다.',
      },
      read: false,
      effect: { ECOM: 1.07 },
    },
    {
      id: 'sr-2-4',
      dayIdx: 2,
      title: {
        en: 'Green Energy Firms Win Space Solar Power Research Grants',
        ko: '친환경 에너지 기업, 우주 태양광 연구비 수주',
      },
      content: {
        en: 'Several renewable energy companies secured government grants to research space-based solar power collection and wireless energy transmission to Earth.',
        ko: '여러 재생에너지 기업이 우주 기반 태양광 발전 및 지구로의 무선 에너지 전송 연구를 위한 정부 보조금을 확보했다.',
      },
      read: false,
      effect: { GREEN: 1.06 },
    },
    {
      id: 'sr-2-5',
      dayIdx: 2,
      title: {
        en: 'Telemedicine Revolution Expected from Global Satellite Coverage',
        ko: '글로벌 위성 커버리지로 원격의료 혁명 예고',
      },
      content: {
        en: 'Healthcare analysts predicted that universal satellite internet could bring telemedicine to 2 billion people currently without reliable internet access.',
        ko: '헬스케어 애널리스트들은 범용 위성 인터넷이 현재 안정적 인터넷 접근이 불가능한 20억 명에게 원격의료 서비스를 제공할 수 있을 것이라고 전망했다.',
      },
      read: false,
      effect: { HEALTH: 1.04 },
    },

    // Day 3: Space tourism accidents cause safety concerns
    {
      id: 'sr-3-1',
      dayIdx: 3,
      title: {
        en: 'Space Tourism Craft Suffers Critical Malfunction During Test',
        ko: '우주관광 시험비행 중 치명적 결함 발생',
      },
      content: {
        en: 'A suborbital tourism vehicle experienced a critical engine failure during a test flight, forcing an emergency abort. All crew survived but the incident raised serious safety questions.',
        ko: '준궤도 관광 우주선이 시험비행 중 치명적 엔진 고장을 겪어 긴급 비행 중단에 들어갔다. 전원 생존했으나 심각한 안전성 의문이 제기됐다.',
      },
      read: false,
      effect: { AERO: 0.89 },
    },
    {
      id: 'sr-3-2',
      dayIdx: 3,
      title: {
        en: 'Regulators Announce Emergency Review of All Space Launches',
        ko: '규제 당국, 모든 우주 발사 긴급 점검 발표',
      },
      content: {
        en: 'The FAA ordered a comprehensive safety review of all commercial space launches, temporarily grounding several planned missions pending investigation results.',
        ko: 'FAA가 모든 상업 우주 발사에 대한 포괄적 안전 점검을 명령하고 조사 결과가 나올 때까지 다수의 예정된 임무를 일시 중단시켰다.',
      },
      read: false,
      effect: { AERO: 0.91, TECH: 0.97 },
    },
    {
      id: 'sr-3-3',
      dayIdx: 3,
      title: {
        en: 'Space Insurance Premiums Skyrocket After Incident',
        ko: '사고 여파로 우주 보험료 폭등',
      },
      content: {
        en: 'Insurance companies tripled premiums for commercial space operations overnight, threatening the economic viability of several planned satellite launches.',
        ko: '보험사들이 상업 우주 운영 보험료를 하룻밤 사이에 3배로 인상하며 다수의 위성 발사 계획의 경제적 타당성이 위협받고 있다.',
      },
      read: false,
      effect: { ECOM: 0.96, GREEN: 0.97 },
    },
    {
      id: 'sr-3-4',
      dayIdx: 3,
      title: {
        en: 'Space Medicine Expertise in Demand After Emergency',
        ko: '비상 사태 이후 우주의학 전문성 수요 급증',
      },
      content: {
        en: 'The incident highlighted the critical need for advanced space medicine capabilities, with healthcare firms receiving urgent contracts for crew health monitoring systems.',
        ko: '이번 사고로 첨단 우주의학 역량의 절실한 필요성이 부각됐다. 헬스케어 기업들이 승무원 건강 모니터링 시스템 긴급 계약을 수주했다.',
      },
      read: false,
      effect: { HEALTH: 1.06 },
    },
    {
      id: 'sr-3-5',
      dayIdx: 3,
      title: {
        en: 'Investors Rotate from Space Plays to Defensive Sectors',
        ko: '투자자들, 우주 테마에서 방어주로 자금 이동',
      },
      content: {
        en: 'Risk-averse investors pulled capital from space-exposed stocks and rotated into healthcare and green energy names as safe havens during the uncertainty.',
        ko: '위험 회피 성향의 투자자들이 우주 관련주에서 자금을 빼내 불확실성 속 안전자산인 헬스케어와 친환경 에너지 종목으로 이동했다.',
      },
      read: false,
      effect: { GREEN: 1.04, HEALTH: 1.03 },
    },

    // Day 4: Government space contracts awarded, defense implications
    {
      id: 'sr-4-1',
      dayIdx: 4,
      title: {
        en: 'Pentagon Awards $80 Billion Space Defense Contract',
        ko: '미 국방부, 800억 달러 규모 우주 방위 계약 체결',
      },
      content: {
        en: 'The Department of Defense awarded a record $80 billion contract for space-based defense infrastructure, citing urgent national security needs in orbital capabilities.',
        ko: '미 국방부가 궤도 역량의 시급한 국가안보 필요성을 근거로 우주 기반 방위 인프라 구축에 사상 최대인 800억 달러 규모의 계약을 체결했다.',
      },
      read: false,
      effect: { AERO: 1.13 },
    },
    {
      id: 'sr-4-2',
      dayIdx: 4,
      title: {
        en: 'Safety Review Concludes with Enhanced Protocols, Launches Resume',
        ko: '안전 점검 종료… 강화된 프로토콜 하에 발사 재개',
      },
      content: {
        en: 'The FAA concluded its emergency review with new safety protocols and cleared commercial launches to resume, restoring confidence in the sector.',
        ko: 'FAA가 새로운 안전 프로토콜을 마련하며 긴급 점검을 마무리하고 상업 발사 재개를 허가하면서 업종에 대한 신뢰가 회복됐다.',
      },
      read: false,
      effect: { AERO: 1.07, TECH: 1.04 },
    },
    {
      id: 'sr-4-3',
      dayIdx: 4,
      title: {
        en: 'Tech Giants Secure Classified Space Computing Contracts',
        ko: '기술 대기업, 기밀 우주 컴퓨팅 계약 수주',
      },
      content: {
        en: 'Several major technology companies won classified contracts to develop space-based computing and communications infrastructure for military applications.',
        ko: '주요 기술 대기업 다수가 군사 용도의 우주 기반 컴퓨팅 및 통신 인프라 개발을 위한 기밀 계약을 수주했다.',
      },
      read: false,
      effect: { TECH: 1.08 },
    },
    {
      id: 'sr-4-4',
      dayIdx: 4,
      title: {
        en: 'E-Commerce Satellite Internet Plans Back on Track',
        ko: '이커머스 위성 인터넷 계획 재궤도 진입',
      },
      content: {
        en: 'With launches resuming, e-commerce companies confirmed their satellite internet expansion timelines remain intact, reassuring investors who had fled during the safety scare.',
        ko: '발사가 재개되면서 이커머스 기업들이 위성 인터넷 확장 일정에 차질이 없다고 확인했다. 안전 우려로 이탈했던 투자자들이 안도했다.',
      },
      read: false,
      effect: { ECOM: 1.06 },
    },
    {
      id: 'sr-4-5',
      dayIdx: 4,
      title: {
        en: 'Space Solar Power Pilot Project Greenlit by Energy Department',
        ko: '에너지부, 우주 태양광 시범 프로젝트 승인',
      },
      content: {
        en: 'The Department of Energy approved a $5 billion pilot project for space-based solar power collection, marking the technology\'s transition from research to deployment phase.',
        ko: '에너지부가 우주 기반 태양광 발전 50억 달러 규모 시범 프로젝트를 승인하며 이 기술이 연구에서 배포 단계로 전환됐다.',
      },
      read: false,
      effect: { GREEN: 1.08 },
    },

    // Day 5: International space cooperation agreement, broad optimism
    {
      id: 'sr-5-1',
      dayIdx: 5,
      title: {
        en: 'Historic International Space Cooperation Treaty Signed',
        ko: '역사적 국제 우주 협력 조약 체결',
      },
      content: {
        en: 'Twenty-two nations signed a comprehensive space cooperation treaty establishing shared infrastructure standards, resource-sharing protocols, and joint mission frameworks.',
        ko: '22개국이 공유 인프라 표준, 자원 공유 프로토콜, 공동 임무 체계를 수립하는 포괄적 우주 협력 조약에 서명했다.',
      },
      read: false,
      effect: { AERO: 1.09, TECH: 1.05 },
    },
    {
      id: 'sr-5-2',
      dayIdx: 5,
      title: {
        en: 'Space Economy Projected to Reach $3 Trillion by 2035',
        ko: '우주 경제 규모, 2035년까지 3조 달러 전망',
      },
      content: {
        en: 'Leading investment banks published a joint report projecting the space economy will grow to $3 trillion by 2035, with every major sector benefiting from orbital infrastructure.',
        ko: '주요 투자은행들이 공동 보고서를 통해 우주 경제가 2035년까지 3조 달러로 성장하며 모든 주요 산업이 궤도 인프라의 혜택을 볼 것이라고 전망했다.',
      },
      read: false,
      effect: { AERO: 1.06, ECOM: 1.04 },
    },
    {
      id: 'sr-5-3',
      dayIdx: 5,
      title: {
        en: 'Global Health Initiative Leverages Space Treaty for Telemedicine',
        ko: '글로벌 보건 이니셔티브, 우주 조약 활용한 원격의료 추진',
      },
      content: {
        en: 'The WHO announced a partnership leveraging the new space treaty to deploy satellite-based telemedicine to underserved regions, with pharmaceutical companies providing platform support.',
        ko: 'WHO가 새 우주 조약을 활용해 의료 소외 지역에 위성 기반 원격의료를 보급하는 파트너십을 발표했다. 제약사들이 플랫폼 지원을 제공한다.',
      },
      read: false,
      effect: { HEALTH: 1.05 },
    },
    {
      id: 'sr-5-4',
      dayIdx: 5,
      title: {
        en: 'Green Energy Sector Celebrates Space Solar Power Milestone',
        ko: '친환경 에너지 업계, 우주 태양광 이정표에 환호',
      },
      content: {
        en: 'Renewable energy stocks surged as the international treaty included provisions for shared space solar infrastructure, dramatically reducing per-nation development costs.',
        ko: '국제 조약에 우주 태양광 인프라 공유 조항이 포함돼 국가별 개발 비용이 대폭 절감되면서 재생에너지 주가가 급등했다.',
      },
      read: false,
      effect: { GREEN: 1.07 },
    },
    {
      id: 'sr-5-5',
      dayIdx: 5,
      title: {
        en: 'Analysts: New Space Race Will Define the Next Economic Decade',
        ko: '애널리스트 "새로운 우주 경쟁이 향후 10년 경제를 좌우"',
      },
      content: {
        en: 'Market strategists declared the new space race the defining economic theme of the next decade, recommending investors increase exposure across all space-adjacent sectors.',
        ko: '시장 전략가들은 새로운 우주 경쟁이 향후 10년의 핵심 경제 테마가 될 것이라며 투자자들에게 우주 인접 업종 전반의 비중 확대를 권고했다.',
      },
      read: false,
      effect: { TECH: 1.04, ECOM: 1.03 },
    },
  ],
};
