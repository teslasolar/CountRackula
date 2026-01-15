/**
 * KONOMI STANDARD: COUNT RACKULA
 * Layer 4: Monitoring & Outcomes - Patient Dashboard
 *
 * Dashboard generation and outcome metrics
 */

import {
  UUID,
  ProtocolState,
  OutcomeMetric
} from '../types/base';
import { PatientProtocol } from '../protocols/types';
import { BiomarkerTrend, biomarkerTracker } from './biomarkers';

// ═══════════════════════════════════════════════════════════════════
// DASHBOARD TYPES
// ═══════════════════════════════════════════════════════════════════

export interface Alert {
  id: string;
  type: 'biomarker' | 'adherence' | 'schedule' | 'milestone';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  actionRequired: string | null;
}

export interface Dashboard {
  patientId: string;
  protocolId: string | null;
  currentState: ProtocolState | null;
  biomarkerTrends: BiomarkerTrend[];
  complianceRate: number;
  daysOnProtocol: number;
  nextLabs: Date | null;
  alerts: Alert[];
  rackulaScore: number;  // 0-100 composite score
  lastUpdated: Date;
}

// ═══════════════════════════════════════════════════════════════════
// RACKULA SCORE CALCULATION
// ═══════════════════════════════════════════════════════════════════

export interface ScoreComponents {
  biomarkerScore: number;      // 0-30 points
  adherenceScore: number;      // 0-25 points
  lifestyleScore: number;      // 0-20 points
  progressScore: number;       // 0-15 points
  engagementScore: number;     // 0-10 points
}

export function calculateRackulaScore(
  biomarkerTrends: BiomarkerTrend[],
  adherenceRate: number,
  lifestyleCompliance: number,
  daysOnProtocol: number,
  engagementMetrics: { logins: number; messagesRead: number }
): ScoreComponents {
  // Biomarker Score (0-30)
  // Based on how many markers are in range and trending correctly
  const totalMarkers = biomarkerTrends.length;
  const inRangeMarkers = biomarkerTrends.filter(t => t.inRange).length;
  const improvingMarkers = biomarkerTrends.filter(t =>
    t.trend === 'down' || (t.inRange && t.trend === 'stable')
  ).length;

  const biomarkerScore = totalMarkers > 0
    ? Math.round(((inRangeMarkers / totalMarkers) * 20) +
                 ((improvingMarkers / totalMarkers) * 10))
    : 15; // Default score if no data

  // Adherence Score (0-25)
  const adherenceScore = Math.round(adherenceRate * 0.25);

  // Lifestyle Score (0-20)
  const lifestyleScore = Math.round(lifestyleCompliance * 0.20);

  // Progress Score (0-15)
  // Based on days on protocol with diminishing returns
  const progressScore = Math.min(15, Math.round(Math.log10(daysOnProtocol + 1) * 5));

  // Engagement Score (0-10)
  const loginScore = Math.min(5, engagementMetrics.logins);
  const messageScore = Math.min(5, engagementMetrics.messagesRead);
  const engagementScore = loginScore + messageScore;

  return {
    biomarkerScore,
    adherenceScore,
    lifestyleScore,
    progressScore,
    engagementScore
  };
}

export function getTotalScore(components: ScoreComponents): number {
  return (
    components.biomarkerScore +
    components.adherenceScore +
    components.lifestyleScore +
    components.progressScore +
    components.engagementScore
  );
}

export function getScoreGrade(score: number): string {
  if (score >= 90) return 'A+ (Excellent)';
  if (score >= 80) return 'A (Great)';
  if (score >= 70) return 'B (Good)';
  if (score >= 60) return 'C (Fair)';
  if (score >= 50) return 'D (Needs Work)';
  return 'F (Critical Attention Needed)';
}

// ═══════════════════════════════════════════════════════════════════
// DASHBOARD SERVICE
// ═══════════════════════════════════════════════════════════════════

export class DashboardService {
  private alerts: Map<string, Alert[]>;

  constructor() {
    this.alerts = new Map();
  }

