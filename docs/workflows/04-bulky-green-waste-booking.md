# 2.4 Bulky/Green Waste Booking - Workflow Diagram

## Service Description

Online booking system for collection of large items and garden waste.

## User Flow Diagram

```mermaid
flowchart TD
    subgraph Booking["📅 Booking Flow"]
        A[Open Bulky Waste] --> B[Select Waste Type]
        B --> C{Type?}
        C -->|Bulky Items| D[Select Item Categories]
        C -->|Green Waste| E[Estimate Volume]
        D --> F[Enter Item Details]
        E --> F
        F --> G[Add Photos Optional]
        G --> H[Set Pickup Address]
        H --> I[Select Date Slot]
        I --> J[Review Booking]
        J --> K{Confirm?}
        K -->|Yes| L[Submit Booking]
        K -->|No| F
        L --> M[Show Confirmation]
        M --> N[Receive SMS Confirmation]
    end

    subgraph Track["📍 Track Booking"]
        O[View My Bookings] --> P[See Booking Status]
        P --> Q{Status?}
        Q -->|Scheduled| R[View Date/Time]
        Q -->|In Progress| S[Track Vehicle]
        Q -->|Completed| T[Rate Service]
        R --> U[Get Reminder Notification]
    end

    subgraph Modify["✏️ Modify Booking"]
        P --> V{Action?}
        V -->|Reschedule| W[Select New Date]
        W --> X[Confirm Change]
        V -->|Cancel| Y[Confirm Cancellation]
        Y --> Z[Booking Cancelled]
        V -->|Add Items| AA[Update Item List]
    end

    subgraph Collection["🚛 Collection Day"]
        U --> AB[Place Items Outside]
        AB --> AC[Crew Arrives]
        AC --> AD[Items Collected]
        AD --> AE[Mark Complete]
        AE --> T
    end
```

## Screens Required

| Screen | Description | Status |
|--------|-------------|--------|
| Waste Type Selection | Choose bulky/green | ✅ Implemented |
| Item Selection | Multi-select categories | ✅ Implemented |
| Photo Upload | Optional item photos | ✅ Implemented |
| Address Entry | Pickup location | ✅ Implemented |
| Date Selection | Available time slots | ✅ Implemented |
| Booking Confirmation | Summary + reference | ✅ Implemented |
| My Bookings | List of bookings | ✅ Implemented |
| Booking Details | Full booking info | ✅ Implemented |
| Track Collection | Real-time tracking | ⚠️ Mock Data |

## API Endpoints

```text
GET  /api/bulky/categories
GET  /api/bulky/slots?date={date}&zone={zone}
POST /api/bulky/bookings
GET  /api/bulky/bookings
GET  /api/bulky/bookings/{id}
PUT  /api/bulky/bookings/{id}
DELETE /api/bulky/bookings/{id}
GET  /api/bulky/bookings/{id}/track
POST /api/bulky/bookings/{id}/rate
```

## Notifications

| Event | Channel | Message |
|-------|---------|---------|
| Booking Confirmed | Push/SMS | "Bulky waste pickup confirmed for Dec 15, 8-12" |
| Reminder | Push | "Reminder: Place items outside by 8 AM tomorrow" |
| Crew En Route | Push | "Collection crew is on the way (ETA 30 min)" |
| Collection Complete | Push | "Your items have been collected. Thank you!" |
| Booking Modified | SMS | "Your booking has been rescheduled to Dec 18" |
