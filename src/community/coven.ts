/**
 * KONOMI STANDARD: COUNT RACKULA
 * Layer 7: Community & Support - The Coven
 *
 * Community support system for patients
 */

import { v4 as uuidv4 } from 'uuid';
import { UUID, CancerType } from '../types/base';

// ═══════════════════════════════════════════════════════════════════
// MEMBER TYPES
// ═══════════════════════════════════════════════════════════════════

export type PrivacyLevel = 'Full' | 'Anonymous' | 'Partial';

export type Badge =
  | 'Initiate'       // Joined
  | 'Survivor'       // 1 month
  | 'Warrior'        // 3 months
  | 'Guardian'       // 6 months
  | 'Elder'          // 1 year
  | 'Supporter'      // Helped 10 members
  | 'Mentor'         // Guided 5 newbies
  | 'Advocate'       // Public sharing
  | 'Ambassador';    // Community leader

export interface CovenMember {
  id: UUID;
  patientId: string;
  alias: string;              // "Countess {name}"
  joined: Date;
  cancerType?: CancerType;
  protocolId?: string;
  privacyLevel: PrivacyLevel;
  badges: Badge[];
  supportGiven: number;
  supportReceived: number;
  bio?: string;
  interests?: string[];
  location?: string;          // General location (city/state)
  isActive: boolean;
}

// ═══════════════════════════════════════════════════════════════════
// SUPPORT CIRCLE TYPES
// ═══════════════════════════════════════════════════════════════════

export type CircleType = 'CancerType' | 'Stage' | 'Geographic' | 'Interest';
export type MeetingFormat = 'Video' | 'Chat' | 'InPerson' | 'Hybrid';

export interface SupportCircle {
  id: UUID;
  name: string;
  type: CircleType;
  description: string;
  memberIds: string[];
  facilitatorId: string;
  schedule: {
    day: string;
    time: string;
    frequency: 'Weekly' | 'BiWeekly' | 'Monthly';
  };
  format: MeetingFormat;
  maxMembers: number;
  isPrivate: boolean;
  tags: string[];
}

// ═══════════════════════════════════════════════════════════════════
// RESOURCE TYPES
// ═══════════════════════════════════════════════════════════════════

export type ResourceType =
  | 'Recipe'
  | 'Protocol'
  | 'Story'
  | 'Research'
  | 'Supplier'
  | 'Provider';

export interface Resource {
  id: UUID;
  type: ResourceType;
  title: string;
  content: string;
  authorId: string;
  verified: boolean;
  helpfulVotes: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// ═══════════════════════════════════════════════════════════════════
// MENTOR MATCHING
// ═══════════════════════════════════════════════════════════════════

export interface MentorMatch {
  id: UUID;
  mentorId: string;
  menteeId: string;
  matchedAt: Date;
  criteria: {
    cancerType: boolean;
    stage: boolean;
    location: boolean;
  };
  status: 'Pending' | 'Active' | 'Completed' | 'Cancelled';
  notes?: string;
}

// ═══════════════════════════════════════════════════════════════════
// MEMBER JOURNEY STATES
// ═══════════════════════════════════════════════════════════════════

export type MemberState = 'Newcomer' | 'Member' | 'Contributor' | 'Mentor' | 'Facilitator';

export const MEMBER_STATE_TRANSITIONS: Record<MemberState, MemberState[]> = {
  Newcomer: ['Member'],
  Member: ['Contributor', 'Newcomer'],  // Can go back if inactive
  Contributor: ['Mentor', 'Member'],
  Mentor: ['Facilitator', 'Contributor'],
  Facilitator: ['Mentor']
};

// ═══════════════════════════════════════════════════════════════════
// BADGE REQUIREMENTS
// ═══════════════════════════════════════════════════════════════════

export const BADGE_REQUIREMENTS: Record<Badge, { description: string; requirement: string }> = {
  Initiate: {
    description: 'Welcome to the Coven!',
    requirement: 'Join the community'
  },
  Survivor: {
    description: 'One month in the castle',
    requirement: '30 days since joining'
  },
  Warrior: {
    description: 'Three months of strength',
    requirement: '90 days since joining'
  },
  Guardian: {
    description: 'Six months of resilience',
    requirement: '180 days since joining'
  },
  Elder: {
    description: 'One year of wisdom',
    requirement: '365 days since joining'
  },
  Supporter: {
    description: 'Lifted 10 sisters',
    requirement: 'Helped 10+ members'
  },
  Mentor: {
    description: 'Guided 5 newcomers',
    requirement: 'Mentored 5+ new members'
  },
  Advocate: {
    description: 'Shared your story publicly',
    requirement: 'Published a public success story'
  },
  Ambassador: {
    description: 'Community leader',
    requirement: 'Selected by the Coven'
  }
};

// ═══════════════════════════════════════════════════════════════════
// COVEN SERVICE
// ═══════════════════════════════════════════════════════════════════

export class CovenService {
  private members: Map<string, CovenMember>;
  private circles: Map<string, SupportCircle>;
  private resources: Map<string, Resource>;
  private mentorMatches: Map<string, MentorMatch>;

