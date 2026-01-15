/**
 * KONOMI STANDARD: COUNT RACKULA
 * Layer 9: Enterprise Architecture - API Routes
 *
 * API endpoint definitions and handlers
 */

import { CancerType, RiskLevel, ProtocolState } from '../types/base';

// ═══════════════════════════════════════════════════════════════════
// API ENDPOINT TYPES
// ═══════════════════════════════════════════════════════════════════

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type AuthType = 'Bearer' | 'ApiKey' | 'None';

export interface RateLimit {
  requests: number;
  windowMs: number;
}

export interface ApiEndpoint {
  path: string;
  method: HttpMethod;
  auth: AuthType;
  rateLimit: RateLimit;
  description: string;
  requestSchema?: string;
  responseSchema?: string;
}

// ═══════════════════════════════════════════════════════════════════
// PATIENT ENDPOINTS
// ═══════════════════════════════════════════════════════════════════

export const PATIENT_ENDPOINTS: ApiEndpoint[] = [
  {
    path: '/api/v1/patients',
    method: 'GET',
    auth: 'Bearer',
    rateLimit: { requests: 100, windowMs: 60000 },
    description: 'List all patients (paginated)',
    responseSchema: 'PatientListResponse'
  },
  {
    path: '/api/v1/patients/:id',
    method: 'GET',
    auth: 'Bearer',
    rateLimit: { requests: 100, windowMs: 60000 },
    description: 'Get patient by ID',
    responseSchema: 'PatientResponse'
  },
  {
    path: '/api/v1/patients',
    method: 'POST',
    auth: 'Bearer',
    rateLimit: { requests: 20, windowMs: 60000 },
    description: 'Create new patient',
    requestSchema: 'CreatePatientRequest',
    responseSchema: 'PatientResponse'
  },
  {
    path: '/api/v1/patients/:id',
    method: 'PUT',
    auth: 'Bearer',
    rateLimit: { requests: 50, windowMs: 60000 },
    description: 'Update patient',
    requestSchema: 'UpdatePatientRequest',
    responseSchema: 'PatientResponse'
  },
  {
    path: '/api/v1/patients/:id/dashboard',
    method: 'GET',
    auth: 'Bearer',
    rateLimit: { requests: 200, windowMs: 60000 },
    description: 'Get patient dashboard',
    responseSchema: 'DashboardResponse'
  }
];

// ═══════════════════════════════════════════════════════════════════
// PROTOCOL ENDPOINTS
// ═══════════════════════════════════════════════════════════════════

export const PROTOCOL_ENDPOINTS: ApiEndpoint[] = [
  {
    path: '/api/v1/protocols',
    method: 'GET',
    auth: 'Bearer',
    rateLimit: { requests: 100, windowMs: 60000 },
    description: 'List all protocols',
    responseSchema: 'ProtocolListResponse'
  },
  {
    path: '/api/v1/protocols/:id',
    method: 'GET',
    auth: 'Bearer',
    rateLimit: { requests: 100, windowMs: 60000 },
    description: 'Get protocol by ID',
    responseSchema: 'ProtocolResponse'
  },
  {
    path: '/api/v1/protocols/recommend',
    method: 'POST',
    auth: 'Bearer',
    rateLimit: { requests: 50, windowMs: 60000 },
    description: 'Get protocol recommendation',
    requestSchema: 'ProtocolRecommendRequest',
    responseSchema: 'ProtocolResponse'
  },
  {
    path: '/api/v1/patients/:patientId/protocols',
    method: 'POST',
    auth: 'Bearer',
    rateLimit: { requests: 20, windowMs: 60000 },
    description: 'Assign protocol to patient',
    requestSchema: 'AssignProtocolRequest',
    responseSchema: 'PatientProtocolResponse'
  },
  {
    path: '/api/v1/patients/:patientId/protocols/:protocolId/state',
    method: 'PATCH',
    auth: 'Bearer',
    rateLimit: { requests: 50, windowMs: 60000 },
    description: 'Update protocol state',
    requestSchema: 'UpdateStateRequest',
    responseSchema: 'PatientProtocolResponse'
  }
];

// ═══════════════════════════════════════════════════════════════════
// COMPOUND ENDPOINTS
// ═══════════════════════════════════════════════════════════════════

