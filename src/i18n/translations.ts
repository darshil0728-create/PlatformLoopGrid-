export type Language = 'en' | 'hi' | 'mr' | 'gu' | 'ta' | 'kn';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  region: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', region: 'Global / India' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'North / Central Belts' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', region: 'Pune, Chakan, Thane' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', region: 'Surat, Ahmedabad, Rajkot' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', region: 'Coimbatore, Chennai, Tirupur' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', region: 'Peenya, Bengaluru, Belagavi' },
];

export interface FaqItem {
  id: number;
  category: 'registration' | 'inventory' | 'transit' | 'settlement' | 'processing';
  categoryLabel: string;
  question: string;
  answer: string;
}

export interface Translations {
  nav: {
    faq: string;
    support: string;
    impact: string;
    integration: string;
    process: string;
    signIn: string;
    registerScrap: string;
    platformPages: string;
    home: string;
    faqKnowledge: string;
    signInPage: string;
    tagline: string;
  };
  hero: {
    badge: string;
    headlineStart: string;
    headlineHighlight: string;
    subtitle: string;
    startBtn: string;
    howItWorksBtn: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
  };
  problem: {
    badge: string;
    title: string;
    subtitle: string;
    p1Title: string;
    p1Desc: string;
    p2Title: string;
    p2Desc: string;
    p3Title: string;
    p3Desc: string;
    p4Title: string;
    p4Desc: string;
    quote: string;
  };
  solution: {
    badge: string;
    title: string;
    subtitle: string;
    step1Num: string;
    step1Title: string;
    step1Desc: string;
    step2Num: string;
    step2Title: string;
    step2Desc: string;
    step3Num: string;
    step3Title: string;
    step3Desc: string;
    algoBadge: string;
    complexityTitle: string;
    complexityP1: string;
    complexityP2: string;
    tag1: string;
    tag2: string;
    tag3: string;
    examplesTitle: string;
    ex1From: string;
    ex1To: string;
    ex1Val: string;
    ex2From: string;
    ex2To: string;
    ex2Val: string;
    ex3From: string;
    ex3To: string;
    ex3Val: string;
  };
  impact: {
    badge: string;
    title: string;
    subtitle: string;
    p1Title: string;
    p1Desc: string;
    p2Title: string;
    p2Desc: string;
    p3Title: string;
    p3Desc: string;
    deepDiveBadge: string;
    deepDiveTitle: string;
    metalsTitle: string;
    metalsDesc: string;
    metalsStatLabel: string;
    metalsStatVal: string;
    textilesTitle: string;
    textilesDesc: string;
    textilesStatLabel: string;
    textilesStatVal: string;
    polymersTitle: string;
    polymersDesc: string;
    polymersStatLabel: string;
    polymersStatVal: string;
    timberTitle: string;
    timberDesc: string;
    timberStatLabel: string;
    timberStatVal: string;
    organicsTitle: string;
    organicsDesc: string;
    organicsStatLabel: string;
    organicsStatVal: string;
    verifiedNote: string;
    catMetals: string;
    catTextiles: string;
    catPolymers: string;
    catTimber: string;
    catOrganics: string;
    metalsB1: string;
    metalsB2: string;
    metalsB3: string;
    textilesB1: string;
    textilesB2: string;
    textilesB3: string;
    polymersB1: string;
    polymersB2: string;
    polymersB3: string;
    timberB1: string;
    timberB2: string;
    timberB3: string;
    organicsB1: string;
    organicsB2: string;
    organicsB3: string;
  };
  integration: {
    badge: string;
    title: string;
    subtitle: string;
    f1Title: string;
    f1Desc: string;
    f2Title: string;
    f2Desc: string;
    f3Title: string;
    f3Desc: string;
    f4Title: string;
    f4Desc: string;
    f5Title: string;
    f5Desc: string;
    f6Title: string;
    f6Desc: string;
    bannerBadge: string;
    bannerTitle: string;
    bannerDesc: string;
    b1Title: string;
    b1Desc: string;
    b2Title: string;
    b2Desc: string;
    b3Title: string;
    b3Desc: string;
  };
  process: {
    badge: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step1Tag: string;
    step2Title: string;
    step2Desc: string;
    step2Tag: string;
    step3Title: string;
    step3Desc: string;
    step3Tag: string;
    step4Title: string;
    step4Desc: string;
    step4Tag: string;
    step5Title: string;
    step5Desc: string;
    step5Tag: string;
    flowBadge: string;
    flowTitle: string;
    flowDesc: string;
    p1Title: string;
    p1Desc: string;
    p2Title: string;
    p2Desc: string;
    p3Title: string;
    p3Desc: string;
    waterfallHeader: string;
    wf1Tag: string;
    wf1Buyer: string;
    wf1Val: string;
    wf1Desc: string;
    wf2Tag: string;
    wf2Name: string;
    wf2Share: string;
    wf2Desc: string;
    wf3Tag: string;
    wf3Partner: string;
    wf3Rate: string;
    wf3Desc: string;
    wf4Tag: string;
    wf4Recipient: string;
    wf4Method: string;
    wf4Desc: string;
    registerBtn: string;
  };
  faqTeaser: {
    badge: string;
    title: string;
    subtitle: string;
    viewAllBtn: string;
    bannerTitle: string;
    bannerDesc: string;
    q1: string;
    a1: string;
    tag1: string;
    q2: string;
    a2: string;
    tag2: string;
    q3: string;
    a3: string;
    tag3: string;
    q4: string;
    a4: string;
    tag4: string;
  };
  cta: {
    badge: string;
    title: string;
    subtitle: string;
    registerBtn: string;
    signUpBtn: string;
  };
  footer: {
    desc: string;
    badge: string;
    pagesTitle: string;
    faqLink: string;
    signInLink: string;
    principlesTitle: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    rights: string;
    pledge: string;
  };
  auth: {
    returnLanding: string;
    createAccountTitle: string;
    createAccountSubtitle: string;
    signInTitle: string;
    signInSubtitle: string;
    tabCreateAccount: string;
    tabSignIn: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    dealsInLabel: string;
    dealsInPlaceholder: string;
    resourcesLabel: string;
    resourcesPlaceholder: string;
    roleLabel: string;
    roleMsme: string;
    roleProcessing: string;
    roleTransit: string;
    roleBanking: string;
    addressLabel: string;
    addressPlaceholder: string;
    createPasswordLabel: string;
    confirmPasswordLabel: string;
    loginEnterpriseNameLabel: string;
    loginEnterpriseNamePlaceholder: string;
    loginPasswordLabel: string;
    loginPasswordPlaceholder: string;
    submitCreateAccount: string;
    submitLogin: string;
    alreadyAccount: string;
    needAccount: string;
    fillAllFields: string;
    passwordMismatch: string;
    passwordLength: string;
    loginNotFound: string;
    loginWrongPassword: string;
  };
  profile: {
    returnLanding: string;
    badge: string;
    signOut: string;
    verifiedBadge: string;
    registerScrapBtn: string;
    accountDetails: string;
    name: string;
    phone: string;
    email: string;
    role: string;
    dealsIn: string;
    resources: string;
    address: string;
    home: string;
    dashboard: string;
    searchDrp: string;
    yourDrps: string;
    registerResources: string;
    payout: string;
    profileSection: string;
    checkComplianceScore: string;
    complianceScoreBannerTitle: string;
    complianceScoreBannerSubtitle: string;
    recycled: string;
    co2Saved: string;
    activeFleet: string;
    creditAdvanced: string;
    feedstockSavings: string;
    receivables: string;
    escrowRepayment: string;
    ingestedLots: string;
    registerAssetTitle: string;
    registerAssetSubtitle: string;
    registerAssetBtn: string;
    allAssets: string;
    inTransit: string;
    pending: string;
    sold: string;
    listed: string;
    liveScrapStreams: string;
    languageHeading: string;
    languageSubtitle: string;
    editProfileBtn: string;
    saveProfileBtn: string;
    cancelBtn: string;
    procuredLots: string;
    acquireLots: string;
    activeShipments: string;
    tripDispatch: string;
    financedDrps: string;
    underwriteAdvance: string;
    notificationsTitle: string;
    openProfileTooltip: string;
    changeLanguage: string;
    activityLog: string;
    activityLogTitle: string;
    activityLogSubtitle: string;
    recentActivity: string;
    viewAllActivity: string;
    allActivityFilter: string;
    registeredFilter: string;
    tradedFilter: string;
    transitFilter: string;
    settledFilter: string;
    searchActivityPlaceholder: string;
    exportAuditTrail: string;
    lotIdLabel: string;
    resourceLabel: string;
    quantityLabel: string;
    valueLabel: string;
    counterpartyLabel: string;
    actionLabel: string;
    dateLabel: string;
    inspectPassportBtn: string;
    managedTransit: string;
    managedTransitTitle: string;
    managedTransitSubtitle: string;
    awaitingPickup: string;
    inTransitStage: string;
    processedStage: string;
    settings: string;
    settingsSubtitle: string;
    wasteDiversion?: string;
  };
  demoSelect: {
    backToSignIn: string;
    title: string;
    subtitle: string;
    badge: string;
    landingPageLink: string;
    launchDashboard: string;
    roleMsme: string;
    roleMsmeTag: string;
    roleProcessing: string;
    roleProcessingTag: string;
    roleTransit: string;
    roleTransitTag: string;
    roleBanking: string;
    roleBankingTag: string;
  };
  compliance: {
    pageTitle: string;
    pageSubtitle: string;
    returnBtn: string;
    tabAssessment: string;
    tabRegulations: string;
    tabImplementation: string;
    tabLowCostHacks: string;
    scoreTitle: string;
    scoreGrade: string;
    penaltySavings: string;
    realtimeAlerts: string;
    filterAll: string;
    filterHazardous: string;
    filterEpr: string;
    filterAirWater: string;
    filterEnergy: string;
    filterSafety: string;
    efficiencyTipLabel: string;
    lowCostLabel: string;
    downloadAuditSummary: string;
  };
  drpModal: {
    title: string;
    sovereignBadge: string;
    currentLocation: string;
    custodyState: string;
    saleStatus: string;
    liveTransitTracking: string;
    marketSpotRate: string;
    finalPayoutWaterflow: string;
    close: string;
    viewBlockchain: string;
  };
  modal: {
    badge: string;
    title: string;
    subtitle: string;
    roleLabel: string;
    roleMsme: string;
    roleProcessing: string;
    roleTransit: string;
    businessNameLabel: string;
    businessNamePlaceholder: string;
    industryLabel: string;
    materialTypeLabel: string;
    tonnageLabel: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    locationPlaceholder: string;
    submitBtn: string;
    successTitle: string;
    successDesc: string;
    closeBtn: string;
  };
  faqPage: {
    returnBtn: string;
    signInBtn: string;
    joinBtn: string;
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    clear: string;
    reset: string;
    noResults: string;
    catAll: string;
    catReg: string;
    catInv: string;
    catTransit: string;
    catSettlement: string;
    catProcessing: string;
    bottomTitle: string;
    bottomSubtitle: string;
    registerBtn: string;
    backOverviewBtn: string;
    faqs: FaqItem[];
  };
}

