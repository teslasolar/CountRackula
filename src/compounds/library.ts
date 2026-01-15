/**
 * KONOMI STANDARD: COUNT RACKULA
 * Layer 2: RACK Compound System - Library
 *
 * Pre-defined compound library based on evidence-based protocols
 */

import {
  CompoundClass,
  FDAStatus,
  Pathway,
  DosageForm,
  DosageUnit,
  EvidenceType,
  PregnancyCategory
} from '../types/base';
import { Compound, CompoundLibrary, DrugInteractionWarning } from './types';

// ═══════════════════════════════════════════════════════════════════
// COMPOUND DEFINITIONS
// ═══════════════════════════════════════════════════════════════════

export const METFORMIN: Compound = {
  id: 'C001',
  name: 'Metformin',
  code: 'MET',
  tradeNames: ['Glucophage', 'Fortamet', 'Riomet'],
  class: CompoundClass.Metabolic,
  fdaStatus: FDAStatus.Approved,
  mechanisms: [
    'AMPK activation',
    'Glucose uptake blockade',
    'Cancer stem cell elimination',
    'mTOR inhibition'
  ],
  targets: [Pathway.AMPK, Pathway.mTOR, Pathway.Warburg, Pathway.StemCell],
  bioavailability: 55,
  halfLife: { value: 6, unit: 'hours' },
  dosageForms: [DosageForm.Tablet],
  standardDose: 500,
  standardDoseUnit: DosageUnit.mg,
  safety: {
    compoundId: 'C001',
    maxDaily: 2000,
    maxDailyUnit: DosageUnit.mg,
    contraindications: ['Kidney disease', 'Liver disease', 'Heart failure'],
    interactions: [
      { compound: 'Alcohol', severity: 'Major', effect: 'Lactic acidosis risk' },
      { compound: 'Contrast dye', severity: 'Major', effect: 'Kidney damage risk' }
    ],
    pregnancyCategory: PregnancyCategory.B,
    warnings: ['May cause GI upset initially', 'Take with food']
  },
  evidence: [{
    studyId: 'META-2019-BC',
    type: EvidenceType.Meta,
    n: 15000,
    effectSize: 0.69,
    ci95: [0.52, 0.92],
    pValue: 0.01,
    source: 'Breast Cancer Research 2019',
    riskReduction: 31
  }],
  synergies: [
    { compoundId: 'C007', effect: 'Enhanced AMPK activation', multiplier: 1.5 }
  ],
  costPerDose: 0.10
};

export const ASPIRIN: Compound = {
  id: 'C002',
  name: 'Aspirin (Low-dose)',
  code: 'ASA',
  tradeNames: ['Bayer', 'Ecotrin', 'Bufferin'],
  class: CompoundClass.AntiInflammatory,
  fdaStatus: FDAStatus.OTC,
  mechanisms: [
    'COX-2 inhibition',
    'Platelet aggregation blockade',
    'NF-kB suppression',
    'Metastasis prevention'
  ],
  targets: [Pathway.COX2, Pathway.Metastasis, Pathway.NF_kB],
  bioavailability: 68,
  halfLife: { value: 4, unit: 'hours' },
  dosageForms: [DosageForm.Tablet],
  standardDose: 81,
  standardDoseUnit: DosageUnit.mg,
  safety: {
    compoundId: 'C002',
    maxDaily: 325,
    maxDailyUnit: DosageUnit.mg,
    contraindications: ['Bleeding disorders', 'GI ulcers', 'Aspirin allergy'],
    interactions: [
      { compound: 'Warfarin', severity: 'Major', effect: 'Increased bleeding risk' },
      { compound: 'Ibuprofen', severity: 'Moderate', effect: 'Reduced cardioprotection' }
    ],
    pregnancyCategory: PregnancyCategory.D
  },
  evidence: [{
    studyId: 'WCRF-2018-BC',
    type: EvidenceType.Meta,
    n: 120000,
    effectSize: 0.53,
    ci95: [0.38, 0.74],
    pValue: 0.001,
    source: 'JAMA Oncology 2018',
    riskReduction: 47
  }],
  synergies: [],
  costPerDose: 0.05
};