export const COMPOUND_ENDPOINTS: ApiEndpoint[] = [
  {
    path: '/api/v1/compounds',
    method: 'GET',
    auth: 'Bearer',
    rateLimit: { requests: 200, windowMs: 60000 },
    description: 'List all compounds',
    responseSchema: 'CompoundListResponse'
  },
  {
    path: '/api/v1/compounds/:code',
    method: 'GET',
    auth: 'Bearer',
    rateLimit: { requests: 200, windowMs: 60000 },
    description: 'Get compound by code',
    responseSchema: 'CompoundResponse'
  },
  {
    path: '/api/v1/compounds/interactions',
    method: 'POST',
    auth: 'Bearer',
    rateLimit: { requests: 100, windowMs: 60000 },
    description: 'Check compound interactions',
    requestSchema: 'InteractionCheckRequest',
    responseSchema: 'InteractionResponse'
  },
  {
    path: '/api/v1/compounds/synergy',
    method: 'POST',
    auth: 'Bearer',
    rateLimit: { requests: 100, windowMs: 60000 },
    description: 'Calculate synergy score',
    requestSchema: 'SynergyRequest',
    responseSchema: 'SynergyResponse'
  }
];

// ═══════════════════════════════════════════════════════════════════
// BIOMARKER ENDPOINTS
// ═══════════════════════════════════════════════════════════════════

export const BIOMARKER_ENDPOINTS: ApiEndpoint[] = [
  {
    path: '/api/v1/patients/:patientId/biomarkers',
    method: 'GET',
    auth: 'Bearer',
    rateLimit: { requests: 100, windowMs: 60000 },
    description: 'Get patient biomarker history',
    responseSchema: 'BiomarkerListResponse'
  },
  {
    path: '/api/v1/patients/:patientId/biomarkers',
    method: 'POST',
    auth: 'Bearer',
    rateLimit: { requests: 50, windowMs: 60000 },
    description: 'Log biomarker reading',
    requestSchema: 'LogBiomarkerRequest',
    responseSchema: 'BiomarkerResponse'
  },
  {
    path: '/api/v1/patients/:patientId/biomarkers/trends',
    method: 'GET',
    auth: 'Bearer',
    rateLimit: { requests: 100, windowMs: 60000 },
    description: 'Get biomarker trends',
    responseSchema: 'BiomarkerTrendsResponse'
  },
  {
    path: '/api/v1/patients/:patientId/biomarkers/alerts',
    method: 'GET',
    auth: 'Bearer',
    rateLimit: { requests: 200, windowMs: 60000 },
    description: 'Get biomarker alerts',
    responseSchema: 'AlertsResponse'
  }
];

// ═══════════════════════════════════════════════════════════════════
// FITTIT ENDPOINTS
// ═══════════════════════════════════════════════════════════════════

export const FITTIT_ENDPOINTS: ApiEndpoint[] = [
  {
    path: '/api/v1/fittit/scans',
    method: 'POST',
    auth: 'Bearer',
    rateLimit: { requests: 10, windowMs: 60000 },
    description: 'Upload body scan',
    requestSchema: 'UploadScanRequest',
    responseSchema: 'ScanResponse'
  },
  {
    path: '/api/v1/fittit/scans/:id',
    method: 'GET',
    auth: 'Bearer',
    rateLimit: { requests: 50, windowMs: 60000 },
    description: 'Get scan details',
    responseSchema: 'ScanResponse'
  },
  {
    path: '/api/v1/fittit/designs/:scanId',
    method: 'POST',
    auth: 'Bearer',
    rateLimit: { requests: 20, windowMs: 60000 },
    description: 'Generate design from scan',
    requestSchema: 'GenerateDesignRequest',
    responseSchema: 'DesignResponse'
  },
  {
    path: '/api/v1/fittit/orders',
    method: 'POST',
    auth: 'Bearer',
    rateLimit: { requests: 10, windowMs: 60000 },
    description: 'Create FITTIT order',
    requestSchema: 'CreateOrderRequest',
    responseSchema: 'OrderResponse'
  },
  {
    path: '/api/v1/fittit/orders/:id',
    method: 'GET',
    auth: 'Bearer',
    rateLimit: { requests: 100, windowMs: 60000 },
    description: 'Get order status',
    responseSchema: 'OrderResponse'
  },
  {
    path: '/api/v1/fittit/pricing',
    method: 'GET',
    auth: 'None',
    rateLimit: { requests: 200, windowMs: 60000 },
    description: 'Get pricing information',
    responseSchema: 'PricingResponse'
  }
];

