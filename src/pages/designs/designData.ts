import {
  AlertTriangle,
  Bell,
  Bus,
  Calendar,
  Clock,
  CreditCard,
  FileText,
  Grid,
  Home,
  Megaphone,
  MessageSquare,
  Recycle,
  Search,
  Shield,
  Sparkles,
  Sun,
  User,
  Wallet,
  Zap,
} from 'lucide-react';
import { newsData } from '../../data/newsData';

export const userPersona = {
  name: 'Alexandros',
  city: 'Athens.gov',
  subtitle: 'Municipality Super App',
  weather: {
    temp: 24,
    condition: 'Sunny',
    humidity: 45,
    wind: 12,
    uv: 'Low'
  }
};

const today = new Date();
const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short' };

export const greetingContext = {
  greeting: (() => {
    const hour = today.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  })(),
  date: today.toLocaleDateString('en-GB', dateOptions),
};

export const statsCards = [
  {
    id: 'wallet',
    label: 'Wallet Balance',
    value: '€45.50',
    trend: '+€12',
    icon: Wallet,
  },
  {
    id: 'points',
    label: 'Citizen Points',
    value: '1,250',
    trend: 'Top 5% district',
    icon: FileText,
  },
  {
    id: 'requests',
    label: 'Active Requests',
    value: '2',
    trend: 'Updated 2h ago',
    icon: Clock,
  },
];

export const quickActions = [
  { id: 'certificates', label: 'Certificates', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'report', label: 'Report Issue', icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'payments', label: 'Payments', icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'transport', label: 'Transport', icon: Bus, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'waste', label: 'Waste', icon: Recycle, color: 'text-teal-600', bg: 'bg-teal-50' },
  { id: 'services', label: 'All Services', icon: Sparkles, color: 'text-sky-600', bg: 'bg-sky-50' },
];

export const taskItems = [
  { id: 1, title: 'Street Light Repair', status: 'in_progress', date: '2 days ago', icon: Zap },
  { id: 2, title: 'Certificate Pickup', status: 'scheduled', date: 'Tomorrow, 10:00', icon: Calendar },
];

export const announcementCard = {
  title: 'Water Supply Notice',
  description: 'Scheduled maintenance on Dec 8th, 09:00-14:00 in Kypseli area.',
  cta: 'Learn More →',
  icon: Megaphone,
};

export const newsHighlights = newsData.slice(0, 2);

export const emergencyInfo = {
  title: 'Emergency Services',
  description: 'Quick access to emergency contacts',
  cta: 'View',
  icon: Shield,
};

export const popularServices = [
  { id: 'civil-status', name: 'Birth Certificate', categoryName: 'Civil Services', icon: FileText, path: '/services/civil/birth' },
  { id: 'waste-booking', name: 'Bulky Waste Pickup', categoryName: 'Environment', icon: Recycle, path: '/waste/booking' },
  { id: 'parking', name: 'Parking Session', categoryName: 'Mobility', icon: Bus, path: '/parking' },
];

export const headerActions = [
  { id: 'theme', icon: Sun },
  { id: 'search', icon: Search },
  { id: 'notifications', icon: Bell },
];

export const bottomNavItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/services', icon: Grid, label: 'Services' },
  { path: '/news', icon: Calendar, label: 'News' },
  { path: '/profile', icon: User, label: 'Profile' },
  { path: '/chat', icon: MessageSquare, label: 'AI' },
];
