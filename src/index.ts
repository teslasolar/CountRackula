/**
 * 🦇 COUNT RACKULA 🦇
 * Enterprise-Scale Metabolic Oncology Protocol System
 *
 * KONOMI STANDARD v1.0
 * #SaveTheTracts #TeamRackula #CountOnTheCount
 *
 * "I vant to save your racks! Blah!"
 */

// ═══════════════════════════════════════════════════════════════════
// LAYER 1: BASE TYPES
// ═══════════════════════════════════════════════════════════════════
export * from './types/base';

// ═══════════════════════════════════════════════════════════════════
// LAYER 2: COMPOUND SYSTEM
// ═══════════════════════════════════════════════════════════════════
export * from './compounds/types';
export {
  compoundLibrary,
  ALL_COMPOUNDS,
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
} from './compounds/library';

// ═══════════════════════════════════════════════════════════════════
// LAYER 3: PROTOCOL ENGINE
// ═══════════════════════════════════════════════════════════════════
export * from './protocols/types';
export {
  F_TNBC,
  F_ER_POS,
  F_HER2,
  F_PREVENTION,
  F_BRCA,
  F_MAINTENANCE,
  ALL_FORMULATIONS,
  getFormulationByCancerType,
  STANDARD_SCHEDULE,
  STANDARD_LIFESTYLE,
  GENTLE_LIFESTYLE
} from './protocols/formulations';
export { ProtocolBuilder, ProtocolEngine, protocolEngine } from './protocols/engine';

// ═══════════════════════════════════════════════════════════════════
// LAYER 4: MONITORING & OUTCOMES
// ═══════════════════════════════════════════════════════════════════
export {
  TUMOR_MARKERS,
  INFLAMMATION_MARKERS,
  METABOLIC_MARKERS,
  NUTRITIONAL_MARKERS,
  HORMONAL_MARKERS,
  RACK_BIOMARKER_PANEL,
  getBiomarkerSpec,
  getBiomarkersByCategory,
  BiomarkerTracker,
  biomarkerTracker
} from './monitoring/biomarkers';
export type { BiomarkerReading, BiomarkerTrend } from './monitoring/biomarkers';

export {
  DashboardService,
  dashboardService,
  calculateRackulaScore,
  getTotalScore,
  getScoreGrade,
  OUTCOME_METRICS,
  getOutcomeMetric
} from './monitoring/dashboard';
export type { Dashboard, Alert, ScoreComponents } from './monitoring/dashboard';

// ═══════════════════════════════════════════════════════════════════
// LAYER 5: COUNT RACKULA PERSONA
// ═══════════════════════════════════════════════════════════════════
export {
  RACKULA_PERSONA,
  CONTENT_TEMPLATES,
  ENGAGEMENT_TRANSITIONS,
  RackulaMessenger,
  rackulaMessenger,
  BRAND
} from './persona/rackula';
export type {
  ContentType,
  HumorLevel,
  ContentTemplate,
  Channel,
  Frequency,
  InteractionMode,
  EngagementState
} from './persona/rackula';

// ═══════════════════════════════════════════════════════════════════
// LAYER 6: FITTIT DELIVERY SYSTEM
// ═══════════════════════════════════════════════════════════════════
export * from './fittit/types';
export {
  SHELL_PRESETS,
  STYLE_FEATURES,
  FittitService,
  fittitService
} from './fittit/service';

// ═══════════════════════════════════════════════════════════════════
// LAYER 7: COMMUNITY & SUPPORT (THE COVEN)
// ═══════════════════════════════════════════════════════════════════
export {
  BADGE_REQUIREMENTS,
  MEMBER_STATE_TRANSITIONS,
  CovenService,
  covenService
} from './community/coven';
export type {
  CovenMember,
  SupportCircle,
  Resource,
  MentorMatch,
  PrivacyLevel,
  Badge,
  CircleType,
  MeetingFormat,
  ResourceType,
  MemberState
} from './community/coven';