// ═══════════════════════════════════════════════════════════════════
// RACKULA ENDPOINTS
// ═══════════════════════════════════════════════════════════════════

export const RACKULA_ENDPOINTS: ApiEndpoint[] = [
  {
    path: '/api/v1/rackula/chat',
    method: 'POST',
    auth: 'Bearer',
    rateLimit: { requests: 60, windowMs: 60000 },
    description: 'Chat with Count Rackula',
    requestSchema: 'ChatRequest',
    responseSchema: 'ChatResponse'
  },
  {
    path: '/api/v1/rackula/content/:type',
    method: 'GET',
    auth: 'Bearer',
    rateLimit: { requests: 100, windowMs: 60000 },
    description: 'Get personalized content',
    responseSchema: 'ContentResponse'
  },
  {
    path: '/api/v1/rackula/notifications',
    method: 'GET',
    auth: 'Bearer',
    rateLimit: { requests: 100, windowMs: 60000 },
    description: 'Get pending notifications',
    responseSchema: 'NotificationsResponse'
  },
  {
    path: '/api/v1/rackula/reminders',
    method: 'GET',
    auth: 'Bearer',
    rateLimit: { requests: 200, windowMs: 60000 },
    description: 'Get dose reminders',
    responseSchema: 'RemindersResponse'
  }
];

// ═══════════════════════════════════════════════════════════════════
// COMMUNITY ENDPOINTS
// ═══════════════════════════════════════════════════════════════════

export const COMMUNITY_ENDPOINTS: ApiEndpoint[] = [
  {
    path: '/api/v1/community/members',
    method: 'GET',
    auth: 'Bearer',
    rateLimit: { requests: 50, windowMs: 60000 },
    description: 'List community members',
    responseSchema: 'MemberListResponse'
  },
  {
    path: '/api/v1/community/circles',
    method: 'GET',
    auth: 'Bearer',
    rateLimit: { requests: 50, windowMs: 60000 },
    description: 'List support circles',
    responseSchema: 'CircleListResponse'
  },
  {
    path: '/api/v1/community/circles/:id/join',
    method: 'POST',
    auth: 'Bearer',
    rateLimit: { requests: 20, windowMs: 60000 },
    description: 'Join support circle',
    responseSchema: 'CircleResponse'
  },
  {
    path: '/api/v1/community/resources',
    method: 'GET',
    auth: 'Bearer',
    rateLimit: { requests: 100, windowMs: 60000 },
    description: 'Browse resources',
    responseSchema: 'ResourceListResponse'
  },
  {
    path: '/api/v1/community/mentors/request',
    method: 'POST',
    auth: 'Bearer',
    rateLimit: { requests: 5, windowMs: 60000 },
    description: 'Request mentor match',
    requestSchema: 'MentorRequestRequest',
    responseSchema: 'MentorMatchResponse'
  }
];

// ═══════════════════════════════════════════════════════════════════
// ALL ENDPOINTS
// ═══════════════════════════════════════════════════════════════════

export const ALL_ENDPOINTS: ApiEndpoint[] = [
  ...PATIENT_ENDPOINTS,
  ...PROTOCOL_ENDPOINTS,
  ...COMPOUND_ENDPOINTS,
  ...BIOMARKER_ENDPOINTS,
  ...FITTIT_ENDPOINTS,
  ...RACKULA_ENDPOINTS,
  ...COMMUNITY_ENDPOINTS
];

// ═══════════════════════════════════════════════════════════════════
// REQUEST/RESPONSE SCHEMAS
// ═══════════════════════════════════════════════════════════════════

export interface CreatePatientRequest {
  name: string;
  email: string;
  cancerType?: CancerType;
  riskLevel?: RiskLevel;
}

export interface AssignProtocolRequest {
  protocolId: string;
  customizations?: Array<{
    type: 'add' | 'remove' | 'modify';
    compoundCode?: string;
    field?: string;
    newValue?: unknown;
    reason: string;
  }>;
}

export interface UpdateStateRequest {
  newState: ProtocolState;
  reason?: string;
}

export interface ProtocolRecommendRequest {
  cancerType: CancerType;
  riskLevel: RiskLevel;
  contraindications?: string[];
}

export interface LogBiomarkerRequest {
  marker: string;
  value: number;
  unit: string;
  labSource?: string;
  notes?: string;
}

export interface ChatRequest {
  message: string;
  context?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
