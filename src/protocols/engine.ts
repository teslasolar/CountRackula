/**
 * KONOMI STANDARD: COUNT RACKULA
 * Layer 3: RACK Protocol Engine - Core Engine
 *
 * Protocol management, assignment, and state machine
 */

import { v4 as uuidv4 } from 'uuid';
import {
  CancerType,
  RiskLevel,
  ProtocolState,
  EvidenceType,
  generateProtocolId
} from '../types/base';
import { compoundLibrary } from '../compounds/library';
import {
  Protocol,
  PatientProtocol,
  ProtocolCustomization,
  Formulation,
  canTransition
} from './types';
import {
  ALL_FORMULATIONS,
  getFormulationByCancerType,
  STANDARD_SCHEDULE,
  STANDARD_LIFESTYLE,
  GENTLE_LIFESTYLE
} from './formulations';

// ═══════════════════════════════════════════════════════════════════
// PROTOCOL BUILDER
// ═══════════════════════════════════════════════════════════════════

export class ProtocolBuilder {
  private protocol: Partial<Protocol>;

  constructor() {
    this.protocol = {
      id: uuidv4(),
      evidenceBasis: []
    };
  }

  withName(name: string, code: string): ProtocolBuilder {
    this.protocol.name = name;
    this.protocol.code = code;
    return this;
  }

  forCancerType(type: CancerType): ProtocolBuilder {
    this.protocol.cancerType = type;

    // Auto-select formulation if available
    const formulation = getFormulationByCancerType(type);
    if (formulation) {
      this.protocol.formulation = formulation;
    }

    return this;
  }

  withRiskLevel(level: RiskLevel): ProtocolBuilder {
    this.protocol.riskLevel = level;
    return this;
  }

  withFormulation(formulation: Formulation): ProtocolBuilder {
    this.protocol.formulation = formulation;
    return this;
  }

  withSchedule(schedule = STANDARD_SCHEDULE): ProtocolBuilder {
    this.protocol.schedule = schedule;
    return this;
  }

  withDuration(value: number, unit: 'months' | 'years'): ProtocolBuilder {
    this.protocol.duration = { value, unit };
    return this;
  }

  withLifestyle(lifestyle = STANDARD_LIFESTYLE): ProtocolBuilder {
    this.protocol.lifestyle = lifestyle;
    return this;
  }

  withMonitoring(biomarkers: string[], alertRules: Array<{
    biomarker: string;
    condition: 'above' | 'below' | 'change';
    threshold: number;
    action: string;
    urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  }>): ProtocolBuilder {
    this.protocol.monitoring = {
      biomarkers,
      imaging: [],
      frequency: { value: 1, unit: 'months' },
      alerts: alertRules
    };
    return this;
  }

  withContraindications(contraindications: string[]): ProtocolBuilder {
    this.protocol.contraindications = contraindications;
    return this;
  }

  build(): Protocol {
    // Validate required fields
    if (!this.protocol.name || !this.protocol.cancerType || !this.protocol.formulation) {
      throw new Error('Protocol requires name, cancerType, and formulation');
    }

    // Set defaults for missing optional fields
    if (!this.protocol.schedule) {
      this.protocol.schedule = STANDARD_SCHEDULE;
    }
    if (!this.protocol.duration) {
      this.protocol.duration = { value: 12, unit: 'months' };
    }
    if (!this.protocol.lifestyle) {
      this.protocol.lifestyle = STANDARD_LIFESTYLE;
    }
    if (!this.protocol.monitoring) {
      this.protocol.monitoring = {
        biomarkers: ['CA_15_3', 'CRP', 'Vitamin_D', 'Glucose_Fasting'],
        imaging: [],
        frequency: { value: 1, unit: 'months' },
        alerts: []
      };
    }
    if (!this.protocol.contraindications) {
      this.protocol.contraindications = [];
    }
    if (!this.protocol.riskLevel) {
      this.protocol.riskLevel = RiskLevel.Moderate;
    }

    return this.protocol as Protocol;
  }
}

// ═══════════════════════════════════════════════════════════════════
// PROTOCOL ENGINE
// ═══════════════════════════════════════════════════════════════════

