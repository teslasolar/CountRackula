/**
 * KONOMI STANDARD: COUNT RACKULA
 * Layer 2: RACK Compound System - Types
 *
 * Type definitions for supplement/compound management
 */

import {
  UUID,
  Duration,
  CompoundClass,
  FDAStatus,
  Pathway,
  DosageForm,
  DosageUnit,
  SafetyProfile,
  ClinicalEvidence
} from '../types/base';

// ═══════════════════════════════════════════════════════════════════
// COMPOUND TYPES
// ═══════════════════════════════════════════════════════════════════

export interface CompoundSynergy {
  compoundId: string;
  effect: string;
  multiplier: number;
}

export interface BioavailabilityBooster {
  compound: string;
  multiplier: number;
}

export interface Compound {
  id: UUID;
  name: string;
  code: string;              // Short reference code (e.g., MET, ASA, D3)
  tradeNames: string[];
  class: CompoundClass;
  fdaStatus: FDAStatus;
  mechanisms: string[];
  targets: Pathway[];
  bioavailability: number;   // Percentage 0-100
  bioavailabilityBooster?: BioavailabilityBooster;
  halfLife: Duration;
  dosageForms: DosageForm[];
  standardDose: number;
  standardDoseUnit: DosageUnit;
  safety: SafetyProfile;
  evidence: ClinicalEvidence[];
  synergies: CompoundSynergy[];
  costPerDose: number;
}

// ═══════════════════════════════════════════════════════════════════
// COMPOUND LIBRARY INTERFACE
// ═══════════════════════════════════════════════════════════════════

export interface CompoundLibrary {
  compounds: Map<string, Compound>;
  getByCode(code: string): Compound | undefined;
  getByClass(compoundClass: CompoundClass): Compound[];
  getByPathway(pathway: Pathway): Compound[];
  checkInteractions(compoundIds: string[]): DrugInteractionWarning[];
  calculateSynergyScore(compoundIds: string[]): number;
}

export interface DrugInteractionWarning {
  compound1: string;
  compound2: string;
  severity: 'Minor' | 'Moderate' | 'Major';
  description: string;
}

// ═══════════════════════════════════════════════════════════════════
// COMPOUND CATEGORIES (Hierarchy)
// ═══════════════════════════════════════════════════════════════════

export const CompoundHierarchy = {
  RACK_Formulary: {
    Metabolic_Modulators: ['MET', 'BBR', 'DCA'],
    Anti_Inflammatory: ['ASA', 'CUR', 'OMG3'],
    Hormone_Regulators: ['DIM', 'CDG', 'RSV'],
    Immune_Activators: ['TT', 'D3', 'MEL'],
    Angiogenesis_Blockers: ['EGCG', 'QRC', 'MCP'],
    Detox_Support: ['NAC', 'SUL', 'SEL']
  }
} as const;

export type CompoundCategory = keyof typeof CompoundHierarchy.RACK_Formulary;