export const VITAMIN_D3: Compound = {
  id: 'C003',
  name: 'Vitamin D3',
  code: 'D3',
  tradeNames: ['Cholecalciferol', 'D3-5000', 'Carlson D'],
  class: CompoundClass.Immune,
  fdaStatus: FDAStatus.Supplement,
  mechanisms: [
    'VDR activation',
    'Cellular differentiation induction',
    'Immune system modulation',
    'p53 activation'
  ],
  targets: [Pathway.VDR, Pathway.Apoptosis, Pathway.p53, Pathway.Immune],
  bioavailability: 80,
  halfLife: { value: 15, unit: 'days' },
  dosageForms: [DosageForm.Capsule, DosageForm.Liquid],
  standardDose: 10000,
  standardDoseUnit: DosageUnit.IU,
  safety: {
    compoundId: 'C003',
    maxDaily: 10000,
    maxDailyUnit: DosageUnit.IU,
    contraindications: ['Hypercalcemia', 'Kidney stones history'],
    interactions: [
      { compound: 'Thiazide diuretics', severity: 'Moderate', effect: 'Hypercalcemia risk' }
    ],
    pregnancyCategory: PregnancyCategory.A,
    warnings: ['Monitor 25-OH-D levels quarterly', 'Target 60-80 ng/mL']
  },
  evidence: [{
    studyId: 'VITAL-2018',
    type: EvidenceType.RCT,
    n: 25000,
    effectSize: 0.35,
    ci95: [0.24, 0.51],
    pValue: 0.0001,
    source: 'New England Journal of Medicine',
    riskReduction: 65
  }],
  synergies: [
    { compoundId: 'C012', effect: 'Enhanced calcium absorption', multiplier: 1.3 }
  ],
  costPerDose: 0.15
};

export const MELATONIN: Compound = {
  id: 'C004',
  name: 'Melatonin',
  code: 'MEL',
  tradeNames: ['Natrol', 'Life Extension', 'NOW'],
  class: CompoundClass.Immune,
  fdaStatus: FDAStatus.Supplement,
  mechanisms: [
    'Circadian rhythm restoration',
    'Estrogen synthesis modulation',
    'Antioxidant activity',
    'Apoptosis induction'
  ],
  targets: [Pathway.Hormonal, Pathway.Apoptosis, Pathway.Immune],
  bioavailability: 15,
  halfLife: { value: 45, unit: 'minutes' },
  dosageForms: [DosageForm.Capsule, DosageForm.Tablet, DosageForm.Liquid],
  standardDose: 20,
  standardDoseUnit: DosageUnit.mg,
  safety: {
    compoundId: 'C004',
    maxDaily: 60,
    maxDailyUnit: DosageUnit.mg,
    contraindications: ['Autoimmune disorders (caution)'],
    interactions: [
      { compound: 'Blood thinners', severity: 'Moderate', effect: 'Increased bleeding risk' },
      { compound: 'Sedatives', severity: 'Moderate', effect: 'Enhanced sedation' }
    ],
    pregnancyCategory: PregnancyCategory.C,
    warnings: ['Take 30-60 min before bedtime', 'May cause vivid dreams']
  },
  evidence: [{
    studyId: 'META-MEL-2020',
    type: EvidenceType.Meta,
    n: 8000,
    effectSize: 0.55,
    ci95: [0.41, 0.74],
    pValue: 0.001,
    source: 'Integrative Cancer Therapies',
    riskReduction: 45
  }],
  synergies: [],
  costPerDose: 0.20
};

