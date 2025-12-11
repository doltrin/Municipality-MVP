# 2.3 Exchange & Reuse Platform - Workflow Diagram

## Service Description

Citizen-to-citizen platform for exchanging reusable items, reducing landfill waste.

## User Flow Diagram

```mermaid
flowchart TD
    subgraph Browse["🔍 Browse Items"]
        A[Open Reuse Platform] --> B[View Available Items]
        B --> C[Filter by Category]
        C --> D[Search Items]
        D --> E[View Item Details]
        E --> F{Interested?}
        F -->|Yes| G[Contact Owner]
        F -->|No| B
    end

    subgraph Post["📤 Post Item"]
        H[Tap Post Item] --> I[Select Category]
        I --> J[Add Photos]
        J --> K[Enter Description]
        K --> L[Set Condition]
        L --> M[Add Location]
        M --> N[Preview Listing]
        N --> O{Confirm?}
        O -->|Yes| P[Publish Item]
        O -->|No| K
        P --> Q[Receive Confirmation Toast]
    end

    subgraph Contact["💬 Contact Flow"]
        G --> R[Open Chat]
        R --> S[Send Message]
        S --> T[Negotiate Pickup]
        T --> U[Agree on Time/Place]
        U --> V[Meet & Exchange]
    end

    subgraph Complete["✅ Complete Exchange"]
        V --> W[Mark as Collected]
        W --> X[Rate Experience]
        X --> Y[Item Removed from Listings]
        Y --> Z[Update User Stats]
    end

    subgraph MyItems["📦 My Items"]
        AA[View My Listings] --> AB[See Active Items]
        AB --> AC{Action?}
        AC -->|Edit| AD[Update Details]
        AC -->|Delete| AE[Remove Listing]
        AC -->|Mark Given| W
    end
```

## Screens Required

| Screen | Description | Status |
|--------|-------------|--------|
| Browse Items | Grid of available items | ✅ Implemented |
| Item Details | Full item info + contact | ✅ Implemented |
| Post Item | Multi-step posting form | ✅ Implemented |
| Chat | In-app messaging | ✅ Implemented |
| My Listings | Manage posted items | ✅ Implemented |
| User Profile | Stats and ratings | ⚠️ Basic |

## API Endpoints

```text
GET  /api/reuse/items?category={cat}&search={q}
GET  /api/reuse/items/{id}
POST /api/reuse/items
PUT  /api/reuse/items/{id}
DELETE /api/reuse/items/{id}
POST /api/reuse/items/{id}/interest
GET  /api/reuse/conversations
POST /api/reuse/conversations/{id}/messages
POST /api/reuse/items/{id}/complete
POST /api/reuse/items/{id}/rate
```

## Notifications

| Event | Channel | Message |
|-------|---------|---------|
| New Interest | Push | "Someone is interested in your Sofa" |
| New Message | Push | "New message from Maria about Sofa" |
| Item Collected | Push | "Great! Your item found a new home 🎉" |
| Similar Item | Push | "New item matching your search: Desk" |
