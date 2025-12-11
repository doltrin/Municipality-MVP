# 2.16 Youth Card - Workflow Diagram

## Service Description

Digital card for citizens aged 15-29 with exclusive discounts and event access.

## User Flow Diagram

```mermaid
flowchart TD
    subgraph Apply["📝 Apply for Youth Card"]
        A[Open Youth Card] --> B{Has Card?}
        B -->|No| C[Check Eligibility]
        C --> D{Age 15-29?}
        D -->|Yes| E[Start Application]
        D -->|No| F[Show Ineligible Message]
        E --> G[Enter Personal Info]
        G --> H[Upload ID/Passport]
        H --> I[Upload Photo]
        I --> J[Verify Student Status Optional]
        J --> K[Review Application]
        K --> L[Submit Application]
        L --> M[Await Approval]
        M --> N{Approved?}
        N -->|Yes| O[Card Activated]
        N -->|No| P[Show Rejection Reason]
        B -->|Yes| Q[View Card]
    end

    subgraph Card["💳 Digital Youth Card"]
        Q --> R[View Card Details]
        R --> S[Show QR Code]
        S --> T[Use at Partners]
        R --> U[View Points]
        R --> V[View Level]
    end

    subgraph Benefits["🎁 Youth Benefits"]
        W[Browse Benefits] --> X{Category}
        X -->|Transport| Y[50% Bus Fare]
        X -->|Cinema| Z[30% Movie Tickets]
        X -->|Sports| AA[Free Gym Access]
        X -->|Culture| AB[Free Museum Entry]
        X -->|Education| AC[Free Workshops]
        X -->|Events| AD[Priority Event Access]
        Y --> AE[View Benefit Details]
        Z --> AE
        AA --> AE
        AB --> AE
        AC --> AE
        AD --> AE
        AE --> AF[Show QR to Redeem]
    end

    subgraph Events["🎉 Youth Events"]
        AG[View Events] --> AH[See Upcoming Events]
        AH --> AI[Filter by Type]
        AI --> AJ{Event Type}
        AJ -->|Concerts| AK[Music Events]
        AJ -->|Sports| AL[Sports Activities]
        AJ -->|Workshops| AM[Learning Events]
        AJ -->|Social| AN[Meetups]
        AK --> AO[View Event Details]
        AL --> AO
        AM --> AO
        AN --> AO
        AO --> AP[Register Interest]
        AP --> AQ[Get Priority Access]
        AQ --> AR[Receive Ticket/Confirmation]
    end

    subgraph Points["⭐ Youth Points"]
        U --> AS[View Points Balance]
        AS --> AT[See How to Earn]
        AT --> AU{Activity}
        AU -->|Attend Event| AV[+100 pts]
        AU -->|Complete Workshop| AW[+150 pts]
        AU -->|Volunteer| AX[+200 pts]
        AU -->|Refer Friend| AY[+50 pts]
        AV --> AZ[Points Added]
        AW --> AZ
        AX --> AZ
        AY --> AZ
    end

    subgraph Levels["🏆 Youth Levels"]
        V --> BA{Points Total}
        BA -->|0-499| BB[Starter]
        BA -->|500-1499| BC[Explorer]
        BA -->|1500-2999| BD[Achiever]
        BA -->|3000+| BE[Champion]
        BB --> BF[Basic Benefits]
        BC --> BG[+Extra Discounts]
        BD --> BH[+VIP Event Access]
        BE --> BI[+Exclusive Perks]
    end

    subgraph Activity["📋 My Activity"]
        BJ[View Activity] --> BK[Events Attended]
        BJ --> BL[Benefits Used]
        BJ --> BM[Points History]
        BK --> BN[Download Certificate]
    end
```

## Screens Required

| Screen | Description | Status |
|--------|-------------|--------|
| Application Form | Sign up for card | ✅ Implemented |
| Digital Card | Card display + QR | ✅ Implemented |
| Benefits List | Available discounts | ✅ Implemented |
| Benefit Details | How to use | ✅ Implemented |
| Events List | Upcoming activities | ✅ Implemented |
| Event Details | Info + register | ✅ Implemented |
| Points Dashboard | Balance + history | ✅ Implemented |
| Level Progress | Tier status | ✅ Implemented |

## API Endpoints

```text
POST /api/youth-card/apply
GET  /api/youth-card
GET  /api/youth-card/qr
GET  /api/youth-card/benefits
GET  /api/youth-card/benefits/{id}
GET  /api/youth-card/events
GET  /api/youth-card/events/{id}
POST /api/youth-card/events/{id}/register
GET  /api/youth-card/points
GET  /api/youth-card/points/history
GET  /api/youth-card/level
GET  /api/youth-card/activity
```

## Notifications

| Event | Channel | Message |
|-------|---------|---------|
| Application Received | Push | "Youth Card application received!" |
| Card Approved | Push/SMS | "🎉 Your Youth Card is ready! Start exploring." |
| New Event | Push | "New event: Summer Music Festival - Register now!" |
| Event Reminder | Push | "Reminder: Career Workshop tomorrow at 2 PM" |
| Points Earned | Push | "+100 points for attending Beach Cleanup!" |
| Level Up | Push | "🏆 You've reached Explorer level! New perks unlocked." |
| Birthday | Push | "Happy Birthday! 🎂 Enjoy double points today!" |
| Card Expiring | Push | "Your Youth Card expires in 30 days. Renew now!" |