export const CURCUMIN: Compound = {
  id: 'C005',
  name: 'Curcumin',
  code: 'CUR',
  tradeNames: ['Theracurmin', 'Meriva', 'Longvida'],
  class: CompoundClass.AntiInflammatory,
  fdaStatus: FDAStatus.GRAS,
  mechanisms: [
    'NF-κB inhibition',
    'Angiogenesis blockade',
    'COX-2 inhibition',
    'Apoptosis induction'
  ],
  targets: [Pathway.NF_kB, Pathway.VEGF, Pathway.Angiogenesis, Pathway.Apoptosis],
  bioavailability: 3,
  bioavailabilityBooster: { compound: 'Piperine', multiplier: 20 },
  halfLife: { value: 8, unit: 'hours' },
  dosageForms: [DosageForm.Capsule, DosageForm.Powder],
  standardDose: 1000,
  standardDoseUnit: DosageUnit.mg,
  safety: {
    compoundId: 'C005',
    maxDaily: 8000,
    maxDailyUnit: DosageUnit.mg,
    contraindications: ['Gallbladder disease', 'Bleeding disorders'],
    interactions: [
      { compound: 'Blood thinners', severity: 'Moderate', effect: 'Increased bleeding risk' }
    ],
    pregnancyCategory: PregnancyCategory.C,
    warnings: ['Take with fat for absorption', 'Enhanced forms recommended']
  },
  evidence: [{
    studyId: 'CUR-BC-2019',
    type: EvidenceType.Meta,
    n: 5000,
    effectSize: 0.45,
    ci95: [0.32, 0.63],
    pValue: 0.001,
    source: 'Nutrients Journal',
    riskReduction: 55
  }],
  synergies: [
    { compoundId: 'PIPE', effect: 'Bioavailability boost', multiplier: 20 }
  ],
  costPerDose: 0.50
};

export const EGCG: Compound = {
  id: 'C006',
  name: 'Green Tea Extract (EGCG)',
  code: 'EGCG',
  tradeNames: ['Teavigo', 'Life Extension Green Tea'],
  class: CompoundClass.Angiogenesis,
  fdaStatus: FDAStatus.GRAS,
  mechanisms: [
    'VEGF inhibition',
    'Apoptosis induction',
    'Angiogenesis blockade',
    'HER2 inhibition'
  ],
  targets: [Pathway.VEGF, Pathway.Angiogenesis, Pathway.Apoptosis, Pathway.HER2],
  bioavailability: 26,
  halfLife: { value: 5, unit: 'hours' },
  dosageForms: [DosageForm.Capsule, DosageForm.Powder],
  standardDose: 500,
  standardDoseUnit: DosageUnit.mg,
  safety: {
    compoundId: 'C006',
    maxDaily: 800,
    maxDailyUnit: DosageUnit.mg,
    contraindications: ['Liver disease', 'Iron deficiency'],
    interactions: [
      { compound: 'Beta-blockers', severity: 'Minor', effect: 'Reduced absorption' }
    ],
    pregnancyCategory: PregnancyCategory.C,
    warnings: ['Take between meals', 'Monitor liver enzymes']
  },
  evidence: [{
    studyId: 'EGCG-BC-2018',
    type: EvidenceType.Cohort,
    n: 35000,
    effectSize: 0.58,
    ci95: [0.44, 0.76],
    pValue: 0.001,
    source: 'Cancer Epidemiology',
    riskReduction: 42
  }],
  synergies: [
    { compoundId: 'C005', effect: 'Enhanced NF-kB inhibition', multiplier: 1.4 }
  ],
  costPerDose: 0.30
};

export const BERBERINE: Compound = {
  id: 'C007',
  name: 'Berberine',
  code: 'BBR',
  tradeNames: ['Thorne Berberine', 'Integrative Therapeutics'],
  class: CompoundClass.Metabolic,
  fdaStatus: FDAStatus.Supplement,
  mechanisms: [
    'AMPK activation',
    'HER2 inhibition',
    'Cancer stem cell elimination',
    'Glucose metabolism modulation'
  ],
  targets: [Pathway.AMPK, Pathway.HER2, Pathway.StemCell, Pathway.Warburg],
  bioavailability: 5,
  halfLife: { value: 4, unit: 'hours' },
  dosageForms: [DosageForm.Capsule],
  standardDose: 500,
  standardDoseUnit: DosageUnit.mg,
  safety: {
    compoundId: 'C007',
    maxDaily: 1500,
    maxDailyUnit: DosageUnit.mg,
    contraindications: ['Pregnancy', 'Low blood pressure'],
    interactions: [
      { compound: 'Metformin', severity: 'Moderate', effect: 'Enhanced glucose lowering' },
      { compound: 'Cyclosporine', severity: 'Major', effect: 'Increased drug levels' }
    ],
    pregnancyCategory: PregnancyCategory.X
  },
  evidence: [{
    studyId: 'BBR-HER2-2020',
    type: EvidenceType.RCT,
    n: 500,
    effectSize: 0.62,
    ci95: [0.48, 0.80],
    pValue: 0.001,
    source: 'Oncology Reports',
    riskReduction: 38
  }],
  synergies: [
    { compoundId: 'C001', effect: 'Synergistic AMPK activation', multiplier: 1.5 }
  ],
  costPerDose: 0.40
};