// -------------------------------------------------------------
// ENGLISH TRANSLATIONS
// -------------------------------------------------------------
const enTranslations: Translations = {
  nav: {
    faq: 'FAQ',
    support: 'Support',
    impact: 'Environmental Impact',
    integration: 'Ease of Integration',
    process: 'Operational Flow',
    signIn: 'Sign In / Register',
    registerScrap: 'Register Scrap Stream',
    platformPages: 'Platform Pages',
    home: 'Home Landing Page',
    faqKnowledge: 'FAQ & Knowledge Base',
    signInPage: 'Enterprise Account Page',
    tagline: 'LoopGrid • Managed Circular Economy for MSMEs',
  },
  hero: {
    badge: 'Managed Circular Economy for MSMEs • AI Proximity Lot Matching',
    headlineStart: 'Turn Unusable Operational Scrap into',
    headlineHighlight: 'Guaranteed Revenue',
    subtitle:
      'MSMEs register unwanted leftover resources they cannot utilize internally. LoopGrid pools them into categorized inventory lots, matches nearby processing buyers via AI to minimize transport costs, dispatches pre-negotiated transit partners, and executes real-time payouts.',
    startBtn: 'Register Unwanted Scrap',
    howItWorksBtn: 'Explore 5-Step Process',
    card1Title: 'Environmental Impact First',
    card1Desc: 'Directly divert tons of unusable manufacturing offcuts from landfills, shrinking industrial carbon footprints and avoiding virgin ore extraction.',
    card2Title: 'Categorized Lot Inventory',
    card2Desc: 'LoopGrid groups fragmented scrap into standardized, chemical-spec inventory lots that processing enterprises can buy in bulk.',
    card3Title: 'Automated Transit & Settlements',
    card3Desc: 'AI selects the closest buyer, assigns transit partners with fixed per-km rates, and disburses payments in real time.',
  },
  problem: {
    badge: 'The MSME Operational Scrap Challenge',
    title: 'Tons of unusable production offcuts are discarded or sold for pennies.',
    subtitle: 'During standard manufacturing cycles, MSMEs generate residual materials, offcuts, and process scrap that cannot be fed back into their own operations. Without scale, they are forced to discard them or sell to local scrap yards at heavy losses.',
    p1Title: 'Operational Residues Cannot Be Reused',
    p1Desc: 'Cut-offs, lathe turnings, trimmings, and batch tailings cannot re-enter the factory’s existing machine setups and end up clogging valuable shop-floor space.',
    p2Title: 'Scrap Dealers Underpay & Downcycle',
    p2Desc: 'Local middlemen offer rock-bottom salvage rates and melt high-precision materials into low-grade commodities, destroying economic complexity.',
    p3Title: 'Fragmented Volume Cannot Reach Big Buyers',
    p3Desc: 'Individual MSMEs produce small quantities that processing mills refuse to buy individually without bulk consolidation and standardization.',
    p4Title: 'High Transport Costs Cripple Re-use',
    p4Desc: 'Without localized proximity routing, transport costs quickly exceed the scrap value, making secondary material reuse financially unviable.',
    quote: '“LoopGrid solves this by aggregating fragmented MSME scraps into categorized inventory lots, routing to the nearest processing buyer, and managing transit and payment end-to-end.”',
  },
  solution: {
    badge: 'The LoopGrid Platform',
    title: 'Managed Inventory & Real-Time Proximity Routing',
    subtitle: 'We turn fragmented shop-floor scrap into high-value industrial inputs through automated lot pooling, AI proximity matching, and managed transit execution.',
    step1Num: '01',
    step1Title: 'Register Unwanted Resources',
    step1Desc: 'MSMEs register residual materials they cannot utilize internally, providing basic dimensions, weight, and material classification.',
    step2Num: '02',
    step2Title: 'Categorized Lot Inventory',
    step2Desc: 'Our system automatically pools identical resources by category and grade into standardized commercial lots for processing buyers.',
    step3Num: '03',
    step3Title: 'AI Proximity & Automated Payout',
    step3Desc: 'AI matches the closest processing enterprise to minimize freight, assigns transit partners with fixed per-km rates, and settles payments in real time.',
    algoBadge: 'AI Proximity & Optimization',
    complexityTitle: 'Why Does Nearby Matching Matter?',
    complexityP1: 'Transport is the #1 cost hurdle in circular materials. If a scrap lot must travel 400 km, freight eats away all financial upside for the MSME.',
    complexityP2: 'LoopGrid’s AI matches lots with processing facilities in the immediate geographic radius, then assigns our verified transit partner with pre-fixed cost-per-kilometer tariffs. The result: maximum net payout for the MSME and lowest raw material cost for the buyer.',
    tag1: 'Pre-Fixed Cost Per KM',
    tag2: 'Categorized Lot Inventory',
    tag3: 'Real-Time Payment Splits',
    examplesTitle: 'Verified Resource Stream Lots',
    ex1From: 'CNC Aircraft Aluminum Turnings',
    ex1To: 'Nearby Sintering Foundry (22 km)',
    ex1Val: 'Transit cost capped at pre-fixed per-km rate',
    ex2From: 'Pure Polypropylene Offcuts',
    ex2To: 'Regional Compound Extruder (18 km)',
    ex2Val: 'Full lot purchased from aggregated inventory',
    ex3From: 'Cotton Denim Selvedge Trimmings',
    ex3To: 'Industrial Acoustic Panel Maker (35 km)',
    ex3Val: 'Real-time settlement to MSME within 24h',
  },
  impact: {
    badge: 'Ecological Stewardship',
    title: 'Diverting Unusable Scrap from Landfills & Foundries',
    subtitle: 'Every registered scrap lot redirected to a processing enterprise prevents municipal dumping, cuts Scope 3 carbon emissions, and preserves virgin natural reserves.',
    p1Title: 'Zero Landfill Dumping',
    p1Desc: 'Operational offcuts and process scrap are routed directly to secondary manufacturing facilities instead of polluting dumps.',
    p2Title: 'Minimized Transport Emissions',
    p2Desc: 'AI proximity routing selects nearby processing facilities, cutting diesel burn and freight transport emissions significantly.',
    p3Title: 'Raw Material Security',
    p3Desc: 'Supplying processing enterprises with verified scrap lots reduces India’s dependency on expensive imported virgin metals and polymers.',
    deepDiveBadge: 'Material Sector Analysis',
    deepDiveTitle: 'Resource Streams Managed on LoopGrid',
    metalsTitle: 'Metal & Alloy Swarf, Lathe Turnings & Offcuts',
    metalsDesc: 'Precision manufacturing scraps repurposed directly into secondary foundries.',
    metalsStatLabel: 'Virgin Smelting Avoided',
    metalsStatVal: 'Up to 90%',
    textilesTitle: 'Textile Fabric Offcuts, Selvedge & Yarn Waste',
    textilesDesc: 'Diverted from municipal incinerators into automotive sound dampening.',
    textilesStatLabel: 'Water Saved',
    textilesStatVal: 'Thousands of Litres/Lot',
    polymersTitle: 'Thermoplastic Trimmings, Purges & Sprues',
    polymersDesc: 'Engineered resin regrinds fed into injection molding operations.',
    polymersStatLabel: 'Petroleum Offset',
    polymersStatVal: '2.1 kg CO₂e / kg',
    timberTitle: 'Hardwood Offcuts, Plywood Scrap & Veneers',
    timberDesc: 'Upcycled into engineered acoustic panels and composite furniture.',
    timberStatLabel: 'Timber Preservation',
    timberStatVal: '100% Lot Recovery',
    organicsTitle: 'Agro-Industrial Pulp & Food Processing Tailings',
    organicsDesc: 'Reclaimed into biodegradable packaging and microbial bio-nutrients.',
    organicsStatLabel: 'Methane Abated',
    organicsStatVal: 'Zero Decomp Waste',
    verifiedNote: 'All secondary feedstocks undergo rigorous classification audits.',
    catMetals: 'Metals & Alloys',
    catTextiles: 'Textiles & Leather',
    catPolymers: 'Polymers & Plastics',
    catTimber: 'Wood & Paper',
    catOrganics: 'Organic By-Products',
    metalsB1: 'Elimination of virgin bauxite & iron ore extraction',
    metalsB2: 'Direct avoidance of sulfur dioxide and particulate foundry pollution',
    metalsB3: 'High structural integrity retained for secondary component casting',
    textilesB1: 'Stops synthetic microplastics from leaching into municipal soil',
    textilesB2: 'Cuts demand for chemical-heavy dye processes and virgin cotton crops',
    textilesB3: '100% material loop closure across adjacent industrial sectors',
    polymersB1: 'Prevents persistent petroleum polymers from reaching open dumps',
    polymersB2: 'Provides small injection molders access to high-spec resin in bulk lots',
    polymersB3: 'Reduces dependency on virgin crude cracking and petrochemical refinement',
    timberB1: 'Maximizes carbon sequestered in durable wooden composite goods',
    timberB2: 'Relieves logging strain on slow-growth natural timber forests',
    timberB3: 'Bypasses open burning and wood-waste methane generation',
    organicsB1: 'Prevents anaerobic decomposition that releases potent methane gas',
    organicsB2: 'Replaces expanded polystyrene (Styrofoam) in protective industrial packaging',
    organicsB3: 'Creates local nutrient loops for community regenerative soil enrichment',
  },
  integration: {
    badge: 'Shop-Floor Friendly',
    title: 'Frictionless Scrap Registration for Factory Owners',
    subtitle: 'Zero retrofits. Zero software installations. Factory managers can register material streams in 2 minutes directly from any phone.',
    f1Title: 'Zero IT Footprint',
    f1Desc: 'Runs seamlessly in any smartphone web browser. No software installs or ERP hooks required.',
    f2Title: '2-Minute Stream Registration',
    f2Desc: 'Upload a quick photo, enter dimensions and estimated weight. Our inventory engine handles the rest.',
    f3Title: 'Small Volume Pooling',
    f3Desc: 'Even 200 kg or 1 pallet of scrap can be registered. LoopGrid aggregates lots across neighboring workshops.',
    f4Title: 'Pre-Fixed Transit Per KM',
    f4Desc: 'LoopGrid sets transparent per-kilometer transit rates with fleet partners. No haggling.',
    f5Title: 'Automated Documentation',
    f5Desc: 'Waybills, gate passes, and tax invoices are automatically compiled and delivered digitally.',
    f6Title: 'Instant Mobile Updates',
    f6Desc: 'Receive SMS or WhatsApp notifications when your lot is purchased and when freight is dispatched.',
    bannerBadge: 'Simple MSME Process',
    bannerTitle: 'From Shop Floor to Bank Account in 3 Easy Steps',
    bannerDesc: 'Bypass the informal scrap mafia. Get verified market prices, guaranteed collection, and automated bank payouts.',
    b1Title: 'No Weighbridge Retrofits Needed',
    b1Desc: 'Use standard workshop weighing scales or nearby certified weighbridge slips.',
    b2Title: 'Universal Industry Support',
    b2Desc: 'Designed for machine shops, textile mills, plastics molders, and packaging units.',
    b3Title: 'Multilingual Voice & Text',
    b3Desc: 'Available in local languages so supervisors and loading operators can navigate smoothly.',
  },
  process: {
    badge: 'Operational & Financial Architecture',
    title: 'From Unusable MSME Scrap to Processing Lot & Automated Payouts',
    subtitle: 'MSMEs register materials they cannot utilize internally. LoopGrid creates categorized inventory lots, AI matches nearby buyers to slash transport, and our transit partner completes the delivery while payments are split automatically.',
    step1Title: 'MSME Scrap Registration',
    step1Desc: 'Factory owners register unusable leftover materials, offcuts, and process scrap that cannot be recycled within their operational cycle.',
    step1Tag: 'Zero shop-floor clutter',
    step2Title: 'Categorized Inventory Pool',
    step2Desc: 'LoopGrid aggregates registered materials into a structured inventory system, pooling identical categories, grades, and chemical specs.',
    step2Tag: 'Commercial lot standardization',
    step3Title: 'Processing Enterprise Lots',
    step3Desc: 'Industrial processing enterprises browse categorized lots and purchase high-volume raw inputs matching their exact manufacturing requirements.',
    step3Tag: 'Bulk lot procurement',
    step4Title: 'AI Proximity & Transit Allotment',
    step4Desc: 'Our AI algorithm matches the nearest available processing buyer to slash transport distance, and instantly assigns a verified transit partner with pre-negotiated per-km rates.',
    step4Tag: 'Lowest freight cost & CO₂',
    step5Title: 'Real-Time Economic Split',
    step5Desc: 'LoopGrid collects funds from the buyer in real time, retains our platform commission, pays the transit partner per km, and disburses guaranteed net earnings to the MSME.',
    step5Tag: 'Immediate payment settlement',
    flowBadge: 'Transparent Settlement Architecture',
    flowTitle: 'How the LoopGrid Financial & Logistics Flow Works',
    flowDesc: 'Neither the MSME workshop nor the industrial buyer needs to worry about negotiating freight, delayed receivables, or scrap quality disputes. LoopGrid acts as the central clearinghouse and logistics orchestrator.',
    p1Title: 'Pre-Agreed Cost Per Kilometre:',
    p1Desc: 'Transit rates are pre-fixed between LoopGrid and regional fleet partners. Buyers and sellers never haggle over freight.',
    p2Title: 'AI Proximity Routing:',
    p2Desc: 'Matching with the closest qualified processing plant directly minimizes total kilometers traveled, cutting transport overhead for all parties.',
    p3Title: 'Guaranteed Automated Disbursements:',
    p3Desc: 'Once delivery confirmation is logged at the buyer’s dock, payments are distributed instantly to the MSME seller and logistics driver.',
    waterfallHeader: 'Transaction & Payment Waterfall',
    wf1Tag: '1. Buyer Payment Inflow',
    wf1Buyer: 'Processing Enterprise',
    wf1Val: '100% Lot Value',
    wf1Desc: 'Pays full invoice amount for standardized inventory lot directly to LoopGrid.',
    wf2Tag: '2. LoopGrid Platform Share',
    wf2Name: 'LoopGrid Commission',
    wf2Share: 'Platform Share',
    wf2Desc: 'Retained for AI inventory matching, quality inspection, and automated settlement.',
    wf3Tag: '3. Transit Partner Disbursal',
    wf3Partner: 'Assigned Transit Partner',
    wf3Rate: 'Pre-Fixed Cost / KM',
    wf3Desc: 'Disbursed directly upon dock delivery scan based on agreed km distance.',
    wf4Tag: '4. MSME Supplier Payout',
    wf4Recipient: 'MSME Enterprise Owner',
    wf4Method: 'Direct Bank Transfer',
    wf4Desc: 'Guaranteed net payout for previously unusable scrap, directly to bank account.',
    registerBtn: 'Register Unusable MSME Scrap',
  },
  faqTeaser: {
    badge: 'Frequently Asked Questions',
    title: 'Common Questions on Inventory, Transit & Payouts',
    subtitle: 'Everything you need to know about registering unusable scrap, inventory lot purchasing, transit partner allocation, and automated payment distribution.',
    viewAllBtn: 'View Full FAQ Page',
    bannerTitle: 'Need more operational or transit details?',
    bannerDesc: 'Explore our full knowledge base covering quality grading, transit partner onboarding, per-km rates, and real-time payment splits.',
    q1: 'How do MSMEs register unwanted scrap they cannot utilize in their operational cycle?',
    a1: 'MSME enterprise owners log into the portal and register their leftover materials—such as metal cuttings, plastic trimmings, fabric offcuts, or chemical residues—which cannot be recycled or re-used in their existing manufacturing cycle. They input the material type, dimensions/specifications, estimated volume, and factory location.',
    tag1: 'Scrap Registration',
    q2: 'How does LoopGrid’s categorized inventory system work for processing buyers?',
    a2: 'LoopGrid pools together registered resources of the same category, purity grade, and physical specifications from multiple nearby MSMEs into cohesive commercial inventory lots. Processing enterprises that require secondary feedstocks browse these categorized lots and purchase them in bulk according to their production requirements.',
    tag2: 'Categorized Inventory',
    q3: 'How does the AI select nearby buyers and assign transit partners with fixed per-km rates?',
    a3: 'Transport is the biggest cost factor in material recovery. Our AI algorithm calculates geographic proximity to find the nearest qualified processing enterprise, minimizing total transit kilometers. The platform then instantly assigns a contracted transit partner whose cost-per-kilometer tariff has already been pre-agreed with LoopGrid.',
    tag3: 'AI Proximity & Transit',
    q4: 'How does the buy-sell transaction and payment split work between all parties?',
    a4: 'LoopGrid processes the transaction in real time. We collect the full lot payment from the processing enterprise. Our economic settlement engine then retains LoopGrid’s commission, pays the transit partner based on the pre-decided per-kilometer rate, and disburses the net sales proceeds directly to the MSME partner’s bank account upon dock delivery.',
    tag4: 'Real-Time Payment Split',
  },
  cta: {
    badge: 'Turn Shop-Floor Waste into Working Capital',
    title: 'Ready to Monetize Your Unusable Operational Scrap?',
    subtitle: 'Join hundreds of forward-thinking MSME factories. Stop dumping scrap or selling at a loss. Register your leftover resources on LoopGrid today.',
    registerBtn: 'Register Factory Scrap Stream',
    signUpBtn: 'Sign Up to Register Resources',
  },
  footer: {
    desc: 'LoopGrid aggregates unusable MSME scrap into categorized inventory lots, matched to nearby processing buyers via AI with managed transit and real-time payment settlement.',
    badge: 'Managed industrial circularity for Indian MSMEs',
    pagesTitle: 'Platform Pages',
    faqLink: 'Knowledge Base & FAQ',
    signInLink: 'Enterprise Sign In / Register',
    principlesTitle: 'Core Engine Principles',
    p1: 'Standardized Categorized Lots',
    p2: 'AI Proximity Route Optimization',
    p3: 'Pre-Fixed Transit Tariffs per KM',
    p4: 'Real-Time Automated Disbursements',
    rights: 'LoopGrid. Dedicated to MSME circular economic resilience.',
    pledge: 'A clean, sustainable industrial supply chain',
  },
  auth: {
    returnLanding: 'Return to Landing Page',
    createAccountTitle: 'CREATE AN ACCOUNT',
    createAccountSubtitle: 'Register your enterprise to list unwanted operational scrap and participate in managed inventory lots.',
    signInTitle: 'ENTERPRISE SIGN IN',
    signInSubtitle: 'Log in with your enterprise name and password to access your resource portfolio.',
    tabCreateAccount: 'Create Account',
    tabSignIn: 'Sign In',
    nameLabel: 'NAME OF THE ENTERPRISE',
    namePlaceholder: 'e.g. Apex Precision Engineering Works',
    phoneLabel: 'PHONE NUMBER OF THE ENTERPRISE',
    phonePlaceholder: '+91 98765 43210',
    emailLabel: 'EMAIL ID OF THE ENTERPRISE',
    emailPlaceholder: 'contact@apexprecision.com',
    dealsInLabel: 'WHAT DOES THEIR BUSINESS DEALS IN',
    dealsInPlaceholder: 'e.g. CNC Aerospace Machining & Component Turning',
    resourcesLabel: 'WHAT ARE THE MAJOR RESOURCES THEY WILL DEAL WITH',
    resourcesPlaceholder: 'e.g. 6061 Aluminum Swarf, High-Speed Steel Lathe Turnings',
    roleLabel: 'THEIR ROLE',
    roleMsme: 'MSME Enterprise',
    roleProcessing: 'Processing Enterprise',
    roleTransit: 'Transit Partner',
    roleBanking: 'Banking Partner',
    addressLabel: 'ADDRESS OF THEIR BUSINESS',
    addressPlaceholder: 'Plot 42, Industrial Area Phase II, Peenya, Bengaluru, Karnataka 560058',
    createPasswordLabel: 'CREATE PASSWORD',
    confirmPasswordLabel: 'CONFIRM PASSWORD',
    loginEnterpriseNameLabel: 'NAME OF THE ENTERPRISE',
    loginEnterpriseNamePlaceholder: 'Enter registered enterprise name',
    loginPasswordLabel: 'PASSWORD',
    loginPasswordPlaceholder: 'Enter your account password',
    submitCreateAccount: 'Create Enterprise Account & Proceed to Profile',
    submitLogin: 'Sign In to Enterprise Profile',
    alreadyAccount: 'Already have an enterprise account? Sign in',
    needAccount: 'Don’t have an account yet? Create an account',
    fillAllFields: 'Please complete all required fields.',
    passwordMismatch: 'Passwords do not match. Please verify Create Password and Confirm Password.',
    passwordLength: 'Password must be at least 6 characters.',
    loginNotFound: 'Enterprise not found. Please verify the name or create a new account.',
    loginWrongPassword: 'Password does not match our records for this enterprise.',
  },
  profile: {
    returnLanding: 'Return to Landing Page',
    badge: 'Enterprise Profile',
    signOut: 'Sign Out',
    verifiedBadge: 'Verified Enterprise Node',
    registerScrapBtn: 'Register Unwanted Resource',
    accountDetails: 'Enterprise Profile & Sovereign ID',
    name: 'Enterprise Name',
    phone: 'Phone Number',
    email: 'Corporate Email',
    role: 'Ecosystem Role',
    dealsIn: 'What Does Your Business Deal In',
    resources: 'Major Resources Dealt With',
    address: 'Physical Business Address',
    home: 'Profile Home',
    dashboard: 'Dashboard',
    searchDrp: 'Search Drp',
    yourDrps: 'Your DRPs',
    registerResources: 'Register Resources',
    payout: 'PAYOUT',
    profileSection: 'Profile Section',
    checkComplianceScore: 'CHECK YOUR COMPLIANCE SCORE',
    complianceScoreBannerTitle: 'Statutory Environmental & Operational Compliance',
    complianceScoreBannerSubtitle: 'Assess your regulatory compliance score, receive real-time government notifications, and unlock low-cost operational efficiency blueprints.',
    recycled: 'RECYCLED',
    co2Saved: 'CO₂ SAVED',
    activeFleet: 'ACTIVE FLEET',
    creditAdvanced: 'CREDIT ADVANCED',
    feedstockSavings: 'FEEDSTOCK SAVINGS',
    receivables: 'RECEIVABLES',
    escrowRepayment: 'ESCROW REPAYMENT',
    ingestedLots: 'INGESTED LOTS',
    registerAssetTitle: 'Register an Asset',
    registerAssetSubtitle: 'Upload residual manufacturing scrap to generate a cryptographically verifiable DRP. LoopGrid aggregates and matches nearby buyers instantly.',
    registerAssetBtn: 'Register New Asset',
    allAssets: 'ALL ASSETS',
    inTransit: 'IN TRANSIT',
    pending: 'PENDING',
    sold: 'SOLD',
    listed: 'LISTED',
    liveScrapStreams: 'Live Registered Scrap Streams',
    languageHeading: 'Language & Regional Localization',
    languageSubtitle: 'Select your preferred Indian manufacturing language. This updates the entire platform interface across all roles.',
    editProfileBtn: 'Edit Profile',
    saveProfileBtn: 'Save Changes',
    cancelBtn: 'Cancel',
    procuredLots: 'Procured Lots',
    acquireLots: 'Acquire Lots',
    activeShipments: 'Active Shipments',
    tripDispatch: 'Trip Dispatch',
    financedDrps: 'Financed DRPs',
    underwriteAdvance: 'Underwrite Advance',
    notificationsTitle: 'Live Industrial Alerts',
    openProfileTooltip: 'Open Profile Section',
    changeLanguage: 'Change Language',
    activityLog: 'Activity Log',
    activityLogTitle: 'Industrial Resource Activity Log',
    activityLogSubtitle: 'Verifiable history of industrial resource lots registered, traded, dispatched, assayed, and settled by the enterprise.',
    recentActivity: 'Recent Activity Log',
    viewAllActivity: 'View Full Activity Log',
    allActivityFilter: 'All Activities',
    registeredFilter: 'Lots Registered',
    tradedFilter: 'Traded & Procured',
    transitFilter: 'In Transit / Dispatched',
    settledFilter: 'Settled Payouts',
    searchActivityPlaceholder: 'Search by Lot ID, DRP, resource, or counterparty...',
    exportAuditTrail: 'Export Audit Log (PDF)',
    lotIdLabel: 'Lot & DRP ID',
    resourceLabel: 'Resource & Grade',
    quantityLabel: 'Quantity & Value',
    valueLabel: 'Financial Value',
    counterpartyLabel: 'Counterparty / Destination',
    actionLabel: 'Lifecycle Event',
    dateLabel: 'Timestamp',
    inspectPassportBtn: 'Inspect DRP Passport',
    managedTransit: 'Managed Transit',
    managedTransitTitle: 'Managed Transit & Consignment Tracker',
    managedTransitSubtitle: 'Live logistics milestone tracking, multi-stage progress bars, and GPS telemetry for registered industrial lots.',
    awaitingPickup: 'Awaiting Pickup',
    inTransitStage: 'In Transit',
    processedStage: 'Processed & Recycled',
    settings: 'Settings',
    settingsSubtitle: 'Platform preferences, regional language, and compliance settings',
    wasteDiversion: 'Waste Diversion Chart',
  },
  demoSelect: {
    backToSignIn: 'Back to Sign In',
    title: 'Select an Enterprise Role to Test Drive',
    subtitle: 'Experience LoopGrid from any perspective in the circular supply chain. Same clean interface, role-specific operational data.',
    badge: 'Interactive Industrial Test Drives',
    landingPageLink: 'Landing Page',
    launchDashboard: 'Launch Profile Dashboard',
    roleMsme: 'MSME Enterprise',
    roleMsmeTag: 'Resource Provider / Generator',
    roleProcessing: 'Processing Enterprise',
    roleProcessingTag: 'Resource Buyer & Smelter',
    roleTransit: 'Transit Partner',
    roleTransitTag: 'Fleet & Industrial Logistics',
    roleBanking: 'Financing Partner',
    roleBankingTag: 'Working Capital & Factoring',
  },
  compliance: {
    pageTitle: 'Enterprise Statutory Compliance & Operational Efficiency Engine',
    pageSubtitle: 'A mathematically calibrated scoring model aligned with CPCB, SPCB, and MoEFCC regulations, with low-cost implementation blueprints.',
    returnBtn: 'Back to Profile Dashboard',
    tabAssessment: 'Compliance Assessment Checklist',
    tabRegulations: 'Real-Time Govt Notifications',
    tabImplementation: 'Operational Efficiency Blueprints',
    tabLowCostHacks: 'Low-Cost Compliance Hacks',
    scoreTitle: 'Overall Compliance Index',
    scoreGrade: 'Grade A — Industrial Sovereign Compliant',
    penaltySavings: 'Estimated Penalty Avoidance: ₹14.5 Lakhs saved annually',
    realtimeAlerts: 'Real-Time CPCB / SPCB Synopses',
    filterAll: 'All Categories',
    filterHazardous: 'Hazardous Waste',
    filterEpr: 'EPR & Circularity',
    filterAirWater: 'Air & Water Act',
    filterEnergy: 'Energy & Carbon',
    filterSafety: 'Factory Safety',
    efficiencyTipLabel: 'Operational Efficiency Dividend',
    lowCostLabel: 'Low-Cost Implementation Blueprint',
    downloadAuditSummary: 'Download Compliance Audit Certificate',
  },
  drpModal: {
    title: 'Digital Resource Passport (DRP)',
    sovereignBadge: 'Sovereign Physical-Digital Asset Token',
    currentLocation: 'Current Physical Location & Facility Dock',
    custodyState: 'Custody & Holding State',
    saleStatus: 'Current Sale & Commercial Status',
    liveTransitTracking: 'Live GPS Telemetry & Vehicle Tracking',
    marketSpotRate: 'Real-Time Index Spot Rate',
    finalPayoutWaterflow: 'Net Payout Waterfall to Enterprise',
    close: 'Close Passport',
    viewBlockchain: 'Verify Hash on Ledger',
  },
  modal: {
    badge: 'LoopGrid Industrial Registration',
    title: 'Register Your Unwanted Resource Stream',
    subtitle: 'Stop discarding unusable manufacturing residuals. Connect with nearby processing buyers, guaranteed transit, and real-time bank payouts.',
    roleLabel: 'I am registering as:',
    roleMsme: 'MSME Supplier (Selling Scrap)',
    roleProcessing: 'Processing Buyer (Buying Lots)',
    roleTransit: 'Transit Partner (Fleet Operator)',
    businessNameLabel: 'Enterprise Name',
    businessNamePlaceholder: 'e.g. Apex Engineering Ltd',
    industryLabel: 'Manufacturing Sector',
    materialTypeLabel: 'Residual Material Category',
    tonnageLabel: 'Estimated Monthly Volume',
    emailLabel: 'Contact Email',
    phoneLabel: 'Mobile Number',
    locationLabel: 'Factory / Loading Dock Address',
    locationPlaceholder: 'e.g. Phase 2, Peenya Industrial Area, Bengaluru',
    submitBtn: 'Submit Unwanted Resource Stream',
    successTitle: 'Resource Stream Registered Successfully!',
    successDesc: 'Our AI matching engine will group this into categorized inventory lots and alert nearby processing buyers with pre-negotiated transit.',
    closeBtn: 'Close Window',
  },
  faqPage: {
    returnBtn: 'Return to Landing Page',
    signInBtn: 'Sign In / Register',
    joinBtn: 'Register Scrap Stream',
    badge: 'Knowledge Base & FAQ',
    title: 'Inventory, Transit & Settlement Guidance',
    subtitle: 'Clear, actionable answers on registering unusable scrap, lot aggregation, AI proximity matching, pre-negotiated transit, and real-time payment splits.',
    searchPlaceholder: 'Search by keyword (e.g. registration, inventory lot, proximity, transit partner, per-km, commission)...',
    clear: 'Clear',
    reset: 'Reset filters',
    noResults: 'No questions found matching your search.',
    catAll: 'All Questions',
    catReg: 'Scrap Registration',
    catInv: 'Categorized Lot Inventory',
    catTransit: 'Transit & Per-KM Rates',
    catSettlement: 'Payment Splits',
    catProcessing: 'Processing Buyers',
    bottomTitle: 'Have questions about your factory scrap stream or fleet partnership?',
    bottomSubtitle: 'Our circular logistics team works directly with workshop owners, processing mills, and regional transport fleets.',
    registerBtn: 'Register Scrap Stream',
    backOverviewBtn: 'Back to Overview',
    faqs: [
      {
        id: 0,
        category: 'registration',
        categoryLabel: 'Scrap Registration',
        question: 'How do MSMEs register unwanted scrap they cannot utilize in their operational cycle?',
        answer: 'MSME owners log into the portal and register leftover materials—such as metal cuttings, plastic trimmings, fabric offcuts, or chemical residues—which cannot be recycled in their existing manufacturing cycle. They input the material type, dimensions, estimated volume, and factory location.',
      },
      {
        id: 1,
        category: 'inventory',
        categoryLabel: 'Categorized Lot Inventory',
        question: 'How does LoopGrid’s categorized inventory system work for processing buyers?',
        answer: 'LoopGrid pools together registered resources of the same category, purity grade, and physical specifications from multiple nearby MSMEs into cohesive commercial inventory lots. Processing enterprises browse these categorized lots and purchase them in bulk according to their production requirements.',
      },
      {
        id: 2,
        category: 'transit',
        categoryLabel: 'Transit & Per-KM Rates',
        question: 'How does the AI select nearby buyers and assign transit partners with fixed per-km rates?',
        answer: 'Transport is the biggest cost factor in material recovery. Our AI algorithm calculates geographic proximity to find the nearest qualified processing enterprise, minimizing total transit kilometers. The platform then instantly assigns a contracted transit partner whose cost-per-kilometer tariff has already been pre-agreed with LoopGrid.',
      },
      {
        id: 3,
        category: 'settlement',
        categoryLabel: 'Payment Splits',
        question: 'How does the buy-sell transaction and payment split work between all parties?',
        answer: 'LoopGrid processes the transaction in real time. We collect the full lot payment from the processing enterprise. Our economic settlement engine then retains LoopGrid’s commission, pays the transit partner based on the pre-decided per-kilometer rate, and disburses the net sales proceeds directly to the MSME partner’s bank account upon dock delivery.',
      },
      {
        id: 4,
        category: 'transit',
        categoryLabel: 'Transit & Per-KM Rates',
        question: 'How are cost-per-kilometer transit tariffs determined and who pays them?',
        answer: 'LoopGrid pre-negotiates fixed per-kilometer freight tariffs with verified commercial regional fleet operators. The transit cost is calculated strictly based on the route distance between the MSME loading dock and the processing plant. The buyer pays for the complete lot including transit, and LoopGrid directly disburses the transit partner their full tariff upon delivery scan.',
      },
      {
        id: 5,
        category: 'inventory',
        categoryLabel: 'Categorized Lot Inventory',
        question: 'How does LoopGrid ensure the purity and metallurgical grade of pooled scrap lots?',
        answer: 'When MSMEs register materials, they provide mill test certificates, alloy designations (e.g. 6061-T6 Aluminum or Virgin HDPE), or photo verification. LoopGrid classifies these into standardized purity lots so processing buyers receive predictable, verified feedstock without batch contamination.',
      },
      {
        id: 6,
        category: 'settlement',
        categoryLabel: 'Payment Splits',
        question: 'How quickly does the MSME receive their money after the scrap leaves the factory?',
        answer: 'The processing enterprise pays LoopGrid upfront when ordering the lot. Once our transit partner delivers the lot to the buyer’s dock and the intake scan is verified, LoopGrid immediately executes the payment split: paying the transit driver and transferring the net sales proceeds directly to the MSME’s bank account within 24 business hours.',
      },
      {
        id: 7,
        category: 'processing',
        categoryLabel: 'Processing Buyers',
        question: 'How do processing enterprises purchase aggregated lots according to their requirements?',
        answer: 'Processing mills and recycling enterprises log into the LoopGrid portal, specify their monthly raw material input requirements (e.g., 20 tons of 304 Stainless scrap or 5 tons of clean PP purgings), and browse categorized lots available in their regional radius.',
      },
      {
        id: 8,
        category: 'registration',
        categoryLabel: 'Scrap Registration',
        question: 'What types of unusable resources can an MSME register?',
        answer: 'Any solid manufacturing residual that cannot be re-used in your facility’s existing machines—including CNC lathe turnings, metal offcuts, punching trimmings, injection molding sprues, technical textile cutoffs, veneer scraps, and agro-processing pomace.',
      },
      {
        id: 9,
        category: 'registration',
        categoryLabel: 'Scrap Registration',
        question: 'Is there a minimum quantity threshold to register unusable scrap on LoopGrid?',
        answer: 'No heavy minimums. You can list as little as 200 kg or 1 standard industrial pallet. LoopGrid’s multi-party pooling engine aggregates small batches from nearby facilities in the same industrial cluster until an efficient truckload lot is formed.',
      },
      {
        id: 10,
        category: 'transit',
        categoryLabel: 'Transit & Per-KM Rates',
        question: 'Who manages the loading, unloading, and transit insurance during transportation?',
        answer: 'The MSME loads the material onto the assigned transit vehicle at their factory dock. The commercial carrier verifies the batch weight and manifest, while transit insurance and goods-in-transit documentation are managed through LoopGrid’s automated digital logistics network.',
      },
      {
        id: 11,
        category: 'settlement',
        categoryLabel: 'Payment Splits',
        question: 'What happens if a processing buyer disputes the scrap specifications upon arrival?',
        answer: 'Because lots are standardized and photographed at registration, disputes are rare. In case of variance, LoopGrid holds funds in escrow and dispatches an authorized regional inspector to reconcile the batch within 12 hours.',
      },
    ],
  },
};

