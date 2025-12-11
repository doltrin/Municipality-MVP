# 2.1 Waste Route Optimization - Workflow Diagram

## Service Description
AI-powered route optimization for waste collection vehicles with IoT fill-level sensors.

## User Flow Diagram

```mermaid
flowchart TD
    subgraph Citizen["👤 Citizen App"]
        A[Open App] --> B[View Collection Schedule]
        B --> C{Check Bin Status}
        C -->|Full| D[Report Full Bin]
        C -->|Normal| E[View Next Collection]
        D --> F[Submit Location]
        F --> G[Receive Confirmation Toast]
        G --> H[Track Report Status]
    end

    subgraph Admin["🏛️ Municipal Dashboard"]
        I[View Real-time Map] --> J[Monitor Fill Levels]
        J --> K{Threshold Reached?}
        K -->|Yes| L[AI Generates Route]
        K -->|No| M[Continue Monitoring]
        L --> N[Optimize for Efficiency]
        N --> O[Dispatch to Drivers]
    end

    subgraph Driver["🚛 Driver App"]
        P[Receive Route] --> Q[Navigate to Bins]
        Q --> R[Scan Bin QR]
        R --> S[Mark as Collected]
        S --> T{More Bins?}
        T -->|Yes| Q
        T -->|No| U[Complete Route]
        U --> V[Submit Report]
    end

    subgraph IoT["📡 IoT Sensors"]
        W[Ultrasonic Sensor] --> X[Measure Fill Level]
        X --> Y[Send via LoRaWAN]
        Y --> Z[Update Database]
        Z --> J
    end

    D --> I
    V --> I
```

## Screens Required

| Screen | Description | Status |
|--------|-------------|--------|
| Collection Schedule | View weekly pickup times | ✅ Implemented |
| Bin Status Map | Real-time fill levels | ⚠️ Admin Only |
| Report Full Bin | Submit overflow report | ✅ Via Requests |
| Report Tracking | Track submitted reports | ✅ Implemented |

## API Endpoints

```
GET  /api/waste/schedule?zone={zoneId}
GET  /api/waste/bins?lat={lat}&lng={lng}&radius={m}
POST /api/waste/reports
GET  /api/waste/reports/{id}/status
GET  /api/waste/routes/optimized
POST /api/waste/collection/complete
```

## Notifications

| Event | Channel | Message |
|-------|---------|---------|
| Collection Tomorrow | Push | "Waste collection scheduled for tomorrow at 7:00 AM" |
| Bin Collected | Push | "Your reported bin has been collected" |
| Schedule Change | Push/SMS | "Collection schedule changed due to holiday" |
