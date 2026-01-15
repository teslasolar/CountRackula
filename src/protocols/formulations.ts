/**
 * KONOMI STANDARD: COUNT RACKULA
 * Layer 3: RACK Protocol Engine - Formulations
 *
 * Pre-defined protocol formulations for different cancer types
 */

import { Pathway } from '../types/base';
import { Formulation, DosingSchedule, DosingWindow, LifestyleRx } from './types';

// ═══════════════════════════════════════════════════════════════════
// FORMULATION DEFINITIONS
// ═══════════════════════════════════════════════════════════════════

export const F_TNBC: Formulation = {
  id: 'FORM-TNBC-001',
  name: 'Triple-Negative Destroyer',
  aka: 'The Hostile Takeover',
  compounds: [
    { compoundCode: 'MET', required: true },
    { compoundCode: 'ASA', required: true },
    { compoundCode: 'D3', required: true },
    { compoundCode: 'MEL', required: true },
    { compoundCode: 'CUR', required: true },
    { compoundCode: 'EGCG', required: true },
    { compoundCode: 'BBR', required: false },
    { compoundCode: 'SUL', required: false }
  ],
  mechanism: 'Metabolic starvation + multi-pathway blockade',
  pathwaysTargeted: [
    Pathway.Warburg,
    Pathway.COX2,
    Pathway.VDR,
    Pathway.NF_kB,
    Pathway.VEGF,
    Pathway.AMPK,
    Pathway.mTOR,
    Pathway.StemCell
  ],
  synergyScore: 85,
  monthlyCost: 150
};

export const F_ER_POS: Formulation = {
  id: 'FORM-ER-001',
  name: 'ER+ Hormone Harmony',
  aka: 'The Peaceful Transition',
  compounds: [
    { compoundCode: 'DIM', required: true },
    { compoundCode: 'RSV', required: true },
    { compoundCode: 'QRC', required: true },
    { compoundCode: 'SEL', required: true },
    { compoundCode: 'D3', required: true },
    { compoundCode: 'OMG3', required: true },
    { compoundCode: 'MEL', required: false }
  ],
  mechanism: 'Estrogen metabolism optimization + receptor modulation',
  pathwaysTargeted: [
    Pathway.Hormonal,
    Pathway.Aromatase,
    Pathway.SIRT1,
    Pathway.VDR,
    Pathway.NF_kB
  ],
  synergyScore: 78,
  monthlyCost: 120
};

export const F_HER2: Formulation = {
  id: 'FORM-HER2-001',
  name: 'HER2+ Targeted Torpedo',
  aka: 'Smart Bomb',
  compounds: [
    { compoundCode: 'BBR', required: true },
    { compoundCode: 'OMG3', required: true },
    { compoundCode: 'MCP', required: true },
    { compoundCode: 'TT', required: true },
    { compoundCode: 'SUL', required: true },
    { compoundCode: 'NAC', required: true },
    { compoundCode: 'EGCG', required: false },
    { compoundCode: 'QRC', required: false }
  ],
  mechanism: 'HER2 inhibition + stem cell elimination',
  pathwaysTargeted: [
    Pathway.HER2,
    Pathway.StemCell,
    Pathway.Immune,
    Pathway.Metastasis,
    Pathway.AMPK,
    Pathway.Detox
  ],
  synergyScore: 82,
  monthlyCost: 180
};

export const F_PREVENTION: Formulation = {
  id: 'FORM-PREV-001',
  name: 'Prevention Protocol',
  aka: "Teresa's Daily Defense",
  compounds: [
    { compoundCode: 'D3', doseOverride: 5000, doseUnitOverride: 'IU', required: true },
    { compoundCode: 'OMG3', required: true },
    { compoundCode: 'EGCG', doseOverride: 250, required: false },
    { compoundCode: 'DIM', doseOverride: 100, required: false },
    { compoundCode: 'SEL', required: true }
  ],
  mechanism: 'Baseline protection + risk reduction',
  pathwaysTargeted: [
    Pathway.VDR,
    Pathway.Immune,
    Pathway.Hormonal,
    Pathway.COX2
  ],
  synergyScore: 55,
  monthlyCost: 60
};

export const F_BRCA: Formulation = {
  id: 'FORM-BRCA-001',
  name: 'BRCA Guardian',
  aka: 'The DNA Defender',
  compounds: [
    { compoundCode: 'SUL', required: true },
    { compoundCode: 'DIM', required: true },
    { compoundCode: 'D3', required: true },
    { compoundCode: 'SEL', required: true },
    { compoundCode: 'NAC', required: true },
    { compoundCode: 'RSV', required: true },
    { compoundCode: 'OMG3', required: true },
    { compoundCode: 'CUR', required: false }
  ],
  mechanism: 'DNA repair enhancement + detoxification optimization',
  pathwaysTargeted: [
    Pathway.p53,
    Pathway.Detox,
    Pathway.Hormonal,
    Pathway.VDR,
    Pathway.SIRT1
  ],
  synergyScore: 80,
  monthlyCost: 140
};

export const F_MAINTENANCE: Formulation = {
  id: 'FORM-MAINT-001',
  name: 'Maintenance Mode',
  aka: 'The Vigilant Watch',
  compounds: [
    { compoundCode: 'D3', required: true },
    { compoundCode: 'OMG3', required: true },
    { compoundCode: 'TT', required: true },
    { compoundCode: 'CUR', required: false },
    { compoundCode: 'SEL', required: true },
    { compoundCode: 'MEL', doseOverride: 10, required: false }
  ],
  mechanism: 'Sustained immune support + continued surveillance',
  pathwaysTargeted: [
    Pathway.Immune,
    Pathway.VDR,
    Pathway.NF_kB
  ],
  synergyScore: 60,
  monthlyCost: 80
};