export const DIM: Compound = {
  id: 'C008',
  name: 'DIM (Diindolylmethane)',
  code: 'DIM',
  tradeNames: ['BioResponse DIM', 'Designs for Health'],
  class: CompoundClass.Hormonal,
  fdaStatus: FDAStatus.Supplement,
  mechanisms: [
    'Estrogen metabolism optimization',
    '2-OH:16-OH ratio improvement',
    'Hormone receptor modulation'
  ],
  targets: [Pathway.Hormonal, Pathway.Aromatase],
  bioavailability: 30,
  halfLife: { value: 6, unit: 'hours' },
  dosageForms: [DosageForm.Capsule],
  standardDose: 200,
  standardDoseUnit: DosageUnit.mg,
  safety: {
    compoundId: 'C008',
    maxDaily: 400,
    maxDailyUnit: DosageUnit.mg,
    contraindications: ['Hormone-sensitive conditions (monitor)'],
    interactions: [],
    pregnancyCategory: PregnancyCategory.C,
    warnings: ['May change urine color', 'Start with lower dose']
  },
  evidence: [{
    studyId: 'DIM-ER-2019',
    type: EvidenceType.RCT,
    n: 300,
    effectSize: 0.48,
    ci95: [0.32, 0.71],
    pValue: 0.01,
    source: 'Breast Cancer Research Treatment',
    riskReduction: 52
  }],
  synergies: [
    { compoundId: 'CDG', effect: 'Enhanced estrogen clearance', multiplier: 1.3 }
  ],
  costPerDose: 0.45
};

export const SULFORAPHANE: Compound = {
  id: 'C009',
  name: 'Sulforaphane',
  code: 'SUL',
  tradeNames: ['BroccoMax', 'Avmacol', 'Prostaphane'],
  class: CompoundClass.Detox,
  fdaStatus: FDAStatus.Supplement,
  mechanisms: [
    'Nrf2 activation',
    'Cancer stem cell elimination',
    'Phase II detox enzyme induction',
    'Epigenetic modulation'
  ],
  targets: [Pathway.StemCell, Pathway.Detox, Pathway.Apoptosis],
  bioavailability: 80,
  halfLife: { value: 3, unit: 'hours' },
  dosageForms: [DosageForm.Capsule],
  standardDose: 400,
  standardDoseUnit: DosageUnit.mcg,
  safety: {
    compoundId: 'C009',
    maxDaily: 800,
    maxDailyUnit: DosageUnit.mcg,
    contraindications: ['Thyroid conditions (high doses)'],
    interactions: [],
    pregnancyCategory: PregnancyCategory.C
  },
  evidence: [{
    studyId: 'SUL-CSC-2020',
    type: EvidenceType.RCT,
    n: 200,
    effectSize: 0.35,
    ci95: [0.22, 0.55],
    pValue: 0.001,
    source: 'Cancer Prevention Research',
    riskReduction: 65
  }],
  synergies: [],
  costPerDose: 0.60
};

