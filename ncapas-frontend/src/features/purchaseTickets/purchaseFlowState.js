const STORAGE_KEY = "purchase_flow_reservation";

function read() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function write(value) {
  if (!value) {
    sessionStorage.removeItem(STORAGE_KEY);
    return;
  }
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function getReservationFlowState() {
  return read();
}

export function setReservationFlowState(next) {
  write(next);
}

export function clearReservationFlowState() {
  write(null);
}

