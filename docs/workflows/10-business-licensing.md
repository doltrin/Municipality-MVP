# 2.10 Business Licensing - Workflow Diagram

## Service Description

Digital licensing for outdoor seating, music permits, and trade licenses.

## User Flow Diagram

```mermaid
flowchart TD
    subgraph Apply["📝 Apply for License"]
        A[Open Business Licensing] --> B[View License Types]
        B --> C{Select Type}
        C -->|Outdoor Seating| D[Seating Permit Form]
        C -->|Music License| E[Music Permit Form]
        C -->|Food Service| F[Health License Form]
        C -->|Advertising| G[Sign Permit Form]
        C -->|Market Stall| H[Market License Form]
        
        D --> I[Step 1: Business Info]
        E --> I
        F --> I
        G --> I
        H --> I
        
        I --> J[Enter Business Name/AFM]
        J --> K[Step 2: License Details]
        K --> L{Type-Specific Info}
        L -->|Seating| M[Tables/Chairs/Area]
        L -->|Music| N[Music Type/Hours]
        L -->|Food| O[Menu/Capacity]
        L -->|Sign| P[Dimensions/Location]
        L -->|Market| Q[Products/Days]
        
        M --> R[Step 3: Upload Documents]
        N --> R
        O --> R
        P --> R
        Q --> R
        
        R --> S[Step 4: Review & Pay]
        S --> T[Calculate Fee]
        T --> U[Process Payment]
        U --> V[Submit Application]
        V --> W[Show Confirmation]
    end

    subgraph MyLicenses["📋 My Licenses"]
        X[View My Licenses] --> Y[See Active Licenses]
        Y --> Z[Select License]
        Z --> AA{Status?}
        AA -->|Active| AB[View Details]
        AB --> AC[Download PDF]
        AA -->|Pending| AD[Track Progress]
        AA -->|Expiring| AE[Renew License]
    end

    subgraph Renew["🔄 Renewal Flow"]
        AE --> AF[Pre-fill from Existing]
        AF --> AG[Update if Needed]
        AG --> AH[Upload New Documents]
        AH --> AI[Pay Renewal Fee]
        AI --> AJ[Submit Renewal]
        AJ --> AK[Await Approval]
    end

    subgraph Amend["✏️ Amendment Flow"]
        AB --> AL[Request Amendment]
        AL --> AM[Describe Changes]
        AM --> AN[Upload Supporting Docs]
        AN --> AO[Submit Amendment]
        AO --> AP[Review Process]
    end

    subgraph Compliance["✅ Compliance"]
        AQ[Inspection Scheduled] --> AR[Inspector Visits]
        AR --> AS{Compliant?}
        AS -->|Yes| AT[License Confirmed]
        AS -->|No| AU[Receive Violations]
        AU --> AV[Fix Issues]
        AV --> AW[Request Re-inspection]
        AW --> AR
    end
```

## Screens Required

| Screen | Description | Status |
|--------|-------------|--------|
| License Types | Selection grid | ✅ Implemented |
| Application Form | Multi-step wizard | ✅ Implemented |
| Business Info | Company details | ✅ Implemented |
| License Details | Type-specific fields | ✅ Implemented |
| Document Upload | Required files | ✅ Implemented |
| My Licenses | Active/pending list | ✅ Implemented |
| License Details | Full info + PDF | ✅ Implemented |
| Renewal Form | Pre-filled renewal | ✅ Implemented |

## API Endpoints

```text
GET  /api/licensing/types
POST /api/licensing/applications
GET  /api/licensing/applications
GET  /api/licensing/applications/{id}
POST /api/licensing/applications/{id}/documents
POST /api/licensing/applications/{id}/pay
GET  /api/licensing/licenses
GET  /api/licensing/licenses/{id}
GET  /api/licensing/licenses/{id}/pdf
POST /api/licensing/licenses/{id}/renew
POST /api/licensing/licenses/{id}/amend
GET  /api/licensing/licenses/expiring
```

## Notifications

| Event | Channel | Message |
|-------|---------|---------|
| Application Received | Push/Email | "License application LIC-2024-001 received" |
| Under Review | Push | "Your application is being reviewed" |
| Approved | Push/Email | "🎉 Your license has been approved!" |
| Expiring Soon | Push/Email | "Your license expires in 30 days. Renew now!" |
| Renewal Reminder | Push | "License renewal due in 7 days" |
| Inspection Scheduled | Push/SMS | "Compliance inspection on Dec 20 at 11 AM" |
