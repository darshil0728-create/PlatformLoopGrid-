export interface TransitTelemetry {
  isInTransit: boolean;
  vehicleType: 'Heavy Truck' | 'Medium Tempo' | 'Flatbed Trailer' | 'Dedicated Tanker';
  vehicleNumber: string;
  carrierName: string;
  driverName: string;
  driverPhone: string;
  currentGPS: string;
  currentMilestone: string;
  speed: string;
  routeProgressPercent: number;
  eta: string;
  originAddress: string;
  destinationAddress: string;
}

export interface MarketRateInfo {
  spotPrice: string;
  priceUnit: string;
  benchmarkTrend: string;
  dailyHigh: string;
  dailyLow: string;
  indexName: string;
}

export interface UnitPayoutBreakdown {
  grossLotValue: string;
  transitFreightDeduction: string;
  platformClearingFee: string;
  netUnitPayout: string;
  settlementStatus: 'CREDITED' | 'IN_ESCROW' | 'PROCESSING';
  utrNumber?: string;
  settlementDate?: string;
}

export interface DRPRecord {
  drpId: string;
  resourceName: string;
  grade: string;
  category: string;
  batchWeight: string;
  purityScore: string;
  co2Saved: string;
  nablLab: string;
  originCluster: string;
  buyerCluster: string;
  verificationHash: string;
  issuedDate: string;
  // 1. Where is the resource currently
  currentLocation: string;
  // 2 & 3. Is the resource being sold / Is it sold
  commercialStatus: 'LISTED' | 'BEING_SOLD' | 'SOLD' | 'IN_TRANSIT' | 'DELIVERED';
  buyerName?: string;
  purchaseOrderId?: string;
  // 4. Live tracking if in transit
  transitDetails?: TransitTelemetry;
  // 5. Current market spot rate
  marketRate: MarketRateInfo;
  // 6. Final payout that the unit will achieve
  payoutBreakdown: UnitPayoutBreakdown;
}

