# 2.12 Electronic Payments Gateway - Workflow Diagram

## Service Description

Unified payment platform for all municipal fees, taxes, and services.

## User Flow Diagram

```mermaid
flowchart TD
    subgraph Dashboard["💳 Payment Dashboard"]
        A[Open Payments] --> B[View Outstanding]
        B --> C[See Payment Categories]
        C --> D{Category?}
        D -->|Property Tax| E[View TAP Bills]
        D -->|Parking Fines| F[View Fines]
        D -->|Permits| G[View Permit Fees]
        D -->|Services| H[View Service Fees]
        D -->|Utilities| I[View Utility Bills]
    end

    subgraph PayBill["💰 Pay Bill"]
        E --> J[Select Bill]
        F --> J
        G --> J
        H --> J
        I --> J
        J --> K[View Bill Details]
        K --> L[See Amount Due]
        L --> M{Pay Now?}
        M -->|Yes| N[Select Payment Method]
        M -->|No| O[Set Reminder]
        N --> P{Method?}
        P -->|Card| Q[Enter/Select Card]
        P -->|Bank| R[Bank Transfer]
        P -->|IRIS| S[IRIS Payment]
        Q --> T[Confirm Payment]
        R --> T
        S --> T
        T --> U[Process Payment]
        U --> V{Success?}
        V -->|Yes| W[Show Success]
        W --> X[Generate Receipt]
        X --> Y[Email Receipt]
        V -->|No| Z[Show Error]
        Z --> AA[Retry or Contact Support]
    end

    subgraph Cards["💳 Manage Cards"]
        AB[Payment Methods] --> AC[View Saved Cards]
        AC --> AD{Action?}
        AD -->|Add| AE[Add New Card]
        AE --> AF[Enter Card Details]
        AF --> AG[Verify Card]
        AG --> AH[Save Card]
        AD -->|Remove| AI[Delete Card]
        AD -->|Default| AJ[Set as Default]
    end

    subgraph History["📋 Payment History"]
        AK[View History] --> AL[See All Payments]
        AL --> AM[Filter by Type/Date]
        AM --> AN[Select Payment]
        AN --> AO[View Details]
        AO --> AP[Download Receipt]
    end

    subgraph AutoPay["🔄 Auto-Pay"]
        AQ[Setup Auto-Pay] --> AR[Select Bill Type]
        AR --> AS[Choose Card]
        AS --> AT[Set Limits]
        AT --> AU[Confirm Setup]
        AU --> AV[Auto-Pay Active]
    end

    subgraph Installments["📅 Installments"]
        K --> AW{Large Amount?}
        AW -->|Yes| AX[Offer Installments]
        AX --> AY[Select Plan]
        AY --> AZ[View Schedule]
        AZ --> BA[Confirm Plan]
        BA --> BB[First Payment]
    end
```

## Screens Required

| Screen | Description | Status |
|--------|-------------|--------|
| Payment Dashboard | Outstanding bills | ✅ Implemented |
| Bill Details | Amount + breakdown | ✅ Implemented |
| Payment Form | Method selection | ✅ Implemented |
| Card Entry | Add new card | ✅ Implemented |
| Payment Success | Confirmation | ✅ Implemented |
| Payment History | Past payments | ✅ Implemented |
| Receipt View | Downloadable PDF | ✅ Implemented |
| Saved Cards | Manage cards | ✅ Implemented |

## API Endpoints

```text
GET  /api/payments/outstanding
GET  /api/payments/bills/{id}
POST /api/payments/process
GET  /api/payments/history
GET  /api/payments/receipts/{id}
GET  /api/payments/methods
POST /api/payments/methods
DELETE /api/payments/methods/{id}
PUT  /api/payments/methods/{id}/default
POST /api/payments/autopay
GET  /api/payments/installments/{billId}
POST /api/payments/installments
```

## Notifications

| Event | Channel | Message |
|-------|---------|---------|
| Payment Success | Push/Email | "Payment of €125.00 successful. Receipt sent." |
| Payment Failed | Push | "Payment failed. Please try again or use different card." |
| Bill Due | Push | "Property tax bill due in 7 days: €450.00" |
| Auto-Pay Processed | Push/Email | "Auto-pay: €35.00 paid for parking permit" |
| Installment Due | Push | "Installment payment due tomorrow: €75.00" |
| New Bill | Push | "New bill available: Parking fine €40.00" |
