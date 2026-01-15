/**
 * KONOMI STANDARD: COUNT RACKULA
 * Layer 6: FITTIT Delivery System - Types
 *
 * 3D-printed custom therapeutic bra system types
 */

import { UUID } from '../types/base';

// ═══════════════════════════════════════════════════════════════════
// BODY SCAN TYPES
// ═══════════════════════════════════════════════════════════════════

export type ScanMethod = '3D_Scan' | 'Photo_AI' | 'Manual';

export interface BodyMeasurements {
  band: number;              // Band size in inches
  cupL: number;              // Left cup volume in cc
  cupR: number;              // Right cup volume in cc
  projectionL: number;       // Left breast projection in cm
  projectionR: number;       // Right breast projection in cm
  rootWidthL: number;        // Left breast root width in cm
  rootWidthR: number;        // Right breast root width in cm
  apexHeightL: number;       // Left apex height from chest wall
  apexHeightR: number;       // Right apex height from chest wall
  spacing: number;           // Center spacing between breasts
  shoulderSlope: number;     // Shoulder slope angle
  asymmetryIndex: number;    // 0-1 scale of asymmetry
}

export interface BodyScan {
  id: UUID;
  patientId: string;
  timestamp: Date;
  method: ScanMethod;
  measurements: BodyMeasurements;
  pointCloud?: ArrayBuffer;  // Raw 3D scan data
  confidence: number;        // 0-100% confidence score
  notes?: string;
}

// ═══════════════════════════════════════════════════════════════════
// CUP DESIGN TYPES
// ═══════════════════════════════════════════════════════════════════

export type MaterialType = 'TPU' | 'Silicone' | 'Hybrid';
export type Side = 'L' | 'R';

export interface ShellSpec {
  material: MaterialType;
  thickness: number;         // mm
  density: number;           // g/cm³
  shoreHardness: number;     // Shore A scale
}

export type TherapeuticFunction =
  | 'Compression'
  | 'Massage'
  | 'Heat'
  | 'Cool'
  | 'Infusion';

export interface CompoundDelivery {
  compoundId: string;
  rate: number;              // mg/hour
}

export interface TherapeuticZone {
  id: string;
  location: {
    x: number;               // Relative position 0-1
    y: number;
    radius: number;          // Zone radius
  };
  function: TherapeuticFunction;
  intensity: number;         // 1-10 scale
  compoundDelivery?: CompoundDelivery;
}

export interface VentilationSpec {
  pattern: string;           // Pattern name/type
  coverage: number;          // % of surface area
}

export type AttachmentType = 'Hook' | 'Magnetic' | 'Integrated';

export interface AttachmentSpec {
  type: AttachmentType;
  positions: number;         // Number of hook positions
  adjustability: number;     // Range of adjustment in cm
}

export interface CupDesign {
  id: UUID;
  scanId: string;
  side: Side;
  shell: ShellSpec;
  therapeuticZones: TherapeuticZone[];
  ventilation: VentilationSpec;
  attachment: AttachmentSpec;
}

// ═══════════════════════════════════════════════════════════════════
// PRODUCT TYPES
// ═══════════════════════════════════════════════════════════════════

export type ProductStyle =
  | 'Everyday'
  | 'Sport'
  | 'Sleep'
  | 'Medical'
  | 'PostSurgical';

export type ProductFeature =
  | 'FrontClosure'
  | 'RacerBack'
  | 'WireFree'
  | 'MoistureWicking'
  | 'Pocketed'
  | 'Adjustable'
  | 'Seamless';

export interface SensorSpec {
  type: string;
  location: string;
  capability: string;
}

export interface FittitProduct {
  id: UUID;
  designId: string;
  style: ProductStyle;
  features: ProductFeature[];
  sensors?: SensorSpec[];
  batchNumber: string;
  qcPassed: boolean;
  productionDate: Date;
}

// ═══════════════════════════════════════════════════════════════════
// HOOK SYSTEM TYPES
// ═══════════════════════════════════════════════════════════════════

export type HookType = 'Traditional' | 'Magnetic' | 'QuickRelease';

export interface HookSystem {
  type: HookType;
  positions: number;
  adjustability: number;
  therapeuticIntegration: boolean;
  sensorPassthrough: boolean;
}

// ═══════════════════════════════════════════════════════════════════
// ORDER TYPES
// ═══════════════════════════════════════════════════════════════════

export type OrderState =
  | 'ScanReceived'
  | 'DesignGenerated'
  | 'DesignApproved'
  | 'Queued'
  | 'Printing'
  | 'PostProcess'
  | 'Assembly'
  | 'QC'
  | 'Shipped'
  | 'Delivered'
  | 'Complete';

export interface FittitOrder {
  id: UUID;
  patientId: string;
  scanId: string;
  designIds: string[];
  productIds: string[];
  state: OrderState;
  createdAt: Date;
  updatedAt: Date;
  estimatedShipDate?: Date;
  trackingNumber?: string;
  shippingAddress: Address;
  billingAddress: Address;
  totalCost: number;
  notes?: string;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// ═══════════════════════════════════════════════════════════════════
// STATE TRANSITIONS
// ═══════════════════════════════════════════════════════════════════

export const ORDER_STATE_TRANSITIONS: Record<OrderState, OrderState[]> = {
  ScanReceived: ['DesignGenerated'],
  DesignGenerated: ['DesignApproved', 'ScanReceived'],
  DesignApproved: ['Queued'],
  Queued: ['Printing'],
  Printing: ['PostProcess'],
  PostProcess: ['Assembly'],
  Assembly: ['QC'],
  QC: ['Shipped', 'Assembly'],  // Can go back if QC fails
  Shipped: ['Delivered'],
  Delivered: ['Complete'],
  Complete: []
};

export function canTransitionOrder(from: OrderState, to: OrderState): boolean {
  return ORDER_STATE_TRANSITIONS[from].includes(to);
}
