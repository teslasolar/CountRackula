/**
 * KONOMI STANDARD: COUNT RACKULA
 * Layer 6: FITTIT Delivery System - Service
 *
 * Service implementation for 3D-printed therapeutic bras
 */

import { v4 as uuidv4 } from 'uuid';
import {
  BodyScan,
  BodyMeasurements,
  ScanMethod,
  CupDesign,
  Side,
  ShellSpec,
  TherapeuticZone,
  FittitProduct,
  ProductStyle,
  ProductFeature,
  FittitOrder,
  OrderState,
  Address,
  canTransitionOrder
} from './types';

// ═══════════════════════════════════════════════════════════════════
// DESIGN PRESETS
// ═══════════════════════════════════════════════════════════════════

export const SHELL_PRESETS: Record<string, ShellSpec> = {
  soft: {
    material: 'TPU',
    thickness: 2.5,
    density: 1.1,
    shoreHardness: 65
  },
  medium: {
    material: 'TPU',
    thickness: 3.0,
    density: 1.15,
    shoreHardness: 75
  },
  firm: {
    material: 'TPU',
    thickness: 3.5,
    density: 1.2,
    shoreHardness: 85
  },
  silicone_soft: {
    material: 'Silicone',
    thickness: 4.0,
    density: 1.05,
    shoreHardness: 40
  },
  hybrid: {
    material: 'Hybrid',
    thickness: 3.0,
    density: 1.12,
    shoreHardness: 70
  }
};

export const STYLE_FEATURES: Record<ProductStyle, ProductFeature[]> = {
  Everyday: ['WireFree', 'MoistureWicking', 'Adjustable'],
  Sport: ['RacerBack', 'MoistureWicking', 'Seamless', 'WireFree'],
  Sleep: ['WireFree', 'Seamless', 'MoistureWicking'],
  Medical: ['FrontClosure', 'Pocketed', 'WireFree', 'Adjustable'],
  PostSurgical: ['FrontClosure', 'Pocketed', 'WireFree', 'Adjustable']
};

// ═══════════════════════════════════════════════════════════════════
// FITTIT SERVICE
// ═══════════════════════════════════════════════════════════════════

export class FittitService {
  private scans: Map<string, BodyScan>;
  private designs: Map<string, CupDesign>;
  private products: Map<string, FittitProduct>;
  private orders: Map<string, FittitOrder>;

  constructor() {
    this.scans = new Map();
    this.designs = new Map();
    this.products = new Map();
    this.orders = new Map();
  }

  // ═══════════════════════════════════════════════════════════════════
  // SCAN MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════

  createScan(
    patientId: string,
    method: ScanMethod,
    measurements: BodyMeasurements,
    pointCloud?: ArrayBuffer
  ): BodyScan {
    const scan: BodyScan = {
      id: uuidv4(),
      patientId,
      timestamp: new Date(),
      method,
      measurements,
      pointCloud,
      confidence: this.calculateConfidence(method, measurements)
    };

    this.scans.set(scan.id, scan);
    return scan;
  }

  private calculateConfidence(method: ScanMethod, measurements: BodyMeasurements): number {
    // Base confidence by method
    let confidence = method === '3D_Scan' ? 95 :
                     method === 'Photo_AI' ? 85 : 70;

    // Reduce confidence for high asymmetry (harder to fit)
    if (measurements.asymmetryIndex > 0.3) {
      confidence -= 5;
    }

    // Reduce for unusual measurements
    if (measurements.band < 28 || measurements.band > 50) {
      confidence -= 10;
    }

    return Math.max(50, confidence);
  }

  getScan(id: string): BodyScan | undefined {
    return this.scans.get(id);
  }

