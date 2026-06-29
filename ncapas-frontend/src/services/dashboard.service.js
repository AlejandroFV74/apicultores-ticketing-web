import { apiClient } from "../api/apiClient";

const USE_MOCK = false;

export async function getDashboardStats() {
  if (USE_MOCK) {
    return {
      totalEvents: 10,
      totalTickets: 156,
      totalReservations: 89,
      pendingReservations: 12,
      activeEvents: 5,
      draftEvents: 3,
      cancelledEvents: 1,
      finishedEvents: 1,
      upcomingEvents: 5,
    };
  }

  try {
    // 1. Obtener estadísticas de eventos (desde /dashboard/stats)
    const statsResponse = await apiClient("/dashboard/stats");
    let eventStats = {};
    if (statsResponse.ok) {
      const statsData = await statsResponse.json();
      eventStats = statsData?.data ?? statsData;
    }

    // 2. Obtener total de tickets (desde /tickets)
    const ticketsResponse = await apiClient("/tickets");
    let totalTickets = 0;
    if (ticketsResponse.ok) {
      const ticketsData = await ticketsResponse.json();
      const tickets = ticketsData?.data ?? ticketsData ?? [];
      totalTickets = Array.isArray(tickets) ? tickets.length : 0;
    }

    // 3. Combinar resultados
    return {
      totalEvents: eventStats?.totalEvents || 0,
      totalTickets: totalTickets,
      totalReservations: eventStats?.totalReservations || 0,
      pendingReservations: eventStats?.pendingReservations || 0,
      activeEvents: eventStats?.activeEvents || 0,
      draftEvents: eventStats?.draftEvents || 0,
      cancelledEvents: eventStats?.cancelledEvents || 0,
      finishedEvents: eventStats?.finishedEvents || 0,
      upcomingEvents: eventStats?.upcomingEvents || 0,
    };
  } catch (error) {
    console.error("Error en getDashboardStats:", error);
    return {
      totalEvents: 0,
      totalTickets: 0,
      totalReservations: 0,
      pendingReservations: 0,
      activeEvents: 0,
      draftEvents: 0,
      cancelledEvents: 0,
      finishedEvents: 0,
      upcomingEvents: 0,
    };
  }
}

export async function getRecentEvents(limit = 5) {
  if (USE_MOCK) {
    return [
      { id: 1, title: 'Concierto de Rock', date: '2024-07-15T20:00:00', location: 'Estadio Nacional', status: 'ACTIVE' },
      { id: 2, title: 'Festival de Cine', date: '2024-07-20T18:00:00', location: 'Cine Teatro', status: 'ACTIVE' },
      { id: 3, title: 'Conferencia Tech', date: '2024-08-01T09:00:00', location: 'Centro de Convenciones', status: 'DRAFT' },
    ].slice(0, limit);
  }

  try {
    const response = await apiClient(`/dashboard/recent-events?limit=${limit}`);
    if (!response.ok) {
      throw new Error("Error al obtener eventos recientes");
    }
    const data = await response.json();
    return data?.data ?? data;
  } catch (error) {
    console.error("Error en getRecentEvents:", error);
    return [];
  }
}

export async function getUpcomingEvents(limit = 5) {
  if (USE_MOCK) {
    return [
      { id: 4, title: 'Exposición de Arte', date: '2024-08-10T10:00:00', location: 'Museo Moderno', status: 'ACTIVE' },
      { id: 5, title: 'Torneo de Ajedrez', date: '2024-08-15T14:00:00', location: 'Club Social', status: 'ACTIVE' },
    ].slice(0, limit);
  }

  try {
    const response = await apiClient(`/dashboard/upcoming-events?limit=${limit}`);
    if (!response.ok) {
      throw new Error("Error al obtener eventos próximos");
    }
    const data = await response.json();
    return data?.data ?? data;
  } catch (error) {
    console.error("Error en getUpcomingEvents:", error);
    return [];
  }
}