export class ProtocolEngine {
  private protocols: Map<string, Protocol>;
  private patientProtocols: Map<string, PatientProtocol>;

  constructor() {
    this.protocols = new Map();
    this.patientProtocols = new Map();
    this.initializeStandardProtocols();
  }

  private initializeStandardProtocols(): void {
    // Create standard protocols for each cancer type
    const standardProtocols = [
      this.createStandardProtocol(CancerType.TNBC, RiskLevel.Active),
      this.createStandardProtocol(CancerType.ER_POS, RiskLevel.Active),
      this.createStandardProtocol(CancerType.HER2_POS, RiskLevel.Active),
      this.createStandardProtocol(CancerType.BRCA, RiskLevel.High),
      this.createStandardProtocol(CancerType.PREVENTION, RiskLevel.Moderate)
    ];

    standardProtocols.forEach(p => this.protocols.set(p.id, p));
  }

  private createStandardProtocol(cancerType: CancerType, riskLevel: RiskLevel): Protocol {
    const formulation = getFormulationByCancerType(cancerType);
    if (!formulation) {
      throw new Error(`No formulation found for cancer type: ${cancerType}`);
    }

    return new ProtocolBuilder()
      .withName(formulation.name, generateProtocolId('v1', cancerType))
      .forCancerType(cancerType)
      .withRiskLevel(riskLevel)
      .withFormulation(formulation)
      .withSchedule(STANDARD_SCHEDULE)
      .withDuration(12, 'months')
      .withLifestyle(riskLevel === RiskLevel.Active ? GENTLE_LIFESTYLE : STANDARD_LIFESTYLE)
      .withMonitoring(
        ['CA_15_3', 'CA_27_29', 'CRP', 'Vitamin_D', 'Glucose_Fasting', 'HbA1c'],
        [
          {
            biomarker: 'CA_15_3',
            condition: 'above',
            threshold: 30,
            action: 'Notify provider immediately',
            urgency: 'High'
          },
          {
            biomarker: 'CRP',
            condition: 'above',
            threshold: 3,
            action: 'Review inflammation sources',
            urgency: 'Medium'
          },
          {
            biomarker: 'Vitamin_D',
            condition: 'below',
            threshold: 40,
            action: 'Increase D3 supplementation',
            urgency: 'Medium'
          }
        ]
      )
      .build();
  }

  // ═══════════════════════════════════════════════════════════════════
  // PROTOCOL MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════

  getProtocol(id: string): Protocol | undefined {
    return this.protocols.get(id);
  }

  getAllProtocols(): Protocol[] {
    return Array.from(this.protocols.values());
  }

  getProtocolsForCancerType(cancerType: CancerType): Protocol[] {
    return this.getAllProtocols().filter(p => p.cancerType === cancerType);
  }

  addProtocol(protocol: Protocol): void {
    this.protocols.set(protocol.id, protocol);
  }

  // ═══════════════════════════════════════════════════════════════════
  // PATIENT PROTOCOL ASSIGNMENT
  // ═══════════════════════════════════════════════════════════════════

  assignProtocol(
    patientId: string,
    protocolId: string,
    customizations: ProtocolCustomization[] = []
  ): PatientProtocol {
    const protocol = this.protocols.get(protocolId);
    if (!protocol) {
      throw new Error(`Protocol not found: ${protocolId}`);
    }

    const patientProtocol: PatientProtocol = {
      id: uuidv4(),
      patientId,
      protocol,
      state: ProtocolState.Evaluation,
      startDate: new Date(),
      currentPhase: 0,
      customizations,
      adherenceRate: 100,
      lastUpdated: new Date()
    };

    this.patientProtocols.set(patientProtocol.id, patientProtocol);
    return patientProtocol;
  }

  getPatientProtocol(id: string): PatientProtocol | undefined {
    return this.patientProtocols.get(id);
  }

  getPatientProtocols(patientId: string): PatientProtocol[] {
    return Array.from(this.patientProtocols.values())
      .filter(pp => pp.patientId === patientId);
  }

  // ═══════════════════════════════════════════════════════════════════
  // STATE MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════

