# 2.6 Smart Parking - Workflow Diagram

## Service Description

Real-time parking availability with mobile payment and session management.

## User Flow Diagram

```mermaid
flowchart TD
    subgraph Find["🔍 Find Parking"]
        A[Open Smart Parking] --> B[View Map]
        B --> C[See Real-time Availability]
        C --> D[Filter by Type]
        D --> E[Select Parking Zone]
        E --> F[View Zone Details]
        F --> G{Has Spots?}
        G -->|Yes| H[Navigate to Zone]
        G -->|No| I[Show Alternatives]
        I --> E
    end

    subgraph Start["🚗 Start Session"]
        H --> J[Arrive at Spot]
        J --> K[Tap Park Here]
        K --> L[Enter License Plate]
        L --> M[Select Duration]
        M --> N[Choose Payment Method]
        N --> O[Review Cost]
        O --> P{Confirm?}
        P -->|Yes| Q[Process Payment]
        Q --> R[Session Started]
        R --> S[Show Success Toast]
        S --> T[Display Timer]
        P -->|No| M
    end

    subgraph Active["⏱️ Active Session"]
        T --> U[View Remaining Time]
        U --> V{Action?}
        V -->|Extend| W[Select Extra Time]
        W --> X[Pay for Extension]
        X --> Y[Time Extended]
        Y --> U
        V -->|End Early| Z[End Session]
        Z --> AA[Calculate Refund]
        AA --> AB[Session Ended]
        V -->|Navigate| AC[Get Directions Back]
    end

    subgraph Expiry["⚠️ Session Expiry"]
        U --> AD{Time Low?}
        AD -->|< 10 min| AE[Send Warning Push]
        AE --> AF{Extend?}
        AF -->|Yes| W
        AF -->|No| AG[Session Expires]
        AG --> AH[Risk of Fine]
    end

    subgraph History["📋 History"]
        AI[View History] --> AJ[See Past Sessions]
        AJ --> AK[Download Receipts]
        AK --> AL[View Statistics]
    end
```

## Screens Required

| Screen | Description | Status |
|--------|-------------|--------|
| Parking Map | Real-time availability | ✅ Implemented |
| Zone Details | Spots, price, features | ✅ Implemented |
| Start Session | License + duration | ✅ Implemented |
| Payment | Card selection + confirm | ✅ Implemented |
| Active Session | Timer + actions | ✅ Implemented |
| Extend Time | Add more time | ✅ Implemented |
| Session History | Past sessions | ⚠️ Basic |
| Navigation | Directions to spot | ✅ Via External |

## API Endpoints

```text
GET  /api/parking/zones?lat={lat}&lng={lng}&radius={m}
GET  /api/parking/zones/{id}
GET  /api/parking/zones/{id}/availability
POST /api/parking/sessions
GET  /api/parking/sessions/active
PUT  /api/parking/sessions/{id}/extend
DELETE /api/parking/sessions/{id}
GET  /api/parking/sessions/history
GET  /api/parking/sessions/{id}/receipt
```

## Notifications

| Event | Channel | Message |
|-------|---------|---------|
| Session Started | Push | "Parking session started. Expires at 14:30" |
| 10 Min Warning | Push | "Your parking expires in 10 minutes" |
| 5 Min Warning | Push | "⚠️ 5 minutes left! Extend now to avoid a fine" |
| Session Expired | Push | "Your parking session has expired" |
| Session Extended | Push | "Session extended until 16:00" |
| Payment Receipt | Email | "Receipt for parking session €3.00" |