// ═══════════════════════════════════════════════════════════════════
// ALL FORMULATIONS
// ═══════════════════════════════════════════════════════════════════

export const ALL_FORMULATIONS: Formulation[] = [
  F_TNBC,
  F_ER_POS,
  F_HER2,
  F_PREVENTION,
  F_BRCA,
  F_MAINTENANCE
];

export function getFormulationByCancerType(cancerType: string): Formulation | undefined {
  const mapping: Record<string, Formulation> = {
    'TNBC': F_TNBC,
    'ER_POS': F_ER_POS,
    'HER2_POS': F_HER2,
    'BRCA': F_BRCA,
    'PREVENTION': F_PREVENTION
  };
  return mapping[cancerType];
}

// ═══════════════════════════════════════════════════════════════════
// DOSING SCHEDULES
// ═══════════════════════════════════════════════════════════════════

export const MORNING_WINDOW: DosingWindow = {
  name: 'Morning',
  timeRange: { start: '06:00', end: '08:00' },
  withMeal: true,
  compoundCodes: ['MET', 'D3', 'OMG3', 'SEL', 'MCP', 'BBR'],
  notes: 'Take with breakfast. Metabolic compounds work best in morning.'
};

export const NOON_WINDOW: DosingWindow = {
  name: 'Noon',
  timeRange: { start: '12:00', end: '13:00' },
  withMeal: true,
  compoundCodes: ['CUR', 'EGCG', 'QRC', 'TT'],
  notes: 'Take with lunch. Anti-inflammatory and immune compounds.'
};

export const EVENING_WINDOW: DosingWindow = {
  name: 'Evening',
  timeRange: { start: '18:00', end: '19:00' },
  withMeal: true,
  compoundCodes: ['ASA', 'DIM', 'NAC', 'RSV'],
  notes: 'Take with dinner. Hormone and detox support.'
};

export const BEDTIME_WINDOW: DosingWindow = {
  name: 'Bedtime',
  timeRange: { start: '21:00', end: '22:00' },
  withMeal: false,
  compoundCodes: ['MEL'],
  notes: 'Take 30-60 minutes before sleep. Circadian support.'
};

export const STANDARD_SCHEDULE: DosingSchedule = {
  windows: [MORNING_WINDOW, NOON_WINDOW, EVENING_WINDOW, BEDTIME_WINDOW],
  fastingProtocol: {
    type: 'Time-Restricted Eating',
    hours: 16,
    description: '16:8 intermittent fasting - eating window 10am-6pm'
  },
  cycleSync: true,
  adjustments: [
    {
      condition: 'GI upset from Metformin',
      modification: 'Start with 250mg and titrate up over 2 weeks'
    },
    {
      condition: 'Insomnia from melatonin',
      modification: 'Reduce dose to 5mg or take earlier (8pm)'
    },
    {
      condition: 'During chemotherapy',
      modification: 'Take compounds 2 hours apart from chemo drugs'
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════
// LIFESTYLE PRESCRIPTIONS
// ═══════════════════════════════════════════════════════════════════

export const STANDARD_LIFESTYLE: LifestyleRx = {
  diet: {
    type: 'Anti-Cancer Mediterranean',
    restrictions: [
      'No processed foods',
      'No added sugars',
      'Minimal alcohol',
      'No processed meats',
      'Limited dairy'
    ],
    emphases: [
      'Cruciferous vegetables daily',
      'Colorful vegetables 8+ servings',
      'Wild-caught fish 3x/week',
      'Olive oil as primary fat',
      'Nuts and seeds daily',
      'Green tea 3-4 cups',
      'Berries daily',
      'Garlic and onions frequently'
    ]
  },
  exercise: {
    type: 'Mixed modality',
    frequency: '5-6 days per week',
    duration: '30-60 minutes',
    intensity: 'Moderate with intervals'
  },
  sleep: {
    targetHours: 8,
    bedtime: '22:00',
    wakeTime: '06:00',
    practices: [
      'No screens 1 hour before bed',
      'Cool dark room (65-68°F)',
      'Consistent schedule',
      'Morning sunlight exposure'
    ]
  },
  stress: {
    practices: [
      'Daily meditation 10-20 min',
      'Deep breathing exercises',
      'Nature exposure',
      'Social connection',
      'Gratitude practice'
    ],
    frequency: 'Daily'
  },
  detox: {
    sauna: {
      type: 'Infrared',
      frequency: '3-4x per week'
    },
    other: [
      'Dry brushing',
      'Epsom salt baths',
      'Lymphatic massage monthly'
    ]
  }
};

export const GENTLE_LIFESTYLE: LifestyleRx = {
  diet: {
    type: 'Gentle Anti-Cancer',
    restrictions: [
      'No processed foods',
      'No added sugars',
      'No alcohol'
    ],
    emphases: [
      'Easy to digest foods',
      'Soups and broths',
      'Cooked vegetables',
      'Small frequent meals'
    ]
  },
  exercise: {
    type: 'Gentle movement',
    frequency: 'Daily',
    duration: '15-30 minutes',
    intensity: 'Light - walking, yoga, stretching'
  },
  sleep: {
    targetHours: 9,
    bedtime: '21:00',
    wakeTime: '06:00',
    practices: [
      'Rest when needed',
      'Naps okay',
      'Dark quiet room'
    ]
  },
  stress: {
    practices: [
      'Gentle meditation',
      'Breathing exercises',
      'Restorative yoga',
      'Support groups'
    ],
    frequency: 'As tolerated'
  },
  detox: {
    other: [
      'Gentle walking',
      'Epsom salt baths'
    ]
  }
};
