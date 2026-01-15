/**
 * KONOMI STANDARD: COUNT RACKULA
 * Layer 1: Base UDTs (Healthcare Primitives)
 *
 * Core type definitions for the metabolic oncology protocol system
 */

// ═══════════════════════════════════════════════════════════════════
// PRIMITIVE TYPES
// ═══════════════════════════════════════════════════════════════════

export type UUID = string;
export type Timestamp = Date;
export type Duration = {
  value: number;
  unit: 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';
};

export interface Range {
  min: number;
  max: number;
  unit?: string;
}

// ═══════════════════════════════════════════════════════════════════
// PATIENT IDENTIFIERS
// ═══════════════════════════════════════════════════════════════════

export interface PatientIdentifier {
  patientUuid: string;      // Format: PT-xxxxxxxx
  cohortId?: string;        // Format: COH-{cancer_type}-{n}
  protocolId?: string;      // Format: RACK-{version}-{type}
}

// ═══════════════════════════════════════════════════════════════════
// ENUMS
// ═══════════════════════════════════════════════════════════════════

export enum ProtocolState {
  Evaluation = 'Evaluation',
  Onboarding = 'Onboarding',
  Active = 'Active',
  Maintenance = 'Maintenance',
  Remission = 'Remission',
  Graduated = 'Graduated',
  Paused = 'Paused',
  Discontinued = 'Discontinued'
}

export enum CancerType {
  TNBC = 'TNBC',           // Triple Negative Breast Cancer
  ER_POS = 'ER_POS',       // Estrogen Receptor Positive
  HER2_POS = 'HER2_POS',   // HER2 Positive
  BRCA = 'BRCA',           // BRCA mutation carriers
  DCIS = 'DCIS',           // Ductal Carcinoma In Situ
  IBC = 'IBC',             // Inflammatory Breast Cancer
  PREVENTION = 'PREVENTION' // Prevention/High Risk
}

export enum RiskLevel {
  Low = 'Low',
  Moderate = 'Moderate',
  High = 'High',
  VeryHigh = 'VeryHigh',
  Active = 'Active'
}

export enum Pathway {
  AMPK = 'AMPK',
  NF_kB = 'NF_kB',
  VEGF = 'VEGF',
  COX2 = 'COX2',
  VDR = 'VDR',
  SIRT1 = 'SIRT1',
  p53 = 'p53',
  HER2 = 'HER2',
  mTOR = 'mTOR',
  PI3K = 'PI3K',
  Wnt = 'Wnt',
  Hedgehog = 'Hedgehog',
  Notch = 'Notch',
  JAK_STAT = 'JAK_STAT',
  Warburg = 'Warburg',
  Apoptosis = 'Apoptosis',
  Autophagy = 'Autophagy',
  Angiogenesis = 'Angiogenesis',
  Metastasis = 'Metastasis',
  StemCell = 'StemCell',
  Immune = 'Immune',
  Hormonal = 'Hormonal',
  Aromatase = 'Aromatase',
  Detox = 'Detox'
}

export enum CompoundClass {
  Metabolic = 'Metabolic',
  AntiInflammatory = 'AntiInflammatory',
  Hormonal = 'Hormonal',
  Antioxidant = 'Antioxidant',
  Immune = 'Immune',
  Detox = 'Detox',
  Angiogenesis = 'Angiogenesis'
}

export enum FDAStatus {
  Approved = 'Approved',
  GRAS = 'GRAS',
  Supplement = 'Supplement',
  OTC = 'OTC'
}

export enum DosageUnit {
  mg = 'mg',
  mcg = 'mcg',
  IU = 'IU',
  g = 'g'
}

export enum DosageForm {
  Capsule = 'Capsule',
  Tablet = 'Tablet',
  Powder = 'Powder',
  Liquid = 'Liquid',
  Topical = 'Topical'
}

export enum EvidenceType {
  RCT = 'RCT',
  Meta = 'Meta',
  Cohort = 'Cohort',
  Case = 'Case'
}

export enum PregnancyCategory {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  X = 'X'
}

// ═══════════════════════════════════════════════════════════════════
// CLINICAL EVIDENCE
// ═══════════════════════════════════════════════════════════════════

export interface ClinicalEvidence {
  studyId: string;
  type: EvidenceType;
  n: number;
  effectSize: number;
  ci95: [number, number];
  pValue: number;
  source: string;
  riskReduction?: number;  // Relative risk reduction
}

// ═══════════════════════════════════════════════════════════════════
// SAFETY PROFILE
// ═══════════════════════════════════════════════════════════════════

export interface DrugInteraction {
  compound: string;
  severity: 'Minor' | 'Moderate' | 'Major';
  effect: string;
}

export interface SafetyProfile {
  compoundId: string;
  ld50?: number;
  maxDaily: number;
  maxDailyUnit: DosageUnit;
  contraindications: string[];
  interactions: DrugInteraction[];
  pregnancyCategory: PregnancyCategory;
  warnings?: string[];
}

// ═══════════════════════════════════════════════════════════════════
// BIOMARKERS
// ═══════════════════════════════════════════════════════════════════

export type TrendDirection = 'up' | 'down' | 'stable';

export interface Biomarker {
  name: string;
  value: number;
  unit: string;
  referenceRange: Range;
  timestamp: Timestamp;
  trend: TrendDirection;
}

export enum BiomarkerCategory {
  Tumor = 'Tumor',
  Inflammation = 'Inflammation',
  Metabolic = 'Metabolic',
  Hormonal = 'Hormonal',
  Immune = 'Immune',
  Nutritional = 'Nutritional'
}

export interface BiomarkerSpec {
  marker: string;
  category: BiomarkerCategory;
  optimalRange: Range;
  actionThreshold: number;
  frequency: Duration;
  lowerBetter?: boolean;
}

// ═══════════════════════════════════════════════════════════════════
// DOSAGE
// ═══════════════════════════════════════════════════════════════════

export interface Dosage {
  compoundId: string;
  amount: number;
  unit: DosageUnit;
  frequency: string;
  timing: string;
  withFood: boolean;
}

// ═══════════════════════════════════════════════════════════════════
// EFFICACY METRICS
// ═══════════════════════════════════════════════════════════════════

export interface EfficacyMetric {
  endpoint: string;
  baseline: number;
  current: number;
  target: number;
  deltaPct: number;
  significance: boolean;
}

// ═══════════════════════════════════════════════════════════════════
// OUTCOME METRICS
// ═══════════════════════════════════════════════════════════════════

export interface OutcomeMetric {
  id: string;
  name: string;
  calculation: string;
  target: number;
  benchmark: number;
  currentValue?: number;
}

// ═══════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

export function generatePatientUuid(): string {
  const hex = () => Math.floor(Math.random() * 16).toString(16);
  return `PT-${Array(8).fill(0).map(hex).join('')}`;
}

export function generateCohortId(cancerType: CancerType, n: number): string {
  return `COH-${cancerType}-${n.toString().padStart(4, '0')}`;
}

export function generateProtocolId(version: string, type: string): string {
  return `RACK-${version}-${type}`;
}

export function isWithinRange(value: number, range: Range): boolean {
  return value >= range.min && value <= range.max;
}

export function calculateTrend(values: number[]): TrendDirection {
  if (values.length < 2) return 'stable';
  const recent = values.slice(-3);
  const avg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const first = recent[0];
  const diff = avg - first;
  const threshold = first * 0.05; // 5% change threshold
  if (diff > threshold) return 'up';
  if (diff < -threshold) return 'down';
  return 'stable';
}