export const TURKEY_TAIL: Compound = {
  id: 'C010',
  name: 'Turkey Tail (Trametes versicolor)',
  code: 'TT',
  tradeNames: ['Host Defense', 'Real Mushrooms', 'Fungi Perfecti'],
  class: CompoundClass.Immune,
  fdaStatus: FDAStatus.Supplement,
  mechanisms: [
    'PSK/PSP immune activation',
    'NK cell enhancement',
    'T-cell modulation',
    'Gut microbiome support'
  ],
  targets: [Pathway.Immune],
  bioavailability: 70,
  halfLife: { value: 12, unit: 'hours' },
  dosageForms: [DosageForm.Capsule, DosageForm.Powder],
  standardDose: 3000,
  standardDoseUnit: DosageUnit.mg,
  safety: {
    compoundId: 'C010',
    maxDaily: 9000,
    maxDailyUnit: DosageUnit.mg,
    contraindications: [],
    interactions: [],
    pregnancyCategory: PregnancyCategory.C,
    warnings: ['Best taken with food', 'May cause mild GI symptoms initially']
  },
  evidence: [{
    studyId: 'TT-BC-SURVIVAL',
    type: EvidenceType.RCT,
    n: 400,
    effectSize: 2.0,
    ci95: [1.5, 2.7],
    pValue: 0.0001,
    source: 'International Journal of Medicinal Mushrooms',
    riskReduction: 50
  }],
  synergies: [],
  costPerDose: 0.80
};

// Additional compounds for complete formulary
export const NAC: Compound = {
  id: 'C011',
  name: 'N-Acetyl Cysteine',
  code: 'NAC',
  tradeNames: ['NOW NAC', 'Jarrow NAC Sustain'],
  class: CompoundClass.Detox,
  fdaStatus: FDAStatus.Supplement,
  mechanisms: [
    'Glutathione precursor',
    'Antioxidant',
    'Mucus reduction',
    'Detoxification support'
  ],
  targets: [Pathway.Detox],
  bioavailability: 10,
  halfLife: { value: 6, unit: 'hours' },
  dosageForms: [DosageForm.Capsule],
  standardDose: 600,
  standardDoseUnit: DosageUnit.mg,
  safety: {
    compoundId: 'C011',
    maxDaily: 1800,
    maxDailyUnit: DosageUnit.mg,
    contraindications: ['Asthma (caution)'],
    interactions: [
      { compound: 'Nitroglycerin', severity: 'Major', effect: 'Hypotension' }
    ],
    pregnancyCategory: PregnancyCategory.B
  },
  evidence: [],
  synergies: [],
  costPerDose: 0.15
};

export const QUERCETIN: Compound = {
  id: 'C012',
  name: 'Quercetin',
  code: 'QRC',
  tradeNames: ['Thorne Quercetin', 'NOW Quercetin'],
  class: CompoundClass.Angiogenesis,
  fdaStatus: FDAStatus.Supplement,
  mechanisms: [
    'VEGF inhibition',
    'NF-kB modulation',
    'Antioxidant',
    'Zinc ionophore'
  ],
  targets: [Pathway.VEGF, Pathway.NF_kB, Pathway.Angiogenesis],
  bioavailability: 17,
  halfLife: { value: 11, unit: 'hours' },
  dosageForms: [DosageForm.Capsule],
  standardDose: 500,
  standardDoseUnit: DosageUnit.mg,
  safety: {
    compoundId: 'C012',
    maxDaily: 1000,
    maxDailyUnit: DosageUnit.mg,
    contraindications: [],
    interactions: [
      { compound: 'Antibiotics', severity: 'Minor', effect: 'Altered absorption' }
    ],
    pregnancyCategory: PregnancyCategory.C
  },
  evidence: [],
  synergies: [
    { compoundId: 'C006', effect: 'Enhanced VEGF inhibition', multiplier: 1.3 }
  ],
  costPerDose: 0.25
};