// -------------------------------------------------------------
// HINDI TRANSLATIONS (हिन्दी)
// -------------------------------------------------------------
const hiTranslations: Translations = {
  nav: {
    faq: 'सामान्य प्रश्न (FAQ)',
    support: 'सहायता (Support)',
    impact: 'पर्यावरण प्रभाव',
    integration: 'सरल एकीकरण',
    process: 'संचालन एवं वित्तीय मॉडल',
    signIn: 'साइन इन / खाता बनाएं',
    registerScrap: 'स्क्रैप दर्ज करें',
    platformPages: 'प्लेटफ़ॉर्म पेज',
    home: 'मुख्य पृष्ठ (होम)',
    faqKnowledge: 'ज्ञान केंद्र व FAQ',
    signInPage: 'उद्यम खाता पेज',
    tagline: 'LoopGrid • MSME के लिए प्रबंधित चक्रीय व्यवस्था',
  },
  hero: {
    badge: 'MSME के लिए स्क्रैप इन्वेंटरी प्रबंधन • AI निकटता आधारित लॉट मैचिंग',
    headlineStart: 'कारखाने के अनुपयोगी स्क्रैप से कमाएं',
    headlineHighlight: 'गारंटीड मुनाफा',
    subtitle:
      'MSMEs अपने उन बचे संसाधनों को पंजीकृत करते हैं जिनका वे अपनी निर्माण प्रक्रिया में दोबारा उपयोग नहीं कर सकते। LoopGrid उनका मानकीकृत इन्वेंटरी लॉट बनाता है, AI द्वारा निकटतम प्रोसेसिंग खरीदार से जोड़ता है, निर्धारित प्रति-किमी दर पर ट्रांसपोर्टर आवंटित करता है, और तत्काल भुगतान करता है।',
    startBtn: 'अनुपयोगी स्क्रैप दर्ज करें',
    howItWorksBtn: '5 चरणों की प्रक्रिया देखें',
    card1Title: 'पर्यावरण सुरक्षा',
    card1Desc: 'कारखाने के अनुपयोगी कटिंग और स्क्रैप को डंपिंग यार्ड में जाने से बचाएं और प्रदूषण कम करें।',
    card2Title: 'वर्गीकृत लॉट इन्वेंटरी',
    card2Desc: 'LoopGrid एक ही ग्रेड और स्पेक के छोटे स्क्रैप को बड़े लॉट में जोड़ता है जिसे प्रोसेसिंग मिले सीधे खरीद सकें।',
    card3Title: 'प्रबंधित ट्रांसपोर्ट व तत्काल भुगतान',
    card3Desc: 'AI सबसे नजदीकी खरीदार चुनता है, प्रति किमी तय दर पर गाड़ी भेजता है और डिलीवरी पर तत्काल बैंक ट्रांसफर करता है।',
  },
  problem: {
    badge: 'MSME कारखानों की स्क्रैप समस्या',
    title: 'अनुपयोगी कट-पीस और स्क्रैप गोदामों में पड़ा रहता है या कौड़ियों के भाव बिकता है।',
    subtitle: 'उत्पादन चक्र के दौरान MSME कारखानों में ऐसा स्क्रैप निकलता है जिसका वे स्वयं दोबारा उपयोग नहीं कर सकते। कम मात्रा होने के कारण बड़ी मिलें सीधे नहीं खरीदतीं और स्थानीय कबाड़ी भारी नुकसान में खरीदते हैं।',
    p1Title: 'उत्पादन चक्र में पुनः उपयोग असंभव',
    p1Desc: 'खराद के टर्निंग्स, शीट कट-पीस और ट्रिमिंग मौजूदा मशीनों में नहीं लग सकते और कारखाने में जगह घेरते हैं।',
    p2Title: 'कबाड़ी भारी घाटे में खरीदते हैं',
    p2Desc: 'स्थानीय बिचौलिए मनमाने दाम लगाते हैं और उच्च गुणवत्ता के माल को सस्ते कचरे की तरह पिघला देते हैं।',
    p3Title: 'कम मात्रा होने से बड़ी मिले नहीं लेतीं',
    p3Desc: 'प्रोसेसिंग इकाइयों को भारी मात्रा (लॉट) चाहिए होती है, जो अकेला छोटा कारखाना उपलब्ध नहीं करा पाता।',
    p4Title: 'माल ढुलाई का भारी खर्च',
    p4Desc: 'बिना स्थानीय निकटता के ट्रांसपोर्ट का किराया स्क्रैप की कीमत से भी ज्यादा हो जाता है।',
    quote: '“LoopGrid सभी छोटे कारखानों के स्क्रैप को मिलाकर लॉट बनाता है, पास के खरीदार को बेचता है और ट्रांसपोर्ट व पेमेंट खुद संभालता है।”',
  },
  solution: {
    badge: 'LoopGrid प्लेटफॉर्म',
    title: 'वर्गीकृत इन्वेंटरी और रीयल-टाइम निकटता आधारित मैचिंग',
    subtitle: 'हम कारखाने के अनुपयोगी कचरे को मानकीकृत लॉट में बदलते हैं, नजदीकी खरीदार को AI से ढूंढते हैं और ट्रांसपोर्टर से डिलीवरी कराते हैं।',
    step1Num: '01',
    step1Title: 'अनुपयोगी संसाधन दर्ज करें',
    step1Desc: 'MSME मालिक अपने उस स्क्रैप का विवरण डालते हैं जो उनकी वर्तमान मशीनरी में दोबारा इस्तेमाल नहीं हो सकता।',
    step2Num: '02',
    step2Title: 'वर्गीकृत लॉट इन्वेंटरी',
    step2Desc: 'हमारा सिस्टम एक जैसे ग्रेड और विनिर्देश वाले स्क्रैप को बड़े व्यावसायिक लॉट में एकत्रित करता है।',
    step3Num: '03',
    step3Title: 'निकटतम खरीदार व तय ट्रांसपोर्ट',
    step3Desc: 'AI सबसे पास की प्रोसेसिंग यूनिट को ढूंढता है ताकि किराया कम रहे, और तय प्रति-किमी दर पर गाड़ी आवंटित करता है।',
    algoBadge: 'AI निकटता एवं अनुकूलन',
    complexityTitle: 'नजदीकी खरीदार क्यों महत्वपूर्ण है?',
    complexityP1: 'स्क्रैप व्यापार में माल ढुलाई सबसे बड़ा खर्च है। यदि स्क्रैप 400 किमी दूर जाएगा तो पूरा मुनाफा भाड़े में चला जाएगा।',
    complexityP2: 'LoopGrid का AI तुरंत नजदीकी प्रोसेसिंग यूनिट से मिलान करता है और हमारे अनुबंधित ट्रांसपोर्टर को तय प्रति-किमी दर पर भेजता है। खरीदार LoopGrid को भुगतान करता है, हम अपना कमीशन लेते हैं, ट्रांसपोर्टर को प्रति-किमी भाड़ा देते हैं और MSME को उसका शुद्ध मुनाफा तुरंत देते हैं।',
    tag1: 'तय प्रति-किमी भाड़ा',
    tag2: 'वर्गीकृत लॉट इन्वेंटरी',
    tag3: 'रीयल-टाइम पेमेंट विभाजन',
    examplesTitle: 'सफल लॉट सप्लाई',
    ex1From: 'विमानन-ग्रेड एल्युमिनियम टर्निंग्स',
    ex1To: 'निकटवर्ती फाउंड्री (22 किमी)',
    ex1Val: 'तय प्रति-किमी दर पर सीधी डिलीवरी',
    ex2From: 'पॉलीप्रोपाइलीन प्लास्टिक कटिंग्स',
    ex2To: 'प्लास्टिक कंपाउंडर (18 किमी)',
    ex2Val: 'इन्वेंटरी से पूरा लॉट खरीदा गया',
    ex3From: 'डेनिम कपड़े की कतरनें',
    ex3To: 'एकाउस्टिक इंसुलेशन फैक्ट्री (35 किमी)',
    ex3Val: '24 घंटे में MSME को डायरेक्ट बैंक ट्रांसफर',
  },
  impact: {
    badge: 'पर्यावरण संरक्षण',
    title: 'अनुपयोगी स्क्रैप का शत-प्रतिशत औद्योगिक पुनर्चक्रण',
    subtitle: 'हर लॉट को नजदीकी खरीदार तक पहुंचाकर हम लैंडफिल डंपिंग रोकते हैं, ट्रांसपोर्ट का धुआं घटाते हैं और नए कच्चे माल का खनन बचाते हैं।',
    p1Title: 'शून्य लैंडफिल डंपिंग',
    p1Desc: 'कारखानों का अनुपयोगी कचरा सीधे सेकेंडरी मैन्युफैक्चरिंग में जाता है।',
    p2Title: 'परिवहन उत्सर्जन में कमी',
    p2Desc: 'AI नजदीकी खरीदार चुनता है जिससे ट्रकों का डीजल और कार्बन उत्सर्जन कम होता है।',
    p3Title: 'कच्चे माल की आत्मनिर्भरता',
    p3Desc: 'घरेलू स्क्रैप का उपयोग होने से महंगे आयातित धातुओं और प्लास्टिक पर निर्भरता घटती है।',
    deepDiveBadge: 'औद्योगिक सामग्री विश्लेषण',
    deepDiveTitle: 'LoopGrid द्वारा प्रबंधित मुख्य स्क्रैप श्रेणियां',
    metalsTitle: 'धातु व मिश्रधातु टर्निंग्स, बार-एंड्स व कटिंग्स',
    metalsDesc: 'सीएनसी वर्कशॉप्स का धातु कचरा जिसे फाउंड्री सीधे पिघलाकर नए उत्पाद बनाती है।',
    metalsStatLabel: 'अयस्क शोधन बचा',
    metalsStatVal: '90% तक',
    textilesTitle: 'कपड़ा कतरन, सेल्वेज व फैब्रिक वेस्ट',
    textilesDesc: 'गार्मेंट फैक्ट्रियों की कतरनें वाहनों के इंसुलेशन और साउंडप्रूफिंग में काम आती हैं।',
    textilesStatLabel: 'जल संरक्षण',
    textilesStatVal: 'हजारों लीटर प्रति लॉट',
    polymersTitle: 'थर्मोप्लास्टिक रिजेक्ट व इंजेक्शन स्प्रू',
    polymersDesc: 'नायलॉन, एचडीपीई और एबीएस के टुकड़े जिन्हें री-पैलेटाइज किया जाता है।',
    polymersStatLabel: 'कच्चा पेट्रोलियम बचा',
    polymersStatVal: '2.1 kg CO₂e / kg',
    timberTitle: 'लकड़ी व प्लाईवुड के कट-पीस',
    timberDesc: 'फर्नीचर कारखानों की बची लकड़ी कंपोजिट बोर्ड और पैकेजिंग में इस्तेमाल होती है।',
    timberStatLabel: 'लकड़ी का सदुपयोग',
    timberStatVal: '100% लॉट उपयोग',
    organicsTitle: 'खाद्य प्रसंस्करण व कृषि अवशेष',
    organicsDesc: 'रस और खाद्य फैक्ट्रियों के छिलके व अवशेष पशु आहार और बायो-पैकेजिंग बनते हैं।',
    organicsStatLabel: 'मीथेन गैस से मुक्ति',
    organicsStatVal: 'शून्य सड़ांध कचरा',
    verifiedNote: 'प्रत्येक लॉट की डिलीवरी पर डिजिटल ऑडिट प्रमाण पत्र जारी होता है।',
    catMetals: 'धातु व मिश्रधातु',
    catTextiles: 'कपड़ा व चमड़ा',
    catPolymers: 'पॉलिमर व प्लास्टिक',
    catTimber: 'लकड़ी व कागज',
    catOrganics: 'जैविक सह-उत्पाद',
    metalsB1: 'नए बॉक्साइट और लौह अयस्क खनन की आवश्यकता खत्म',
    metalsB2: 'सल्फर डाइऑक्साइड और फाउंड्री वायु प्रदूषण से सीधी मुक्ति',
    metalsB3: 'द्वितीयक कास्टिंग के लिए उच्च गुणवत्ता और मजबूती बरकरार',
    textilesB1: 'सिंथेटिक माइक्रोप्लास्टिक को मिट्टी और नालों में जाने से रोकता है',
    textilesB2: 'हानिकारक रासायनिक डाई और कपास की अत्यधिक खेती में कमी',
    textilesB3: 'औद्योगिक क्षेत्रों में 100% परिपत्र सामग्री चक्र',
    polymersB1: 'प्लास्टिक को खुले डंपिंग यार्ड में सड़ने या जलने से बचाता है',
    polymersB2: 'छोटे इंजेक्शन मोल्डर्स को थोक में उच्च-ग्रेड दाना सुलभ कराता है',
    polymersB3: 'कच्चे पेट्रोलियम क्रैकिंग और तेल शोधन पर निर्भरता कम करता है',
    timberB1: 'टिकाऊ लकड़ी के सामानों में कार्बन को स्थायी रूप से संचित रखता है',
    timberB2: 'प्राकृतिक जंगलों की अंधाधुंध कटाई पर दबाव कम करता है',
    timberB3: 'खुले में लकड़ी जलाने और मीथेन उत्सर्जन से पूरी तरह बचाता है',
    organicsB1: 'सड़ने से पैदा होने वाली खतरनाक मीथेन गैस को रोकता है',
    organicsB2: 'थर्माकोल (Styrofoam) की जगह पर्यावरण-अनुकूल पैकेजिंग बनाता है',
    organicsB3: 'कृषि और स्थानीय मिट्टी के पुनरुद्धार के लिए जैविक पोषक चक्र बनाता है',
  },
  integration: {
    badge: 'दैनिक कारखाने के लिए',
    title: 'कारखाना मालिकों के लिए स्क्रैप दर्ज करना बेहद आसान',
    subtitle: 'बिना किसी जटिल सॉफ्टवेयर के 2 मिनट में स्क्रैप दर्ज करें। माल बिकने पर हमारे ट्रांसपोर्ट पार्टनर आपकी लोडिंग गोदी से माल उठा लेंगे।',
    f1Title: 'शून्य IT खर्च',
    f1Desc: 'स्मार्टफोन ब्राउज़र में सीधे चलता है। किसी ERP या अतिरिक्त कंप्यूटर की जरूरत नहीं।',
    f2Title: '2 मिनट में स्क्रैप दर्ज करें',
    f2Desc: 'फोटो लें, अनुमानित वजन और ग्रेड डालें। इन्वेंटरी सिस्टम बाकी काम खुद संभालता है।',
    f3Title: 'कम माल भी स्वीकार्य',
    f3Desc: '200 किलो या एक पैलेट माल भी दर्ज करें। हमारा सिस्टम अन्य कारखानों के माल के साथ लॉट बना देता है।',
    f4Title: 'तय प्रति-किमी भाड़ा',
    f4Desc: 'LoopGrid ने ट्रांसपोर्टरों के साथ प्रति-किमी दर पहले से तय कर रखी है। भाड़े पर कोई माथापच्ची नहीं।',
    f5Title: 'स्वचालित कानूनी और वित्तीय कागजात',
    f5Desc: 'खरीदार से पैसा लेना, ट्रांसपोर्टर को भाड़ा देना और MSME को शुद्ध भुगतान — सब रीयल-टाइम में होता है।',
    f6Title: 'SMS / WhatsApp सूचनाएं',
    f6Desc: 'लॉट बिकते ही और गाड़ी डिस्पैच होते ही तुरंत मोबाइल पर संदेश प्राप्त करें।',
    bannerBadge: 'सरल दुकान-तल व्यवस्था',
    bannerTitle: 'कबाड़ के डिब्बे से सीधे बैंक खाते तक केवल 3 कदम',
    bannerDesc: 'कबाड़ माफिया और बिचौलियों को हटाएं। तयशुदा दर, नजदीकी खरीदार और पक्का बैंक भुगतान पाएं।',
    b1Title: 'महंगे वजन कांटों की जरूरत नहीं',
    b1Desc: 'कारखाने के मौजूदा कांटे या धर्मकांटे की पर्ची से काम हो जाता है।',
    b2Title: 'सभी निर्माण उद्योगों के अनुकूल',
    b2Desc: 'मशीनिंग, कपड़ा, प्लास्टिक, ढलाई, पैकेजिंग और लकड़ी का काम।',
    b3Title: 'सुपरवाइजर के लिए बेहद सरल',
    b3Desc: 'सरल हिंदी और स्थानीय भाषाओं में उपलब्ध ताकि कोई भी आसानी से चला सके।',
  },
  process: {
    badge: 'संचालन एवं वित्तीय मॉडल',
    title: 'अनुपयोगी MSME स्क्रैप से लेकर प्रोसेसिंग लॉट और रीयल-टाइम भुगतान तक',
    subtitle: 'MSME अनुपयोगी स्क्रैप दर्ज करते हैं। LoopGrid वर्गीकृत लॉट बनाता है, AI पास के खरीदार को ढूंढता है, तय प्रति-किमी भाड़े पर गाड़ी जाती है और पेमेंट तुरंत बंटता है।',
    step1Title: 'MSME अनुपयोगी स्क्रैप पंजीकरण',
    step1Desc: 'कारखाना मालिक अपने उस बचे हुए स्क्रैप, कट-ऑफ और अवशेष को दर्ज करते हैं जो उनके मौजूदा कारखाने में काम नहीं आ सकता।',
    step1Tag: 'शॉप-फ्लोर कचरा मुक्त',
    step2Title: 'वर्गीकृत लॉट इन्वेंटरी',
    step2Desc: 'LoopGrid समान श्रेणी, विनिर्देश और रासायनिक ग्रेड के स्क्रैप को मिलाकर एक मानकीकृत इन्वेंटरी लॉट बनाता है।',
    step2Tag: 'व्यावसायिक लॉट मानकीकरण',
    step3Title: 'प्रोसेसिंग इकाइयों द्वारा लॉट खरीद',
    step3Desc: 'औद्योगिक प्रोसेसिंग फैक्ट्रियां अपनी कच्ची सामग्री की आवश्यकता अनुसार इन्वेंटरी से थोक में लॉट खरीदती हैं।',
    step3Tag: 'थोक कच्चा माल खरीद',
    step4Title: 'AI निकटता मिलान व ट्रांसपोर्ट आवंटन',
    step4Desc: 'हमारा AI सिस्टम सबसे नजदीकी खरीदार ढूंढकर ढुलाई खर्च घटाता है और तय प्रति-किमी भाड़े पर ट्रांसपोर्टर भेजता है।',
    step4Tag: 'न्यूनतम भाड़ा व कम प्रदूषण',
    step5Title: 'रीयल-टाइम पेमेंट विभाजन',
    step5Desc: 'खरीदार से पैसा लेकर LoopGrid अपना कमीशन लेता है, ट्रांसपोर्टर को प्रति किमी भाड़ा देता है, और MSME को शुद्ध भुगतान करता है।',
    step5Tag: 'तत्काल बैंक खाता भुगतान',
    flowBadge: 'पारदर्शी वित्तीय एवं परिवहन संरचना',
    flowTitle: 'LoopGrid की वित्तीय और लॉजिस्टिक्स व्यवस्था कैसे काम करती है',
    flowDesc: 'न तो MSME को भाड़े की माथापच्ची करनी है और न ही भुगतान में देरी की चिंता। LoopGrid पूरे लेन-देन और ट्रांसपोर्ट का केंद्रीय प्रबंधक है।',
    p1Title: 'पहले से तय प्रति-किमी भाड़ा:',
    p1Desc: 'LoopGrid और ट्रांसपोर्टरों के बीच प्रति-किमी दर पहले से तय होती है। किसी भी पक्ष को मोलभाव नहीं करना पड़ता।',
    p2Title: 'AI निकटता रूटिंग:',
    p2Desc: 'सबसे पास की फैक्ट्री से मिलान करने से दूरी कम होती है और ट्रांसपोर्ट का खर्च सीधे घटता है।',
    p3Title: 'गारंटीड रीयल-टाइम बैंक भुगतान:',
    p3Desc: 'खरीदार की गोदी पर माल उतरते ही MSME और ट्रांसपोर्टर दोनों को तुरंत बैंक खाते में भुगतान हो जाता है।',
    waterfallHeader: 'लेन-देन एवं भुगतान विभाजन (Waterfall)',
    wf1Tag: '1. खरीदार द्वारा भुगतान',
    wf1Buyer: 'प्रोसेसिंग खरीदार',
    wf1Val: '100% लॉट मूल्य',
    wf1Desc: 'मानकीकृत लॉट का पूरा इनवॉइस मूल्य सीधे LoopGrid को अदा करता है।',
    wf2Tag: '2. LoopGrid प्लेटफॉर्म शेयर',
    wf2Name: 'LoopGrid कमीशन',
    wf2Share: 'प्लेटफॉर्म हिस्सा',
    wf2Desc: 'AI इन्वेंटरी मैचिंग, गुणवत्ता सत्यापन और तत्काल निपटान हेतु लिया गया शुल्क।',
    wf3Tag: '3. ट्रांसपोर्टर भुगतान',
    wf3Partner: 'आवंटित ट्रांसपोर्ट पार्टनर',
    wf3Rate: 'तय दर / KM',
    wf3Desc: 'तय दूरी के अनुसार डिलीवरी स्कैन होते ही गाड़ी वाले को सीधा भुगतान।',
    wf4Tag: '4. MSME कारखाना मालिक',
    wf4Recipient: 'MSME सप्लायर',
    wf4Method: 'सीधा बैंक ट्रांसफर',
    wf4Desc: 'अनुपयोगी स्क्रैप का शुद्ध लाभ सीधे मालिक के बैंक खाते में सुरक्षित जमा।',
    registerBtn: 'अनुपयोगी MSME स्क्रैप दर्ज करें',
  },
  faqTeaser: {
    badge: 'सामान्य पूछे जाने वाले प्रश्न',
    title: 'इन्वेंटरी, ट्रांसपोर्ट और भुगतान पर महत्वपूर्ण सवाल',
    subtitle: 'अनुपयोगी स्क्रैप दर्ज करने, लॉट खरीदने, ट्रांसपोर्टर आवंटन और रीयल-टाइम भुगतान पर पूरी जानकारी।',
    viewAllBtn: 'पूरा FAQ पेज देखें',
    bannerTitle: 'क्या आपके पास ट्रांसपोर्ट या भुगतान से जुड़े सवाल हैं?',
    bannerDesc: 'प्रति-किमी भाड़े, गुणवत्ता जांच, लॉट निर्माण और 24 घंटे में भुगतान के बारे में विस्तार से पढ़ें।',
    q1: 'MSME अपने उस स्क्रैप को कैसे दर्ज करते हैं जो उनके उत्पादन चक्र में काम नहीं आ सकता?',
    a1: 'कारखाना मालिक पोर्टल पर लॉगिन कर अपने बचे हुए संसाधनों—जैसे खराद के टर्निंग्स, प्लास्टिक कतरन, कपड़े के टुकड़े आदि—का विवरण दर्ज करते हैं जिनका वे अपनी फैक्टरी में दोबारा इस्तेमाल नहीं कर सकते। वे मात्रा, अनुमानित वजन और पता दर्ज करते हैं।',
    tag1: 'स्क्रैप पंजीकरण',
    q2: 'LoopGrid का वर्गीकृत इन्वेंटरी सिस्टम खरीदारों के लिए कैसे काम करता है?',
    a2: 'LoopGrid कई MSMEs के एक जैसे ग्रेड और विनिर्देश वाले स्क्रैप को एक बड़े व्यावसायिक इन्वेंटरी लॉट में जोड़ता है। प्रोसेसिंग फैक्ट्रियां अपनी जरूरत के अनुसार इन लॉट्स को सीधे थोक में खरीदती हैं।',
    tag2: 'वर्गीकृत इन्वेंटरी',
    q3: 'AI नजदीकी खरीदार कैसे चुनता है और तय प्रति-किमी दर पर ट्रांसपोर्ट कैसे मिलता है?',
    a3: 'भाड़ा बचाने के लिए AI सबसे पास की योग्य प्रोसेसिंग फैक्ट्री ढूंढता है। इसके बाद हमारे अनुबंधित ट्रांसपोर्ट पार्टनर को गाड़ी आवंटित की जाती है, जिसकी प्रति-किमी दर LoopGrid द्वारा पहले से तय होती है।',
    tag3: 'AI निकटता व ट्रांसपोर्ट',
    q4: 'खरीदार से पैसा मिलने और सभी पक्षों में बटने की प्रक्रिया क्या है?',
    a4: 'LoopGrid रीयल-टाइम में सौदा पूरा करता है। हम खरीदार से 100% राशि लेते हैं। फिर हमारा प्लेटफॉर्म कमीशन काटा जाता है, ट्रांसपोर्टर को प्रति-किमी के हिसाब से भाड़ा दिया जाता है, और शेष शुद्ध मुनाफा MSME के बैंक खाते में तुरंत भेज दिया जाता है।',
    tag4: 'रीयल-टाइम पेमेंट विभाजन',
  },
  cta: {
    badge: 'कारखाने के कबाड़ को पूंजी बनाएं',
    title: 'क्या आप अपने अनुपयोगी स्क्रैप से पक्की कमाई के लिए तैयार हैं?',
    subtitle: 'सैकड़ों दूरदर्शी कारखानों से जुड़ें। कबाड़ सस्ते में बेचना बंद करें। आज ही LoopGrid पर अपना स्क्रैप दर्ज करें।',
    registerBtn: 'कारखाने का स्क्रैप स्ट्रीम दर्ज करें',
    signUpBtn: 'संसाधन दर्ज करने हेतु खाता बनाएं',
  },
  footer: {
    desc: 'LoopGrid MSME के अनुपयोगी स्क्रैप को वर्गीकृत लॉट में जोड़ता है, AI से पास के खरीदार को बेचता है, और तय भाड़े व रीयल-टाइम भुगतान के साथ प्रबंधित करता है।',
    badge: 'भारतीय MSME के लिए प्रबंधित औद्योगिक चक्रीयता',
    pagesTitle: 'प्लेटफ़ॉर्म पेज',
    faqLink: 'ज्ञान केंद्र व अक्सर पूछे जाने वाले प्रश्न',
    signInLink: 'उद्यम साइन इन / खाता बनाएं',
    principlesTitle: 'मूल सिद्धांत',
    p1: 'मानकीकृत वर्गीकृत लॉट्स',
    p2: 'AI निकटता रूटिंग',
    p3: 'तय प्रति-किमी ट्रांसपोर्ट दरें',
    p4: 'रीयल-टाइम स्वचालित भुगतान',
    rights: 'LoopGrid. भारतीय MSME की चक्रीय आर्थिक आत्मनिर्भरता को समर्पित।',
    pledge: 'एक स्वच्छ व पारदर्शी औद्योगिक आपूर्ति श्रृंखला',
  },
  auth: {
    returnLanding: 'मुख्य पृष्ठ पर वापस जाएं',
    createAccountTitle: 'नया उद्यम खाता बनाएं',
    createAccountSubtitle: 'अनुपयोगी स्क्रैप सूचीबद्ध करने और इन्वेंटरी लॉट में भाग लेने के लिए अपना उद्यम पंजीकृत करें।',
    signInTitle: 'उद्यम साइन इन / लॉगिन',
    signInSubtitle: 'अपने उद्यम नाम और पासवर्ड से लॉगिन करें।',
    tabCreateAccount: 'खाता बनाएं',
    tabSignIn: 'साइन इन',
    nameLabel: 'उद्यम का नाम (NAME OF THE ENTERPRISE)',
    namePlaceholder: 'उदा. एपेक्स प्रिसिजन इंजीनियरिंग वर्क्स',
    phoneLabel: 'उद्यम का फ़ोन नंबर (PHONE NUMBER OF THE ENTERPRISE)',
    phonePlaceholder: '+91 98765 43210',
    emailLabel: 'उद्यम का ईमेल आईडी (EMAIL ID OF THE ENTERPRISE)',
    emailPlaceholder: 'contact@apexprecision.com',
    dealsInLabel: 'व्यवसाय किस क्षेत्र में काम करता है (WHAT DOES THEIR BUSINESS DEALS IN)',
    dealsInPlaceholder: 'उदा. सीएनसी एयरोस्पेस मशीनिंग और टर्निंग',
    resourcesLabel: 'मुख्य संसाधन क्या हैं (WHAT ARE THE MAJOR RESOURCES THEY WILL DEAL WITH)',
    resourcesPlaceholder: 'उदा. एल्युमिनियम टर्निंग्स, स्टील कट-ऑफ',
    roleLabel: 'उनकी भूमिका (THEIR ROLE)',
    roleMsme: 'MSME उद्यम (MSME Enterprise)',
    roleProcessing: 'प्रोसेसिंग उद्यम (Processing Enterprise)',
    roleTransit: 'ट्रांसपोर्ट पार्टनर (Transit Partner)',
    roleBanking: 'बैंकिंग पार्टनर (Banking Partner)',
    addressLabel: 'व्यवसाय का पता (ADDRESS OF THEIR BUSINESS)',
    addressPlaceholder: 'प्लॉट 42, इंडस्ट्रियल एरिया, पीन्या, बेंगलुरु, कर्नाटक',
    createPasswordLabel: 'पासवर्ड बनाएं (CREATE PASSWORD)',
    confirmPasswordLabel: 'पासवर्ड की पुष्टि करें (CONFIRM PASSWORD)',
    loginEnterpriseNameLabel: 'उद्यम का नाम',
    loginEnterpriseNamePlaceholder: 'पंजीकृत उद्यम का नाम दर्ज करें',
    loginPasswordLabel: 'पासवर्ड',
    loginPasswordPlaceholder: 'अपना पासवर्ड दर्ज करें',
    submitCreateAccount: 'उद्यम खाता बनाएं और प्रोफाइल पर जाएं',
    submitLogin: 'उद्यम प्रोफाइल में लॉगिन करें',
    alreadyAccount: 'पहले से उद्यम खाता है? साइन इन करें',
    needAccount: 'खाता नहीं है? नया खाता बनाएं',
    fillAllFields: 'कृपया सभी आवश्यक फ़ील्ड भरें।',
    passwordMismatch: 'पासवर्ड मेल नहीं खाते। कृपया पुष्टि करें।',
    passwordLength: 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।',
    loginNotFound: 'उद्यम नहीं मिला। कृपया नाम जांचें या नया खाता बनाएं।',
    loginWrongPassword: 'इस उद्यम के लिए पासवर्ड गलत है।',
  },
  profile: {
    returnLanding: 'मुख्य पृष्ठ पर वापस जाएं',
    badge: 'उद्यम प्रोफ़ाइल',
    signOut: 'लॉग आउट',
    verifiedBadge: 'सत्यापित उद्यम नोड',
    registerScrapBtn: 'अनुपयोगी संसाधन दर्ज करें',
    accountDetails: 'पंजीकृत उद्यम विवरण व पहचान',
    name: 'उद्यम का नाम',
    phone: 'फ़ोन नंबर',
    email: 'ईमेल पता',
    role: 'प्लेटफ़ॉर्म भूमिका',
    dealsIn: 'व्यवसाय का क्षेत्र व कार्य',
    resources: 'मुख्य संसाधन सामग्री',
    address: 'कारखाने का पता',
    home: 'प्रोफाइल होम',
    dashboard: 'डैशबोर्ड',
    searchDrp: 'DRP खोजें',
    yourDrps: 'आपके DRP',
    registerResources: 'संसाधन दर्ज करें',
    payout: 'भुगतान (PAYOUT)',
    profileSection: 'प्रोफाइल सेक्शन',
    checkComplianceScore: 'CHECK YOUR COMPLIANCE SCORE',
    complianceScoreBannerTitle: 'वैधानिक पर्यावरणीय व परिचालन अनुपालन',
    complianceScoreBannerSubtitle: 'अपना विनियामक अनुपालन स्कोर जानें, रीयल-टाइम सरकारी सूचनाएं पाएं, और कम लागत में दक्षता सुधार के उपाय लागू करें।',
    recycled: 'पुनर्चक्रित',
    co2Saved: 'CO₂ बचत',
    activeFleet: 'सक्रिय वाहन',
    creditAdvanced: 'स्वीकृत क्रेडिट',
    feedstockSavings: 'कच्चे माल पर बचत',
    receivables: 'प्राप्य भुगतान',
    escrowRepayment: 'एस्क्रो अदायगी',
    ingestedLots: 'स्वीकृत लॉट्स',
    registerAssetTitle: 'संसाधन दर्ज करें',
    registerAssetSubtitle: 'डिजिटल DRP बनाने हेतु कारखाने का अनुपयोगी स्क्रैप अपलोड करें। LoopGrid निकटतम खरीदार से सीधे जोड़ेगा।',
    registerAssetBtn: 'नया संसाधन दर्ज करें',
    allAssets: 'सभी संसाधन',
    inTransit: 'रास्ते में (IN TRANSIT)',
    pending: 'लंबित',
    sold: 'बिक चुका',
    listed: 'सूचीबद्ध',
    liveScrapStreams: 'लाइव पंजीकृत स्क्रैप विवरण',
    languageHeading: 'भाषा एवं क्षेत्रीय चयन',
    languageSubtitle: 'अपनी पसंदीदा औद्योगिक भाषा चुनें। यह विकल्प पूरे प्लेटफ़ॉर्म पर सभी भूमिकाओं में लागू होगा।',
    editProfileBtn: 'प्रोफाइल संपादित करें',
    saveProfileBtn: 'बदलाव सुरक्षित करें',
    cancelBtn: 'रद्द करें',
    procuredLots: 'प्राप्त लॉट्स',
    acquireLots: 'लॉट खरीदें',
    activeShipments: 'सक्रिय माल-परिवहन',
    tripDispatch: 'गाड़ी रवानगी',
    financedDrps: 'वित्तपोषित DRPs',
    underwriteAdvance: 'अग्रिम राशि स्वीकृत करें',
    notificationsTitle: 'लाइव औद्योगिक सूचनाएं',
    openProfileTooltip: 'प्रोफाइल सेक्शन खोलें',
    changeLanguage: 'भाषा बदलें',
    activityLog: 'गतिविधि लॉग (Activity Log)',
    activityLogTitle: 'औद्योगिक संसाधन गतिविधि लॉग',
    activityLogSubtitle: 'उद्यम द्वारा पंजीकृत, व्यापारित, प्रेषित, रासायनिक परीक्षित एवं भुगतान हुए संसाधन लॉट्स का सत्यापित इतिहास।',
    recentActivity: 'हालिया गतिविधि लॉग',
    viewAllActivity: 'सम्पूर्ण गतिविधि लॉग देखें',
    allActivityFilter: 'सभी गतिविधियाँ',
    registeredFilter: 'पंजीकृत लॉट्स',
    tradedFilter: 'व्यापारित व खरीदे गए',
    transitFilter: 'रास्ते में / प्रेषित',
    settledFilter: 'निपटारा व भुगतान',
    searchActivityPlaceholder: 'लॉट आईडी, DRP, सामग्री या खरीदार नाम से खोजें...',
    exportAuditTrail: 'ऑडिट लॉग डाउनलोड करें (PDF)',
    lotIdLabel: 'लॉट व DRP आईडी',
    resourceLabel: 'संसाधन व ग्रेड',
    quantityLabel: 'मात्रा व मूल्य',
    valueLabel: 'वित्तीय मूल्य',
    counterpartyLabel: 'क्रेता / गंतव्य स्थान',
    actionLabel: 'घटना प्रकार',
    dateLabel: 'समय व दिनांक',
    inspectPassportBtn: 'DRP पासपोर्ट देखें',
    managedTransit: 'प्रबंधित माल-परिवहन (Managed Transit)',
    managedTransitTitle: 'प्रबंधित माल-परिवहन ट्रैकर व प्रगति',
    managedTransitSubtitle: 'पंजीकृत औद्योगिक लॉट्स के लिए रीयल-टाइम लॉजिस्टिक्स स्थिति, मल्टी-स्टेज प्रोग्रेस बार और जीपीएस ट्रैकिंग।',
    awaitingPickup: 'उठाव प्रतीक्षित (Awaiting Pickup)',
    inTransitStage: 'रास्ते में (In Transit)',
    processedStage: 'प्रसंस्कृत व पुनर्चक्रित (Processed)',
    settings: 'सेटिंग्स (Settings)',
    settingsSubtitle: 'प्लेटफ़ॉर्म प्राथमिकताएं, क्षेत्रीय भाषा और अनुपालन नीतियां',
    wasteDiversion: 'अपशिष्ट परिवर्तन चार्ट',
  },
  demoSelect: {
    backToSignIn: 'साइन इन पर वापस जाएं',
    title: 'परीक्षण हेतु एक उद्यम भूमिका चुनें',
    subtitle: 'सर्कुलर सप्लाई चेन में किसी भी भूमिका का सीधा अनुभव लें। वही सुंदर इंटरफ़ेस, भूमिका के अनुसार विशिष्ट डेटा।',
    badge: 'इंटरैक्टिव औद्योगिक टेस्ट ड्राइव',
    landingPageLink: 'मुख्य पृष्ठ',
    launchDashboard: 'प्रोफाइल डैशबोर्ड खोलें',
    roleMsme: 'MSME उद्यम (संसाधन प्रदाता)',
    roleMsmeTag: 'स्क्रैप प्रदाता व निर्माता',
    roleProcessing: 'प्रोसेसिंग उद्यम (रीसाइक्लर)',
    roleProcessingTag: 'संसाधन क्रेता व स्मेल्टर',
    roleTransit: 'ट्रांसपोर्ट पार्टनर (लॉजिस्टिक्स)',
    roleTransitTag: 'वाहन बेड़ा व माल-परिवहन',
    roleBanking: 'बैंकिंग / वित्तीय पार्टनर',
    roleBankingTag: 'कार्यशील पूंजी व फैक्टरिंग',
  },
  compliance: {
    pageTitle: 'उद्यम वैधानिक अनुपालन एवं परिचालन दक्षता इंजन',
    pageSubtitle: 'CPCB, SPCB व MoEFCC नियमों पर आधारित गणितीय स्कोरिंग प्रणाली और कम लागत कार्यान्वयन निर्देश।',
    returnBtn: 'प्रोफाइल डैशबोर्ड पर वापस जाएं',
    tabAssessment: 'अनुपालन मूल्यांकन चेकलिस्ट',
    tabRegulations: 'रीयल-टाइम सरकारी अधिसूचनाएं',
    tabImplementation: 'परिचालन दक्षता ब्लूप्रिंट',
    tabLowCostHacks: 'कम लागत अनुपालन समाधान',
    scoreTitle: 'समग्र अनुपालन सूचकांक',
    scoreGrade: 'ग्रेड A — औद्योगिक संप्रभु अनुपालित',
    penaltySavings: 'अनुमानित जुर्माना बचाव: प्रतिवर्ष ₹14.5 लाख की बचत',
    realtimeAlerts: 'रीयल-टाइम CPCB / SPCB सूचनाएं',
    filterAll: 'सभी श्रेणियां',
    filterHazardous: 'खतरनाक अपशिष्ट',
    filterEpr: 'EPR व चक्रीयता',
    filterAirWater: 'वायु व जल अधिनियम',
    filterEnergy: 'ऊर्जा व कार्बन',
    filterSafety: 'कारखाना सुरक्षा',
    efficiencyTipLabel: 'परिचालन दक्षता लाभ',
    lowCostLabel: 'कम लागत कार्यान्वयन ब्लूप्रिंट',
    downloadAuditSummary: 'अनुपालन ऑडिट प्रमाण पत्र डाउनलोड करें',
  },
  drpModal: {
    title: 'डिजिटल रिसोर्स पासपोर्ट (DRP)',
    sovereignBadge: 'सत्यापित डिजिटल भौतिक संपत्ति टोकन',
    currentLocation: 'वर्तमान भौतिक स्थान एवं गोदी',
    custodyState: 'कस्टडी एवं स्वामित्व स्थिति',
    saleStatus: 'वर्तमान बिक्री व व्यापार स्थिति',
    liveTransitTracking: 'लाइव जीपीएस ट्रैकिंग व वाहन टेलीमेट्री',
    marketSpotRate: 'वर्तमान बाजार इंडेक्स स्पॉट दर',
    finalPayoutWaterflow: 'उद्यम को शुद्ध भुगतान विभाजन',
    close: 'पासपोर्ट बंद करें',
    viewBlockchain: 'लेज़र पर हैश सत्यापित करें',
  },
  modal: {
    badge: 'LoopGrid औद्योगिक पंजीकरण',
    title: 'अपने अनुपयोगी संसाधन को दर्ज करें',
    subtitle: 'कारखाने का स्क्रैप फेंकना बंद करें। पास के खरीदार, तय ट्रांसपोर्ट और पक्के बैंक भुगतान से जुड़ें।',
    roleLabel: 'मैं इस रूप में पंजीकरण कर रहा हूँ:',
    roleMsme: 'MSME सप्लायर (स्क्रैप विक्रेता)',
    roleProcessing: 'प्रोसेसिंग खरीदार (लॉट क्रेता)',
    roleTransit: 'ट्रांसपोर्ट पार्टनर (वाहन संचालक)',
    businessNameLabel: 'उद्यम का नाम',
    businessNamePlaceholder: 'उदा. एपेक्स इंजीनियरिंग',
    industryLabel: 'उद्योग क्षेत्र',
    materialTypeLabel: 'स्क्रैप सामग्री श्रेणी',
    tonnageLabel: 'अनुमानित मासिक मात्रा',
    emailLabel: 'संपर्क ईमेल',
    phoneLabel: 'मोबाइल नंबर',
    locationLabel: 'कारखाना / लोडिंग गोदी का पता',
    locationPlaceholder: 'उदा. पीन्या इंडस्ट्रियल एरिया, बेंगलुरु',
    submitBtn: 'संसाधन दर्ज करें',
    successTitle: 'संसाधन सफलतापूर्वक पंजीकृत हुआ!',
    successDesc: 'हमारा AI सिस्टम इसे वर्गीकृत लॉट में जोड़ेगा और तय ट्रांसपोर्ट के साथ पास के खरीदार को सूचित करेगा।',
    closeBtn: 'खिड़की बंद करें',
  },
  faqPage: {
    returnBtn: 'मुख्य पृष्ठ पर वापस जाएं',
    signInBtn: 'साइन इन / खाता बनाएं',
    joinBtn: 'स्क्रैप दर्ज करें',
    badge: 'ज्ञान केंद्र व FAQ',
    title: 'इन्वेंटरी, ट्रांसपोर्ट व भुगतान मार्गदर्शन',
    subtitle: 'अनुपयोगी स्क्रैप पंजीकरण, लॉट इन्वेंटरी, AI निकटता, तय ट्रांसपोर्ट भाड़े और रीयल-टाइम भुगतान विभाजन पर स्पष्ट उत्तर।',
    searchPlaceholder: 'कीवर्ड द्वारा खोजें (जैसे: स्क्रैप, लॉट, ट्रांसपोर्ट, प्रति-किमी, कमीशन, भुगतान)...',
    clear: 'साफ़ करें',
    reset: 'फ़िल्टर रीसेट करें',
    noResults: 'आपकी खोज के अनुसार कोई प्रश्न नहीं मिला।',
    catAll: 'सभी प्रश्न',
    catReg: 'स्क्रैप पंजीकरण',
    catInv: 'वर्गीकृत इन्वेंटरी',
    catTransit: 'ट्रांसपोर्ट व प्रति-किमी दर',
    catSettlement: 'भुगतान विभाजन',
    catProcessing: 'प्रोसेसिंग खरीदार',
    bottomTitle: 'क्या आपके कारखाने के स्क्रैप या ट्रांसपोर्ट पर कोई प्रश्न है?',
    bottomSubtitle: 'हमारी टीम सीधे वर्कशॉप मालिकों, मिलों और ट्रांसपोर्टरों से मिलकर व्यवस्था करती है।',
    registerBtn: 'स्क्रैप स्ट्रीम दर्ज करें',
    backOverviewBtn: 'वापस मुख्य पृष्ठ पर',
    faqs: [
      {
        id: 0,
        category: 'registration',
        categoryLabel: 'स्क्रैप पंजीकरण',
        question: 'MSME अपने उस स्क्रैप को कैसे दर्ज करते हैं जो उनके उत्पादन चक्र में काम नहीं आ सकता?',
        answer: 'कारखाना मालिक पोर्टल पर लॉगिन कर अपने बचे हुए संसाधनों—जैसे खराद के टर्निंग्स, प्लास्टिक कतरन, कपड़े के टुकड़े आदि—का विवरण दर्ज करते हैं जिनका वे अपनी फैक्टरी में दोबारा इस्तेमाल नहीं कर सकते। वे मात्रा, अनुमानित वजन और पता दर्ज करते हैं।',
      },
      {
        id: 1,
        category: 'inventory',
        categoryLabel: 'वर्गीकृत इन्वेंटरी',
        question: 'LoopGrid का वर्गीकृत इन्वेंटरी सिस्टम खरीदारों के लिए कैसे काम करता है?',
        answer: 'LoopGrid कई MSMEs के एक जैसे ग्रेड और विनिर्देश वाले स्क्रैप को एक बड़े व्यावसायिक इन्वेंटरी लॉट में जोड़ता है। प्रोसेसिंग फैक्ट्रियां अपनी जरूरत के अनुसार इन लॉट्स को सीधे थोक में खरीदती हैं।',
      },
      {
        id: 2,
        category: 'transit',
        categoryLabel: 'ट्रांसपोर्ट व प्रति-किमी दर',
        question: 'AI नजदीकी खरीदार कैसे चुनता है और तय प्रति-किमी दर पर ट्रांसपोर्ट कैसे मिलता है?',
        answer: 'भाड़ा बचाने के लिए AI सबसे पास की योग्य प्रोसेसिंग फैक्ट्री ढूंढता है। इसके बाद हमारे अनुबंधित ट्रांसपोर्ट पार्टनर को गाड़ी आवंटित की जाती है, जिसकी प्रति-किमी दर LoopGrid द्वारा पहले से तय होती है।',
      },
      {
        id: 3,
        category: 'settlement',
        categoryLabel: 'भुगतान विभाजन',
        question: 'खरीदार से पैसा मिलने और सभी पक्षों में बटने की प्रक्रिया क्या है?',
        answer: 'LoopGrid रीयल-टाइम में सौदा पूरा करता है। हम खरीदार से 100% राशि लेते हैं। फिर हमारा प्लेटफॉर्म कमीशन काटा जाता है, ट्रांसपोर्टर को प्रति-किमी के हिसाब से भाड़ा दिया जाता है, और शेष शुद्ध मुनाफा MSME के बैंक खाते में तुरंत भेज दिया जाता है।',
      },
      {
        id: 4,
        category: 'transit',
        categoryLabel: 'ट्रांसपोर्ट व प्रति-किमी दर',
        question: 'प्रति-किलोमीटर ट्रांसपोर्ट दर कैसे तय होती है और इसका भुगतान कौन करता है?',
        answer: 'LoopGrid सत्यापित वाणिज्यिक ट्रांसपोर्टरों के साथ पहले से प्रति-किमी दर तय करता है। दूरी के आधार पर खरीदार पूरे लॉट का भुगतान करता है और डिलीवरी स्कैन होते ही गाड़ी वाले को तुरंत उसका भाड़ा दे दिया जाता है।',
      },
      {
        id: 5,
        category: 'inventory',
        categoryLabel: 'वर्गीकृत इन्वेंटरी',
        question: 'LoopGrid स्क्रैप लॉट्स की शुद्धता और धातु ग्रेड की गारंटी कैसे देता है?',
        answer: 'पंजीकरण के समय MSME मिल टेस्ट सर्टिफिकेट, मिश्रधातु ग्रेड (उदा. 6061-T6 एल्युमिनियम या शुद्ध HDPE) या फोटो अपलोड करते हैं, जिसे हमारे सिस्टम में वर्गीकृत किया जाता है ताकि खरीदार को शुद्ध माल मिले।',
      },
      {
        id: 6,
        category: 'settlement',
        categoryLabel: 'भुगतान विभाजन',
        question: 'स्क्रैप उठने के बाद MSME को पैसा कितनी जल्दी मिलता है?',
        answer: 'प्रोसेसिंग खरीदार लॉट बुक करते समय LoopGrid को पूरा भुगतान करता है। ट्रांसपोर्टर द्वारा खरीदार की गोदी पर डिलीवरी स्कैन होते ही 24 घंटे के भीतर MSME के बैंक खाते में सीधी रकम पहुंच जाती है।',
      },
      {
        id: 7,
        category: 'processing',
        categoryLabel: 'प्रोसेसिंग खरीदार',
        question: 'प्रोसेसिंग मिलें अपनी जरूरत के अनुसार लॉट कैसे खरीदती हैं?',
        answer: 'प्रोसेसिंग कंपनियां LoopGrid पोर्टल पर लॉगिन करके अपनी मासिक कच्चे माल की जरूरत (उदा. 20 टन स्टेनलेस स्टील या 5 टन प्लास्टिक) चुनती हैं और उपलब्ध क्षेत्रीय लॉट्स को खरीदती हैं।',
      },
      {
        id: 8,
        category: 'registration',
        categoryLabel: 'स्क्रैप पंजीकरण',
        question: 'एक MSME किस प्रकार का अनुपयोगी स्क्रैप दर्ज कर सकता है?',
        answer: 'कोई भी ठोस औद्योगिक अवशेष जो आपकी वर्तमान मशीनों में उपयोग नहीं हो सकता—जैसे सीएनसी टर्निंग्स, शीट कट-ऑफ, प्लास्टिक स्प्रू, कपड़े की कतरनें, लकड़ी के टुकड़े और कृषि अपशिष्ट।',
      },
      {
        id: 9,
        category: 'registration',
        categoryLabel: 'स्क्रैप पंजीकरण',
        question: 'क्या LoopGrid पर स्क्रैप दर्ज करने के लिए कोई न्यूनतम मात्रा की सीमा है?',
        answer: 'कोई भारी सीमा नहीं है। आप 200 किलो या 1 पैलेट माल भी दर्ज कर सकते हैं। LoopGrid आसपास के कारखानों के माल को मिलाकर पूरा ट्रक लोड बना देता है।',
      },
      {
        id: 10,
        category: 'transit',
        categoryLabel: 'ट्रांसपोर्ट व प्रति-किमी दर',
        question: 'लोडिंग, अनलोडिंग और बीमा की जिम्मेदारी किसकी होती है?',
        answer: 'MSME अपनी लोडिंग गोदी पर माल चढ़ाता है। ट्रांसपोर्टर माल और वजन पर्ची सत्यापित करता है, तथा रास्ते का बीमा LoopGrid के लॉजिस्टिक्स नेटवर्क के तहत कवर रहता है।',
      },
      {
        id: 11,
        category: 'settlement',
        categoryLabel: 'भुगतान विभाजन',
        question: 'यदि खरीदार माल पहुंचने पर गुणवत्ता पर सवाल उठाए तो क्या होगा?',
        answer: 'चूंकि लॉट का फोटो और ग्रेड पहले से सत्यापित होता है, विवाद नगण्य होते हैं। किसी अंतर की स्थिति में LoopGrid फंड्स को एस्क्रो में रखकर 12 घंटे में प्राधिकृत निरीक्षक भेजकर समाधान कराता है।',
      },
    ],
  },
};

