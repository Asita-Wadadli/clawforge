# SKILL.md — Interview Intelligence System

## Name
Interview Intelligence System

## Description
AI-powered interview preparation tool for journalists, radio hosts, political analysts, and media professionals. Transforms any topic into structured interview questions, 5W analysis, talking points, and show-ready content.

## Version
1.0.0

## Category
media, journalism, content, political-analysis

## Author
Claw Forge Systems

## Requirements
- OpenClaw runtime
- GPT-4 or equivalent model access
- Optional: WhatsApp integration for delivery
- Optional: PDF export capability

## Installation
1. Copy skill to `skills/interview-intelligence/`
2. No additional dependencies required
3. Configure output preferences in CONFIG.json

## Usage

### Basic Interview Generation
```
User: Generate interview questions for [TOPIC] with [GUEST]

System outputs:
- Interview headline/focus
- Quick summary (2-3 lines)
- 5W Breakdown (Who, What, Why, When, Where, Impact)
- 10-20 core questions (structured)
- Follow-up question chains
- Key talking points
- Optional: Show flow structure
```

### Political Analysis Mode
```
User: Analyze [POLITICAL TOPIC/EVENT] for interview

System outputs:
- Political context summary
- Stakeholder breakdown
- Controversial angles
- Accountability questions
- Neutral framing options
- Timing considerations
```

### Radio Show Builder
```
User: Build show structure for [TOPIC] on [PLATFORM]

System outputs:
- Show intro script
- Segment breakdown
- Question flow
- Transition points
- Closing summary
- Timing estimates
```

## Output Format

### Standard Interview Kit
```
═══════════════════════════════════════
INTERVIEW INTELLIGENCE KIT
═══════════════════════════════════════

HEADLINE: [Clear, compelling focus]

QUICK SUMMARY:
• [Key point 1]
• [Key point 2]
• [Key point 3]

5W BREAKDOWN:
├─ WHO: [Key people/entities]
├─ WHAT: [Core issue/event]
├─ WHY: [Underlying causes]
├─ WHEN: [Timeline/context]
├─ WHERE: [Location/scope]
└─ IMPACT: [Consequences]

CORE QUESTIONS:
1. [Opening/Context question]
2. [Main angle question]
3. [Challenge/Pressure question]
4. [Clarification question]
5. [Forward-looking question]
[... 10-20 total]

FOLLOW-UP LOGIC:
IF [response type] → THEN [follow-up question]

TALKING POINTS:
• [Key argument 1]
• [Key argument 2]
• [Counter-argument to anticipate]

SHOW FLOW (Optional):
[00:00] Intro
[02:00] Main segment
[08:00] Deep dive
[12:00] Closing
```

## Prompts

### System Prompt
```
You are an expert interview coach and political analyst with 20+ years in broadcast journalism. Your role is to help journalists, radio hosts, and analysts prepare for interviews by generating intelligent, structured content.

Your outputs must be:
- Immediately usable (no editing required)
- Structured and scannable
- Balanced (fair but probing)
- Context-aware (political, cultural, timing)

Always provide:
1. Clear headline/focus
2. 5W breakdown
3. 10-20 quality questions
4. Follow-up logic
5. Talking points

Never:
- Be biased or partisan
- Suggest unethical questions
- Overwhelm with too much text
- Use jargon without explanation
```

### Interview Generation Prompt
```
Generate a complete Interview Intelligence Kit for:

TOPIC: {{topic}}
GUEST: {{guest_name}} ({{guest_title/role}})
CONTEXT: {{context}}
PLATFORM: {{platform}} (radio/TV/podcast/print)
TONE: {{tone}} (aggressive/neutral/soft)
DURATION: {{duration}} (short/medium/long)

Output the complete kit in the standard format.
```

### Political Analysis Prompt
```
Analyze this political topic for interview preparation:

TOPIC: {{topic}}
ELECTION CONTEXT: {{election_cycle_phase}}
KEY PLAYERS: {{players}}
CONTROVERSY LEVEL: {{low/medium/high}}

Provide:
1. Neutral summary
2. All sides' perspectives
3. Hard-hitting accountability questions
4. Soft/opening questions
5. Timing considerations
6. Risk assessment for interviewer
```

## Configuration

### CONFIG.json
```json
{
  "default_tone": "neutral",
  "default_platform": "radio",
  "question_count": {
    "short": 10,
    "medium": 15,
    "long": 20
  },
  "output_formats": ["text", "whatsapp", "pdf"],
  "political_sensitivity": "high",
  "include_show_flow": true,
  "language": "en"
}
```

## Pricing

### Tier 1: Quick Interview Kit — $27
- Single interview generation
- 10 questions + 5W breakdown
- Text output only
- 24-hour delivery

### Tier 2: Full Intelligence System — $47
- Everything in Tier 1
- 20 questions + advanced follow-ups
- Talking points + show structure
- WhatsApp delivery
- PDF export

### Tier 3: Daily Intelligence — $97/month
- Unlimited interview generations
- Daily political briefings
- Breaking news analysis
- Priority support
- Custom templates

## Use Cases

### Election Season (Primary)
- Candidate interview prep
- Issue analysis for debates
- Breaking news response
- Voter concern topics

### Regular Journalism
- Feature interview prep
- Investigative story angles
- Expert source questioning
- Breaking news coverage

### Talk Shows / Radio
- Daily show preparation
- Guest briefing documents
- Audience question curation
- Segment planning

### Political Analysis
- Policy breakdown interviews
- Stakeholder analysis
- Controversy navigation
- Neutral framing assistance

## Delivery Methods

### 1. Web Interface (Primary)
- Clean, fast output panel
- Copy-to-clipboard buttons
- Mobile-responsive
- No login required for single use

### 2. WhatsApp (Secondary)
- Formatted for mobile reading
- Easy to reference during live shows
- Shareable with team

### 3. PDF Export (Premium)
- Professional formatting
- Print-ready
- Archive for records

## Success Metrics

- Time saved per interview: 60-90 minutes
- Question quality rating: 4.5+/5
- User retention: 70%+ monthly
- Referral rate: 30%+

## Roadmap

### Phase 1 (Launch)
- Core interview generation
- 5W analysis
- Basic delivery

### Phase 2 (Month 2)
- WhatsApp integration
- PDF export
- Political analysis mode

### Phase 3 (Month 3)
- Voice output (ElevenLabs)
- Live interview assistant
- Team collaboration

### Phase 4 (Month 6)
- Breaking news auto-alerts
- Custom template builder
- API access for newsrooms

## Support

Email: kofiadmn@agentmail.to  
Documentation: https://project-ksag4.vercel.app/resources/  

## License
Proprietary — Claw Forge Systems

## Changelog

### v1.0.0 (2026-04-12)
- Initial release
- Core interview generation
- 5W political analysis
- Multi-format delivery