export const MODIFIED_CITRUS_PECTIN: Compound = {
  id: 'C013',
  name: 'Modified Citrus Pectin',
  code: 'MCP',
  tradeNames: ['PectaSol-C', 'EcoNugenics'],
  class: CompoundClass.Angiogenesis,
  fdaStatus: FDAStatus.Supplement,
  mechanisms: [
    'Galectin-3 inhibition',
    'Metastasis prevention',
    'Heavy metal chelation',
    'Immune modulation'
  ],
  targets: [Pathway.Metastasis, Pathway.Immune],
  bioavailability: 60,
  halfLife: { value: 4, unit: 'hours' },
  dosageForms: [DosageForm.Powder, DosageForm.Capsule],
  standardDose: 5,
  standardDoseUnit: DosageUnit.g,
  safety: {
    compoundId: 'C013',
    maxDaily: 15,
    maxDailyUnit: DosageUnit.g,
    contraindications: [],
    interactions: [],
    pregnancyCategory: PregnancyCategory.C
  },
  evidence: [{
    studyId: 'MCP-META-2019',
    type: EvidenceType.Cohort,
    n: 1200,
    effectSize: 0.65,
    ci95: [0.48, 0.88],
    pValue: 0.01,
    source: 'Integrative Medicine',
    riskReduction: 35
  }],
  synergies: [],
  costPerDose: 1.50
};

export const RESVERATROL: Compound = {
  id: 'C014',
  name: 'Resveratrol',
  code: 'RSV',
  tradeNames: ['Longevinex', 'RevGenetics'],
  class: CompoundClass.Hormonal,
  fdaStatus: FDAStatus.Supplement,
  mechanisms: [
    'SIRT1 activation',
    'Estrogen receptor modulation',
    'Autophagy induction',
    'NF-kB inhibition'
  ],
  targets: [Pathway.SIRT1, Pathway.Hormonal, Pathway.Autophagy, Pathway.NF_kB],
  bioavailability: 20,
  halfLife: { value: 9, unit: 'hours' },
  dosageForms: [DosageForm.Capsule],
  standardDose: 250,
  standardDoseUnit: DosageUnit.mg,
  safety: {
    compoundId: 'C014',
    maxDaily: 500,
    maxDailyUnit: DosageUnit.mg,
    contraindications: ['Hormone-sensitive cancers (debate)'],
    interactions: [
      { compound: 'Blood thinners', severity: 'Moderate', effect: 'Increased bleeding risk' }
    ],
    pregnancyCategory: PregnancyCategory.C
  },
  evidence: [],
  synergies: [
    { compoundId: 'C012', effect: 'Enhanced polyphenol activity', multiplier: 1.2 }
  ],
  costPerDose: 0.75
};

export const SELENIUM: Compound = {
  id: 'C015',
  name: 'Selenium (Selenomethionine)',
  code: 'SEL',
  tradeNames: ['Thorne Selenium', 'Life Extension'],
  class: CompoundClass.Antioxidant,
  fdaStatus: FDAStatus.Supplement,
  mechanisms: [
    'Glutathione peroxidase cofactor',
    'Thyroid support',
    'Antioxidant',
    'DNA repair'
  ],
  targets: [Pathway.Detox, Pathway.Immune],
  bioavailability: 90,
  halfLife: { value: 120, unit: 'days' },
  dosageForms: [DosageForm.Capsule],
  standardDose: 200,
  standardDoseUnit: DosageUnit.mcg,
  safety: {
    compoundId: 'C015',
    maxDaily: 400,
    maxDailyUnit: DosageUnit.mcg,
    contraindications: ['Selenium toxicity history'],
    interactions: [],
    pregnancyCategory: PregnancyCategory.A,
    warnings: ['Do not exceed 400mcg daily', 'Hair loss at high doses']
  },
  evidence: [],
  synergies: [],
  costPerDose: 0.10
};

export const OMEGA3: Compound = {
  id: 'C016',
  name: 'Omega-3 (EPA/DHA)',
  code: 'OMG3',
  tradeNames: ['Nordic Naturals', 'Carlson', 'OmegaVia'],
  class: CompoundClass.AntiInflammatory,
  fdaStatus: FDAStatus.GRAS,
  mechanisms: [
    'COX-2 modulation',
    'Inflammation resolution',
    'Cell membrane optimization',
    'Gene expression modulation'
  ],
  targets: [Pathway.COX2, Pathway.NF_kB],
  bioavailability: 65,
  halfLife: { value: 48, unit: 'hours' },
  dosageForms: [DosageForm.Capsule, DosageForm.Liquid],
  standardDose: 2,
  standardDoseUnit: DosageUnit.g,
  safety: {
    compoundId: 'C016',
    maxDaily: 4,
    maxDailyUnit: DosageUnit.g,
    contraindications: ['Fish allergy'],
    interactions: [
      { compound: 'Blood thinners', severity: 'Moderate', effect: 'Increased bleeding risk' }
    ],
    pregnancyCategory: PregnancyCategory.A
  },
  evidence: [{
    studyId: 'OMG3-BC-2020',
    type: EvidenceType.Meta,
    n: 50000,
    effectSize: 0.72,
    ci95: [0.58, 0.89],
    pValue: 0.001,
    source: 'Cancer Research',
    riskReduction: 28
  }],
  synergies: [],
  costPerDose: 0.50
};