  getPatientScans(patientId: string): BodyScan[] {
    return Array.from(this.scans.values())
      .filter(s => s.patientId === patientId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  // ═══════════════════════════════════════════════════════════════════
  // DESIGN GENERATION
  // ═══════════════════════════════════════════════════════════════════

  generateDesign(
    scanId: string,
    side: Side,
    style: ProductStyle,
    therapeuticNeeds: string[] = []
  ): CupDesign {
    const scan = this.scans.get(scanId);
    if (!scan) {
      throw new Error(`Scan not found: ${scanId}`);
    }

    // Select shell based on style
    const shellPreset = style === 'Sleep' ? 'silicone_soft' :
                        style === 'Sport' ? 'firm' :
                        style === 'PostSurgical' ? 'soft' : 'medium';

    const shell = SHELL_PRESETS[shellPreset];

    // Generate therapeutic zones based on needs
    const therapeuticZones = this.generateTherapeuticZones(therapeuticNeeds);

    // Calculate ventilation based on style
    const ventilation = {
      pattern: style === 'Sport' ? 'honeycomb' : 'micro_perforated',
      coverage: style === 'Sport' ? 25 : style === 'Sleep' ? 15 : 20
    };

    // Select attachment type
    const attachment = {
      type: style === 'PostSurgical' || style === 'Medical' ?
            'Magnetic' as const : 'Hook' as const,
      positions: 3,
      adjustability: 5
    };

    const design: CupDesign = {
      id: uuidv4(),
      scanId,
      side,
      shell,
      therapeuticZones,
      ventilation,
      attachment
    };

    this.designs.set(design.id, design);
    return design;
  }

  private generateTherapeuticZones(needs: string[]): TherapeuticZone[] {
    const zones: TherapeuticZone[] = [];

    if (needs.includes('lymphatic')) {
      zones.push({
        id: uuidv4(),
        location: { x: 0.7, y: 0.3, radius: 0.15 },
        function: 'Massage',
        intensity: 5
      });
    }

    if (needs.includes('compression')) {
      zones.push({
        id: uuidv4(),
        location: { x: 0.5, y: 0.5, radius: 0.4 },
        function: 'Compression',
        intensity: 4
      });
    }

    if (needs.includes('heat_therapy')) {
      zones.push({
        id: uuidv4(),
        location: { x: 0.5, y: 0.6, radius: 0.25 },
        function: 'Heat',
        intensity: 3
      });
    }

    if (needs.includes('topical_delivery')) {
      zones.push({
        id: uuidv4(),
        location: { x: 0.5, y: 0.5, radius: 0.3 },
        function: 'Infusion',
        intensity: 2,
        compoundDelivery: {
          compoundId: 'TOPICAL_01',
          rate: 0.5
        }
      });
    }

    return zones;
  }

  generatePairDesigns(
    scanId: string,
    style: ProductStyle,
    therapeuticNeeds: string[] = []
  ): [CupDesign, CupDesign] {
    const leftDesign = this.generateDesign(scanId, 'L', style, therapeuticNeeds);
    const rightDesign = this.generateDesign(scanId, 'R', style, therapeuticNeeds);
    return [leftDesign, rightDesign];
  }

  getDesign(id: string): CupDesign | undefined {
    return this.designs.get(id);
  }

  // ═══════════════════════════════════════════════════════════════════
  // PRODUCT CREATION
  // ═══════════════════════════════════════════════════════════════════

  createProduct(
    designId: string,
    style: ProductStyle,
    additionalFeatures: ProductFeature[] = []
  ): FittitProduct {
    const design = this.designs.get(designId);
    if (!design) {
      throw new Error(`Design not found: ${designId}`);
    }

    const baseFeatures = STYLE_FEATURES[style];
    const allFeatures = [...new Set([...baseFeatures, ...additionalFeatures])];

    const product: FittitProduct = {
      id: uuidv4(),
      designId,
      style,
      features: allFeatures,
      batchNumber: this.generateBatchNumber(),
      qcPassed: false,
      productionDate: new Date()
    };

    this.products.set(product.id, product);
    return product;
  }

  private generateBatchNumber(): string {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `FIT-${dateStr}-${random}`;
  }

  markQCPassed(productId: string, passed: boolean): void {
    const product = this.products.get(productId);
    if (product) {
      product.qcPassed = passed;
    }
  }

  getProduct(id: string): FittitProduct | undefined {
    return this.products.get(id);
  }

  // ═══════════════════════════════════════════════════════════════════
  // ORDER MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════

  createOrder(
    patientId: string,
    scanId: string,
    style: ProductStyle,
    shippingAddress: Address,
    billingAddress?: Address,
    therapeuticNeeds: string[] = []
  ): FittitOrder {
    // Generate designs
    const [leftDesign, rightDesign] = this.generatePairDesigns(scanId, style, therapeuticNeeds);

    // Create products
    const leftProduct = this.createProduct(leftDesign.id, style);
    const rightProduct = this.createProduct(rightDesign.id, style);

    // Calculate cost
    const baseCost = {
      Everyday: 249,
      Sport: 279,
      Sleep: 199,
      Medical: 349,
      PostSurgical: 399
    }[style];

    const therapeuticAddon = therapeuticNeeds.length * 25;
    const totalCost = baseCost + therapeuticAddon;

    const order: FittitOrder = {
      id: uuidv4(),
      patientId,
      scanId,
      designIds: [leftDesign.id, rightDesign.id],
      productIds: [leftProduct.id, rightProduct.id],
      state: 'ScanReceived',
      createdAt: new Date(),
      updatedAt: new Date(),
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      totalCost
    };

    this.orders.set(order.id, order);

    // Automatically transition to design generated
    this.transitionOrder(order.id, 'DesignGenerated');

    return order;
  }

  transitionOrder(orderId: string, newState: OrderState): FittitOrder {
    const order = this.orders.get(orderId);
    if (!order) {
      throw new Error(`Order not found: ${orderId}`);
    }

    if (!canTransitionOrder(order.state, newState)) {
      throw new Error(`Invalid order transition: ${order.state} -> ${newState}`);
    }

    order.state = newState;
    order.updatedAt = new Date();

    // Set estimated ship date when queued
    if (newState === 'Queued') {
      const shipDate = new Date();
      shipDate.setDate(shipDate.getDate() + 7); // 7 day lead time
      order.estimatedShipDate = shipDate;
    }

    return order;
  }

  setTrackingNumber(orderId: string, trackingNumber: string): void {
    const order = this.orders.get(orderId);
    if (order) {
      order.trackingNumber = trackingNumber;
      order.updatedAt = new Date();
    }
  }

  getOrder(id: string): FittitOrder | undefined {
    return this.orders.get(id);
  }

  getPatientOrders(patientId: string): FittitOrder[] {
    return Array.from(this.orders.values())
      .filter(o => o.patientId === patientId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  getOrdersByState(state: OrderState): FittitOrder[] {
    return Array.from(this.orders.values())
      .filter(o => o.state === state);
  }

  // ═══════════════════════════════════════════════════════════════════
  // PRICING
  // ═══════════════════════════════════════════════════════════════════

  getStylePricing(): Record<ProductStyle, number> {
    return {
      Everyday: 249,
      Sport: 279,
      Sleep: 199,
      Medical: 349,
      PostSurgical: 399
    };
  }

  calculateEstimate(
    style: ProductStyle,
    therapeuticNeeds: string[],
    expedited: boolean = false
  ): { subtotal: number; therapeuticAddon: number; expediteFee: number; total: number } {
    const subtotal = this.getStylePricing()[style];
    const therapeuticAddon = therapeuticNeeds.length * 25;
    const expediteFee = expedited ? 50 : 0;
    const total = subtotal + therapeuticAddon + expediteFee;

    return { subtotal, therapeuticAddon, expediteFee, total };
  }
}

// Export singleton
export const fittitService = new FittitService();
