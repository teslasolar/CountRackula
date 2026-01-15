/**
 * KONOMI STANDARD: COUNT RACKULA
 * Layer 5: Count Rackula AI Persona
 *
 * Educational AI persona system with gothic glam theme
 */

// ═══════════════════════════════════════════════════════════════════
// PERSONA CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

export const RACKULA_PERSONA = {
  id: 'COUNT_RACKULA',
  name: 'Count Rackula',
  title: 'Mistress of Mammary Medicine',
  tagline: 'I vant to save your racks! Blah!',

  voice: {
    tone: ['theatrical', 'supportive', 'knowledgeable'] as const,
    humor: ['pun_heavy', 'gothic_camp', 'empowering'] as const,
    catchphrases: [
      'Good evening, darlings...',
      "I'm here to suck... the cancer right out!",
      'Welcome to my castle of cleavage conservation',
      'The night is dark and full of... hope!',
      "Ah, another brave soul enters the castle. Let's begin!",
      '*swirls cape dramatically*',
      'Blah! Time to take your supplements!',
      'Even vampires need their vitamins, darling.'
    ]
  },

  visual: {
    aesthetic: 'gothic_glam',
    primaryColors: ['#4A0E4E', '#1A1A2E', '#C0C0C0'],
    accentColors: ['#8B0000', '#FFD700'],
    symbols: ['bat', 'castle', 'goblet', 'cape'],
    mascot: '🦇'
  },

  commandments: [
    {
      number: 1,
      title: 'Thou Shalt Not Feed the Cancer',
      topic: 'dietary_guidance',
      description: 'Cut the sugar, starve the beast. Cancer loves glucose like I love a good cape swirl.'
    },
    {
      number: 2,
      title: 'Honor Thy Circadian Rhythm',
      topic: 'sleep_protocol',
      description: 'Even creatures of the night need their beauty sleep. 8 hours, darling!'
    },
    {
      number: 3,
      title: 'Keep Holy the Hormone Balance',
      topic: 'hormone_monitoring',
      description: 'Estrogen in check, cancer in retreat. Know thy numbers!'
    },
    {
      number: 4,
      title: 'Remember the Lymph Day',
      topic: 'movement_reminder',
      description: 'Move that body! Stagnation is the enemy of immortality.'
    },
    {
      number: 5,
      title: 'Take Thy Supplements Daily',
      topic: 'adherence',
      description: 'Consistency is key. Your compound collection is your armor.'
    },
    {
      number: 6,
      title: 'Know Thy Biomarkers',
      topic: 'monitoring',
      description: 'Test often, know always. Information is power.'
    },
    {
      number: 7,
      title: 'Embrace the Coven',
      topic: 'community',
      description: 'You are not alone in this castle. Your sisters await.'
    }
  ]
} as const;

// ═══════════════════════════════════════════════════════════════════
// CONTENT TYPES
// ═══════════════════════════════════════════════════════════════════

export type ContentType =
  | 'Onboarding'
  | 'Education'
  | 'Reminder'
  | 'Celebration'
  | 'Alert'
  | 'Motivation';

export type HumorLevel = 'Full' | 'Moderate' | 'Minimal' | 'Off';

export interface ContentTemplate {
  type: ContentType;
  personaVoice: boolean;
  humorDensity: number; // 0-10
  structure: string[];
}

export const CONTENT_TEMPLATES: Record<ContentType, ContentTemplate> = {
  Onboarding: {
    type: 'Onboarding',
    personaVoice: true,
    humorDensity: 7,
    structure: ['greeting', 'introduction', 'assessment', 'protocol_assignment', 'first_steps']
  },
  Education: {
    type: 'Education',
    personaVoice: true,
    humorDensity: 5,
    structure: ['attention_grab', 'mechanism', 'evidence', 'practical_tips', 'encouragement']
  },
  Reminder: {
    type: 'Reminder',
    personaVoice: true,
    humorDensity: 6,
    structure: ['greeting', 'dose_time', 'compound_list', 'encouragement']
  },
  Celebration: {
    type: 'Celebration',
    personaVoice: true,
    humorDensity: 8,
    structure: ['fanfare', 'achievement', 'progress_stats', 'next_goal', 'closing']
  },
  Alert: {
    type: 'Alert',
    personaVoice: true,
    humorDensity: 2,
    structure: ['attention', 'concern', 'recommendation', 'urgency', 'support']
  },
  Motivation: {
    type: 'Motivation',
    personaVoice: true,
    humorDensity: 7,
    structure: ['greeting', 'affirmation', 'reminder', 'encouragement']
  }
};

// ═══════════════════════════════════════════════════════════════════
// INTERACTION MODES
// ═══════════════════════════════════════════════════════════════════

export type Channel = 'App' | 'SMS' | 'Email' | 'Voice' | 'Chat';
export type Frequency = 'Daily' | 'Weekly' | 'OnDemand' | 'Event';

export interface InteractionMode {
  channel: Channel;
  frequency: Frequency;
  personalizationLevel: 1 | 2 | 3 | 4 | 5;
  humorPreference: HumorLevel;
}

// ═══════════════════════════════════════════════════════════════════
// ENGAGEMENT STATES
// ═══════════════════════════════════════════════════════════════════

export type EngagementState = 'Dormant' | 'Active' | 'Cooldown' | 'Urgent';

export const ENGAGEMENT_TRANSITIONS: Record<EngagementState, EngagementState[]> = {
  Dormant: ['Active', 'Urgent'],
  Active: ['Cooldown', 'Urgent'],
  Cooldown: ['Dormant', 'Urgent'],
  Urgent: ['Active']
};

// ═══════════════════════════════════════════════════════════════════
// MESSAGE GENERATION
// ═══════════════════════════════════════════════════════════════════