// ═══════════════════════════════════════════════════════════════════
// LAYER 9: ENTERPRISE ARCHITECTURE & API
// ═══════════════════════════════════════════════════════════════════
export {
  PATIENT_ENDPOINTS,
  PROTOCOL_ENDPOINTS,
  COMPOUND_ENDPOINTS,
  BIOMARKER_ENDPOINTS,
  FITTIT_ENDPOINTS,
  RACKULA_ENDPOINTS,
  COMMUNITY_ENDPOINTS,
  ALL_ENDPOINTS
} from './api/routes';
export type {
  HttpMethod,
  AuthType,
  RateLimit,
  ApiEndpoint,
  ApiResponse,
  CreatePatientRequest,
  AssignProtocolRequest,
  UpdateStateRequest,
  ProtocolRecommendRequest,
  LogBiomarkerRequest,
  ChatRequest
} from './api/routes';

// ═══════════════════════════════════════════════════════════════════
// VERSION & METADATA
// ═══════════════════════════════════════════════════════════════════

export const VERSION = '1.0.0';
export const STANDARD_NAME = 'KONOMI STANDARD: COUNT RACKULA';

export const METADATA = {
  name: 'Count Rackula',
  version: VERSION,
  standard: STANDARD_NAME,
  description: 'Enterprise-Scale Metabolic Oncology Protocol System',
  tagline: 'I vant to save your racks! Blah!',
  mascot: '🦇',
  hashtags: ['#SaveTheTracts', '#TeamRackula', '#CountOnTheCount'],
  layers: [
    { id: 0, name: 'Meta-Standard', scope: 'inherited' },
    { id: 1, name: 'Base UDTs', scope: 'healthcare primitives' },
    { id: 2, name: 'RACK Compound System', scope: 'supplement/compound management' },
    { id: 3, name: 'Protocol Engine', scope: 'treatment protocol management' },
    { id: 4, name: 'Monitoring & Outcomes', scope: 'biomarker tracking & outcomes' },
    { id: 5, name: 'Count Rackula AI Persona', scope: 'educational AI persona system' },
    { id: 6, name: 'FITTIT Delivery System', scope: '3D-printed therapeutic bra system' },
    { id: 7, name: 'Community & Support', scope: 'The Coven support system' },
    { id: 8, name: 'Marketing & Education', scope: 'outreach and education' },
    { id: 9, name: 'Enterprise Architecture', scope: 'system architecture' }
  ]
};

// ═══════════════════════════════════════════════════════════════════
// QUICK START
// ═══════════════════════════════════════════════════════════════════

/**
 * Quick start guide for Count Rackula
 *
 * @example
 * ```typescript
 * import {
 *   protocolEngine,
 *   compoundLibrary,
 *   biomarkerTracker,
 *   rackulaMessenger,
 *   CancerType,
 *   RiskLevel
 * } from 'count-rackula';
 *
 * // Get a protocol recommendation
 * const protocol = protocolEngine.recommendProtocol(
 *   CancerType.TNBC,
 *   RiskLevel.Active
 * );
 *
 * // Assign to a patient
 * const patientProtocol = protocolEngine.assignProtocol(
 *   'patient-123',
 *   protocol.id
 * );
 *
 * // Log a biomarker
 * biomarkerTracker.addReading('patient-123', {
 *   marker: 'Vitamin_D',
 *   value: 65,
 *   unit: 'ng/mL',
 *   timestamp: new Date()
 * });
 *
 * // Get a personalized message
 * const welcome = rackulaMessenger.generateWelcome('Darling');
 * console.log(welcome);
 * ```
 */

console.log(`
🦇 COUNT RACKULA v${VERSION} 🦇
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"Good evening, darlings... I vant to save your racks!"

${STANDARD_NAME}
Enterprise-Scale Metabolic Oncology Protocol System

The night is dark and full of... hope!

#SaveTheTracts #TeamRackula #CountOnTheCount
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
