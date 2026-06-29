import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, isAuthenticated } from '../../services/auth.service';
import { getDashboardStats, getRecentEvents, getUpcomingEvents } from '../../services/dashboard.service';
import toast from 'react-hot-toast';
import StatsCards from './components/StatsCards';
import RecentEvents from './components/RecentEvents';
import UpcomingEvents from './components/UpcomingEvents';
import UserList from './components/UserList';
import Header from '../landingPage/components/Header';
import Footer from '../landingPage/components/Footer';

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalTickets: 0,
    totalReservations: 0,
    pendingReservations: 0,
    activeEvents: 0,
    draftEvents: 0,
    cancelledEvents: 0,
    finishedEvents: 0,
    upcomingEvents: 0,
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const statsData = await getDashboardStats();
      setStats({
        totalEvents: statsData?.totalEvents || 0,
        totalTickets: statsData?.totalTickets || 0,
        totalReservations: statsData?.totalReservations || 0,
        pendingReservations: statsData?.pendingReservations || 0,
        activeEvents: statsData?.activeEvents || 0,
        draftEvents: statsData?.draftEvents || 0,
        cancelledEvents: statsData?.cancelledEvents || 0,
        finishedEvents: statsData?.finishedEvents || 0,
        upcomingEvents: statsData?.upcomingEvents || 0,
      });

      const recent = await getRecentEvents(5);
      setRecentEvents(recent || []);

      const upcoming = await getUpcomingEvents(5);
      setUpcomingEvents(upcoming || []);
    } catch (error) {
      console.error('Error al cargar datos del dashboard:', error);
      toast.error('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Panel de Control</h1>
          <p className="text-gray-400 mt-1">
            Bienvenido, <span className="font-semibold text-neon-blue">{user?.fullName || user?.email || 'Usuario'}</span>
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
          </div>
        ) : (
          <>
            <StatsCards stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <RecentEvents events={recentEvents} />
              <UpcomingEvents events={upcomingEvents} />
            </div>

            <div className="mt-6">
              <UserList />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;