  transitionState(
    patientProtocolId: string,
    newState: ProtocolState,
    reason?: string
  ): PatientProtocol {
    const pp = this.patientProtocols.get(patientProtocolId);
    if (!pp) {
      throw new Error(`Patient protocol not found: ${patientProtocolId}`);
    }

    if (!canTransition(pp.state, newState)) {
      throw new Error(
        `Invalid state transition: ${pp.state} -> ${newState}`
      );
    }

    pp.state = newState;
    pp.lastUpdated = new Date();

    if (reason) {
      pp.customizations.push({
        type: 'modify',
        field: 'state',
        originalValue: pp.state,
        newValue: newState,
        reason
      });
    }

    return pp;
  }

  // ═══════════════════════════════════════════════════════════════════
  // ADHERENCE TRACKING
  // ═══════════════════════════════════════════════════════════════════

  updateAdherence(patientProtocolId: string, adherenceRate: number): void {
    const pp = this.patientProtocols.get(patientProtocolId);
    if (!pp) {
      throw new Error(`Patient protocol not found: ${patientProtocolId}`);
    }

    pp.adherenceRate = Math.max(0, Math.min(100, adherenceRate));
    pp.lastUpdated = new Date();
  }

  // ═══════════════════════════════════════════════════════════════════
  // CUSTOMIZATION
  // ═══════════════════════════════════════════════════════════════════

  addCustomization(
    patientProtocolId: string,
    customization: ProtocolCustomization
  ): void {
    const pp = this.patientProtocols.get(patientProtocolId);
    if (!pp) {
      throw new Error(`Patient protocol not found: ${patientProtocolId}`);
    }

    pp.customizations.push(customization);
    pp.lastUpdated = new Date();
  }

  // ═══════════════════════════════════════════════════════════════════
  // COMPOUND VALIDATION
  // ═══════════════════════════════════════════════════════════════════

  validateFormulation(formulation: Formulation): {
    valid: boolean;
    warnings: string[];
    errors: string[];
  } {
    const warnings: string[] = [];
    const errors: string[] = [];

    // Check all compounds exist
    const compoundCodes = formulation.compounds.map(c => c.compoundCode);
    const missingCompounds = compoundCodes.filter(
      code => !compoundLibrary.getByCode(code)
    );

    if (missingCompounds.length > 0) {
      errors.push(`Unknown compounds: ${missingCompounds.join(', ')}`);
    }

    // Check for interactions
    const interactions = compoundLibrary.checkInteractions(compoundCodes);
    interactions.forEach(int => {
      if (int.severity === 'Major') {
        errors.push(
          `Major interaction: ${int.compound1} + ${int.compound2}: ${int.description}`
        );
      } else if (int.severity === 'Moderate') {
        warnings.push(
          `Moderate interaction: ${int.compound1} + ${int.compound2}: ${int.description}`
        );
      }
    });

    // Calculate synergy score
    const synergyScore = compoundLibrary.calculateSynergyScore(compoundCodes);
    if (synergyScore < 40) {
      warnings.push(`Low synergy score (${synergyScore}). Consider adding complementary compounds.`);
    }

    return {
      valid: errors.length === 0,
      warnings,
      errors
    };
  }

  // ═══════════════════════════════════════════════════════════════════
  // PROTOCOL RECOMMENDATIONS
  // ═══════════════════════════════════════════════════════════════════

  recommendProtocol(
    cancerType: CancerType,
    riskLevel: RiskLevel,
    contraindications: string[] = []
  ): Protocol | null {
    const candidates = this.getProtocolsForCancerType(cancerType)
      .filter(p => p.riskLevel === riskLevel ||
        (riskLevel === RiskLevel.VeryHigh && p.riskLevel === RiskLevel.Active));

    if (candidates.length === 0) {
      // Try to find any protocol for this cancer type
      const fallback = this.getProtocolsForCancerType(cancerType);
      if (fallback.length > 0) return fallback[0];
      return null;
    }

    // Filter out protocols with conflicting contraindications
    const suitable = candidates.filter(p => {
      const hasConflict = p.contraindications?.some(
        c => contraindications.some(
          uc => uc.toLowerCase().includes(c.toLowerCase())
        )
      );
      return !hasConflict;
    });

    return suitable.length > 0 ? suitable[0] : candidates[0];
  }
}

// Export singleton instance
export const protocolEngine = new ProtocolEngine();
