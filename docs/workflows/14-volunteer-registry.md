# 2.14 Volunteer Registry - Workflow Diagram

## Service Description

Platform for volunteer registration, opportunity matching, and hours tracking.

## User Flow Diagram

```mermaid
flowchart TD
    subgraph Register["📝 Register as Volunteer"]
        A[Open Volunteer Registry] --> B{Already Registered?}
        B -->|No| C[Start Registration]
        C --> D[Enter Personal Info]
        D --> E[Select Skills/Interests]
        E --> F[Choose Availability]
        F --> G[Set Preferences]
        G --> H[Accept Terms]
        H --> I[Submit Registration]
        I --> J[Receive Confirmation]
        J --> K[Get Volunteer ID]
        B -->|Yes| L[View Dashboard]
    end

    subgraph Browse["🔍 Browse Opportunities"]
        L --> M[View Opportunities]
        M --> N[Filter by Category]
        N --> O{Category}
        O -->|Environment| P[Beach Cleanup/Tree Planting]
        O -->|Social| Q[Elderly Care/Food Bank]
        O -->|Events| R[Festival Support]
        O -->|Emergency| S[Disaster Response]
        O -->|Education| T[Tutoring/Mentoring]
        P --> U[View Opportunity Details]
        Q --> U
        R --> U
        S --> U
        T --> U
    end

    subgraph Apply["✋ Apply to Volunteer"]
        U --> V[See Requirements]
        V --> W[Check Schedule]
        W --> X{Available?}
        X -->|Yes| Y[Apply to Volunteer]
        Y --> Z[Confirm Availability]
        Z --> AA[Submit Application]
        AA --> AB[Await Confirmation]
        AB --> AC{Accepted?}
        AC -->|Yes| AD[Receive Details]
        AD --> AE[Add to Calendar]
        AC -->|No| AF[View Alternatives]
        X -->|No| AF
    end

    subgraph Participate["🤝 Participation"]
        AE --> AG[Arrive at Location]
        AG --> AH[Check In via App]
        AH --> AI[Perform Tasks]
        AI --> AJ[Check Out]
        AJ --> AK[Log Hours]
        AK --> AL[Submit Feedback]
    end

    subgraph Track["📊 Track Progress"]
        L --> AM[View My Hours]
        AM --> AN[See Total Hours]
        AN --> AO[View Badges/Achievements]
        AO --> AP[Download Certificate]
        AP --> AQ[Share on Social]
    end

    subgraph Team["👥 Team Features"]
        AR[Create Team] --> AS[Invite Friends]
        AS --> AT[Team Dashboard]
        AT --> AU[Track Team Hours]
        AU --> AV[Team Leaderboard]
    end

    subgraph Rewards["🏆 Rewards"]
        AO --> AW{Milestone?}
        AW -->|10 Hours| AX[Bronze Badge]
        AW -->|50 Hours| AY[Silver Badge]
        AW -->|100 Hours| AZ[Gold Badge]
        AW -->|250 Hours| BA[Platinum Badge]
        AX --> BB[Unlock Benefits]
        AY --> BB
        AZ --> BB
        BA --> BB
    end
```

## Screens Required

| Screen | Description | Status |
|--------|-------------|--------|
| Registration Form | Sign up as volunteer | ✅ Implemented |
| Volunteer Dashboard | Overview + stats | ✅ Implemented |
| Opportunities List | Browse activities | ✅ Implemented |
| Opportunity Details | Full info + apply | ✅ Implemented |
| My Activities | Upcoming + past | ✅ Implemented |
| Check In/Out | QR-based attendance | ⚠️ Basic |
| Hours Log | Track volunteer time | ✅ Implemented |
| Achievements | Badges + certificates | ✅ Implemented |

## API Endpoints

```text
POST /api/volunteers/register
GET  /api/volunteers/profile
PUT  /api/volunteers/profile
GET  /api/volunteers/opportunities
GET  /api/volunteers/opportunities/{id}
POST /api/volunteers/opportunities/{id}/apply
GET  /api/volunteers/activities
POST /api/volunteers/activities/{id}/checkin
POST /api/volunteers/activities/{id}/checkout
GET  /api/volunteers/hours
GET  /api/volunteers/achievements
GET  /api/volunteers/certificate
POST /api/volunteers/teams
GET  /api/volunteers/teams/{id}
```

## Notifications

| Event | Channel | Message |
|-------|---------|---------|
| Registration Complete | Push/Email | "Welcome to the Volunteer Registry! ID: VOL-2024-001" |
| New Opportunity | Push | "New opportunity: Beach Cleanup this Saturday" |
| Application Accepted | Push | "You're confirmed for Tree Planting on Dec 15!" |
| Event Reminder | Push | "Reminder: Beach Cleanup tomorrow at 9 AM" |
| Hours Logged | Push | "4 hours logged. Total: 28 hours this year!" |
| Badge Earned | Push | "🏆 Congratulations! You earned the Silver Badge!" |
| Certificate Ready | Push/Email | "Your volunteer certificate is ready to download" |
