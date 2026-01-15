/**
 * KONOMI STANDARD: COUNT RACKULA
 * Layer 3: RACK Protocol Engine - Types
 *
 * Type definitions for treatment protocol management
 */

import {
  UUID,
  Duration,
  CancerType,
  RiskLevel,
  ProtocolState,
  Pathway,
  ClinicalEvidence
} from '../types/base';

// ═══════════════════════════════════════════════════════════════════
// DOSING TYPES
// ═══════════════════════════════════════════════════════════════════

export type DosingWindowName = 'Morning' | 'Noon' | 'Evening' | 'Bedtime';

export interface DosingWindow {
  name: DosingWindowName;
  timeRange: {
    start: string;  // HH:MM format
    end: string;
  };
  withMeal: boolean;
  compoundCodes: string[];
  notes?: string;
}

export interface FastingProtocol {
  type: string;
  hours: number;
  description?: string;
}

export interface DosingAdjustment {
  condition: string;
  modification: string;
}

export interface DosingSchedule {
  windows: DosingWindow[];
  fastingProtocol?: FastingProtocol;
  cycleSync: boolean;  // Sync with menstrual cycle
  adjustments: DosingAdjustment[];
}

// ═══════════════════════════════════════════════════════════════════
// FORMULATION TYPES
// ═══════════════════════════════════════════════════════════════════

export interface FormulationCompound {
  compoundCode: string;
  doseOverride?: number;
  doseUnitOverride?: string;
  required: boolean;
}

export interface Formulation {
  id: string;
  name: string;
  aka: string;  // Nickname
  compounds: FormulationCompound[];
  mechanism: string;
  pathwaysTargeted: Pathway[];
  synergyScore: number;
  monthlyCost: number;
}

// ═══════════════════════════════════════════════════════════════════
// MONITORING TYPES
// ═══════════════════════════════════════════════════════════════════

export interface ImagingSpec {
  type: string;
  frequency: Duration;
  conditions?: string[];
}

export interface AlertRule {
  biomarker: string;
  condition: 'above' | 'below' | 'change';
  threshold: number;
  action: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface MonitoringPlan {
  biomarkers: string[];  // References to BiomarkerSpec
  imaging: ImagingSpec[];
  frequency: Duration;
  alerts: AlertRule[];
}

// ═══════════════════════════════════════════════════════════════════
// LIFESTYLE PRESCRIPTION
// ═══════════════════════════════════════════════════════════════════

export interface LifestyleRx {
  diet: {
    type: string;
    restrictions: string[];
    emphases: string[];
  };
  exercise: {
    type: string;
    frequency: string;
    duration: string;
    intensity: string;
  };
  sleep: {
    targetHours: number;
    bedtime: string;
    wakeTime: string;
    practices: string[];
  };
  stress: {
    practices: string[];
    frequency: string;
  };
  detox: {
    sauna?: { type: string; frequency: string };
    other?: string[];
  };
}

// ═══════════════════════════════════════════════════════════════════
// PROTOCOL TYPE
// ═══════════════════════════════════════════════════════════════════

export interface Protocol {
  id: UUID;
  name: string;
  code: string;
  cancerType: CancerType;
  riskLevel: RiskLevel;
  formulation: Formulation;
  schedule: DosingSchedule;
  duration: Duration;
  monitoring: MonitoringPlan;
  lifestyle: LifestyleRx;
  contraindications: string[];
  evidenceBasis: ClinicalEvidence[];
}

// ═══════════════════════════════════════════════════════════════════
// PATIENT PROTOCOL ASSIGNMENT
// ═══════════════════════════════════════════════════════════════════

export interface PatientProtocol {
  id: UUID;
  patientId: string;
  protocol: Protocol;
  state: ProtocolState;
  startDate: Date;
  currentPhase: number;
  customizations: ProtocolCustomization[];
  adherenceRate: number;
  lastUpdated: Date;
}

export interface ProtocolCustomization {
  type: 'add' | 'remove' | 'modify';
  compoundCode?: string;
  field?: string;
  originalValue?: unknown;
  newValue?: unknown;
  reason: string;
  approvedBy?: string;
}

// ═══════════════════════════════════════════════════════════════════
// STATE TRANSITIONS
// ═══════════════════════════════════════════════════════════════════

export const ProtocolStateTransitions: Record<ProtocolState, ProtocolState[]> = {
  [ProtocolState.Evaluation]: [ProtocolState.Onboarding, ProtocolState.Discontinued],
  [ProtocolState.Onboarding]: [ProtocolState.Active, ProtocolState.Discontinued],
  [ProtocolState.Active]: [
    ProtocolState.Maintenance,
    ProtocolState.Paused,
    ProtocolState.Discontinued
  ],
  [ProtocolState.Maintenance]: [
    ProtocolState.Remission,
    ProtocolState.Active,
    ProtocolState.Paused,
    ProtocolState.Discontinued
  ],
  [ProtocolState.Remission]: [
    ProtocolState.Graduated,
    ProtocolState.Maintenance,
    ProtocolState.Active
  ],
  [ProtocolState.Graduated]: [ProtocolState.Maintenance],
  [ProtocolState.Paused]: [ProtocolState.Active, ProtocolState.Discontinued],
  [ProtocolState.Discontinued]: []
};

export function canTransition(from: ProtocolState, to: ProtocolState): boolean {
  return ProtocolStateTransitions[from].includes(to);
}
