# 2.5 Stray Animal Management - Workflow Diagram

## Service Description

Comprehensive stray animal registry with adoption, reporting, and vet services.

## User Flow Diagram

```mermaid
flowchart TD
    subgraph Browse["🐕 Browse Animals"]
        A[Open Stray Animals] --> B[View Available Animals]
        B --> C[Filter by Species/Age]
        C --> D[View Animal Profile]
        D --> E{Action?}
        E -->|Adopt| F[Start Adoption]
        E -->|Foster| G[Apply to Foster]
        E -->|Sponsor| H[Sponsor Animal]
    end

    subgraph Adoption["❤️ Adoption Flow"]
        F --> I[Fill Application Form]
        I --> J[Upload ID Document]
        J --> K[Describe Living Situation]
        K --> L[Submit Application]
        L --> M[Application Review]
        M --> N{Approved?}
        N -->|Yes| O[Schedule Meet & Greet]
        N -->|No| P[Receive Feedback]
        O --> Q[Meet Animal]
        Q --> R{Proceed?}
        R -->|Yes| S[Sign Adoption Contract]
        S --> T[Pay Adoption Fee]
        T --> U[Take Animal Home]
        U --> V[Receive Care Guide]
        R -->|No| B
    end

    subgraph Report["📢 Report Stray"]
        W[Tap Report Button] --> X[Select Report Type]
        X --> Y{Type?}
        Y -->|Stray Sighting| Z[Add Location]
        Y -->|Injured Animal| AA[Mark Urgent]
        Y -->|Animal Abuse| AB[Confidential Report]
        Z --> AC[Add Photo]
        AA --> AC
        AB --> AC
        AC --> AD[Add Description]
        AD --> AE[Submit Report]
        AE --> AF[Receive Reference Number]
        AF --> AG[Track Report Status]
    end

    subgraph LostFound["🔍 Lost & Found"]
        AH[Lost & Found Section] --> AI{Action?}
        AI -->|Report Lost| AJ[Post Lost Pet]
        AI -->|Report Found| AK[Post Found Pet]
        AJ --> AL[Add Pet Details]
        AK --> AL
        AL --> AM[Add Last Seen Location]
        AM --> AN[Upload Photos]
        AN --> AO[Publish Alert]
        AO --> AP[Notify Nearby Users]
    end

    subgraph Vet["🏥 Vet Services"]
        AQ[Municipal Vet] --> AR[View Services]
        AR --> AS[Book Appointment]
        AS --> AT[Select Service Type]
        AT --> AU[Choose Date/Time]
        AU --> AV[Confirm Booking]
    end
```

## Screens Required

| Screen | Description | Status |
|--------|-------------|--------|
| Animal List | Browse adoptable animals | ✅ Implemented |
| Animal Profile | Detailed animal info | ✅ Implemented |
| Adoption Form | Multi-step application | ✅ Implemented |
| Report Stray | Location + photo report | ✅ Implemented |
| Lost & Found | Post/browse lost pets | ⚠️ Basic |
| Vet Booking | Schedule vet visit | ⚠️ Basic |
| My Applications | Track adoption status | ✅ Implemented |

## API Endpoints

```text
GET  /api/animals?species={s}&status={status}
GET  /api/animals/{id}
POST /api/animals/adoption/apply
GET  /api/animals/adoption/applications
POST /api/animals/reports
GET  /api/animals/reports/{id}
POST /api/animals/lost-found
GET  /api/animals/lost-found?type={lost|found}
POST /api/animals/vet/appointments
GET  /api/animals/vet/services
```

## Notifications

| Event | Channel | Message |
|-------|---------|---------|
| Application Received | Push | "Your adoption application has been received" |
| Application Approved | Push/SMS | "Great news! Your application for Max is approved" |
| Meet & Greet Scheduled | Push | "Meet & Greet scheduled for Dec 10 at 2 PM" |
| Report Update | Push | "Update on your report: Animal has been rescued" |
| Lost Pet Match | Push | "A found pet matching your description was reported" |
| Vet Reminder | Push | "Reminder: Vet appointment tomorrow at 10 AM" |
