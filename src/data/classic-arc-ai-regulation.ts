import { ClassicScenarioArc } from './classic-arcs';

export const AI_REGULATION_ARC: ClassicScenarioArc = {
  id: 'ai-regulation',
  name: { en: 'AI Regulation Wave', ko: 'AI 규제 물결' },
  news: [
    // Day 1: EU announces sweeping AI regulation framework
    {
      id: 'ar-1-1',
      dayIdx: 1,
      title: {
        en: 'EU Unveils Sweeping AI Regulation Framework',
        ko: 'EU, 포괄적 AI 규제 프레임워크 전격 발표',
      },
      content: {
        en: 'The European Commission published a comprehensive AI regulation framework requiring mandatory audits, transparency disclosures, and liability provisions for all AI systems deployed in the EU.',
        ko: 'EU 집행위원회가 역내 배포되는 모든 AI 시스템에 대해 의무 감사, 투명성 공시, 책임 조항을 요구하는 포괄적 AI 규제 프레임워크를 발표했다.',
      },
      read: false,
      effect: { TECH: 0.88, ECOM: 0.95 },
    },
    {
      id: 'ar-1-2',
      dayIdx: 1,
      title: {
        en: 'Healthcare AI Receives Explicit Exemptions in EU Draft',
        ko: '의료 AI, EU 규제안에서 명시적 면제 확보',
      },
      content: {
        en: 'The EU framework notably exempts medical AI applications from the strictest compliance tiers, recognizing their critical role in drug discovery and diagnostics.',
        ko: 'EU 프레임워크는 신약 개발과 진단에서의 핵심 역할을 인정해 의료 AI 애플리케이션을 가장 엄격한 규제 등급에서 명시적으로 면제했다.',
      },
      read: false,
      effect: { HEALTH: 1.08 },
    },
    {
      id: 'ar-1-3',
      dayIdx: 1,
      title: {
        en: 'E-Commerce Platforms Scramble to Audit AI Recommendation Engines',
        ko: '이커머스 플랫폼, AI 추천 엔진 감사 체제 긴급 구축',
      },
      content: {
        en: 'Online retailers face costly compliance overhauls as the EU framework classifies product recommendation algorithms as high-risk AI systems requiring full transparency.',
        ko: 'EU 프레임워크가 상품 추천 알고리즘을 전면 투명성이 요구되는 고위험 AI 시스템으로 분류하면서 온라인 유통업체들이 막대한 규제 준수 비용에 직면했다.',
      },
      read: false,
      effect: { ECOM: 0.93 },
    },
    {
      id: 'ar-1-4',
      dayIdx: 1,
      title: {
        en: 'Aerospace Defense AI Programs Unaffected by Civilian Rules',
        ko: '항공우주 방위 AI 프로그램, 민간 규제 대상서 제외',
      },
      content: {
        en: 'Defense and aerospace AI applications were carved out from the civilian regulatory framework, with military AI governance left to separate national security legislation.',
        ko: '방위 및 항공우주 AI 애플리케이션은 민간 규제 프레임워크에서 분리됐으며, 군용 AI 거버넌스는 별도의 국가안보 법률에 맡겨졌다.',
      },
      read: false,
      effect: { AERO: 1.04 },
    },
    {
      id: 'ar-1-5',
      dayIdx: 1,
      title: {
        en: 'Green Energy AI Optimization Tools Face Uncertain Regulatory Status',
        ko: '친환경 에너지 AI 최적화 도구, 규제 지위 불투명',
      },
      content: {
        en: 'Renewable energy companies using AI for grid optimization expressed concern that the broad regulation could slow deployment of smart grid technologies essential for the energy transition.',
        ko: '전력망 최적화에 AI를 활용하는 재생에너지 기업들은 광범위한 규제가 에너지 전환에 필수적인 스마트 그리드 기술의 보급을 늦출 수 있다고 우려했다.',
      },
      read: false,
      effect: { GREEN: 0.95 },
    },

    // Day 2: Tech companies push back, lobbying intensifies, healthcare AI exempted
    {
      id: 'ar-2-1',
      dayIdx: 2,
      title: {
        en: 'Big Tech Launches Massive Lobbying Campaign Against EU Rules',
        ko: '빅테크, EU 규제에 대규모 로비 공세 개시',
      },
      content: {
        en: 'The five largest technology companies formed a unified lobbying coalition, arguing the regulations will cost the industry $200 billion in compliance and stifle innovation.',
        ko: '5대 기술 기업이 통합 로비 연합을 결성하고, 이번 규제로 업계에 2,000억 달러의 규제 준수 비용이 발생하며 혁신이 저해될 것이라고 주장했다.',
      },
      read: false,
      effect: { TECH: 0.93 },
    },
    {
      id: 'ar-2-2',
      dayIdx: 2,
      title: {
        en: 'VitaPharma\'s AI Drug Discovery Accelerates Under Exemption',
        ko: '비타파마, AI 규제 면제 속에 신약 발견 가속화',
      },
      content: {
        en: 'VitaPharma announced its AI-driven drug discovery pipeline has advanced three candidates to clinical trials, benefiting from the regulatory clarity provided by the healthcare exemption.',
        ko: '비타파마는 의료 AI 면제에 따른 규제 명확성의 혜택으로 AI 기반 신약 파이프라인에서 3개 후보물질이 임상시험 단계에 진입했다고 발표했다.',
      },
      read: false,
      effect: { HEALTH: 1.07 },
    },
    {
      id: 'ar-2-3',
      dayIdx: 2,
      title: {
        en: 'Aerospace Firms Invest in AI-Powered Flight Systems',
        ko: '항공우주 기업, AI 기반 비행시스템에 대규모 투자',
      },
      content: {
        en: 'With defense AI exempt from civilian rules, aerospace companies doubled down on AI-enhanced autonomous flight and predictive maintenance systems.',
        ko: '방위 AI가 민간 규제에서 면제됨에 따라 항공우주 기업들이 AI 강화 자율비행 및 예지정비 시스템에 대한 투자를 두 배로 늘렸다.',
      },
      read: false,
      effect: { AERO: 1.06 },
    },
    {
      id: 'ar-2-4',
      dayIdx: 2,
      title: {
        en: 'E-Commerce Sector Estimates Billions in Compliance Costs',
        ko: '이커머스 업계, 수십억 달러 규제 준수 비용 추산',
      },
      content: {
        en: 'Industry analysts estimated that major e-commerce platforms will need to spend $3-5 billion each to overhaul their AI systems for EU compliance within the 18-month deadline.',
        ko: '업계 애널리스트들은 주요 이커머스 플랫폼들이 18개월 이내에 EU 규제를 준수하기 위해 각각 30~50억 달러를 투입해야 할 것으로 추산했다.',
      },
      read: false,
      effect: { ECOM: 0.92 },
    },
    {
      id: 'ar-2-5',
      dayIdx: 2,
      title: {
        en: 'Green Tech AI Gets Partial Exemption for Climate Applications',
        ko: '그린테크 AI, 기후 관련 애플리케이션 부분 면제 획득',
      },
      content: {
        en: 'After lobbying by environmental groups, the EU issued clarification that AI tools directly serving climate mitigation goals would receive streamlined compliance pathways.',
        ko: '환경단체들의 로비를 거쳐 EU가 기후변화 완화 목표에 직접 기여하는 AI 도구에 간소화된 규제 준수 절차를 적용하겠다고 명확히 했다.',
      },
      read: false,
      effect: { GREEN: 1.05 },
    },

    // Day 3: US follows with its own regulatory proposal
    {
      id: 'ar-3-1',
      dayIdx: 3,
      title: {
        en: 'US White House Announces Competing AI Regulatory Proposal',
        ko: '미 백악관, 독자적 AI 규제안 발표',
      },
      content: {
        en: 'The White House unveiled its own AI regulatory framework, more permissive than the EU version but still imposing significant new obligations on large-scale AI deployers.',
        ko: '백악관이 EU보다 완화된 독자적 AI 규제 프레임워크를 공개했다. 다만 대규모 AI 배포자에 대한 상당한 새 의무 사항은 여전히 포함됐다.',
      },
      read: false,
      effect: { TECH: 0.92 },
    },
    {
      id: 'ar-3-2',
      dayIdx: 3,
      title: {
        en: 'Global Tech Stocks Sell Off on Dual Regulatory Shock',
        ko: '미·EU 이중 규제 충격에 글로벌 기술주 매도세',
      },
      content: {
        en: 'Technology stocks suffered their worst two-day decline in three years as investors priced in the combined impact of transatlantic AI regulations on the sector.',
        ko: '대서양 양안의 AI 규제가 업종에 미치는 복합적 충격을 투자자들이 반영하면서 기술주가 3년 만에 최악의 이틀간 하락을 기록했다.',
      },
      read: false,
      effect: { TECH: 0.90, ECOM: 0.96 },
    },
    {
      id: 'ar-3-3',
      dayIdx: 3,
      title: {
        en: 'Healthcare AI Boom as Both Frameworks Preserve Exemptions',
        ko: '미·EU 모두 의료 AI 면제 유지… 헬스케어 AI 붐',
      },
      content: {
        en: 'Both the US and EU frameworks maintained broad exemptions for healthcare AI, creating a regulatory safe harbor that attracted a flood of investment into medical technology.',
        ko: '미국과 EU 프레임워크 모두 의료 AI에 대한 광범위한 면제를 유지하면서 규제 안전지대가 형성됐고, 의료기술 분야에 투자가 쏟아졌다.',
      },
      read: false,
      effect: { HEALTH: 1.10 },
    },
    {
      id: 'ar-3-4',
      dayIdx: 3,
      title: {
        en: 'Aerospace Defense Budgets Boosted by AI Arms Race Fears',
        ko: 'AI 군비경쟁 우려에 항공우주 방위 예산 증액',
      },
      content: {
        en: 'Congressional leaders cited foreign adversaries\' unregulated military AI development as justification for a 15% increase in aerospace defense spending.',
        ko: '의회 지도부가 적국의 무규제 군용 AI 개발을 근거로 항공우주 방위 지출 15% 증액을 정당화했다.',
      },
      read: false,
      effect: { AERO: 1.08 },
    },
    {
      id: 'ar-3-5',
      dayIdx: 3,
      title: {
        en: 'Green Energy Sector Stable Amid AI Regulatory Turmoil',
        ko: 'AI 규제 혼란 속 친환경 에너지 업종 안정세',
      },
      content: {
        en: 'Renewable energy stocks held steady as investors recognized the sector\'s limited direct exposure to AI regulation while benefiting from climate-tech exemptions.',
        ko: '투자자들이 재생에너지 업종의 AI 규제 직접 노출이 제한적이며 기후기술 면제 혜택을 받는다는 점을 인식하면서 관련 주가가 안정세를 유지했다.',
      },
      read: false,
      effect: { GREEN: 1.03 },
    },

    // Day 4: Industry coalition proposes self-regulation compromise
    {
      id: 'ar-4-1',
      dayIdx: 4,
      title: {
        en: 'Tech Industry Coalition Proposes Bold Self-Regulation Plan',
        ko: '기술 업계 연합, 대담한 자율 규제안 제시',
      },
      content: {
        en: 'A coalition of 50 leading technology companies proposed a comprehensive self-regulation framework with independent auditing, offering it as an alternative to government mandates.',
        ko: '50대 기술 기업 연합이 독립적 감사를 포함한 포괄적 자율 규제 프레임워크를 정부 규제의 대안으로 제시했다.',
      },
      read: false,
      effect: { TECH: 1.09 },
    },
    {
      id: 'ar-4-2',
      dayIdx: 4,
      title: {
        en: 'Regulators Express Cautious Openness to Self-Regulation Approach',
        ko: '규제 당국, 자율 규제 접근법에 조심스러운 긍정 반응',
      },
      content: {
        en: 'Both EU and US regulators signaled willingness to incorporate industry self-regulation proposals into revised frameworks, sending technology shares sharply higher.',
        ko: 'EU와 미국 규제 당국 모두 수정된 프레임워크에 업계 자율 규제 제안을 반영할 의향을 내비쳤다. 기술주가 큰 폭으로 상승했다.',
      },
      read: false,
      effect: { TECH: 1.08, ECOM: 1.06 },
    },
    {
      id: 'ar-4-3',
      dayIdx: 4,
      title: {
        en: 'E-Commerce Platforms Rally on Reduced Compliance Outlook',
        ko: '규제 준수 부담 완화 전망에 이커머스 주 반등',
      },
      content: {
        en: 'Online retailers surged as the self-regulation proposal would replace mandatory algorithm transparency with standardized testing protocols, significantly reducing costs.',
        ko: '자율 규제안이 의무 알고리즘 투명성 공시를 표준화된 테스트 프로토콜로 대체할 것으로 알려지면서 비용 부담이 크게 줄어들 전망에 온라인 유통주가 급등했다.',
      },
      read: false,
      effect: { ECOM: 1.05 },
    },
    {
      id: 'ar-4-4',
      dayIdx: 4,
      title: {
        en: 'Medical AI Investment Hits Record Quarter',
        ko: '의료 AI 투자, 분기 사상 최대 기록',
      },
      content: {
        en: 'Venture capital investment in healthcare AI reached a record $18 billion in the quarter, as the sector\'s regulatory certainty contrasted sharply with broader tech uncertainty.',
        ko: '헬스케어 AI 벤처캐피털 투자가 분기 기준 사상 최대인 180억 달러를 기록했다. 업종의 규제 확실성이 기술 업계 전반의 불확실성과 극명히 대비됐다.',
      },
      read: false,
      effect: { HEALTH: 1.05 },
    },
    {
      id: 'ar-4-5',
      dayIdx: 4,
      title: {
        en: 'Aerospace AI Integration Accelerates Under Clear Rules',
        ko: '명확한 규제 하에 항공우주 AI 통합 가속화',
      },
      content: {
        en: 'Aerospace companies reported accelerated AI integration timelines now that regulatory boundaries between civilian and defense applications are clearly defined.',
        ko: '민간과 방위 애플리케이션 간 규제 경계가 명확해지면서 항공우주 기업들이 AI 통합 일정을 앞당기고 있다고 발표했다.',
      },
      read: false,
      effect: { AERO: 1.04 },
    },

    // Day 5: Balanced framework adopted, innovation-friendly guardrails
    {
      id: 'ar-5-1',
      dayIdx: 5,
      title: {
        en: 'Landmark Global AI Accord Signed by 30 Nations',
        ko: '30개국 역사적 글로벌 AI 협약 서명',
      },
      content: {
        en: 'Thirty nations signed a landmark AI governance accord that balances innovation incentives with consumer protection, creating a unified global compliance standard.',
        ko: '30개국이 혁신 인센티브와 소비자 보호를 균형 있게 조화시킨 역사적 AI 거버넌스 협약에 서명하며 글로벌 통합 규제 준수 기준을 수립했다.',
      },
      read: false,
      effect: { TECH: 1.12, ECOM: 1.06 },
    },
    {
      id: 'ar-5-2',
      dayIdx: 5,
      title: {
        en: 'Tech Sector Celebrates Innovation-Friendly Guardrails',
        ko: '기술 업계, 혁신 친화적 가드레일에 환호',
      },
      content: {
        en: 'Technology executives praised the final framework for creating clear rules without stifling innovation, noting the self-regulation provisions preserve competitive agility.',
        ko: '기술 업계 경영진은 최종 프레임워크가 혁신을 억누르지 않으면서 명확한 규칙을 수립했다고 환영하며, 자율 규제 조항이 경쟁적 민첩성을 보존한다고 강조했다.',
      },
      read: false,
      effect: { TECH: 1.07 },
    },
    {
      id: 'ar-5-3',
      dayIdx: 5,
      title: {
        en: 'Healthcare AI Golden Age Declared by Industry Leaders',
        ko: '업계 리더들 "의료 AI 황금기 도래" 선언',
      },
      content: {
        en: 'Healthcare industry leaders declared the regulatory settlement marks the beginning of a golden age for medical AI, with clear rules enabling massive capital deployment.',
        ko: '헬스케어 업계 리더들은 이번 규제 타결이 의료 AI 황금기의 시작이며, 명확한 규칙이 대규모 자본 투입을 가능케 한다고 선언했다.',
      },
      read: false,
      effect: { HEALTH: 1.06 },
    },
    {
      id: 'ar-5-4',
      dayIdx: 5,
      title: {
        en: 'Green Energy AI Deployment Unshackled by Climate Provisions',
        ko: '기후 조항으로 친환경 에너지 AI 배포 족쇄 풀려',
      },
      content: {
        en: 'The final accord\'s strong climate technology provisions allow rapid AI deployment for energy grid optimization, giving renewable companies a significant operational advantage.',
        ko: '최종 협약의 강력한 기후기술 조항이 에너지 전력망 최적화를 위한 AI의 신속한 배포를 허용하면서 재생에너지 기업들이 상당한 운영상 이점을 확보했다.',
      },
      read: false,
      effect: { GREEN: 1.07 },
    },
    {
      id: 'ar-5-5',
      dayIdx: 5,
      title: {
        en: 'Analysts: AI Regulation Clarity Marks New Bull Market Phase',
        ko: '애널리스트 "AI 규제 명확화, 새로운 강세장의 시작"',
      },
      content: {
        en: 'Wall Street analysts declared that regulatory clarity has removed the biggest overhang on technology valuations, projecting broad-based gains across AI-exposed sectors.',
        ko: '월스트리트 애널리스트들은 규제 명확화가 기술주 밸류에이션의 최대 불확실성을 제거했다며 AI 관련 업종 전반의 상승을 전망했다.',
      },
      read: false,
      effect: { AERO: 1.05, ECOM: 1.04 },
    },
  ],
};
