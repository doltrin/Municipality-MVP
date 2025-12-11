# 2.2 Pay-As-You-Throw (PAYT) - Workflow Diagram

## Service Description

Volume/weight-based waste billing system with RFID identification and citizen portal.

## User Flow Diagram

```mermaid
flowchart TD
    subgraph Registration["📝 Registration Flow"]
        A[Open PAYT Page] --> B{Has RFID Card?}
        B -->|No| C[Apply for Card]
        C --> D[Fill Application Form]
        D --> E[Upload ID Document]
        E --> F[Submit Application]
        F --> G[Receive Confirmation]
        G --> H[Wait for Card Delivery]
        H --> I[Activate Card]
        B -->|Yes| J[View Dashboard]
    end

    subgraph Usage["🗑️ Daily Usage"]
        J --> K[Go to Smart Bin]
        K --> L[Tap RFID Card]
        L --> M[Bin Unlocks]
        M --> N[Deposit Waste]
        N --> O[Bin Weighs Waste]
        O --> P[Record Transaction]
        P --> Q[Display Weight/Cost]
    end

    subgraph Billing["💳 Billing Flow"]
        R[Monthly Billing Cycle] --> S[Calculate Total Usage]
        S --> T[Generate Invoice]
        T --> U[Send Notification]
        U --> V[Citizen Views Bill]
        V --> W{Pay Now?}
        W -->|Yes| X[Select Payment Method]
        X --> Y[Process Payment]
        Y --> Z[Receive Receipt]
        W -->|No| AA[Set Reminder]
    end

    subgraph Analytics["📊 Usage Analytics"]
        J --> AB[View Usage History]
        AB --> AC[See Monthly Trends]
        AC --> AD[Compare with Average]
        AD --> AE[Get Reduction Tips]
        AE --> AF[Set Reduction Goals]
    end

    P --> R
    I --> J
```

## Screens Required

| Screen | Description | Status |
|--------|-------------|--------|
| PAYT Dashboard | Overview with usage stats | ✅ Implemented |
| Card Registration | Apply for RFID card | ✅ Implemented |
| Usage History | Monthly/weekly breakdown | ✅ Implemented |
| Billing | View and pay invoices | ✅ Implemented |
| Analytics | Usage trends and tips | ✅ Implemented |
| Card Activation | Activate new card | ✅ Implemented |

## API Endpoints

```text
POST /api/payt/register
GET  /api/payt/card/{cardId}/status
POST /api/payt/card/{cardId}/activate
GET  /api/payt/usage?from={date}&to={date}
GET  /api/payt/billing/current
GET  /api/payt/billing/history
POST /api/payt/billing/{invoiceId}/pay
GET  /api/payt/analytics/trends
```

## Notifications

| Event | Channel | Message |
|-------|---------|---------|
| Card Ready | Push/SMS | "Your PAYT card is ready for pickup" |
| Monthly Bill | Push/Email | "Your PAYT bill for November: €12.50" |
| Payment Due | Push/SMS | "Payment due in 3 days" |
| Payment Received | Push | "Payment of €12.50 received. Thank you!" |
| Usage Alert | Push | "You've used 80% of your monthly average" |