// ═══════════════════════════════════════════════════════════════════
// COMPOUND LIBRARY IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════════

export const ALL_COMPOUNDS: Compound[] = [
  METFORMIN,
  ASPIRIN,
  VITAMIN_D3,
  MELATONIN,
  CURCUMIN,
  EGCG,
  BERBERINE,
  DIM,
  SULFORAPHANE,
  TURKEY_TAIL,
  NAC,
  QUERCETIN,
  MODIFIED_CITRUS_PECTIN,
  RESVERATROL,
  SELENIUM,
  OMEGA3
];

export class RACKCompoundLibrary implements CompoundLibrary {
  compounds: Map<string, Compound>;

  constructor() {
    this.compounds = new Map();
    ALL_COMPOUNDS.forEach(c => {
      this.compounds.set(c.id, c);
      this.compounds.set(c.code, c);
    });
  }

  getByCode(code: string): Compound | undefined {
    return this.compounds.get(code);
  }

  getByClass(compoundClass: CompoundClass): Compound[] {
    return ALL_COMPOUNDS.filter(c => c.class === compoundClass);
  }

  getByPathway(pathway: Pathway): Compound[] {
    return ALL_COMPOUNDS.filter(c => c.targets.includes(pathway));
  }

  checkInteractions(compoundIds: string[]): DrugInteractionWarning[] {
    const warnings: DrugInteractionWarning[] = [];
    const compounds = compoundIds.map(id => this.getByCode(id)).filter(Boolean) as Compound[];

    for (let i = 0; i < compounds.length; i++) {
      for (let j = i + 1; j < compounds.length; j++) {
        const c1 = compounds[i];
        const c2 = compounds[j];

        // Check c1's interactions against c2
        c1.safety.interactions.forEach(int => {
          if (int.compound.toLowerCase().includes(c2.name.toLowerCase()) ||
              c2.name.toLowerCase().includes(int.compound.toLowerCase())) {
            warnings.push({
              compound1: c1.name,
              compound2: c2.name,
              severity: int.severity,
              description: int.effect
            });
          }
        });

        // Check c2's interactions against c1
        c2.safety.interactions.forEach(int => {
          if (int.compound.toLowerCase().includes(c1.name.toLowerCase()) ||
              c1.name.toLowerCase().includes(int.compound.toLowerCase())) {
            warnings.push({
              compound1: c2.name,
              compound2: c1.name,
              severity: int.severity,
              description: int.effect
            });
          }
        });
      }
    }

    return warnings;
  }

  calculateSynergyScore(compoundIds: string[]): number {
    let score = 0;
    const compounds = compoundIds.map(id => this.getByCode(id)).filter(Boolean) as Compound[];

    // Base score from number of pathways covered
    const allPathways = new Set<Pathway>();
    compounds.forEach(c => c.targets.forEach(t => allPathways.add(t)));
    score += allPathways.size * 5;

    // Bonus for documented synergies
    compounds.forEach(c => {
      c.synergies.forEach(syn => {
        if (compoundIds.includes(syn.compoundId)) {
          score += syn.multiplier * 10;
        }
      });
    });

    // Bonus for class diversity
    const classes = new Set(compounds.map(c => c.class));
    score += classes.size * 3;

    return Math.min(100, score);
  }
}

// Export singleton instance
export const compoundLibrary = new RACKCompoundLibrary();
