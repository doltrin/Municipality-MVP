# 2.13 Social Services Suite - Workflow Diagram

## Service Description

Comprehensive social welfare platform with case management and benefits tracking.

## User Flow Diagram

```mermaid
flowchart TD
    subgraph Browse["🏠 Browse Services"]
        A[Open Social Services] --> B[View Available Programs]
        B --> C{Program Type}
        C -->|Food Assistance| D[Social Grocery]
        C -->|Medical| E[Social Pharmacy]
        C -->|Home Care| F[Home Help]
        C -->|Elderly| G[KAPI Day Centers]
        C -->|Mental Health| H[Psychological Support]
        C -->|Legal| I[Free Legal Aid]
    end

    subgraph Apply["📝 Apply for Service"]
        D --> J[View Requirements]
        E --> J
        F --> J
        G --> J
        H --> J
        I --> J
        J --> K[Check Eligibility]
        K --> L{Eligible?}
        L -->|Yes| M[Start Application]
        L -->|No| N[Show Alternatives]
        M --> O[Step 1: Personal Info]
        O --> P[Pre-fill from Profile]
        P --> Q[Step 2: Family Info]
        Q --> R[Step 3: Income Declaration]
        R --> S[Step 4: Upload Documents]
        S --> T[Upload Required Files]
        T --> U[Step 5: Review]
        U --> V{Complete?}
        V -->|Yes| W[Submit Application]
        W --> X[Show Confirmation]
        V -->|No| Y[Show Missing Items]
    end

    subgraph Track["📍 Track Applications"]
        Z[View My Applications] --> AA[See Application List]
        AA --> AB[Select Application]
        AB --> AC[View Status]
        AC --> AD{Status?}
        AD -->|Pending| AE[Awaiting Review]
        AD -->|Under Review| AF[Case Worker Assigned]
        AD -->|Approved| AG[View Benefits]
        AD -->|Rejected| AH[View Reasons]
        AH --> AI[Appeal Decision]
    end

    subgraph Benefits["🎁 Active Benefits"]
        AG --> AJ[View Benefit Card]
        AJ --> AK[See Entitlements]
        AK --> AL{Benefit Type}
        AL -->|Grocery| AM[View Monthly Allowance]
        AL -->|Pharmacy| AN[View Medication List]
        AL -->|Home Help| AO[View Schedule]
        AM --> AP[Find Pickup Location]
        AN --> AQ[Find Pharmacy]
        AO --> AR[View Caregiver Info]
    end

    subgraph Appointments["📅 Appointments"]
        AS[View Appointments] --> AT[See Scheduled Visits]
        AT --> AU[Home Assessment]
        AT --> AV[Counseling Session]
        AT --> AW[Case Review]
        AU --> AX[Confirm/Reschedule]
        AV --> AX
        AW --> AX
    end

    subgraph Emergency["🆘 Emergency"]
        AY[Emergency Helpline] --> AZ[Call 1595]
        AZ --> BA[24/7 Support]
        BA --> BB[Immediate Assistance]
    end
```

## Screens Required

| Screen | Description | Status |
|--------|-------------|--------|
| Services List | Available programs | ✅ Implemented |
| Service Details | Requirements + info | ✅ Implemented |
| Eligibility Check | Income calculator | ✅ Implemented |
| Application Form | Multi-step wizard | ✅ Implemented |
| Document Upload | Required files | ✅ Implemented |
| My Applications | Status tracking | ✅ Implemented |
| Active Benefits | Current entitlements | ✅ Implemented |
| Appointments | Scheduled visits | ✅ Implemented |
| Emergency Contact | Quick dial | ✅ Implemented |

## API Endpoints

```text
GET  /api/social/services
GET  /api/social/services/{id}
POST /api/social/eligibility/check
POST /api/social/applications
GET  /api/social/applications
GET  /api/social/applications/{id}
POST /api/social/applications/{id}/documents
GET  /api/social/benefits
GET  /api/social/benefits/{id}
GET  /api/social/appointments
POST /api/social/appointments/{id}/reschedule
POST /api/social/applications/{id}/appeal
```

## Notifications

| Event | Channel | Message |
|-------|---------|---------|
| Application Received | Push/SMS | "Application received. Reference: SOC-2024-001" |
| Case Worker Assigned | Push | "Maria P. is your case worker. Contact: 27210-xxxxx" |
| Document Needed | Push/SMS | "Please upload income certificate within 5 days" |
| Application Approved | Push/SMS | "🎉 Your application for Social Grocery approved!" |
| Benefit Ready | Push | "Your monthly grocery allowance is ready for pickup" |
| Appointment Reminder | Push/SMS | "Reminder: Home assessment tomorrow at 10 AM" |
| Renewal Due | Push | "Your benefits expire in 30 days. Renew now." |
