# 2.9 Urban Planning & Permits - Workflow Diagram

## Service Description

Digital permit applications with GIS integration and status tracking.

## User Flow Diagram

```mermaid
flowchart TD
    subgraph Apply["📝 Apply for Permit"]
        A[Open Urban Planning] --> B[Select Permit Type]
        B --> C{Type?}
        C -->|Building| D[Building Permit Form]
        C -->|Renovation| E[Renovation Form]
        C -->|Demolition| F[Demolition Form]
        C -->|Land Use| G[Certificate Form]
        D --> H[Step 1: Property Info]
        E --> H
        F --> H
        G --> H
        H --> I[Enter Address/KAEK]
        I --> J[Step 2: Applicant Info]
        J --> K[Step 3: Project Details]
        K --> L[Step 4: Upload Documents]
        L --> M[Upload Required Files]
        M --> N[Step 5: Review]
        N --> O{All Complete?}
        O -->|Yes| P[Calculate Fee]
        P --> Q[Pay Application Fee]
        Q --> R[Submit Application]
        R --> S[Show Confirmation]
        O -->|No| T[Show Missing Items]
        T --> L
    end

    subgraph Track["📍 Track Application"]
        U[View My Permits] --> V[See Application List]
        V --> W[Select Application]
        W --> X[View Status]
        X --> Y{Status?}
        Y -->|Under Review| Z[See Timeline]
        Y -->|Revision Required| AA[View Comments]
        AA --> AB[Submit Revision]
        AB --> X
        Y -->|Approved| AC[Download Permit]
        Y -->|Rejected| AD[View Reasons]
        AD --> AE[Appeal or Reapply]
    end

    subgraph Map["🗺️ Zoning Map"]
        AF[View Zoning Map] --> AG[Search Address]
        AG --> AH[See Zoning Info]
        AH --> AI[View Allowed Uses]
        AI --> AJ[Check Building Limits]
        AJ --> AK[Download Certificate]
    end

    subgraph Inspection["🔍 Inspection"]
        X --> AL{Inspection Needed?}
        AL -->|Yes| AM[Schedule Inspection]
        AM --> AN[Inspector Visits]
        AN --> AO{Pass?}
        AO -->|Yes| AP[Proceed to Approval]
        AO -->|No| AQ[Receive Deficiency List]
        AQ --> AR[Fix Issues]
        AR --> AM
        AP --> AC
    end
```

## Screens Required

| Screen | Description | Status |
|--------|-------------|--------|
| Permit Types | Selection grid | ✅ Implemented |
| Application Form | Multi-step wizard | ✅ Implemented |
| Document Upload | File attachments | ✅ Implemented |
| My Permits | Application list | ✅ Implemented |
| Permit Details | Status + timeline | ✅ Implemented |
| Zoning Map | Interactive GIS | ✅ Implemented |
| Revision Form | Submit corrections | ✅ Implemented |

## API Endpoints

```text
GET  /api/planning/permit-types
POST /api/planning/applications
GET  /api/planning/applications
GET  /api/planning/applications/{id}
PUT  /api/planning/applications/{id}
POST /api/planning/applications/{id}/documents
GET  /api/planning/applications/{id}/timeline
POST /api/planning/applications/{id}/revision
GET  /api/planning/zoning?lat={lat}&lng={lng}
GET  /api/planning/zoning/certificate?kaek={kaek}
POST /api/planning/applications/{id}/pay
```

## Notifications

| Event | Channel | Message |
|-------|---------|---------|
| Application Received | Push/Email | "Application PRM-2024-001 received" |
| Under Review | Push | "Your application is now under review" |
| Revision Required | Push/Email | "Action needed: Please submit revised documents" |
| Inspection Scheduled | Push/SMS | "Inspection scheduled for Dec 15 at 10 AM" |
| Application Approved | Push/Email | "🎉 Your permit has been approved!" |
| Application Rejected | Email | "Application rejected. See details for reasons." |