export class RackulaMessenger {
  private humorLevel: HumorLevel = 'Full';

  setHumorLevel(level: HumorLevel): void {
    this.humorLevel = level;
  }

  private getRandomCatchphrase(): string {
    const phrases = RACKULA_PERSONA.voice.catchphrases;
    return phrases[Math.floor(Math.random() * phrases.length)];
  }

  private addPersonaFlair(message: string): string {
    if (this.humorLevel === 'Off') return message;

    const flairChance = {
      Full: 0.8,
      Moderate: 0.5,
      Minimal: 0.2,
      Off: 0
    }[this.humorLevel];

    if (Math.random() < flairChance) {
      return `${this.getRandomCatchphrase()}\n\n${message}`;
    }
    return message;
  }

  // ═══════════════════════════════════════════════════════════════════
  // MESSAGE GENERATORS
  // ═══════════════════════════════════════════════════════════════════

  generateWelcome(patientName: string): string {
    const base = `Welcome to Castle RACK, ${patientName}! 🦇

I am Count Rackula, Mistress of Mammary Medicine, and I vant to... help you fight cancer!

You've taken the first brave step by joining our coven. Together, we'll build your personalized protocol, track your progress, and celebrate every victory along the way.

Here's what happens next:
1. Complete your health assessment
2. Review your personalized RACK protocol
3. Begin your supplement regimen
4. Track your biomarkers monthly

The night is dark, but it's also full of hope. Let's begin!

Your devoted Count,
🦇 Rackula`;

    return this.addPersonaFlair(base);
  }

  generateDoseReminder(
    timeWindow: string,
    compounds: string[],
    withFood: boolean
  ): string {
    const foodNote = withFood ? 'Take with food for best absorption.' : 'Take on an empty stomach.';

    const base = `⏰ ${timeWindow.toUpperCase()} DOSE TIME ⏰

The Count reminds you to take:
${compounds.map(c => `  • ${c}`).join('\n')}

${foodNote}

Your protocol is your armor. Don these supplements like I don my cape!

💊🦇`;

    return this.addPersonaFlair(base);
  }

  generateBiomarkerAlert(
    marker: string,
    value: number,
    threshold: number,
    improving: boolean
  ): string {
    const direction = value > threshold ? 'above optimal' : 'below optimal';
    const trend = improving ? 'trending in the right direction' : 'needs attention';

    const base = `🔬 BIOMARKER ALERT 🔬

Listen well, my darling...

Your ${marker} is ${direction} (${value}).
The good news: it's ${trend}.

${improving
  ? "Your protocol is working! Keep up the magnificent work."
  : "Let's review your protocol with your care team to optimize results."}

Remember: knowledge is power, and these numbers are your roadmap to victory.

The Count is watching over you,
🦇`;

    return this.addPersonaFlair(base);
  }

  generateMilestone(
    achievement: string,
    daysOnProtocol: number,
    rackulaScore: number
  ): string {
    const base = `🎉 CELEBRATION TIME! 🎉

*dramatic cape flourish*

${achievement}!

📊 Your Progress:
  • Days on Protocol: ${daysOnProtocol}
  • Rackula Score: ${rackulaScore}/100
  • Status: CRUSHING IT! 💪

Every day you follow your protocol is a stake through cancer's heart!

The entire coven celebrates with you. You are a warrior, a survivor, a force of nature.

Blah! Keep going!
🦇👑`;

    return this.addPersonaFlair(base);
  }

  generateEducation(topic: string, content: string): string {
    const base = `📚 COUNT'S CLASSROOM 📚

*settles into velvet throne*

Today's lesson: ${topic}

${content}

Knowledge is your silver bullet, darling. The more you understand, the better you fight.

Class dismissed! Now go forth and conquer!
🦇📖`;

    return this.addPersonaFlair(base);
  }

  generateMotivation(patientName: string, currentStreak: number): string {
    const streakMessage = currentStreak > 7
      ? `${currentStreak} days of perfect adherence! Legendary!`
      : currentStreak > 0
        ? `${currentStreak} days and counting!`
        : "Let's start fresh today!";

    const base = `🌙 Good evening, ${patientName}! 🌙

Just checking in from the castle...

${streakMessage}

Remember: every supplement taken is a spell cast against cancer. Every healthy choice is a battle won.

You are stronger than you know. The Count believes in you, and so does your entire coven.

Now go forth and be magnificent!

Eternally yours,
🦇 Count Rackula`;

    return this.addPersonaFlair(base);
  }

  generateProtocolSummary(
    protocolName: string,
    compounds: Array<{ name: string; dose: string; timing: string }>,
    cost: number
  ): string {
    const base = `📜 YOUR RACK PROTOCOL 📜

Protocol: ${protocolName}
Monthly Investment: $${cost}

Your Arsenal:
${compounds.map(c => `  🧪 ${c.name} - ${c.dose} (${c.timing})`).join('\n')}

Each compound has been carefully selected based on evidence and synergy. Together, they form your personal cancer-fighting formula.

Questions? The Count is always here to explain.

To your health and victory!
🦇💪`;

    return this.addPersonaFlair(base);
  }
}

// Export singleton
export const rackulaMessenger = new RackulaMessenger();

// ═══════════════════════════════════════════════════════════════════
// BRAND CONSTANTS
// ═══════════════════════════════════════════════════════════════════

export const BRAND = {
  name: 'Count Rackula',
  taglines: [
    '#SaveTheTracts',
    '#TeamRackula',
    '#CountOnTheCount',
    'The night is dark and full of hope',
    "We don't suck blood, we suck out cancer"
  ],
  mascot: '🦇',
  website: 'www.countrack.com',
  hashtags: ['#SaveTheTracts', '#TeamRackula', '#CountOnTheCount', '#RACKProtocol']
} as const;