// -------------------------------------------------------------
// MARATHI TRANSLATIONS (मराठी)
// -------------------------------------------------------------
const mrTranslations: Translations = {
  ...hiTranslations,
  nav: {
    ...hiTranslations.nav,
    faq: 'वारंवार विचारले जाणारे प्रश्न (FAQ)',
    support: 'सहाय्य (Support)',
    impact: 'पर्यावरणीय प्रभाव',
    integration: 'सुलभ जोडणी',
    process: 'कार्यपद्धती आणि आर्थिक मॉडेल',
    signIn: 'साइन इन / खाते उघडा',
    registerScrap: 'स्क्रॅप नोंदवा',
    platformPages: 'प्लॅटफॉर्म पृष्ठे',
    home: 'मुख्य पान (होम)',
    faqKnowledge: 'माहिती केंद्र आणि FAQ',
    signInPage: 'उद्योग खाते पृष्ठ',
    tagline: 'LoopGrid • MSMEs साठी प्रबंधित चक्रीय व्यवस्था',
  },
  hero: {
    badge: 'MSME स्क्रॅप व्यवस्थापन • AI अंतर आधारित लॉट मॅचिंग',
    headlineStart: 'कारखान्यातील न वापरता येणाऱ्या स्क्रॅपमधून मिळवा',
    headlineHighlight: 'खात्रीशीर नफा',
    subtitle:
      'MSMEs कारखान्यातील उरलेला व न वापरता येणारा स्क्रॅप नोंदवतात. LoopGrid त्याचे प्रमाणित लॉट्स बनवून AI द्वारे जवळच्या प्रोसेसिंग युनिटला विकते, प्रति-किमी ठरलेल्या दराने वाहतूकदार पाठवते आणि थेट बँक खात्यात पैसे जमा करते.',
    startBtn: 'न वापरता येणारा स्क्रॅप नोंदवा',
    howItWorksBtn: '५-टप्प्यांची कार्यपद्धती पहा',
    card1Title: 'पर्यावरण रक्षण',
    card1Desc: 'कारखान्यातील उरलेले धातू व प्लास्टिक डंपिंग ग्राउंडवर जाण्यापासून वाचवा.',
    card2Title: 'वर्गीकृत लॉट इन्व्हेंटरी',
    card2Desc: 'लहान तुकड्यांना एकत्र करून मोठा व्यावसायिक लॉट बनवला जातो, जो कंपन्या थेट विकत घेतात.',
    card3Title: 'नियोजित वाहतूक व तात्काळ पेमेंट',
    card3Desc: 'AI सर्वात जवळचा खरेदीदार शोधते, ठरलेल्या प्रति-किमी दराने गाडी पाठवते आणि तात्काळ पैसे देते.',
  },
  problem: {
    badge: 'कारखान्यांमधील स्क्रॅपचे आव्हान',
    title: 'न वापरता येणारा उत्पादन स्क्रॅप गोदामात पडून राहतो किंवा कवडीमोल भावाने विकला जातो.',
    subtitle: 'उत्पादनादरम्यान असा स्क्रॅप उरतो जो कारखान्यातील नेहमीच्या कामात पुन्हा वापरता येत नाही. लहान प्रमाण असल्याने मोठ्या कंपन्या थेट घेत नाहीत आणि स्थानिक भंगारवाले मोठा तोटा करतात.',
    p1Title: 'उत्पादन चक्रात पुनर्वापर अशक्य',
    p1Desc: 'खरादचे टर्निंग्स, शीट कट-ऑफ आणि कतरन कारखान्यातील मशिनमध्ये बसत नाहीत आणि जागा अडवतात.',
    p2Title: 'भंगारवाले मनमानी दर लावतात',
    p2Desc: 'दर्जेदार धातू किंवा प्लास्टिक भंगारात वितळवून त्याचे मूल्य नष्ट केले जाते.',
    p3Title: 'कमी प्रमाणामुळे मोठ्या कंपन्या घेत नाहीत',
    p3Desc: 'प्रोसेसिंग कंपन्यांना टनभर लॉट्स हवे असतात, जे लहान कारखाना एकट्याने देऊ शकत नाही.',
    p4Title: 'वाहतुकीचा भरमसाठ खर्च',
    p4Desc: 'जवळचा खरेदीदार न मिळाल्यास ट्रान्सपोर्टचा खर्च मालाच्या किमतीपेक्षा जास्त होतो.',
    quote: '“LoopGrid अनेक कारखान्यांच्या स्क्रॅपचे मोठे लॉट्स बनवते, जवळच्या कंपनीला विकते आणि वाहतूक व पेमेंट स्वतः सांभाळते.”',
  },
  solution: {
    badge: 'LoopGrid प्लॅटफॉर्म',
    title: 'वर्गीकृत इन्व्हेंटरी आणि तात्काळ अंतर-आधारित मॅचिंग',
    subtitle: 'आम्ही कारखान्यातील न वापरता येणाऱ्या स्क्रॅपचे रूपांतर प्रमाणित लॉट्समध्ये करतो, AI ने जवळचा खरेदीदार शोधतो आणि वाहतूकदाराकडून सुरक्षित डिलिव्हरी देतो.',
    step1Num: '०१',
    step1Title: 'न वापरता येणारा स्क्रॅप नोंदवा',
    step1Desc: 'कारखाना मालक अशा स्क्रॅपची नोंद करतात जो त्यांच्या नेहमीच्या प्रक्रियेत पुन्हा वापरता येत नाही.',
    step2Num: '०२',
    step2Title: 'वर्गीकृत लॉट इन्व्हेंटरी',
    step2Desc: 'आमची प्रणाली एकाच ग्रेडच्या स्क्रॅपचे मोठे व्यावसायिक लॉट्स तयार करते.',
    step3Num: '०३',
    step3Title: 'जवळचा खरेदीदार व ठरलेली वाहतूक',
    step3Desc: 'AI सर्वात जवळचा खरेदीदार शोधते आणि ठरलेल्या प्रति-किमी दराने गाडी पाठवून तात्काळ पैसे जमा करते.',
    algoBadge: 'AI अंतर आणि ऑप्टिमायझेशन',
    complexityTitle: 'जवळचा खरेदीदार का महत्त्वाचा आहे?',
    complexityP1: 'स्क्रॅप व्यवसायात वाहतूक हा सर्वात मोठा खर्च आहे. माल दूर गेल्यास नफा ट्रान्सपोर्टमध्येच संपतो.',
    complexityP2: 'LoopGrid चे AI जवळची प्रोसेसिंग कंपनी शोधते आणि ठरलेल्या दराने वाहतूकदार पाठवते. खरेदीदार LoopGrid ला पैसे देतो, आम्ही कमिशन कापून ट्रान्सपोर्टरला भाडे देतो आणि MSME च्या बँक खात्यात थेट नफा जमा करतो.',
    tag1: 'ठरलेले प्रति-किमी भाडे',
    tag2: 'वर्गीकृत लॉट इन्व्हेंटरी',
    tag3: 'तात्काळ पेमेंट वाटप',
    examplesTitle: 'यशस्वी लॉट सप्लाय',
    ex1From: 'विमान-ग्रेड ॲल्युमिनियम टर्निंग्स',
    ex1To: 'जवळची फाउंड्री (२२ किमी)',
    ex1Val: 'ठरलेल्या प्रति-किमी दरावर डिलिव्हरी',
    ex2From: 'पॉलीप्रॉपिलीन प्लास्टिक कटिंग्ज',
    ex2To: 'प्लास्टिक कंपाउंडर (१८ किमी)',
    ex2Val: 'इन्व्हेंटरीमधून पूर्ण लॉट खरेदी',
    ex3From: 'डेनिम कापडाची कतरन',
    ex3To: 'इन्स्युलेशन पॅनेल फॅक्टरी (३५ किमी)',
    ex3Val: '२४ तासांत MSME ला थेट बँक ट्रान्सफर',
  },
  impact: {
    badge: 'पर्यावरण संवर्धन',
    title: 'न वापरता येणाऱ्या स्क्रॅपचे १००% औद्योगिक पुनर्चक्रण',
    subtitle: 'कचरा डेपोत जाण्यापासून वाचवून कार्बन उत्सर्जन कमी करणे आणि नैसर्गिक संसाधने वाचवणे.',
    p1Title: 'शून्य कचरा डेपो डंपिंग',
    p1Desc: 'उत्पादनातील न वापरता येणारा स्क्रॅप थेट दुय्यम उत्पादनात वापरला जातो.',
    p2Title: 'कमी वाहतूक उत्सर्जन',
    p2Desc: 'जवळचा खरेदीदार शोधल्यामुळे ट्रक्सचे डिझेल व धूर मोठ्या प्रमाणात कमी होतो.',
    p3Title: 'कच्च्या मालाची आत्मनिर्भरता',
    p3Desc: 'स्थानिक स्क्रॅपचा वापर झाल्यामुळे महागड्या आयात कच्च्या मालावरील अवलंबित्व घटते.',
    deepDiveBadge: 'औद्योगिक साहित्य विश्लेषण',
    deepDiveTitle: 'LoopGrid वरील मुख्य स्क्रॅप प्रकार',
    metalsTitle: 'धातू व मिश्रधातू टर्निंग्स आणि कट-ऑफ',
    metalsDesc: 'फाउंड्रीमध्ये थेट वितळवून नवीन उत्पादने बनवली जातात.',
    metalsStatLabel: 'खाणकाम वाचले',
    metalsStatVal: '९०% पर्यंत',
    textilesTitle: 'कापड कतरन आणि वेस्ट',
    textilesDesc: 'गाड्यांचे इन्सुलेशन आणि ध्वनिरोधक पॅनेलमध्ये वापरले जाते.',
    textilesStatLabel: 'पाणी संवर्धन',
    textilesStatVal: 'हजारो लिटर प्रति लॉट',
    polymersTitle: 'थर्मोप्लास्टिक रिजेक्ट आणि स्प्रू',
    polymersDesc: 'पुन्हा दाणे तयार करून इंजेक्शन मोल्डिंगमध्ये वापरले जाते.',
    polymersStatLabel: 'कच्चे तेल वाचले',
    polymersStatVal: '२.१ kg CO₂e / kg',
    timberTitle: 'लाकूड आणि प्लायवूडचे तुकडे',
    timberDesc: 'कंपोझिट बोर्ड आणि पॅकेजिंगसाठी वापरले जाते.',
    timberStatLabel: 'लाकूड संवर्धन',
    timberStatVal: '१००% लॉट वापर',
    organicsTitle: 'अन्न प्रक्रिया व शेती अवशेष',
    organicsDesc: 'पशुखाद्य आणि पर्यावरणपूरक पॅकेजिंगमध्ये वापरले जाते.',
    organicsStatLabel: 'मिथेन वायूपासून मुक्ती',
    organicsStatVal: 'शून्य कुजणारा कचरा',
    verifiedNote: 'प्रत्येक लॉटच्या डिलिव्हरीवर डिजिटल ऑडिट प्रमाणपत्र मिळते.',
    catMetals: 'धातू व मिश्रधातू',
    catTextiles: 'कापड व लेदर',
    catPolymers: 'पॉलिमर व प्लास्टिक',
    catTimber: 'लाकूड व कागद',
    catOrganics: 'सेंद्रिय उप-उत्पादने',
    metalsB1: 'नवीन बॉक्साईट आणि लोहखनिज उत्खननाची गरज संपते',
    metalsB2: 'सल्फर डायऑक्साइड आणि कारखान्यातील धूळ प्रदूषणापासून थेट बचाव',
    metalsB3: 'दुय्यम कास्टिंगसाठी उच्च दर्जा आणि ताकद कायम',
    textilesB1: 'सिंथेटिक मायक्रोप्लास्टिक जमिनीत जाण्यापासून रोखते',
    textilesB2: 'रासायनिक रंग आणि कापूस शेतीवरील ताण कमी करते',
    textilesB3: 'औद्योगिक क्लस्टर्समध्ये १००% सामग्री चक्र पूर्ण',
    polymersB1: 'प्लास्टिक उघड्यावर टाकणे किंवा जाळण्यापासून वाचवते',
    polymersB2: 'लहान मोल्डर्सना घाऊक दरात उच्च-दर्जाचा माल पुरवते',
    polymersB3: 'कच्च्या तेलावरील अवलंबित्व कमी करते',
    timberB1: 'लाकडी वस्तूंमध्ये कार्बन दीर्घकाळ सुरक्षित राहतो',
    timberB2: 'नैसर्गिक जंगलांच्या तोडीवर आळा घालतो',
    timberB3: 'लाकूड जाळणे आणि मिथेन वायू निर्मिती थांबवतो',
    organicsB1: 'सडण्यामुळे निर्माण होणारा धोकादायक मिथेन वायू रोखतो',
    organicsB2: 'थर्माकोलऐवजी इको-फ्रेंडली पॅकेजिंग बनते',
    organicsB3: 'स्थानिक शेतीसाठी सेंद्रिय पोषण चक्र तयार करतो',
  },
  integration: {
    badge: 'कारखान्यासाठी अत्यंत सोपे',
    title: 'कारखाना मालकांसाठी स्क्रॅप नोंदणी अत्यंत सुलभ',
    subtitle: 'कोणतेही नवे सॉफ्टवेअर न वापरता २ मिनिटांत स्क्रॅप नोंदवा. वाहतूकदार थेट तुमच्या गोदीवरून माल उचलेल.',
    f1Title: 'शून्य आयटी खर्च',
    f1Desc: 'मोबाईल ब्राउझरवर सहज चालते. कोणत्याही ERP सॉफ्टवेअरची गरज नाही.',
    f2Title: '२ मिनिटांत नोंदणी',
    f2Desc: 'फोटो काढा, वजन आणि ग्रेड टाका. बाकी काम प्रणाली करेल.',
    f3Title: 'कमी मालही चालतो',
    f3Desc: '२०० किलो किंवा १ पॅलेट मालही नोंदवा. आम्ही इतरांसोबत मिळून लॉट बनवतो.',
    f4Title: 'ठरलेले प्रति-किमी भाडे',
    f4Desc: 'ट्रान्सपोर्टर्ससोबत प्रति-किमी दर आधीच ठरलेला असतो. घासाघिस नाही.',
    f5Title: 'स्वयंचलित कागदपत्रे',
    f5Desc: 'ई-वे बिल आणि इनव्हॉइस आपोआप तयार होतात.',
    f6Title: 'SMS / WhatsApp मेसेज',
    f6Desc: 'लॉट विकला जाताच आणि गाडी निघताच त्वरित संदेश मिळतात.',
    bannerBadge: 'सुलभ कारभार',
    bannerTitle: 'भंगाराच्या डब्यापासून थेट बँक खात्यात फक्त ३ पावले',
    bannerDesc: 'स्थानिक भंगार दलालांना हटवा. योग्य भाव आणि पक्के बँक पेमेंट मिळवा.',
    b1Title: 'वजन काट्यांची गरज नाही',
    b1Desc: 'कारखान्यातील सध्याच्या काट्यावरून किंवा जवळच्या धर्मकाट्यावरून काम होते.',
    b2Title: 'सर्व उद्योगांसाठी उपयुक्त',
    b2Desc: 'मशिनिंग, टेक्सटाईल, प्लास्टिक आणि पॅकेजिंग उद्योगांसाठी सुसंगत.',
    b3Title: 'स्थानिक भाषेत उपलब्ध',
    b3Desc: 'मराठी व स्थानिक भाषेत असल्यामुळे सुपरवायझरही सहज वापरू शकतात.',
  },
  process: {
    badge: 'कार्यपद्धती आणि आर्थिक मॉडेल',
    title: 'न वापरता येणाऱ्या MSME स्क्रॅपपासून प्रोसेसिंग लॉट व थेट बँक खात्यात पैसे',
    subtitle: 'MSME स्क्रॅप नोंदवतात, LoopGrid लॉट्स बनवते, AI जवळचा खरेदीदार शोधते, ठरलेल्या प्रति-किमी दराने गाडी जाते आणि पेमेंट त्वरित विभागले जाते.',
    step1Title: 'MSME स्क्रॅप नोंदणी',
    step1Desc: 'कारखान्यातील उरलेला व न वापरता येणारा स्क्रॅप मालक पोर्टलवर नोंदवतात.',
    step1Tag: 'कारखान्यातील जागा मोकळी',
    step2Title: 'वर्गीकृत लॉट इन्व्हेंटरी',
    step2Desc: 'LoopGrid एकाच प्रकारचा व ग्रेडचा स्क्रॅप एकत्र करून प्रमाणित लॉट्स तयार करते.',
    step2Tag: 'व्यावसायिक लॉट प्रमाणीकरण',
    step3Title: 'कंपन्यांकडून लॉट खरेदी',
    step3Desc: 'मोठ्या प्रोसेसिंग कंपन्या त्यांच्या आवश्यकतेनुसार हे लॉट्स घाऊक प्रमाणात खरेदी करतात.',
    step3Tag: 'घाऊक कच्चा माल खरेदी',
    step4Title: 'AI अंतर शोधणे व ट्रान्सपोर्ट वाटप',
    step4Desc: 'AI सर्वात जवळचा खरेदीदार शोधून भाडे वाचवते आणि ठरलेल्या प्रति-किमी दराने वाहन पाठवते.',
    step4Tag: 'किमान भाडे व कमी कार्बन',
    step5Title: 'तात्काळ पेमेंट वाटप',
    step5Desc: 'खरेदीदाराकडून पैसे घेऊन LoopGrid कमिशन घेते, ट्रान्सपोर्टरला प्रति-किमी भाडे देते आणि MSME ला तात्काळ नफा देते.',
    step5Tag: 'थेट बँक खात्यात जमा',
    flowBadge: 'पारदर्शक आर्थिक व वाहतूक रचना',
    flowTitle: 'LoopGrid ची आर्थिक आणि वाहतूक व्यवस्था कशी चालते',
    flowDesc: 'MSME ला भाड्याची किंवा पेमेंट रखडण्याची अजिबात काळजी करावी लागत नाही. LoopGrid सर्व व्यवहार सांभाळते.',
    p1Title: 'आधीच ठरलेले प्रति-किमी भाडे:',
    p1Desc: 'LoopGrid आणि ट्रान्सपोर्टर्समध्ये प्रति-किमी दर आधीच ठरलेला असतो. मोलभावाची कटकट नाही.',
    p2Title: 'AI अंतर रूटिंग:',
    p2Desc: 'जवळच्या कंपनीशी जोडल्यामुळे अंतर कमी होते आणि वाहतूक खर्च वाचतो.',
    p3Title: 'खात्रीशीर तात्काळ बँक पेमेंट:',
    p3Desc: 'खरेदीदाराच्या गोदीवर माल पोहोचताच MSME आणि ट्रान्सपोर्टर दोघांनाही त्वरित पैसे मिळतात.',
    waterfallHeader: 'व्यवहार व पेमेंट वाटप (Waterfall)',
    wf1Tag: '१. खरेदीदाराकडून पेमेंट',
    wf1Buyer: 'प्रोसेसिंग कंपनी',
    wf1Val: '१००% लॉट मूल्य',
    wf1Desc: 'प्रमाणित लॉटचे पूर्ण बिल थेट LoopGrid कडे भरते.',
    wf2Tag: '२. LoopGrid प्लॅटफॉर्म हिस्सा',
    wf2Name: 'LoopGrid कमिशन',
    wf2Share: 'प्लॅटफॉर्म शेअर',
    wf2Desc: 'AI इन्व्हेंटरी मॅचिंग, तपासणी आणि जलद व्यवहारासाठी घेतलेले शुल्क.',
    wf3Tag: '३. ट्रान्सपोर्टरचे भाडे',
    wf3Partner: 'नेमलेला ट्रान्सपोर्टर',
    wf3Rate: 'ठरलेला दर / KM',
    wf3Desc: 'ठरलेल्या किलोमीटरनुसार डिलिव्हरी स्कॅन होताच ट्रान्सपोर्टरला त्वरित भाडे.',
    wf4Tag: '४. MSME कारखाना मालक',
    wf4Recipient: 'MSME सप्लायर',
    wf4Method: 'थेट बँक ट्रान्सफर',
    wf4Desc: 'न वापरता येणाऱ्या स्क्रॅपचा निव्वळ नफा थेट मालकाच्या बँक खात्यात जमा.',
    registerBtn: 'न वापरता येणारा MSME स्क्रॅप नोंदवा',
  },
  faqTeaser: {
    badge: 'वारंवार विचारले जाणारे प्रश्न',
    title: 'इन्व्हेंटरी, वाहतूक आणि पेमेंट संबंधी महत्त्वाचे प्रश्न',
    subtitle: 'स्क्रॅप नोंदणी, लॉट खरेदी, वाहतूकदार वाटप आणि थेट बँक पेमेंट याबद्दल संपूर्ण माहिती.',
    viewAllBtn: 'पूर्ण FAQ पृष्ठ पहा',
    bannerTitle: 'वाहतूक किंवा पेमेंटबद्दल अधिक माहिती हवी आहे?',
    bannerDesc: 'प्रति-किमी भाडे, दर्जा तपासणी, लॉट निर्मिती आणि २४ तासांत पेमेंटबद्दल सविस्तर वाचा.',
    q1: 'MSME कारखाने न वापरता येणारा स्क्रॅप कसा नोंदवतात?',
    a1: 'कारखाना मालक पोर्टलवर जाऊन धातू, प्लास्टिक, कापड किंवा इतर स्क्रॅपची माहिती, वजन आणि कारखान्याचा पत्ता नोंदवतात.',
    tag1: 'स्क्रॅप नोंदणी',
    q2: 'खरेदीदारांसाठी वर्गीकृत इन्व्हेंटरी कशी काम करते?',
    a2: 'LoopGrid अनेक कारखान्यांच्या एकाच ग्रेडच्या स्क्रॅपचे मोठे व्यावसायिक लॉट्स बनवते, जे कंपन्या थेट विकत घेतात.',
    tag2: 'वर्गीकृत इन्व्हेंटरी',
    q3: 'AI जवळचा खरेदीदार कसा शोधते आणि ठरलेल्या दराने वाहतूक कशी मिळते?',
    a3: 'भाडे वाचवण्यासाठी AI सर्वात जवळची फॅक्टरी शोधते आणि आधीच ठरलेल्या प्रति-किमी दरावर वाहन पाठवते.',
    tag3: 'AI अंतर व वाहतूक',
    q4: 'खरेदीदाराकडून पैसे घेऊन वाटप कसे केले जाते?',
    a4: 'LoopGrid खरेदीदाराकडून १००% रक्कम घेते. आमचे कमिशन कापून ट्रान्सपोर्टरला प्रति-किमी भाडे दिले जाते आणि उर्वरित नफा MSME च्या खात्यात तात्काळ पाठवला जातो.',
    tag4: 'तात्काळ पेमेंट वाटप',
  },
  cta: {
    badge: 'कारखान्यातील भंगाराचे भांडवलात रूपांतर करा',
    title: 'तुमच्या न वापरता येणाऱ्या स्क्रॅपमधून खात्रीशीर कमाई करण्यास तयार आहात?',
    subtitle: 'शेकडो कारखान्यांसोबत जुळा. कबाडीला स्वस्तात माल देणे बंद करा. आजच LoopGrid वर नोंदणी करा.',
    registerBtn: 'कारखान्याचा स्क्रॅप नोंदवा',
    signUpBtn: 'संसाधन नोंदणीसाठी खाते उघडा',
  },
  footer: {
    desc: 'LoopGrid MSME च्या स्क्रॅपचे वर्गीकृत लॉट्स बनवते, AI ने जवळच्या कंपनीला विकते आणि ठरलेल्या वाहतूक व तात्काळ पेमेंटसह व्यवस्थापित करते.',
    badge: 'भारतीय MSMEs साठी प्रबंधित औद्योगिक चक्रीयता',
    pagesTitle: 'प्लॅटफॉर्म पृष्ठे',
    faqLink: 'माहिती केंद्र आणि FAQ',
    signInLink: 'उद्योग साइन इन / खाते उघडा',
    principlesTitle: 'मुख्य तत्त्वे',
    p1: 'प्रमाणित वर्गीकृत लॉट्स',
    p2: 'AI अंतर आधारित रूटिंग',
    p3: 'ठरलेले प्रति-किमी वाहतूक दर',
    p4: 'तात्काळ स्वयंचलित बँक ट्रान्सफर',
    rights: 'LoopGrid. भारतीय MSMEs च्या आर्थिक स्वावलंबनासाठी समर्पित.',
    pledge: 'एक स्वच्छ व पारदर्शक औद्योगिक पुरवठा साखळी',
  },
  auth: {
    returnLanding: 'मुख्य पानावर परत जा',
    createAccountTitle: 'नवीन उद्योग खाते तयार करा',
    createAccountSubtitle: 'स्क्रॅप नोंदवण्यासाठी आणि इन्व्हेंटरी लॉट्समध्ये सहभागी होण्यासाठी उद्योग नोंदणी करा.',
    signInTitle: 'उद्योग साइन इन / लॉगिन',
    signInSubtitle: 'तुमचे नोंदणीकृत नाव आणि पासवर्ड वापरून लॉगिन करा.',
    tabCreateAccount: 'खाते तयार करा',
    tabSignIn: 'साइन इन',
    nameLabel: 'उद्योगाचे नाव (NAME OF THE ENTERPRISE)',
    namePlaceholder: 'उदा. अपेक्स प्रिसिजन इंजिनिअरिंग वर्क्स',
    phoneLabel: 'उद्योगाचा फोन नंबर (PHONE NUMBER OF THE ENTERPRISE)',
    phonePlaceholder: '+91 98765 43210',
    emailLabel: 'उद्योगाचा ईमेल आयडी (EMAIL ID OF THE ENTERPRISE)',
    emailPlaceholder: 'contact@apexprecision.com',
    dealsInLabel: 'व्यवसाय कशात काम करतो (WHAT DOES THEIR BUSINESS DEALS IN)',
    dealsInPlaceholder: 'उदा. सीएनसी मशिनिंग आणि टर्निंग',
    resourcesLabel: 'मुख्य संसाधने कोणती आहेत (WHAT ARE THE MAJOR RESOURCES THEY WILL DEAL WITH)',
    resourcesPlaceholder: 'उदा. ॲल्युमिनियम टर्निंग्स, स्टील कट-ऑफ',
    roleLabel: 'त्यांची भूमिका (THEIR ROLE)',
    roleMsme: 'MSME उद्योग (MSME Enterprise)',
    roleProcessing: 'प्रोसेसिंग उद्योग (Processing Enterprise)',
    roleTransit: 'वाहतूकदार भागीदार (Transit Partner)',
    roleBanking: 'बँकिंग भागीदार (Banking Partner)',
    addressLabel: 'उद्योगाचा पत्ता (ADDRESS OF THEIR BUSINESS)',
    addressPlaceholder: 'प्लॉट ४२, चाकण एमआयडीसी, पुणे, महाराष्ट्र',
    createPasswordLabel: 'पासवर्ड तयार करा (CREATE PASSWORD)',
    confirmPasswordLabel: 'पासवर्ड पुष्टी करा (CONFIRM PASSWORD)',
    loginEnterpriseNameLabel: 'उद्योगाचे नाव',
    loginEnterpriseNamePlaceholder: 'नोंदणीकृत उद्योगाचे नाव प्रविष्ट करा',
    loginPasswordLabel: 'पासवर्ड',
    loginPasswordPlaceholder: 'तुमचा पासवर्ड प्रविष्ट करा',
    submitCreateAccount: 'खाते तयार करा आणि प्रोफाइलवर जा',
    submitLogin: 'उद्योग प्रोफाइलमध्ये लॉगिन करा',
    alreadyAccount: 'आधीच उद्योग खाते आहे? साइन इन करा',
    needAccount: 'खाते नाही? नवीन खाते तयार करा',
    fillAllFields: 'कृपया सर्व आवश्यक माहिती भरा.',
    passwordMismatch: 'पासवर्ड जुळत नाहीत. कृपया पुन्हा तपासा.',
    passwordLength: 'पासवर्ड किमान ६ अक्षरांचा असावा.',
    loginNotFound: 'उद्योग सापडला नाही. कृपया नाव तपासा किंवा नवीन खाते उघडा.',
    loginWrongPassword: 'या उद्योगासाठी पासवर्ड चुकीचा आहे.',
  },
  profile: {
    ...hiTranslations.profile,
    returnLanding: 'मुख्य पानावर परत जा',
    badge: 'उद्योग प्रोफाइल',
    signOut: 'लॉग आऊट',
    verifiedBadge: 'प्रमाणित उद्योग',
    registerScrapBtn: 'न वापरता येणारा स्क्रॅप नोंदवा',
    accountDetails: 'नोंदणीकृत उद्योग तपशील',
    name: 'उद्योगाचे नाव',
    phone: 'फोन नंबर',
    email: 'ईमेल पत्ता',
    role: 'प्लॅटफॉर्म भूमिका',
    dealsIn: 'व्यवसायाचे क्षेत्र',
    resources: 'मुख्य संसाधने',
    address: 'कारखान्याचा पत्ता',
  },
  modal: {
    badge: 'LoopGrid औद्योगिक नोंदणी',
    title: 'तुमचा न वापरता येणारा स्क्रॅप नोंदवा',
    subtitle: 'स्क्रॅप फेकून देणे बंद करा. जवळचा खरेदीदार, ठरलेली वाहतूक आणि पक्के बँक पेमेंट मिळवा.',
    roleLabel: 'मी या नात्याने नोंदणी करत आहे:',
    roleMsme: 'MSME सप्लायर (स्क्रॅप विक्रेता)',
    roleProcessing: 'प्रोसेसिंग खरेदीदार (लॉट खरेदीदार)',
    roleTransit: 'वाहतूकदार भागीदार (वाहन चालक)',
    businessNameLabel: 'उद्योगाचे नाव',
    businessNamePlaceholder: 'उदा. अपेक्स इंजिनिअरिंग',
    industryLabel: 'उद्योग क्षेत्र',
    materialTypeLabel: 'स्क्रॅप प्रकार',
    tonnageLabel: 'मासिक अंदाजे प्रमाण',
    emailLabel: 'ईमेल',
    phoneLabel: 'मोबाईल नंबर',
    locationLabel: 'कारखाना / गोदी पत्ता',
    locationPlaceholder: 'उदा. चाकण एमआयडीसी, पुणे',
    submitBtn: 'स्क्रॅप नोंदवा',
    successTitle: 'स्क्रॅप यशस्वीरित्या नोंदवला गेला!',
    successDesc: 'आमची AI प्रणाली याचा लॉट बनवून जवळच्या खरेदीदाराला ठरलेल्या वाहतुकीसह कळवेल.',
    closeBtn: 'खिडकी बंद करा',
  },
  faqPage: {
    returnBtn: 'मुख्य पानावर परत जा',
    signInBtn: 'साइन इन / खाते उघडा',
    joinBtn: 'स्क्रॅप नोंदवा',
    badge: 'माहिती केंद्र आणि FAQ',
    title: 'इन्व्हेंटरी, वाहतूक आणि पेमेंट मार्गदर्शन',
    subtitle: 'स्क्रॅप नोंदणी, लॉट इन्व्हेंटरी, AI अंतर मॅचिंग, प्रति-किमी भाडे आणि तात्काळ पेमेंट यावरील उत्तरे.',
    searchPlaceholder: 'कीवर्डने शोधा (उदा: स्क्रॅप, लॉट, वाहतूक, प्रति-किमी, कमिशन, पेमेंट)...',
    clear: 'साफ करा',
    reset: 'फिल्टर रिसेट करा',
    noResults: 'कोणतेही प्रश्न सापडले नाहीत.',
    catAll: 'सर्व प्रश्न',
    catReg: 'स्क्रॅप नोंदणी',
    catInv: 'वर्गीकृत इन्व्हेंटरी',
    catTransit: 'वाहतूक व प्रति-किमी दर',
    catSettlement: 'पेमेंट वाटप',
    catProcessing: 'प्रोसेसिंग खरेदीदार',
    bottomTitle: 'तुमच्या स्क्रॅप किंवा वाहतुकीबद्दल काही प्रश्न आहेत का?',
    bottomSubtitle: 'आमची टीम थेट कारखानदार, कंपन्या आणि वाहतूकदारांसोबत काम करते.',
    registerBtn: 'स्क्रॅप नोंदवा',
    backOverviewBtn: 'मागे मुख्य पानावर',
    faqs: [
      {
        id: 0,
        category: 'registration',
        categoryLabel: 'स्क्रॅप नोंदणी',
        question: 'MSME कारखाने न वापरता येणारा स्क्रॅप कसा नोंदवतात?',
        answer: 'कारखाना मालक पोर्टलवर जाऊन धातू, प्लास्टिक, कापड किंवा इतर स्क्रॅपची माहिती, वजन आणि कारखान्याचा पत्ता नोंदवतात.',
      },
      {
        id: 1,
        category: 'inventory',
        categoryLabel: 'वर्गीकृत इन्व्हेंटरी',
        question: 'खरेदीदारांसाठी वर्गीकृत इन्व्हेंटरी कशी काम करते?',
        answer: 'LoopGrid अनेक कारखान्यांच्या एकाच ग्रेडच्या स्क्रॅपचे मोठे व्यावसायिक लॉट्स बनवते, जे कंपन्या थेट विकत घेतात.',
      },
      {
        id: 2,
        category: 'transit',
        categoryLabel: 'वाहतूक व प्रति-किमी दर',
        question: 'AI जवळचा खरेदीदार कसा शोधते आणि ठरलेल्या दराने वाहतूक कशी मिळते?',
        answer: 'भाडे वाचवण्यासाठी AI सर्वात जवळची फॅक्टरी शोधते आणि आधीच ठरलेल्या प्रति-किमी दरावर वाहन पाठवते.',
      },
      {
        id: 3,
        category: 'settlement',
        categoryLabel: 'पेमेंट वाटप',
        question: 'खरेदीदाराकडून पैसे घेऊन वाटप कसे केले जाते?',
        answer: 'LoopGrid खरेदीदाराकडून १००% रक्कम घेते. आमचे कमिशन कापून ट्रान्सपोर्टरला प्रति-किमी भाडे दिले जाते आणि उर्वरित नफा MSME च्या खात्यात तात्काळ पाठवला जातो.',
      },
      {
        id: 4,
        category: 'transit',
        categoryLabel: 'वाहतूक व प्रति-किमी दर',
        question: 'प्रति-किमी वाहतूक दर कसा ठरवला जातो आणि कोण भरतो?',
        answer: 'LoopGrid आधीच ट्रान्सपोर्टर्ससोबत दर ठरवते. अंतराच्या हिशोबाने खरेदीदार पूर्ण लॉटचे पैसे भरतो आणि डिलिव्हरी होताच वाहतूकदाराला पैसे मिळतात.',
      },
      {
        id: 5,
        category: 'inventory',
        categoryLabel: 'वर्गीकृत इन्व्हेंटरी',
        question: 'LoopGrid स्क्रॅपच्या शुद्धतेची आणि ग्रेडची खात्री कशी देते?',
        answer: 'नोंदणीवेळी MSME मेटल टेस्ट सर्टिफिकेट, ग्रेड किंवा फोटो देतात, ज्यावरून आम्ही शुद्धतेनुसार वर्गीकरण करतो.',
      },
      {
        id: 6,
        category: 'settlement',
        categoryLabel: 'पेमेंट वाटप',
        question: 'माल निघाल्यावर MSME ला पैसे किती वेळात मिळतात?',
        answer: 'खरेदीदार आधीच पैसे भरतो. वाहतूकदाराने डिलिव्हरी स्कॅन करताच २४ तासांत MSME च्या बँक खात्यात थेट पैसे जमा होतात.',
      },
      {
        id: 7,
        category: 'processing',
        categoryLabel: 'प्रोसेसिंग खरेदीदार',
        question: 'प्रोसेसिंग कंपन्या आवश्यकतेनुसार लॉट कसा खरेदी करतात?',
        answer: 'कंपन्या पोर्टलवर जाऊन त्यांच्या गरजेनुसार (उदा. २० टन स्टील किंवा ५ टन प्लास्टिक) उपलब्ध प्रादेशिक लॉट्स निवडतात.',
      },
      {
        id: 8,
        category: 'registration',
        categoryLabel: 'स्क्रॅप नोंदणी',
        question: 'कोणत्या प्रकारचा स्क्रॅप नोंदवता येतो?',
        answer: 'कारखान्यात पुन्हा वापरता न येणारा कोणताही घन कचरा—जसे की टर्निंग्स, प्लास्टिक स्प्रू, कापड कतरन, लाकूड आणि शेती कचरा.',
      },
      {
        id: 9,
        category: 'registration',
        categoryLabel: 'स्क्रॅप नोंदणी',
        question: 'स्क्रॅप नोंदवण्यासाठी किमान प्रमाण किती असावे?',
        answer: 'कोणतीही मोठी अट नाही. तुम्ही २०० किलो मालही नोंदवू शकता. आम्ही शेजारील कारखान्यांचा माल जोडून पूर्ण ट्रक लोड बनवतो.',
      },
      {
        id: 10,
        category: 'transit',
        categoryLabel: 'वाहतूक व प्रति-किमी दर',
        question: 'लोडिंग आणि विम्याची जबाबदारी कोणाची असते?',
        answer: 'MSME माल वाहनात भरते. ट्रान्सपोर्टर वजन पडताळतो आणि रस्त्यावरील विमा LoopGrid नेटवर्कद्वारे संरक्षित असतो.',
      },
      {
        id: 11,
        category: 'settlement',
        categoryLabel: 'पेमेंट वाटप',
        question: 'खरेदीदाराने मालाच्या दर्जावर आक्षेप घेतल्यास काय होते?',
        answer: 'फोटो आणि तपशील आधीच तपासलेले असल्याने वाद होत नाहीत. तरीही वाद झाल्यास LoopGrid निधी सुरक्षित ठेवून १२ तासांत तपासणी करते.',
      },
    ],
  },
};

