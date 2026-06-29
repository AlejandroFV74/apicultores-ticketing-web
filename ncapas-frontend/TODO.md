# TODO - Frontend Refactor: Reservation and Checkout Flow

## Plan overview
Refactor seat selection into multi-step checkout: Reservation Confirmation → Payment Selection → Ticket Generation → My Tickets.

## Steps
- [x] Add reservation/payment service methods under `src/services/`

- [x] Implement shared reservation state (reservationId, expiresAt, selectedSeatIds)
- [x] Refactor `SeatMap` to remove timer and auto-navigation; add Continue that calls `POST /api/reservation`

- [x] Create Reservation Confirmation page (countdown driven by backend `expiresAt`)
- [x] Create Payment Selection page (basic + stripe; stripe uses `window.location.assign`)
- [x] Add routes for new pages in `src/router/routes.jsx`
- [x] Implement reservation cancellation logic via `DELETE /api/reservation/{reservationId}`


- [ ] Add/adjust error handling and user messages
- [ ] Run dev server / basic manual test