  constructor() {
    this.members = new Map();
    this.circles = new Map();
    this.resources = new Map();
    this.mentorMatches = new Map();
  }

  // ═══════════════════════════════════════════════════════════════════
  // MEMBER MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════

  registerMember(
    patientId: string,
    name: string,
    cancerType?: CancerType,
    privacyLevel: PrivacyLevel = 'Partial'
  ): CovenMember {
    const alias = `Countess ${name}`;

    const member: CovenMember = {
      id: uuidv4(),
      patientId,
      alias,
      joined: new Date(),
      cancerType,
      privacyLevel,
      badges: ['Initiate'],
      supportGiven: 0,
      supportReceived: 0,
      isActive: true
    };

    this.members.set(member.id, member);
    return member;
  }

  getMember(id: string): CovenMember | undefined {
    return this.members.get(id);
  }

  getMemberByPatientId(patientId: string): CovenMember | undefined {
    return Array.from(this.members.values())
      .find(m => m.patientId === patientId);
  }

  updateMemberProfile(
    memberId: string,
    updates: Partial<Pick<CovenMember, 'bio' | 'interests' | 'location' | 'privacyLevel'>>
  ): CovenMember | undefined {
    const member = this.members.get(memberId);
    if (member) {
      Object.assign(member, updates);
    }
    return member;
  }

  recordSupport(giverId: string, receiverId: string): void {
    const giver = this.members.get(giverId);
    const receiver = this.members.get(receiverId);

    if (giver) {
      giver.supportGiven++;
      this.checkAndAwardBadges(giver);
    }
    if (receiver) {
      receiver.supportReceived++;
    }
  }