// -------------------------------------------------------------
// GUJARATI TRANSLATIONS (ગુજરાતી)
// -------------------------------------------------------------
const guTranslations: Translations = {
  ...hiTranslations,
  nav: {
    ...hiTranslations.nav,
    faq: 'સામાન્ય પ્રશ્નો (FAQ)',
    impact: 'પર્યાવરણીય પ્રભાવ',
    integration: 'સરળ જોડાણ',
    process: 'કાર્યપદ્ધતિ અને આર્થિક મોડેલ',
    signIn: 'સાઇન ઇન / એકાઉન્ટ બનાવો',
    registerScrap: 'સ્ક્રેપ નોંધાવો',
    home: 'મુખ્ય પૃષ્ઠ (હોમ)',
    faqKnowledge: 'જ્ઞાન કેન્દ્ર અને FAQ',
  },
  hero: {
    ...hiTranslations.hero,
    badge: 'MSME સ્ક્રેપ ઇન્વેન્ટરી મેનેજમેન્ટ • AI નિકટતા આધારિત લોટ મેચિંગ',
    headlineStart: 'બિનઉપયોગી ઔદ્યોગિક સ્ક્રેપમાંથી કમાઓ',
    headlineHighlight: 'ખાતરીપૂર્વકનો નફો',
    subtitle: 'MSMEs પોતાના બચેલા સ્ક્રેપને નોંધાવે છે જેને તેઓ ફરીથી વાપરી શકતા નથી. LoopGrid વર્ગીકૃત લોટ બનાવે છે, AI દ્વારા નજીકના ખરીદનારને જોડે છે, નક્કી કરેલા પ્રતિ-કિમી ભાડા પર વાહન ફાળવે છે અને તાત્કાલિક પેમેન્ટ કરે છે.',
    startBtn: 'બિનઉપયોગી સ્ક્રેપ નોંધાવો',
    howItWorksBtn: '૫ તબક્કાની પ્રક્રિયા જુઓ',
  },
  process: {
    ...hiTranslations.process,
    title: 'બિનઉપયોગી MSME સ્ક્રેપથી પ્રોસેસિંગ લોટ અને તાત્કાલિક પેમેન્ટ',
    step1Title: 'MSME સ્ક્રેપ નોંધણી',
    step2Title: 'વર્ગીકૃત લોટ ઇન્વેન્ટરી',
    step3Title: 'પ્રોસેસિંગ એકમો દ્વારા લોટ ખરીદી',
    step4Title: 'AI નિકટતા મેળ અને ટ્રાન્સપોર્ટ ફાળવણી',
    step5Title: 'રીયલ-ટાઇમ પેમેન્ટ વિભાજન',
    registerBtn: 'બિનઉપયોગી MSME સ્ક્રેપ નોંધાવો',
  },
  auth: {
    ...hiTranslations.auth,
    createAccountTitle: 'નવું એન્ટરપ્રાઇઝ એકાઉન્ટ બનાવો',
    signInTitle: 'એન્ટરપ્રાઇઝ સાઇન ઇન / લોગિન',
    tabCreateAccount: 'એકાઉન્ટ બનાવો',
    tabSignIn: 'સાઇન ઇન',
    submitCreateAccount: 'એકાઉન્ટ બનાવો અને પ્રોફાઇલ પર જાઓ',
    submitLogin: 'પ્રોફાઇલમાં લોગિન કરો',
  },
  profile: {
    ...hiTranslations.profile,
    badge: 'એન્ટરપ્રાઇઝ પ્રોફાઇલ',
    signOut: 'લૉગ આઉટ',
    verifiedBadge: 'ચકાસાયેલ ઉદ્યોગ',
    registerScrapBtn: 'બિનઉપયોગી સંસાધન નોંધાવો',
  },
};

