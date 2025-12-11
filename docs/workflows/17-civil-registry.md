# 2.17 Civil Registry Services - Workflow Diagram

## Service Description

Digital certificate requests with e-signature and electronic delivery.

## User Flow Diagram

```mermaid
flowchart TD
    subgraph Browse["📋 Browse Certificates"]
        A[Open Civil Registry] --> B[View Certificate Types]
        B --> C{Certificate Type}
        C -->|Birth| D[Birth Certificate]
        C -->|Marriage| E[Marriage Certificate]
        C -->|Death| F[Death Certificate]
        C -->|Family| G[Family Status]
        C -->|Residence| H[Residence Certificate]
        C -->|Citizenship| I[Citizenship Certificate]
        C -->|Name Change| J[Name Change Application]
    end

    subgraph Request["📝 Request Certificate"]
        D --> K[View Requirements]
        E --> K
        F --> K
        G --> K
        H --> K
        I --> K
        J --> K
        K --> L[Start Request]
        L --> M[Verify Identity]
        M --> N{Verification Method}
        N -->|TaxisNet| O[Login via TaxisNet]
        N -->|eGov| P[Login via gov.gr]
        N -->|In Person| Q[Schedule Appointment]
        O --> R[Identity Confirmed]
        P --> R
        R --> S[Enter Request Details]
        S --> T{Certificate For}
        T -->|Self| U[Auto-fill from Profile]
        T -->|Family Member| V[Enter Family Details]
        T -->|Deceased| W[Enter Deceased Info]
        U --> X[Select Delivery Method]
        V --> X
        W --> X
    end

    subgraph Delivery["📬 Delivery Options"]
        X --> Y{Delivery Method}
        Y -->|Digital| Z[E-signed PDF]
        Y -->|Email| AA[Email Delivery]
        Y -->|Postal| AB[Mail to Address]
        Y -->|Pickup| AC[Collect in Person]
        Z --> AD[Instant Delivery]
        AA --> AE[1-2 Business Days]
        AB --> AF[5-7 Business Days]
        AC --> AG[Schedule Pickup]
    end

    subgraph Payment["💳 Payment"]
        AD --> AH{Fee Required?}
        AE --> AH
        AF --> AH
        AG --> AH
        AH -->|Yes| AI[Show Fee Amount]
        AI --> AJ[Select Payment Method]
        AJ --> AK[Process Payment]
        AK --> AL[Payment Confirmed]
        AH -->|No| AL
        AL --> AM[Submit Request]
    end

    subgraph Track["📍 Track Request"]
        AM --> AN[Show Reference Number]
        AN --> AO[View My Requests]
        AO --> AP[Select Request]
        AP --> AQ[View Status]
        AQ --> AR{Status}
        AR -->|Processing| AS[Estimated Time]
        AR -->|Ready| AT[Download/Collect]
        AR -->|Delivered| AU[View Certificate]
    end

    subgraph Download["📥 Download Certificate"]
        AT --> AV{Digital?}
        AV -->|Yes| AW[Download PDF]
        AW --> AX[Verify e-Signature]
        AX --> AY[Certificate Valid]
        AV -->|No| AZ[Pickup Instructions]
    end

    subgraph History["📚 Certificate History"]
        BA[View History] --> BB[Past Certificates]
        BB --> BC[Re-download if Digital]
        BB --> BD[Request Copy]
    end
```

## Screens Required

| Screen | Description | Status |
|--------|-------------|--------|
| Certificate Types | Selection grid | ✅ Implemented |
| Certificate Details | Requirements + fees | ✅ Implemented |
| Identity Verification | TaxisNet/eGov login | ✅ Implemented |
| Request Form | Details entry | ✅ Implemented |
| Delivery Selection | Method choice | ✅ Implemented |
| Payment | Fee processing | ✅ Implemented |
| My Requests | Status tracking | ✅ Implemented |
| Certificate View | Download/verify | ✅ Implemented |

## API Endpoints

```text
GET  /api/registry/certificate-types
GET  /api/registry/certificate-types/{id}
POST /api/registry/verify-identity
POST /api/registry/requests
GET  /api/registry/requests
GET  /api/registry/requests/{id}
GET  /api/registry/requests/{id}/status
POST /api/registry/requests/{id}/pay
GET  /api/registry/requests/{id}/download
GET  /api/registry/requests/{id}/verify
GET  /api/registry/history
```

## Notifications

| Event | Channel | Message |
|-------|---------|---------|
| Request Received | Push/Email | "Certificate request REG-2024-001 received" |
| Processing | Push | "Your certificate is being processed" |
| Ready for Download | Push/Email | "Your Birth Certificate is ready! Download now." |
| Ready for Pickup | Push/SMS | "Certificate ready for pickup at City Hall" |
| Shipped | Push/Email | "Your certificate has been mailed. Track: GR123456" |
| Delivered | Push | "Certificate delivered successfully" |
| Verification | Email | "Certificate verification code: ABC123" |