  private checkAndAwardBadges(member: CovenMember): void {
    const now = new Date();
    const daysSinceJoining = Math.floor(
      (now.getTime() - member.joined.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Time-based badges
    if (daysSinceJoining >= 30 && !member.badges.includes('Survivor')) {
      member.badges.push('Survivor');
    }
    if (daysSinceJoining >= 90 && !member.badges.includes('Warrior')) {
      member.badges.push('Warrior');
    }
    if (daysSinceJoining >= 180 && !member.badges.includes('Guardian')) {
      member.badges.push('Guardian');
    }
    if (daysSinceJoining >= 365 && !member.badges.includes('Elder')) {
      member.badges.push('Elder');
    }

    // Activity-based badges
    if (member.supportGiven >= 10 && !member.badges.includes('Supporter')) {
      member.badges.push('Supporter');
    }
  }

  getActiveMembers(): CovenMember[] {
    return Array.from(this.members.values()).filter(m => m.isActive);
  }

  getMembersByCancerType(cancerType: CancerType): CovenMember[] {
    return Array.from(this.members.values())
      .filter(m => m.isActive && m.cancerType === cancerType);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SUPPORT CIRCLES
  // ═══════════════════════════════════════════════════════════════════

  createCircle(
    name: string,
    type: CircleType,
    facilitatorId: string,
    schedule: SupportCircle['schedule'],
    format: MeetingFormat,
    description: string = '',
    maxMembers: number = 12
  ): SupportCircle {
    const circle: SupportCircle = {
      id: uuidv4(),
      name,
      type,
      description,
      memberIds: [facilitatorId],
      facilitatorId,
      schedule,
      format,
      maxMembers,
      isPrivate: false,
      tags: []
    };

    this.circles.set(circle.id, circle);
    return circle;
  }

  joinCircle(circleId: string, memberId: string): boolean {
    const circle = this.circles.get(circleId);
    if (!circle) return false;

    if (circle.memberIds.length >= circle.maxMembers) {
      return false;
    }

    if (!circle.memberIds.includes(memberId)) {
      circle.memberIds.push(memberId);
    }
    return true;
  }

  leaveCircle(circleId: string, memberId: string): boolean {
    const circle = this.circles.get(circleId);
    if (!circle) return false;

    // Can't leave if you're the facilitator
    if (circle.facilitatorId === memberId) {
      return false;
    }

    circle.memberIds = circle.memberIds.filter(id => id !== memberId);
    return true;
  }

  getCircle(id: string): SupportCircle | undefined {
    return this.circles.get(id);
  }

  getMemberCircles(memberId: string): SupportCircle[] {
    return Array.from(this.circles.values())
      .filter(c => c.memberIds.includes(memberId));
  }

  getCirclesByType(type: CircleType): SupportCircle[] {
    return Array.from(this.circles.values())
      .filter(c => c.type === type);
  }

  getOpenCircles(): SupportCircle[] {
    return Array.from(this.circles.values())
      .filter(c => !c.isPrivate && c.memberIds.length < c.maxMembers);
  }

  // ═══════════════════════════════════════════════════════════════════
  // RESOURCES
  // ═══════════════════════════════════════════════════════════════════

  createResource(
    type: ResourceType,
    title: string,
    content: string,
    authorId: string,
    tags: string[] = []
  ): Resource {
    const resource: Resource = {
      id: uuidv4(),
      type,
      title,
      content,
      authorId,
      verified: false,
      helpfulVotes: 0,
      tags,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.resources.set(resource.id, resource);
    return resource;
  }

  voteResource(resourceId: string): void {
    const resource = this.resources.get(resourceId);
    if (resource) {
      resource.helpfulVotes++;
    }
  }

  verifyResource(resourceId: string): void {
    const resource = this.resources.get(resourceId);
    if (resource) {
      resource.verified = true;
      resource.updatedAt = new Date();
    }
  }

  getResource(id: string): Resource | undefined {
    return this.resources.get(id);
  }

  getResourcesByType(type: ResourceType): Resource[] {
    return Array.from(this.resources.values())
      .filter(r => r.type === type)
      .sort((a, b) => b.helpfulVotes - a.helpfulVotes);
  }

  searchResources(query: string): Resource[] {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.resources.values())
      .filter(r =>
        r.title.toLowerCase().includes(lowerQuery) ||
        r.content.toLowerCase().includes(lowerQuery) ||
        r.tags.some(t => t.toLowerCase().includes(lowerQuery))
      );
  }

  // ═══════════════════════════════════════════════════════════════════
  // MENTOR MATCHING
  // ═══════════════════════════════════════════════════════════════════

  requestMentor(
    menteeId: string,
    preferences: { cancerType?: boolean; stage?: boolean; location?: boolean }
  ): MentorMatch | null {
    const mentee = this.members.get(menteeId);
    if (!mentee) return null;

    // Find eligible mentors
    const eligibleMentors = Array.from(this.members.values())
      .filter(m =>
        m.isActive &&
        m.id !== menteeId &&
        m.badges.includes('Mentor') &&
        !this.hasActiveMentorship(m.id)
      );

    if (eligibleMentors.length === 0) {
      return null;
    }

    // Score and match
    let bestMentor = eligibleMentors[0];
    let bestScore = 0;

    eligibleMentors.forEach(mentor => {
      let score = 0;
      if (preferences.cancerType && mentor.cancerType === mentee.cancerType) {
        score += 3;
      }
      if (preferences.location && mentor.location === mentee.location) {
        score += 2;
      }
      score += mentor.supportGiven * 0.1; // Experience bonus

      if (score > bestScore) {
        bestScore = score;
        bestMentor = mentor;
      }
    });

    const match: MentorMatch = {
      id: uuidv4(),
      mentorId: bestMentor.id,
      menteeId,
      matchedAt: new Date(),
      criteria: {
        cancerType: bestMentor.cancerType === mentee.cancerType,
        stage: false,
        location: bestMentor.location === mentee.location
      },
      status: 'Pending'
    };

    this.mentorMatches.set(match.id, match);
    return match;
  }

  private hasActiveMentorship(mentorId: string): boolean {
    return Array.from(this.mentorMatches.values())
      .some(m => m.mentorId === mentorId && m.status === 'Active');
  }

  acceptMentorship(matchId: string): boolean {
    const match = this.mentorMatches.get(matchId);
    if (!match || match.status !== 'Pending') return false;

    match.status = 'Active';
    return true;
  }

  completeMentorship(matchId: string): boolean {
    const match = this.mentorMatches.get(matchId);
    if (!match || match.status !== 'Active') return false;

    match.status = 'Completed';

    // Check if mentee should become mentor
    const mentee = this.members.get(match.menteeId);
    if (mentee && mentee.supportGiven >= 5 && !mentee.badges.includes('Mentor')) {
      mentee.badges.push('Mentor');
    }

    return true;
  }

  getMentorMatch(id: string): MentorMatch | undefined {
    return this.mentorMatches.get(id);
  }

  getMemberMentorships(memberId: string): MentorMatch[] {
    return Array.from(this.mentorMatches.values())
      .filter(m => m.mentorId === memberId || m.menteeId === memberId);
  }
}

// Export singleton
export const covenService = new CovenService();