// -------------------------------------------------------------
// TAMIL TRANSLATIONS (தமிழ்)
// -------------------------------------------------------------
const taTranslations: Translations = {
  ...hiTranslations,
  nav: {
    ...hiTranslations.nav,
    faq: 'அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQ)',
    impact: 'சுற்றுச்சூழல் தாக்கம்',
    integration: 'எளிதான ஒருங்கிணைப்பு',
    process: 'செயல்முறை மற்றும் நிதி மாதிரி',
    signIn: 'உள்நுழைக / கணக்கு தொடங்கு',
    registerScrap: 'ஸ்க்ராப் பதிவு செய்க',
    home: 'முகப்பு பக்கம் (Home)',
    faqKnowledge: 'அறிவு மையம் & FAQ',
  },
  hero: {
    ...hiTranslations.hero,
    badge: 'MSME கழிவு மேலாண்மை • AI தூர அடிப்படையிலான லாட் பொருத்தம்',
    headlineStart: 'பயன்படுத்த முடியாத தொழிற்கூட கழிவிலிருந்து',
    headlineHighlight: 'உறுதியான வருமானம்',
    subtitle: 'தொழிற்சாலைகள் தங்களால் மறுபயன்பாடு செய்ய முடியாத எஞ்சிய கழிவுகளைப் பதிவு செய்கின்றன. LoopGrid அவற்றை தரப்படுத்தப்பட்ட லாட்களாக தொகுத்து, அருகிலுள்ள வாங்குபவர்களுக்கு AI மூலம் விற்று, நிலையான கிமீ வாடகையில் லாரி அனுப்பி உடனடி பணம் வழங்குகிறது.',
    startBtn: 'கழிவுகளைப் பதிவு செய்க',
    howItWorksBtn: '5 படி செயல்முறை காண்க',
  },
  process: {
    ...hiTranslations.process,
    title: 'MSME கழிவு முதல் பிராசசிங் லாட் மற்றும் உடனடி வங்கி பணம் வரை',
    step1Title: 'MSME கழிவு பதிவு',
    step2Title: 'வகைப்படுத்தப்பட்ட சரக்கு லாட்கள்',
    step3Title: 'தொழிற்சாலைகள் மொத்தமாக வாங்குதல்',
    step4Title: 'AI அருகாமை பொருத்தம் & போக்குவரத்து ஒதுக்கீடு',
    step5Title: 'உடனடி பணப் பகிர்வு',
    registerBtn: 'பயன்படுத்த முடியாத கழிவை பதிவு செய்க',
  },
  auth: {
    ...hiTranslations.auth,
    createAccountTitle: 'புதிய நிறுவன கணக்கு தொடங்கு',
    signInTitle: 'நிறுவன உள்நுழைவு (Sign In)',
    tabCreateAccount: 'கணக்கு தொடங்கு',
    tabSignIn: 'உள்நுழைக',
    submitCreateAccount: 'கணக்கு தொடங்கி சுயவிவரத்திற்கு செல்க',
    submitLogin: 'சுயவிவரத்தில் உள்நுழைக',
  },
  profile: {
    ...hiTranslations.profile,
    badge: 'நிறுவன சுயவிவரம்',
    signOut: 'வெளியேறு (Sign Out)',
    verifiedBadge: 'சரிபார்க்கப்பட்ட நிறுவனம்',
    registerScrapBtn: 'கழிவைப் பதிவு செய்க',
  },
};