  generateDashboard(
    patientId: string,
    patientProtocol: PatientProtocol | null,
    lifestyleCompliance: number = 80,
    engagementMetrics: { logins: number; messagesRead: number } = { logins: 5, messagesRead: 5 }
  ): Dashboard {
    const biomarkerTrends = biomarkerTracker.getAllPatientTrends(patientId);
    const alerts = this.getPatientAlerts(patientId);

    // Calculate days on protocol
    let daysOnProtocol = 0;
    if (patientProtocol) {
      const now = new Date();
      const start = new Date(patientProtocol.startDate);
      daysOnProtocol = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    }

    // Calculate Rackula score
    const adherenceRate = patientProtocol?.adherenceRate ?? 0;
    const scoreComponents = calculateRackulaScore(
      biomarkerTrends,
      adherenceRate,
      lifestyleCompliance,
      daysOnProtocol,
      engagementMetrics
    );
    const rackulaScore = getTotalScore(scoreComponents);

    // Generate alerts for action-required biomarkers
    const actionMarkers = biomarkerTrends.filter(t => t.actionRequired);
    actionMarkers.forEach(marker => {
      this.addAlert(patientId, {
        id: `bio-${marker.marker}-${Date.now()}`,
        type: 'biomarker',
        severity: 'warning',
        message: `${marker.marker} requires attention: ${marker.readings[marker.readings.length - 1]?.value}`,
        timestamp: new Date(),
        acknowledged: false,
        actionRequired: `Review ${marker.marker} levels with your care team`
      });
    });

    // Calculate next labs date (30 days from last reading or now)
    let nextLabs: Date | null = null;
    if (biomarkerTrends.length > 0) {
      const latestReading = biomarkerTrends
        .flatMap(t => t.readings)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
      if (latestReading) {
        nextLabs = new Date(latestReading.timestamp);
        nextLabs.setDate(nextLabs.getDate() + 30);
      }
    } else {
      nextLabs = new Date();
      nextLabs.setDate(nextLabs.getDate() + 7);
    }

    return {
      patientId,
      protocolId: patientProtocol?.id ?? null,
      currentState: patientProtocol?.state ?? null,
      biomarkerTrends,
      complianceRate: adherenceRate,
      daysOnProtocol,
      nextLabs,
      alerts: this.getPatientAlerts(patientId),
      rackulaScore,
      lastUpdated: new Date()
    };
  }

  addAlert(patientId: string, alert: Alert): void {
    const existing = this.alerts.get(patientId) || [];
    // Avoid duplicate alerts
    if (!existing.some(a => a.id === alert.id)) {
      existing.push(alert);
      this.alerts.set(patientId, existing);
    }
  }

  getPatientAlerts(patientId: string): Alert[] {
    return this.alerts.get(patientId) || [];
  }

  getUnacknowledgedAlerts(patientId: string): Alert[] {
    return this.getPatientAlerts(patientId).filter(a => !a.acknowledged);
  }

  acknowledgeAlert(patientId: string, alertId: string): void {
    const alerts = this.alerts.get(patientId);
    if (alerts) {
      const alert = alerts.find(a => a.id === alertId);
      if (alert) {
        alert.acknowledged = true;
      }
    }
  }

  clearOldAlerts(patientId: string, daysOld: number = 30): void {
    const alerts = this.alerts.get(patientId);
    if (alerts) {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - daysOld);
      const filtered = alerts.filter(a =>
        a.timestamp > cutoff || !a.acknowledged
      );
      this.alerts.set(patientId, filtered);
    }
  }
}

// Export singleton
export const dashboardService = new DashboardService();

// ═══════════════════════════════════════════════════════════════════
// OUTCOME METRICS
// ═══════════════════════════════════════════════════════════════════

export const OUTCOME_METRICS: OutcomeMetric[] = [
  {
    id: 'RISK_REDUCTION',
    name: 'Risk Reduction',
    calculation: '1 - (incidence_on_protocol / baseline_incidence)',
    target: 0.70,
    benchmark: 0.30
  },
  {
    id: 'TREATMENT_ENHANCEMENT',
    name: 'Treatment Response Enhancement',
    calculation: 'response_rate_with_rack / response_rate_without_rack',
    target: 2.0,
    benchmark: 1.5
  },
  {
    id: 'COST_SAVINGS',
    name: 'Cost Savings vs Conventional',
    calculation: '1 - (rack_cost / conventional_cost)',
    target: 0.98,
    benchmark: 0.90
  },
  {
    id: 'QOL_IMPROVEMENT',
    name: 'Quality of Life Improvement',
    calculation: 'qol_score_current / qol_score_baseline',
    target: 1.2,
    benchmark: 1.0
  },
  {
    id: 'ADHERENCE',
    name: 'Protocol Adherence Rate',
    calculation: 'doses_taken / doses_prescribed',
    target: 0.85,
    benchmark: 0.70
  }
];

export function getOutcomeMetric(id: string): OutcomeMetric | undefined {
  return OUTCOME_METRICS.find(m => m.id === id);
}
