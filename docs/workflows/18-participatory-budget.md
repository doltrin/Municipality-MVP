# 2.18 Participatory Budget & Citizen Engagement - Workflow Diagram

## Service Description

Platform for citizen participation in budget allocation and idea submission.

## User Flow Diagram

```mermaid
flowchart TD
    subgraph Budget["💰 Participatory Budget"]
        A[Open Participatory Budget] --> B[View Current Cycle]
        B --> C{Cycle Phase}
        C -->|Proposal| D[Submit Proposal]
        C -->|Voting| E[Vote on Projects]
        C -->|Results| F[View Winners]
        C -->|Implementation| G[Track Progress]
    end

    subgraph Propose["📝 Submit Proposal"]
        D --> H[Enter Project Title]
        H --> I[Describe Project]
        I --> J[Select Category]
        J --> K[Estimate Budget]
        K --> L[Add Location]
        L --> M[Upload Images]
        M --> N[Review Proposal]
        N --> O{Submit?}
        O -->|Yes| P[Submit Proposal]
        P --> Q[Await Feasibility Review]
        Q --> R{Feasible?}
        R -->|Yes| S[Added to Ballot]
        R -->|No| T[Receive Feedback]
        O -->|No| H
    end

    subgraph Vote["🗳️ Voting Flow"]
        E --> U[View All Projects]
        U --> V[Filter by Category]
        V --> W[Read Project Details]
        W --> X[See Budget Impact]
        X --> Y{Support Project?}
        Y -->|Yes| Z[Add to Selection]
        Y -->|No| U
        Z --> AA{More Votes?}
        AA -->|Yes| U
        AA -->|No| AB[Review Selections]
        AB --> AC[Submit Votes]
        AC --> AD[Confirm with PIN]
        AD --> AE[Votes Recorded]
        AE --> AF[Show Confirmation]
    end

    subgraph Results["📊 View Results"]
        F --> AG[See Winning Projects]
        AG --> AH[View Vote Counts]
        AH --> AI[See Implementation Timeline]
        AI --> AJ[Follow Project Updates]
    end

    subgraph Ideas["💡 Idea Submission"]
        AK[Submit Idea] --> AL[Enter Idea Title]
        AL --> AM[Describe Idea]
        AM --> AN[Select Category]
        AN --> AO[Add Supporting Info]
        AO --> AP[Submit Idea]
        AP --> AQ[Community Discussion]
        AQ --> AR[Upvote/Comment]
        AR --> AS{Popular?}
        AS -->|Yes| AT[Escalate to Officials]
        AS -->|No| AU[Continue Discussion]
    end

    subgraph Consultations["📢 Public Consultations"]
        AV[View Consultations] --> AW[Active Consultations]
        AW --> AX[Select Topic]
        AX --> AY[Read Proposal]
        AY --> AZ[Submit Opinion]
        AZ --> BA[View Other Opinions]
        BA --> BB[Participate in Discussion]
    end

    subgraph Council["🏛️ Council Meetings"]
        BC[Council Meetings] --> BD[View Schedule]
        BD --> BE[Watch Live Stream]
        BE --> BF[Submit Question]
        BF --> BG[View Past Meetings]
        BG --> BH[Read Minutes]
    end

    subgraph Track["📍 Track Participation"]
        BI[My Participation] --> BJ[Proposals Submitted]
        BI --> BK[Votes Cast]
        BI --> BL[Ideas Shared]
        BI --> BM[Consultations Joined]
        BJ --> BN[View Status]
        BK --> BO[See Impact]
    end
```

## Screens Required

| Screen | Description | Status |
|--------|-------------|--------|
| Budget Dashboard | Current cycle info | ✅ Implemented |
| Proposal Form | Submit project | ✅ Implemented |
| Project List | Browse proposals | ✅ Implemented |
| Project Details | Full info + vote | ✅ Implemented |
| Voting Booth | Cast votes | ✅ Implemented |
| Results | Winners + stats | ✅ Implemented |
| Idea Submission | Submit ideas | ✅ Implemented |
| Idea Discussion | Comments + votes | ✅ Implemented |
| Consultations | Public discussions | ⚠️ Basic |
| Council Meetings | Live + archive | ⚠️ Basic |

## API Endpoints

```text
GET  /api/participation/budget/current
GET  /api/participation/budget/projects
POST /api/participation/budget/projects
GET  /api/participation/budget/projects/{id}
POST /api/participation/budget/vote
GET  /api/participation/budget/results
GET  /api/participation/ideas
POST /api/participation/ideas
GET  /api/participation/ideas/{id}
POST /api/participation/ideas/{id}/upvote
POST /api/participation/ideas/{id}/comment
GET  /api/participation/consultations
GET  /api/participation/consultations/{id}
POST /api/participation/consultations/{id}/respond
GET  /api/participation/council/meetings
GET  /api/participation/council/meetings/{id}/stream
```

## Notifications

| Event | Channel | Message |
|-------|---------|---------|
| Voting Open | Push/Email | "Voting is now open! Cast your votes by Dec 31." |
| Proposal Submitted | Push | "Your proposal has been submitted for review" |
| Proposal Approved | Push | "Your proposal is on the ballot! Share it!" |
| Vote Recorded | Push | "Your votes have been recorded. Thank you!" |
| Results Published | Push/Email | "Results are in! See the winning projects." |
| Idea Popular | Push | "Your idea is trending! 50+ upvotes" |
| Consultation Open | Push | "New consultation: City Center Redesign" |
| Council Meeting | Push | "Council meeting starts in 1 hour. Watch live!" |