// -------------------------------------------------------------
// KANNADA TRANSLATIONS (ಕನ್ನಡ)
// -------------------------------------------------------------
const knTranslations: Translations = {
  ...hiTranslations,
  nav: {
    ...hiTranslations.nav,
    faq: 'ಪುನರಾವರ್ತಿತ ಪ್ರಶ್ನೆಗಳು (FAQ)',
    impact: 'ಪರಿಸರ ಪರಿಣಾಮ',
    integration: 'ಸುಲಭ ಸಂಯೋಜನೆ',
    process: 'ಕಾರ್ಯವಿಧಾನ ಮತ್ತು ಆರ್ಥಿಕ ಮಾದರಿ',
    signIn: 'ಸೈನ್ ಇನ್ / ಖಾತೆ ತೆರೆಯಿರಿ',
    registerScrap: 'ಸ್ಕ್ರ್ಯಾಪ್ ನೋಂದಾಯಿಸಿ',
    home: 'ಮುಖಪುಟ (Home)',
    faqKnowledge: 'ಜ್ಞಾನ ಕೇಂದ್ರ & FAQ',
  },
  hero: {
    ...hiTranslations.hero,
    badge: 'MSME ತ್ಯಾಜ್ಯ ದಾಸ್ತಾನು ನಿರ್ವಹಣೆ • AI ಸಾಮೀಪ್ಯ ಆಧಾರಿತ ಲಾಟ್ ಮ್ಯಾಚಿಂಗ್',
    headlineStart: 'ಉಪಯೋಗವಿಲ್ಲದ ಕಾರ್ಖಾನೆ ಸ್ಕ್ರ್ಯಾಪ್‌ನಿಂದ ಪಡೆಯಿರಿ',
    headlineHighlight: 'ಖಾತರಿಯ ಲಾಭ',
    subtitle: 'ಕಾರ್ಖಾನೆಯಲ್ಲಿ ಮತ್ತೆ ಬಳಸಲಾಗದ ತ್ಯಾಜ್ಯವನ್ನು MSMEಗಳು ನೋಂದಾಯಿಸುತ್ತವೆ. LoopGrid ವರ್ಗೀಕೃತ ಲಾಟ್‌ಗಳನ್ನು ಸೃಷ್ಟಿಸಿ, ಹತ್ತಿರದ ಖರೀದಿದಾರರಿಗೆ AI ಮೂಲಕ ಸಂಪರ್ಕಿಸಿ, ನಿಗದಿತ ಕಿಮೀ ದರದಲ್ಲಿ ವಾಹನ ನಿಯೋಜಿಸಿ ತಕ್ಷಣ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಹಣ ನೀಡುತ್ತದೆ.',
    startBtn: 'ಸ್ಕ್ರ್ಯಾಪ್ ನೋಂದಾಯಿಸಿ',
    howItWorksBtn: '೫ ಹಂತಗಳ ಪ್ರಕ್ರಿಯೆ ನೋಡಿ',
  },
  process: {
    ...hiTranslations.process,
    title: 'MSME ಸ್ಕ್ರ್ಯಾಪ್‌ನಿಂದ ಸಂಸ್ಕರಣಾ ಲಾಟ್ ಮತ್ತು ತಕ್ಷಣದ ಪಾವತಿ ವಿತರಣೆ',
    step1Title: 'MSME ಸ್ಕ್ರ್ಯಾಪ್ ನೋಂದಣಿ',
    step2Title: 'ವರ್ಗೀಕೃತ ದಾಸ್ತಾನು ಲಾಟ್‌ಗಳು',
    step3Title: 'ಸಂಸ್ಕರಣಾ ಘಟಕಗಳಿಂದ ಸಗಟು ಖರೀದಿ',
    step4Title: 'AI ಸಾಮೀಪ್ಯ & ಸಾರಿಗೆ ನಿಯೋಜನೆ',
    step5Title: 'ತಕ್ಷಣದ ಆರ್ಥಿಕ ಹಂಚಿಕೆ',
    registerBtn: 'ಸ್ಕ್ರ್ಯಾಪ್ ನೋಂದಾಯಿಸಿ',
  },
  auth: {
    ...hiTranslations.auth,
    createAccountTitle: 'ಹೊಸ ಉದ್ಯಮ ಖಾತೆ ತೆರೆಯಿರಿ',
    signInTitle: 'ಉದ್ಯಮ ಸೈನ್ ಇನ್ / ಲಾಗಿನ್',
    tabCreateAccount: 'ಖಾತೆ ತೆರೆಯಿರಿ',
    tabSignIn: 'ಸೈನ್ ಇನ್',
    submitCreateAccount: 'ಖಾತೆ ತೆರೆದು ಪ್ರೊಫೈಲ್‌ಗೆ ಹೋಗಿ',
    submitLogin: 'ಪ್ರೊಫೈಲ್‌ಗೆ ಲಾಗಿನ್ ಆಗಿ',
  },
  profile: {
    ...hiTranslations.profile,
    badge: 'ಉದ್ಯಮ ಪ್ರೊಫೈಲ್',
    signOut: 'ಸೈನ್ ಔಟ್',
    verifiedBadge: 'ದೃಢೀಕೃತ ಉದ್ಯಮ',
    registerScrapBtn: 'ಸ್ಕ್ರ್ಯಾಪ್ ನೋಂದಾಯಿಸಿ',
  },
};

export const translations: Record<Language, Translations> = {
  en: enTranslations,
  hi: hiTranslations,
  mr: mrTranslations,
  gu: guTranslations,
  ta: taTranslations,
  kn: knTranslations,
};
