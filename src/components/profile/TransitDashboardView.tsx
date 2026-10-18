import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  TrendingUp,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Fuel,
  CreditCard,
  Phone,
  Navigation,
  QrCode,
  FileCheck2,
  SlidersHorizontal,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { DRPRecord } from './drpData';

interface TransitVehicle {
  id: string;
  vehicleName: string;
  vehicleType: 'Heavy Truck' | 'Medium Tempo' | 'Flatbed Trailer' | 'Dedicated Tanker';
  registrationNumber: string;
  region: string;
  currentMilestone: string;
  gpsCoordinates: string;
  transportingResource: string;
  batchWeight: string;
  consignmentDrp: string;
  origin: string;
  destination: string;
  status: 'ON_ROAD' | 'LOADING' | 'UNLOADING' | 'STANDBY';
  speed: string;
  eta: string;
  driverName: string;
  driverPhone: string;
  routeProgressPercent: number;
  freightPayoutToReceive: string; // Receivable for this trip
  tripTollExpense: string; // Payable
  tripFuelExpense: string; // Payable
  driverBata: string; // Payable
}

interface TransitDashboardViewProps {
  onInspectDrp: (drpId: string) => void;
  onDispatchTrip: () => void;
}

export const TransitDashboardView: React.FC<TransitDashboardViewProps> = ({
  onInspectDrp,
  onDispatchTrip,
}) => {
  const [vehicleFilter, setVehicleFilter] = useState<'ALL' | 'ON_ROAD' | 'LOADING' | 'UNLOADING' | 'STANDBY'>('ALL');
  const [selectedVehicle, setSelectedVehicle] = useState<TransitVehicle | null>(null);

  // Fleet Manifest (Trucks, Tempos, Trailers, Tankers) across industrial regions
  const fleet: TransitVehicle[] = [
    {
      id: 'veh-01',
      vehicleName: 'Tata Prima 28-Ton Heavy Hauler',
      vehicleType: 'Heavy Truck',
      registrationNumber: 'KA-04-E-2201',
      region: 'Bengaluru - Hosur Industrial Corridor',
      currentMilestone: 'KM 34 Milestone (Passing Doddaballapur Bypass)',
      gpsCoordinates: '13.1287° N, 77.5833° E',
      transportingResource: 'Alloy 6061-T6 Aluminum CNC Swarf (Purity 99.4%)',
      batchWeight: '500 kg Swarf + 3.2 Tons Pooled Billets',
      consignmentDrp: 'DRP-2026-AL-8921',
      origin: 'Peenya MSME Industrial Estate, Bengaluru',
      destination: 'Hindalco Ancillary Smelters, Doddaballapur Hub',
      status: 'ON_ROAD',
      speed: '52 km/h',
      eta: '42 mins',
      driverName: 'Ramesh Gowda',
      driverPhone: '+91 94481 22910',
      routeProgressPercent: 72,
      freightPayoutToReceive: '₹4,850',
      tripTollExpense: '₹420',
      tripFuelExpense: '₹1,250',
      driverBata: '₹400',
    },
    {
      id: 'veh-02',
      vehicleName: 'Mahindra Bolero Maxi Truck Plus',
      vehicleType: 'Medium Tempo',
      registrationNumber: 'MH-12-Q-4491',
      region: 'Pune - Chakan Automotive Belt',
      currentMilestone: 'Talegaon Toll Plaza (Bhosari Expressway)',
      gpsCoordinates: '18.7304° N, 73.6811° E',
      transportingResource: 'High-Density Polyethylene Injection Sprues',
      batchWeight: '850 kg',
      consignmentDrp: 'DRP-2026-PL-7729',
      origin: 'Chakan MIDC Phase 2 Machining Cluster',
      destination: 'Supreme Polymer Extrusion Park, Bhosari',
      status: 'ON_ROAD',
      speed: '44 km/h',
      eta: '25 mins',
      driverName: 'Santosh Patil',
      driverPhone: '+91 98220 54109',
      routeProgressPercent: 68,
      freightPayoutToReceive: '₹2,600',
      tripTollExpense: '₹180',
      tripFuelExpense: '₹650',
      driverBata: '₹300',
    },
    {
      id: 'veh-03',
      vehicleName: 'Ashok Leyland 40-Ton Multi-Axle Flatbed',
      vehicleType: 'Flatbed Trailer',
      registrationNumber: 'GJ-06-TR-8812',
      region: 'Surat - Ahmedabad Golden Corridor',
      currentMilestone: 'Bharuch Narmada Bridge Express Section',
      gpsCoordinates: '21.7051° N, 72.9959° E',
      transportingResource: 'Denim Selvedge Indigo Raw Fiber Bales',
      batchWeight: '12.5 Tons Baled Scrap',
      consignmentDrp: 'DRP-2026-TX-4112',
      origin: 'Surat Textile Zone, Sachin GIDC',
      destination: 'Narol Non-Wovens Acoustic Matting Estate, Ahmedabad',
      status: 'ON_ROAD',
      speed: '60 km/h',
      eta: '2h 15m',
      driverName: 'Vikram Solanki',
      driverPhone: '+91 97241 88320',
      routeProgressPercent: 55,
      freightPayoutToReceive: '₹18,400',
      tripTollExpense: '₹1,850',
      tripFuelExpense: '₹5,400',
      driverBata: '₹1,200',
    },
    {
      id: 'veh-04',
      vehicleName: 'BharatBenz 16-Ton Dedicated Liquid Tanker',
      vehicleType: 'Dedicated Tanker',
      registrationNumber: 'KA-01-TK-9022',
      region: 'Peenya Phase 1 Industrial Tank Farm',
      currentMilestone: 'Dock Bay 4 (Digital Flow Meter Weighment)',
      gpsCoordinates: '13.0285° N, 77.5182° E',
      transportingResource: 'Reclaimed ISO VG 46 Hydraulic Mineral Oil',
      batchWeight: '200 L Sealed Drums + Bulk Reservoir',
      consignmentDrp: 'DRP-2026-OL-0391',
      origin: 'Peenya CNC Turning Ancillary Bay',
      destination: 'EcoLube Refining Terminal, Doddaballapur',
      status: 'LOADING',
      speed: '0 km/h (Docked)',
      eta: 'Departing in 10 mins',
      driverName: 'Anthony Raj',
      driverPhone: '+91 98440 33190',
      routeProgressPercent: 15,
      freightPayoutToReceive: '₹3,200',
      tripTollExpense: '₹220',
      tripFuelExpense: '₹800',
      driverBata: '₹350',
    },
  ];

  const filteredFleet = fleet.filter((v) => {
    if (vehicleFilter === 'ALL') return true;
    return v.status === vehicleFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Action Banner: Active Fleet Logistics & Dispatch */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#D97706] via-[#B45309] to-[#92400E] p-6 sm:p-8 text-white shadow-lg shadow-amber-900/10">
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute top-8 -right-6 w-52 h-52 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute -bottom-16 right-20 w-44 h-44 rounded-full bg-white/5 pointer-events-none blur-2xl" />

        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-5 shadow-xs">
          <Truck className="w-6 h-6 stroke-[2.2]" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Fleet Dispatch & Route Logistics
        </h2>
        <p className="mt-2 text-sm sm:text-base text-amber-50 max-w-md font-normal leading-relaxed">
          Monitor your trucks, tempos, and tankers live across industrial regions with verified DRP consignments and automated per-KM freight settlement.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onDispatchTrip}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-[#78350F] bg-white hover:bg-neutral-50 active:scale-[0.98] transition-all shadow-md cursor-pointer"
          >
            <span>Assign Vehicle to Route</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* COMPREHENSIVE FINANCIALS: RECEIVABLES & PAYABLES (Per User Prompt) */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-xs p-5 sm:p-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Transit Financial Balance Sheet
            </span>
            <h3 className="text-lg font-bold text-[#191C1E] mt-1">
              Receivables & Payables Ledger
            </h3>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            Auto-Settled via T+12h Clearinghouse
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Card 1: Freight Payout to Receive (Receivables) */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                Total Receivables (To Receive)
              </span>
              <DollarSign className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-2xl font-black text-emerald-900">
              ₹1,42,800
            </div>
            <p className="text-neutral-600 text-[11px] mt-1">
              • Cleared to Bank: <strong className="text-emerald-800">₹94,500</strong>
            </p>
            <p className="text-neutral-600 text-[11px]">
              • In-Transit Pending Delivery: <strong className="text-neutral-800">₹48,300</strong>
            </p>
          </div>

          {/* Card 2: Payments Transit Partner Needs to Do (Payables) */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
                Total Payables (To Pay)
              </span>
              <CreditCard className="w-4 h-4 text-amber-700" />
            </div>
            <div className="text-2xl font-black text-amber-950">
              ₹65,200
            </div>
            <p className="text-neutral-600 text-[11px] mt-1">
              • Fuel Fleet Cards: <strong className="text-neutral-800">₹38,600</strong>
            </p>
            <p className="text-neutral-600 text-[11px]">
              • FASTag Toll + Driver Bata: <strong className="text-neutral-800">₹26,600</strong>
            </p>
          </div>

          {/* Card 3: Net Operational Margin */}
          <div className="p-4 rounded-2xl bg-neutral-900 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Net Freight Profit Margin
              </span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">
              ₹77,600
            </div>
            <p className="text-neutral-300 text-[11px] mt-1">
              • Average Net Freight Yield: <strong>₹18.4 / KM</strong>
            </p>
            <p className="text-neutral-400 text-[10px]">
              Guaranteed payment backed by smart contract escrow
            </p>
          </div>
        </div>
      </div>

      {/* VEHICLES SECTION: TRUCKS, TEMPOS, TRAILERS, TANKERS IN REGIONS */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#191C1E]">
              Transmitting Vehicles & Regional Telemetry
            </h3>
            <p className="text-xs text-neutral-500">
              Real-time locations of trucks and tempos transporting certified industrial resources
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {(['ALL', 'ON_ROAD', 'LOADING', 'UNLOADING', 'STANDBY'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setVehicleFilter(filter)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  vehicleFilter === filter
                    ? 'bg-[#191C1E] text-white shadow-xs'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                }`}
              >
                {filter === 'ALL' ? 'All Vehicles (4)' : filter.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Cards List */}
        <div className="space-y-4">
          {filteredFleet.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-2xl border border-neutral-200/90 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              {/* Header: Vehicle Name, Reg Number, Status Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs shadow-2xs flex-shrink-0">
                    <Truck className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-neutral-900 text-sm sm:text-base">
                        {vehicle.registrationNumber}
                      </span>
                      <span className="text-xs text-neutral-500 font-medium">
                        ({vehicle.vehicleName})
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {vehicle.vehicleType}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      vehicle.status === 'ON_ROAD'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : vehicle.status === 'LOADING'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {vehicle.status.replace('_', ' ')} • {vehicle.speed}
                  </span>
                </div>
              </div>

              {/* Region & Transporting Resource (Core User Requirement) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Region */}
                <div className="p-3 rounded-xl bg-neutral-50/80 border border-neutral-100">
                  <div className="flex items-center gap-1 text-neutral-500 font-medium text-[11px] mb-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>Operating Region & Milestone:</span>
                  </div>
                  <p className="font-bold text-neutral-900 text-xs">
                    {vehicle.region}
                  </p>
                  <p className="text-neutral-600 text-[11px] mt-0.5">
                    {vehicle.currentMilestone}
                  </p>
                </div>

                {/* Resource Being Transported */}
                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <div className="flex items-center gap-1 text-emerald-800 font-medium text-[11px] mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Transporting Resource:</span>
                  </div>
                  <p className="font-bold text-neutral-900 text-xs">
                    {vehicle.transportingResource}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-neutral-600 mt-0.5">
                    <span>Batch: {vehicle.batchWeight}</span>
                    <button
                      type="button"
                      onClick={() => onInspectDrp(vehicle.consignmentDrp)}
                      className="font-mono text-emerald-700 font-bold hover:underline cursor-pointer"
                    >
                      {vehicle.consignmentDrp} ↗
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress & Route Bar */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[11px] text-neutral-600">
                  <span className="font-semibold text-neutral-800">
                    Route: {vehicle.origin} → {vehicle.destination}
                  </span>
                  <span className="font-bold text-blue-700">ETA: {vehicle.eta}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-[#10B981] rounded-full"
                    style={{ width: `${vehicle.routeProgressPercent}%` }}
                  />
                </div>
              </div>

              {/* Trip Financials & Driver Contact */}
              <div className="pt-2 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-bold">
                      Payout to Receive
                    </span>
                    <span className="font-extrabold text-[#166534] text-sm">
                      {vehicle.freightPayoutToReceive}
                    </span>
                  </div>
                  <div className="border-l border-neutral-200 pl-3">
                    <span className="text-[10px] text-neutral-400 block uppercase font-bold">
                      Trip Payables (Toll+Fuel)
                    </span>
                    <span className="font-bold text-neutral-700 text-xs">
                      {vehicle.tripTollExpense} + {vehicle.tripFuelExpense}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] text-neutral-400 block">Driver: {vehicle.driverName}</span>
                    <span className="text-[11px] font-mono text-neutral-600">{vehicle.driverPhone}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onInspectDrp(vehicle.consignmentDrp)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-[#1B5E20] hover:text-white transition-colors cursor-pointer"
                  >
                    View DRP Passport
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