export const INITIAL_DRP_DATABASE: DRPRecord[] = [
  {
    drpId: 'DRP-2026-AL-8921',
    resourceName: 'CNC Aluminum 6061-T6 Swarf Lot',
    grade: 'Aerospace Spec 6061-T6 (Si 0.6%, Mg 1.0%, Fe <0.2%)',
    category: 'Metals & Alloys',
    batchWeight: '500 kg',
    purityScore: '99.4%',
    co2Saved: '1.85 kg CO₂e / kg (925 kg CO₂e abated)',
    nablLab: 'NABL Metallurgical Assay Lab #4189 (ISO/IEC 17025)',
    originCluster: 'Peenya Industrial Area, Bengaluru',
    buyerCluster: 'Doddaballapur Foundry Hub',
    verificationHash: '0x8f2a...c941e7bf209a88',
    issuedDate: 'Oct 16, 2026',
    // 1. Where is the resource currently
    currentLocation: 'En Route on NH-48 Express Highway (KM 34 Milestone)',
    // 2 & 3. Is it sold / being sold
    commercialStatus: 'IN_TRANSIT',
    buyerName: 'Hindalco Ancillary Smelters Corp',
    purchaseOrderId: 'PO-HND-2026-0881',
    // 4. Live tracking
    transitDetails: {
      isInTransit: true,
      vehicleType: 'Heavy Truck',
      vehicleNumber: 'Truck KA-04-E-2201 (Tata Prima 28T)',
      carrierName: 'VRL Industrial Cargo Fleet',
      driverName: 'Ramesh Gowda',
      driverPhone: '+91 94481 22910',
      currentGPS: '13.1287° N, 77.5833° E (KM 34 North Corridor)',
      currentMilestone: 'Passing Yelahanka-Doddaballapur Bypass',
      speed: '52 km/h',
      routeProgressPercent: 72,
      eta: '42 mins remaining',
      originAddress: 'Apex Precision Works, Plot 124, Peenya 1st Stage',
      destinationAddress: 'Hindalco Ancillary Smelters, Doddaballapur Metallurgical Park',
    },
    // 5. Current market rate
    marketRate: {
      spotPrice: '₹85.00',
      priceUnit: 'per kg',
      benchmarkTrend: '+3.4% (Bullish industrial demand)',
      dailyHigh: '₹86.20',
      dailyLow: '₹83.40',
      indexName: 'MCX Secondary Metals Benchmark Index',
    },
    // 6. Final payout unit achieves
    payoutBreakdown: {
      grossLotValue: '₹42,500',
      transitFreightDeduction: '-₹2,550 (6.0% VRL Freight)',
      platformClearingFee: '-₹1,700 (4.0% LoopGrid Clearing)',
      netUnitPayout: '₹38,250',
      settlementStatus: 'IN_ESCROW',
      utrNumber: 'ESC-CITI-2026-99182',
      settlementDate: 'T+24h on Digital Gate Weighment (Today 17:30 IST)',
    },
  },
  {
    drpId: 'DRP-2026-TX-4112',
    resourceName: 'Denim Selvedge Raw Fiber Bales',
    grade: 'Pure Indigo Dyed Cellulose 400 GSM (Zero Synthetic Blend)',
    category: 'Textiles & Leather',
    batchWeight: '1.2 Tons',
    purityScore: '98.1%',
    co2Saved: '2.40 kg CO₂e / kg (2,880 kg CO₂e abated)',
    nablLab: 'CIRCOT Central Institute of Cotton Technology',
    originCluster: 'Surat Textile Zone, Gujarat',
    buyerCluster: 'Ahmedabad Non-Wovens Park',
    verificationHash: '0x4e1b...d883f2a10599c4',
    issuedDate: 'Oct 12, 2026',
    currentLocation: 'Consolidated Baling Hub #4, Surat Ring Road Depot',
    commercialStatus: 'BEING_SOLD',
    buyerName: 'Auto Acoustic Matting Ltd (Offer Under Escrow Review)',
    purchaseOrderId: 'BID-AAM-TX-9902',
    transitDetails: {
      isInTransit: false,
      vehicleType: 'Flatbed Trailer',
      vehicleNumber: 'Trailer GJ-06-TR-8812 (Ashok Leyland 40T)',
      carrierName: 'Gujarat Freight Alliance',
      driverName: 'Vikram Solanki',
      driverPhone: '+91 97241 88320',
      currentGPS: '21.1702° N, 72.8311° E (Surat Hub Bay 3)',
      currentMilestone: 'Scheduled for Golden Corridor dispatch upon bid lock',
      speed: '0 km/h (Docked)',
      routeProgressPercent: 10,
      eta: 'Scheduled Dispatch 14:00 IST',
      originAddress: 'Surat Eco-Weave Mills, Sachin GIDC',
      destinationAddress: 'Narol Non-Wovens Industrial Estate, Ahmedabad',
    },
    marketRate: {
      spotPrice: '₹24.00',
      priceUnit: 'per kg',
      benchmarkTrend: '+1.8% (Steady yarn recycling demand)',
      dailyHigh: '₹24.50',
      dailyLow: '₹23.20',
      indexName: 'CIRCOT National Textile Scrap Indicator',
    },
    payoutBreakdown: {
      grossLotValue: '₹28,800',
      transitFreightDeduction: '-₹1,728 (6.0%)',
      platformClearingFee: '-₹1,152 (4.0%)',
      netUnitPayout: '₹25,920',
      settlementStatus: 'PROCESSING',
      settlementDate: 'Upon buyer bid confirmation',
    },
  },
  {
    drpId: 'DRP-2026-OL-0391',
    resourceName: 'Reclaimed Hydraulic Mineral Oil',
    grade: 'ISO VG 46 Industrial Lubricant (Moisture <0.04%, PCB Free)',
    category: 'Industrial Lubricants',
    batchWeight: '200 L',
    purityScore: '96.8%',
    co2Saved: '3.10 kg CO₂e / L (620 kg CO₂e abated)',
    nablLab: 'Indian Petroleum Institute Verified Lab #12',
    originCluster: 'Pune-Chakan Auto Belt',
    buyerCluster: 'Thane Re-Refining Cluster',
    verificationHash: '0x17dc...a320b9e847701a',
    issuedDate: 'Sep 28, 2026',
    currentLocation: 'EcoLube Re-Refinery Processing Tank #2, Thane',
    commercialStatus: 'DELIVERED',
    buyerName: 'EcoLube Re-Refinery Hub',
    purchaseOrderId: 'PO-ECOL-OL-2026-44',
    transitDetails: {
      isInTransit: false,
      vehicleType: 'Dedicated Tanker',
      vehicleNumber: 'Tanker KA-01-TK-9022 (BharatBenz 16T)',
      carrierName: 'Southern Tanker Logistics',
      driverName: 'Anthony Raj',
      driverPhone: '+91 98440 33190',
      currentGPS: '19.2183° N, 72.9781° E (Thane Receiving Bay)',
      currentMilestone: 'Delivered and Unloaded into Storage Silo',
      speed: '0 km/h',
      routeProgressPercent: 100,
      eta: 'Completed (Unloaded)',
      originAddress: 'Peenya CNC Turning Ancillary Bay',
      destinationAddress: 'EcoLube Refining Terminal, Thane MIDC',
    },
    marketRate: {
      spotPrice: '₹92.00',
      priceUnit: 'per Liter',
      benchmarkTrend: '+4.1% (High base-oil replacement cost)',
      dailyHigh: '₹94.00',
      dailyLow: '₹88.50',
      indexName: 'National Petroleum Re-Refiners Exchange',
    },
    payoutBreakdown: {
      grossLotValue: '₹18,400',
      transitFreightDeduction: '-₹1,104 (6.0%)',
      platformClearingFee: '-₹736 (4.0%)',
      netUnitPayout: '₹16,560',
      settlementStatus: 'CREDITED',
      utrNumber: 'CMS-HDFC-2026-44910283',
      settlementDate: 'Oct 02, 2026 (Direct RTGS Credited)',
    },
  },
  {
    drpId: 'DRP-2026-PL-7729',
    resourceName: 'High-Density Polyethylene Sprues',
    grade: 'Melt Flow Index 0.35 g/10min HDPE (Unfilled Blow-Molding)',
    category: 'Polymers & Plastics',
    batchWeight: '850 kg',
    purityScore: '99.0%',
    co2Saved: '2.15 kg CO₂e / kg (1,827 kg CO₂e abated)',
    nablLab: 'CIPET Polymer Testing Laboratory, Guindy',
    originCluster: 'Manesar Auto Cluster, Haryana',
    buyerCluster: 'Bhiwadi Extrusion Park',
    verificationHash: '0x992b...e41108c3584120',
    issuedDate: 'Oct 14, 2026',
    currentLocation: 'Talegaon Toll Plaza, Chakan-Bhosari Corridor',
    commercialStatus: 'IN_TRANSIT',
    buyerName: 'Supreme Polymer Recyclers & Extruders',
    purchaseOrderId: 'PO-SPR-PL-2026-092',
    transitDetails: {
      isInTransit: true,
      vehicleType: 'Medium Tempo',
      vehicleNumber: 'Tempo MH-12-Q-4491 (Mahindra Bolero Maxi)',
      carrierName: 'BLR Express Fleet Operations',
      driverName: 'Santosh Patil',
      driverPhone: '+91 98220 54109',
      currentGPS: '18.7304° N, 73.6811° E (Chakan Highway Toll)',
      currentMilestone: 'Cleared Talegaon Plaza, entering Bhosari MIDC',
      speed: '44 km/h',
      routeProgressPercent: 68,
      eta: '25 mins remaining',
      originAddress: 'Chakan Precision Molding Unit 3',
      destinationAddress: 'Supreme Polymer Extrusion Bay, Manesar-Bhiwadi Hub',
    },
    marketRate: {
      spotPrice: '₹40.00',
      priceUnit: 'per kg',
      benchmarkTrend: '-0.5% (Stable injection regrind)',
      dailyHigh: '₹41.20',
      dailyLow: '₹39.50',
      indexName: 'CIPET Virgin-Recycle Parity Board',
    },
    payoutBreakdown: {
      grossLotValue: '₹34,000',
      transitFreightDeduction: '-₹2,040 (6.0%)',
      platformClearingFee: '-₹1,360 (4.0%)',
      netUnitPayout: '₹30,600',
      settlementStatus: 'IN_ESCROW',
      utrNumber: 'ESC-ICICI-2026-882103',
      settlementDate: 'T+24h on Destination Spectrometer Check (Today 16:45)',
    },
  },
  {
    drpId: 'DRP-2026-AL-9901',
    resourceName: 'Aerospace Aluminum 6061 Billet Ends',
    grade: '6061-T6 Extrusion Ends (Si 0.6%, Mg 1.0%, Fe <0.18%)',
    category: 'Metals & Alloys',
    batchWeight: '750 kg',
    purityScore: '99.6%',
    co2Saved: '1.92 kg CO₂e / kg (1,440 kg CO₂e abated)',
    nablLab: 'NABL Metallurgical Assay Lab #4189',
    originCluster: 'Peenya Industrial Area, Bengaluru',
    buyerCluster: 'Open for Smelter Acquisition',
    verificationHash: '0x3a91...e991cb4820a112',
    issuedDate: 'Oct 17, 2026',
    currentLocation: 'Apex Precision Baling Dock, Peenya 2nd Phase',
    commercialStatus: 'LISTED',
    marketRate: {
      spotPrice: '₹85.40',
      priceUnit: 'per kg',
      benchmarkTrend: '+3.4% (High Smelter Demand)',
      dailyHigh: '₹86.80',
      dailyLow: '₹83.20',
      indexName: 'MCX Secondary Aluminum Index',
    },
    payoutBreakdown: {
      grossLotValue: '₹64,050',
      transitFreightDeduction: '-₹3,843 (6.0%)',
      platformClearingFee: '-₹2,562 (4.0%)',
      netUnitPayout: '₹57,645',
      settlementStatus: 'PROCESSING',
      settlementDate: 'Immediate escrow lock upon buyer procurement',
    },
  },
  {
    drpId: 'DRP-2026-CU-4410',
    resourceName: 'Pure Electrolytic Copper Berry Wire Scrap',
    grade: 'Grade-A 99.8% Bare Copper Conductor Strands',
    category: 'Metals & Alloys',
    batchWeight: '420 kg',
    purityScore: '99.8%',
    co2Saved: '3.40 kg CO₂e / kg (1,428 kg CO₂e abated)',
    nablLab: 'Shri Ram Institute for Industrial Research',
    originCluster: 'Faridabad Auto Ancillary Zone, Haryana',
    buyerCluster: 'Open for Smelter Acquisition',
    verificationHash: '0xbb29...1109dc88319a02',
    issuedDate: 'Oct 17, 2026',
    currentLocation: 'Faridabad Electric Coil Stripping Depot Bay 2',
    commercialStatus: 'LISTED',
    marketRate: {
      spotPrice: '₹748.20',
      priceUnit: 'per kg',
      benchmarkTrend: '+1.8% (Tight Scrap Supply)',
      dailyHigh: '₹755.00',
      dailyLow: '₹739.00',
      indexName: 'LME Cash Copper Spot Parity',
    },
    payoutBreakdown: {
      grossLotValue: '₹3,14,244',
      transitFreightDeduction: '-₹18,855 (6.0%)',
      platformClearingFee: '-₹12,570 (4.0%)',
      netUnitPayout: '₹2,82,819',
      settlementStatus: 'PROCESSING',
      settlementDate: 'Eligible for instant 60-day Trade Credit advance',
    },
  },
  {
    drpId: 'DRP-2026-BR-2201',
    resourceName: 'Clean Honey Yellow Brass Turnings',
    grade: 'Cu 60% Zn 40% Lead <1.5% Non-Magnetic Swarf',
    category: 'Metals & Alloys',
    batchWeight: '600 kg',
    purityScore: '98.7%',
    co2Saved: '2.10 kg CO₂e / kg (1,260 kg CO₂e abated)',
    nablLab: 'Jamnagar Brass Testing Centre #04',
    originCluster: 'Jamnagar GIDC Brass Belt, Gujarat',
    buyerCluster: 'Open for Smelter Acquisition',
    verificationHash: '0x77ec...9102ca44778103',
    issuedDate: 'Oct 17, 2026',
    currentLocation: 'Jamnagar Valve Machining Cluster, Plot 88',
    commercialStatus: 'LISTED',
    marketRate: {
      spotPrice: '₹488.50',
      priceUnit: 'per kg',
      benchmarkTrend: '-0.6% (Steady Ingot Parity)',
      dailyHigh: '₹494.00',
      dailyLow: '₹486.00',
      indexName: 'Jamnagar Secondary Brass Benchmark',
    },
    payoutBreakdown: {
      grossLotValue: '₹2,93,100',
      transitFreightDeduction: '-₹17,586 (6.0%)',
      platformClearingFee: '-₹11,724 (4.0%)',
      netUnitPayout: '₹2,63,790',
      settlementStatus: 'PROCESSING',
      settlementDate: 'Available for Tata Capital Credit Facility',
    },
  },
  {
    drpId: 'DRP-2026-PL-5512',
    resourceName: 'Hot Washed Clear PET Bottle Flakes',
    grade: 'Food-Grade Decontaminated (Intrinsic Viscosity >0.72 dl/g)',
    category: 'Polymers & Plastics',
    batchWeight: '1,500 kg',
    purityScore: '99.5%',
    co2Saved: '1.75 kg CO₂e / kg (2,625 kg CO₂e abated)',
    nablLab: 'CIPET Petrochemical Testing Station, Ahmedabad',
    originCluster: 'Vapi GIDC Chemical & Polymer Hub, Gujarat',
    buyerCluster: 'Open for Smelter Acquisition',
    verificationHash: '0x904a...bf38210948ac91',
    issuedDate: 'Oct 16, 2026',
    currentLocation: 'Vapi Clean Recycle Polymer Warehouse 4',
    commercialStatus: 'LISTED',
    marketRate: {
      spotPrice: '₹52.80',
      priceUnit: 'per kg',
      benchmarkTrend: '+2.8% (High Recycled PET Demand)',
      dailyHigh: '₹53.50',
      dailyLow: '₹51.00',
      indexName: 'PlastIndia Secondary PET Index',
    },
    payoutBreakdown: {
      grossLotValue: '₹79,200',
      transitFreightDeduction: '-₹4,752 (6.0%)',
      platformClearingFee: '-₹3,168 (4.0%)',
      netUnitPayout: '₹71,280',
      settlementStatus: 'PROCESSING',
      settlementDate: 'CPCB Form-10 Green Credit Approved',
    },
  },
  {
    drpId: 'DRP-2026-TX-3309',
    resourceName: 'Pure Combed Cotton Spinning Waste Bales',
    grade: 'High Staple Length Mill Drops (Zero Polyester Contamination)',
    category: 'Textiles & Leather',
    batchWeight: '2.0 Tons',
    purityScore: '98.5%',
    co2Saved: '2.60 kg CO₂e / kg (5,200 kg CO₂e abated)',
    nablLab: 'SITRA South India Textile Research Association',
    originCluster: 'Coimbatore Textile Corridor, Tamil Nadu',
    buyerCluster: 'Open for Smelter Acquisition',
    verificationHash: '0x44a1...9930f142b7810e',
    issuedDate: 'Oct 17, 2026',
    currentLocation: 'Coimbatore Ginning & Combing Yard Bay 1',
    commercialStatus: 'LISTED',
    marketRate: {
      spotPrice: '₹24.80',
      priceUnit: 'per kg',
      benchmarkTrend: '+3.1% (High Demand from Auto Acoustics)',
      dailyHigh: '₹25.40',
      dailyLow: '₹23.80',
      indexName: 'CIRCOT National Textile Scrap Indicator',
    },
    payoutBreakdown: {
      grossLotValue: '₹49,600',
      transitFreightDeduction: '-₹2,976 (6.0%)',
      platformClearingFee: '-₹1,984 (4.0%)',
      netUnitPayout: '₹44,640',
      settlementStatus: 'PROCESSING',
      settlementDate: 'Direct RTGS Escrow Escrow Release',
    },
  },
  {
    drpId: 'DRP-2026-SS-7714',
    resourceName: 'Stainless Steel 304 Nickel-Chromium Offcuts',
    grade: 'AISI 304 (Cr 18%, Ni 8%, Carbon <0.08% Laser Trimmings)',
    category: 'Metals & Alloys',
    batchWeight: '900 kg',
    purityScore: '99.2%',
    co2Saved: '2.90 kg CO₂e / kg (2,610 kg CO₂e abated)',
    nablLab: 'NABL Metallurgical Laboratory, Pune MIDC',
    originCluster: 'Pimpri-Chinchwad Auto Belt, Maharashtra',
    buyerCluster: 'Open for Smelter Acquisition',
    verificationHash: '0x1992...8831ef7701ca52',
    issuedDate: 'Oct 16, 2026',
    currentLocation: 'LaserTech Precision Enclosures Yard, Bhosari',
    commercialStatus: 'LISTED',
    marketRate: {
      spotPrice: '₹144.00',
      priceUnit: 'per kg',
      benchmarkTrend: '+2.1% (Strong Induction Furnace Demand)',
      dailyHigh: '₹146.50',
      dailyLow: '₹141.00',
      indexName: 'Bhiwadi Stainless Secondary Board',
    },
    payoutBreakdown: {
      grossLotValue: '₹1,29,600',
      transitFreightDeduction: '-₹7,776 (6.0%)',
      platformClearingFee: '-₹5,184 (4.0%)',
      netUnitPayout: '₹1,16,640',
      settlementStatus: 'PROCESSING',
      settlementDate: 'Eligible for instant credit drawdown',
    },
  },
];
