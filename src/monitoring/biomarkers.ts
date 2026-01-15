/**
 * KONOMI STANDARD: COUNT RACKULA
 * Layer 4: Monitoring & Outcomes - Biomarker System
 *
 * Biomarker tracking, panels, and analysis
 */

import {
  BiomarkerCategory,
  BiomarkerSpec,
  Range,
  Duration,
  Biomarker,
  TrendDirection,
  calculateTrend
} from '../types/base';

// ═══════════════════════════════════════════════════════════════════
// BIOMARKER PANEL DEFINITIONS
// ═══════════════════════════════════════════════════════════════════

export const TUMOR_MARKERS: BiomarkerSpec[] = [
  {
    marker: 'CA_15_3',
    category: BiomarkerCategory.Tumor,
    optimalRange: { min: 0, max: 30, unit: 'U/mL' },
    actionThreshold: 30,
    frequency: { value: 1, unit: 'months' }
  },
  {
    marker: 'CA_27_29',
    category: BiomarkerCategory.Tumor,
    optimalRange: { min: 0, max: 38, unit: 'U/mL' },
    actionThreshold: 38,
    frequency: { value: 1, unit: 'months' }
  },
  {
    marker: 'CEA',
    category: BiomarkerCategory.Tumor,
    optimalRange: { min: 0, max: 3, unit: 'ng/mL' },
    actionThreshold: 5,
    frequency: { value: 1, unit: 'months' }
  }
];

export const INFLAMMATION_MARKERS: BiomarkerSpec[] = [
  {
    marker: 'CRP',
    category: BiomarkerCategory.Inflammation,
    optimalRange: { min: 0, max: 1, unit: 'mg/L' },
    actionThreshold: 3,
    frequency: { value: 1, unit: 'months' },
    lowerBetter: true
  },
  {
    marker: 'ESR',
    category: BiomarkerCategory.Inflammation,
    optimalRange: { min: 0, max: 20, unit: 'mm/hr' },
    actionThreshold: 30,
    frequency: { value: 1, unit: 'months' }
  },
  {
    marker: 'IL_6',
    category: BiomarkerCategory.Inflammation,
    optimalRange: { min: 0, max: 7, unit: 'pg/mL' },
    actionThreshold: 10,
    frequency: { value: 3, unit: 'months' }
  },
  {
    marker: 'Homocysteine',
    category: BiomarkerCategory.Inflammation,
    optimalRange: { min: 5, max: 9, unit: 'umol/L' },
    actionThreshold: 12,
    frequency: { value: 3, unit: 'months' }
  }
];

export const METABOLIC_MARKERS: BiomarkerSpec[] = [
  {
    marker: 'Glucose_Fasting',
    category: BiomarkerCategory.Metabolic,
    optimalRange: { min: 70, max: 85, unit: 'mg/dL' },
    actionThreshold: 100,
    frequency: { value: 1, unit: 'months' },
    lowerBetter: true
  },
  {
    marker: 'Insulin_Fasting',
    category: BiomarkerCategory.Metabolic,
    optimalRange: { min: 2, max: 5, unit: 'uIU/mL' },
    actionThreshold: 10,
    frequency: { value: 1, unit: 'months' },
    lowerBetter: true
  },
  {
    marker: 'HbA1c',
    category: BiomarkerCategory.Metabolic,
    optimalRange: { min: 4.5, max: 5.2, unit: '%' },
    actionThreshold: 5.7,
    frequency: { value: 3, unit: 'months' },
    lowerBetter: true
  },
  {
    marker: 'IGF_1',
    category: BiomarkerCategory.Metabolic,
    optimalRange: { min: 50, max: 150, unit: 'ng/mL' },
    actionThreshold: 200,
    frequency: { value: 3, unit: 'months' },
    lowerBetter: true
  },
  {
    marker: 'HOMA_IR',
    category: BiomarkerCategory.Metabolic,
    optimalRange: { min: 0, max: 1.5, unit: 'index' },
    actionThreshold: 2.5,
    frequency: { value: 3, unit: 'months' },
    lowerBetter: true
  }
];

export const NUTRITIONAL_MARKERS: BiomarkerSpec[] = [
  {
    marker: 'Vitamin_D',
    category: BiomarkerCategory.Nutritional,
    optimalRange: { min: 60, max: 80, unit: 'ng/mL' },
    actionThreshold: 40,
    frequency: { value: 3, unit: 'months' }
  },
  {
    marker: 'Omega3_Index',
    category: BiomarkerCategory.Nutritional,
    optimalRange: { min: 8, max: 12, unit: '%' },
    actionThreshold: 5,
    frequency: { value: 3, unit: 'months' }
  },
  {
    marker: 'RBC_Magnesium',
    category: BiomarkerCategory.Nutritional,
    optimalRange: { min: 5.5, max: 6.5, unit: 'mg/dL' },
    actionThreshold: 4.5,
    frequency: { value: 3, unit: 'months' }
  },
  {
    marker: 'Ferritin',
    category: BiomarkerCategory.Nutritional,
    optimalRange: { min: 50, max: 150, unit: 'ng/mL' },
    actionThreshold: 200,
    frequency: { value: 3, unit: 'months' }
  },
  {
    marker: 'B12',
    category: BiomarkerCategory.Nutritional,
    optimalRange: { min: 500, max: 1000, unit: 'pg/mL' },
    actionThreshold: 400,
    frequency: { value: 6, unit: 'months' }
  }
];

