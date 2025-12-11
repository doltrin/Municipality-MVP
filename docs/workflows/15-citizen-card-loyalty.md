# 2.15 Citizen Card & Loyalty Program - Workflow Diagram

## Service Description

Digital citizen card with loyalty points, benefits, and municipal discounts.

## User Flow Diagram

```mermaid
flowchart TD
    subgraph Enroll["📝 Enrollment"]
        A[Open Digital Wallet] --> B{Has Citizen Card?}
        B -->|No| C[Apply for Card]
        C --> D[Verify Identity]
        D --> E[Link to TaxisNet]
        E --> F[Confirm Address]
        F --> G[Accept Terms]
        G --> H[Generate Digital Card]
        H --> I[Card Ready]
        B -->|Yes| J[View Card]
    end

    subgraph Card["💳 Digital Card"]
        J --> K[View Card Details]
        K --> L[Show QR Code]
        L --> M[Use at Partners]
        K --> N[View Points Balance]
        N --> O[See Points History]
        K --> P[View Benefits]
    end

    subgraph Earn["⭐ Earn Points"]
        Q[Earn Points] --> R{Activity}
        R -->|Pay Bills| S[+10 pts per €10]
        R -->|Recycle| T[+50 pts per kg]
        R -->|Use Transport| U[+5 pts per trip]
        R -->|Volunteer| V[+100 pts per hour]
        R -->|Report Issues| W[+20 pts per report]
        S --> X[Points Added]
        T --> X
        U --> X
        V --> X
        W --> X
        X --> Y[Show Toast Notification]
    end

    subgraph Redeem["🎁 Redeem Benefits"]
        P --> Z[Browse Benefits]
        Z --> AA{Benefit Type}
        AA -->|Parking| AB[Free Parking Hours]
        AA -->|Transport| AC[Bus Tickets]
        AA -->|Culture| AD[Museum Entry]
        AA -->|Sports| AE[Gym Access]
        AA -->|Shopping| AF[Partner Discounts]
        AB --> AG[Select Benefit]
        AC --> AG
        AD --> AG
        AE --> AG
        AF --> AG
        AG --> AH[Check Points Required]
        AH --> AI{Enough Points?}
        AI -->|Yes| AJ[Redeem Benefit]
        AJ --> AK[Generate Voucher]
        AK --> AL[Show QR Code]
        AI -->|No| AM[Show Points Needed]
    end

    subgraph Use["✅ Use Benefit"]
        AL --> AN[Go to Location]
        AN --> AO[Show QR to Staff]
        AO --> AP[Scan & Validate]
        AP --> AQ[Benefit Applied]
        AQ --> AR[Mark as Used]
    end

    subgraph Levels["🏆 Loyalty Levels"]
        N --> AS{Points Total}
        AS -->|0-499| AT[Bronze Level]
        AS -->|500-1999| AU[Silver Level]
        AS -->|2000-4999| AV[Gold Level]
        AS -->|5000+| AW[Platinum Level]
        AT --> AX[Basic Benefits]
        AU --> AY[+10% Bonus Points]
        AV --> AZ[+20% Bonus + Priority]
        AW --> BA[+30% Bonus + VIP Access]
    end

    subgraph History["📋 Activity History"]
        BB[View History] --> BC[Points Earned]
        BB --> BD[Points Redeemed]
        BB --> BE[Benefits Used]
        BC --> BF[Filter by Type/Date]
        BD --> BF
        BE --> BF
    end
```

## Screens Required

| Screen | Description | Status |
|--------|-------------|--------|
| Digital Card | Card display + QR | ✅ Implemented |
| Points Dashboard | Balance + history | ✅ Implemented |
| Benefits Catalog | Available rewards | ✅ Implemented |
| Benefit Details | Requirements + redeem | ✅ Implemented |
| Voucher Display | QR for redemption | ✅ Implemented |
| Activity History | Points transactions | ✅ Implemented |
| Level Progress | Tier status | ✅ Implemented |
| Partner Locations | Where to use | ⚠️ Basic |

## API Endpoints

```text
POST /api/citizen-card/enroll
GET  /api/citizen-card
GET  /api/citizen-card/qr
GET  /api/citizen-card/points
GET  /api/citizen-card/points/history
GET  /api/citizen-card/benefits
GET  /api/citizen-card/benefits/{id}
POST /api/citizen-card/benefits/{id}/redeem
GET  /api/citizen-card/vouchers
GET  /api/citizen-card/vouchers/{id}
POST /api/citizen-card/vouchers/{id}/validate
GET  /api/citizen-card/level
GET  /api/citizen-card/partners
```

## Notifications

| Event | Channel | Message |
|-------|---------|---------|
| Card Activated | Push | "Your Citizen Card is ready! Start earning points." |
| Points Earned | Push | "+50 points for recycling! Balance: 1,250 pts" |
| Level Up | Push | "🎉 Congratulations! You've reached Gold Level!" |
| Benefit Redeemed | Push | "Free parking voucher added to your wallet" |
| Voucher Expiring | Push | "Your museum voucher expires in 3 days" |
| New Benefit | Push | "New benefit available: 20% off at local cafes" |
| Points Expiring | Push | "200 points expire on Dec 31. Redeem now!" |