export const HORMONAL_MARKERS: BiomarkerSpec[] = [
  {
    marker: 'Estradiol',
    category: BiomarkerCategory.Hormonal,
    optimalRange: { min: 0, max: 50, unit: 'pg/mL' }, // Post-menopausal
    actionThreshold: 100,
    frequency: { value: 3, unit: 'months' }
  },
  {
    marker: 'Progesterone',
    category: BiomarkerCategory.Hormonal,
    optimalRange: { min: 0, max: 1, unit: 'ng/mL' }, // Post-menopausal
    actionThreshold: 5,
    frequency: { value: 3, unit: 'months' }
  },
  {
    marker: 'DHEA_S',
    category: BiomarkerCategory.Hormonal,
    optimalRange: { min: 100, max: 400, unit: 'ug/dL' },
    actionThreshold: 50,
    frequency: { value: 3, unit: 'months' }
  },
  {
    marker: 'Cortisol_AM',
    category: BiomarkerCategory.Hormonal,
    optimalRange: { min: 10, max: 20, unit: 'ug/dL' },
    actionThreshold: 25,
    frequency: { value: 3, unit: 'months' }
  }
];

// ═══════════════════════════════════════════════════════════════════
// COMPLETE RACK PANEL
// ═══════════════════════════════════════════════════════════════════

export const RACK_BIOMARKER_PANEL: BiomarkerSpec[] = [
  ...TUMOR_MARKERS,
  ...INFLAMMATION_MARKERS,
  ...METABOLIC_MARKERS,
  ...NUTRITIONAL_MARKERS,
  ...HORMONAL_MARKERS
];

export function getBiomarkerSpec(marker: string): BiomarkerSpec | undefined {
  return RACK_BIOMARKER_PANEL.find(b => b.marker === marker);
}

export function getBiomarkersByCategory(category: BiomarkerCategory): BiomarkerSpec[] {
  return RACK_BIOMARKER_PANEL.filter(b => b.category === category);
}

// ═══════════════════════════════════════════════════════════════════
// BIOMARKER TRACKING
// ═══════════════════════════════════════════════════════════════════

export interface BiomarkerReading {
  marker: string;
  value: number;
  unit: string;
  timestamp: Date;
  labSource?: string;
  notes?: string;
}

export interface BiomarkerTrend {
  marker: string;
  readings: BiomarkerReading[];
  trend: TrendDirection;
  percentChange: number;
  inRange: boolean;
  actionRequired: boolean;
}

export class BiomarkerTracker {
  private readings: Map<string, BiomarkerReading[]>;

  constructor() {
    this.readings = new Map();
  }

  addReading(patientId: string, reading: BiomarkerReading): void {
    const key = `${patientId}:${reading.marker}`;
    const existing = this.readings.get(key) || [];
    existing.push(reading);
    // Keep sorted by timestamp
    existing.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    this.readings.set(key, existing);
  }

  getReadings(patientId: string, marker: string): BiomarkerReading[] {
    return this.readings.get(`${patientId}:${marker}`) || [];
  }

  getLatestReading(patientId: string, marker: string): BiomarkerReading | undefined {
    const readings = this.getReadings(patientId, marker);
    return readings.length > 0 ? readings[readings.length - 1] : undefined;
  }

  analyzeTrend(patientId: string, marker: string): BiomarkerTrend | null {
    const readings = this.getReadings(patientId, marker);
    if (readings.length === 0) return null;

    const spec = getBiomarkerSpec(marker);
    const values = readings.map(r => r.value);
    const trend = calculateTrend(values);

    const latest = readings[readings.length - 1];
    const oldest = readings[0];
    const percentChange = oldest.value !== 0
      ? ((latest.value - oldest.value) / oldest.value) * 100
      : 0;

    let inRange = true;
    let actionRequired = false;

    if (spec) {
      inRange = latest.value >= spec.optimalRange.min &&
                latest.value <= spec.optimalRange.max;

      if (spec.lowerBetter) {
        actionRequired = latest.value > spec.actionThreshold;
      } else {
        actionRequired = latest.value < spec.actionThreshold ||
                        latest.value > spec.optimalRange.max * 1.5;
      }
    }

    return {
      marker,
      readings,
      trend,
      percentChange,
      inRange,
      actionRequired
    };
  }

  getAllPatientTrends(patientId: string): BiomarkerTrend[] {
    const trends: BiomarkerTrend[] = [];
    const prefix = `${patientId}:`;

    this.readings.forEach((_, key) => {
      if (key.startsWith(prefix)) {
        const marker = key.substring(prefix.length);
        const trend = this.analyzeTrend(patientId, marker);
        if (trend) trends.push(trend);
      }
    });

    return trends;
  }

  getActionRequiredMarkers(patientId: string): BiomarkerTrend[] {
    return this.getAllPatientTrends(patientId)
      .filter(t => t.actionRequired);
  }
}

// Export singleton
export const biomarkerTracker = new BiomarkerTracker();
