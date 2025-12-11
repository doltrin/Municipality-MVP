import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Grid, Calendar, User, MessageSquare } from 'lucide-react';

// Design system color configurations
const designSystems = {
  material3: {
    surface: '#141218',
    surfaceContainer: '#2B2930',
    primary: '#D0BCFF',
    onPrimary: '#381E72',
    secondary: '#4A4458',
    onSecondary: '#E8DEF8',
    onSurface: '#E6E0E9',
    onSurfaceVariant: '#CAC4D0',
  },
  carbon: {
    surface: '#161616',
    surfaceContainer: '#262626',
    primary: '#0F62FE',
    onPrimary: '#FFFFFF',
    secondary: '#393939',
    onSecondary: '#C6C6C6',
    onSurface: '#F4F4F4',
    onSurfaceVariant: '#C6C6C6',
  },
  ant: {
    surface: '#141414',
    surfaceContainer: '#1f1f1f',
    primary: '#1890ff',
    onPrimary: '#FFFFFF',
    secondary: '#303030',
    onSecondary: 'rgba(255,255,255,0.85)',
    onSurface: 'rgba(255,255,255,0.85)',
    onSurfaceVariant: 'rgba(255,255,255,0.45)',
  },
  chakra: {
    surface: '#1A202C',
    surfaceContainer: '#2D3748',
    primary: '#805AD5',
    onPrimary: '#FFFFFF',
    secondary: '#4A5568',
    onSecondary: '#E9D8FD',
    onSurface: '#FFFFFF',
    onSurfaceVariant: '#A0AEC0',
  },
  mui: {
    surface: '#121212',
    surfaceContainer: '#1e1e1e',
    primary: '#90caf9',
    onPrimary: '#121212',
    secondary: '#2d2d2d',
    onSecondary: 'rgba(255,255,255,0.7)',
    onSurface: '#FFFFFF',
    onSurfaceVariant: 'rgba(255,255,255,0.7)',
  },
  daisy: {
    surface: '#191e24',
    surfaceContainer: '#1d232a',
    primary: '#7480ff',
    onPrimary: '#050617',
    secondary: '#2a323c',
    onSecondary: '#A6ADBB',
    onSurface: '#A6ADBB',
    onSurfaceVariant: '#A6ADBB',
  },
  patternfly: {
    surface: '#151515',
    surfaceContainer: '#212427',
    primary: '#0066cc',
    onPrimary: '#FFFFFF',
    secondary: '#3c3f42',
    onSecondary: '#8a8d90',
    onSurface: '#e0e0e0',
    onSurfaceVariant: '#8a8d90',
  },
  bootstrap: {
    surface: '#212529',
    surfaceContainer: '#343a40',
    primary: '#0d6efd',
    onPrimary: '#FFFFFF',
    secondary: '#495057',
    onSecondary: '#adb5bd',
    onSurface: '#f8f9fa',
    onSurfaceVariant: '#adb5bd',
  },
};

type DesignSystem = keyof typeof designSystems;

interface DesignLayoutProps {
  design: DesignSystem;
}

const DesignLayout: React.FC<DesignLayoutProps> = ({ design }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const colors = designSystems[design];
  const basePath = `/${design}`;

  const navItems = [
    { path: basePath, icon: Home, label: 'Home' },
    { path: `${basePath}/services`, icon: Grid, label: 'Services' },
    { path: `${basePath}/news`, icon: Calendar, label: 'News' },
    { path: `${basePath}/profile`, icon: User, label: 'Profile' },
  ];

  return (
    <div 
      className="flex flex-col max-w-md mx-auto shadow-2xl font-sans"
      style={{ 
        height: '100%', 
        backgroundColor: colors.surface,
        borderLeft: `1px solid ${colors.surfaceContainer}`,
        borderRight: `1px solid ${colors.surfaceContainer}`,
      }}
    >
      <main 
        className="flex-1 overflow-y-auto hide-scrollbar"
        style={{ minHeight: 0, backgroundColor: colors.surface }}
      >
        <Outlet />
      </main>

      <nav 
        className="pt-2 pb-6 px-4"
        style={{ backgroundColor: colors.surfaceContainer, flexShrink: 0 }}
      >
        <div className="flex justify-around items-end">
          {/* Home */}
          <div className="-translate-y-2">
            <NavButton item={navItems[0]} colors={colors} location={location} navigate={navigate} />
          </div>
          {/* Services */}
          <div className="-translate-y-2">
            <NavButton item={navItems[1]} colors={colors} location={location} navigate={navigate} />
          </div>
          {/* AI Button */}
          <button
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg -translate-y-4"
            style={{ backgroundColor: colors.primary, color: colors.onPrimary }}
          >
            <MessageSquare size={24} />
          </button>
          {/* News */}
          <div className="-translate-y-2">
            <NavButton item={navItems[2]} colors={colors} location={location} navigate={navigate} />
          </div>
          {/* Profile */}
          <div className="-translate-y-2">
            <NavButton item={navItems[3]} colors={colors} location={location} navigate={navigate} />
          </div>
        </div>
      </nav>
    </div>
  );
};

interface NavButtonProps {
  item: { path: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>; label: string };
  colors: typeof designSystems.material3;
  location: ReturnType<typeof useLocation>;
  navigate: ReturnType<typeof useNavigate>;
}

const NavButton: React.FC<NavButtonProps> = ({ item, colors, location, navigate }) => {
  const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path + '/'));
  const Icon = item.icon;

  return (
    <button onClick={() => navigate(item.path)} className="flex flex-col items-center gap-1 w-16">
      <div 
        className="w-16 h-8 rounded-full flex items-center justify-center transition-colors"
        style={{ backgroundColor: isActive ? colors.secondary : 'transparent' }}
      >
        <Icon 
          size={22} 
          strokeWidth={isActive ? 2.5 : 1.8}
          style={{ color: isActive ? colors.onSecondary : colors.onSurfaceVariant }}
        />
      </div>
      <span className="text-[11px] font-medium" style={{ color: isActive ? colors.onSecondary : colors.onSurfaceVariant }}>
        {item.label}
      </span>
    </button>
  );
};

// Export wrapper components for each design system
export const CarbonLayout = () => <DesignLayout design="carbon" />;
export const AntLayout = () => <DesignLayout design="ant" />;
export const ChakraLayout = () => <DesignLayout design="chakra" />;
export const MuiLayout = () => <DesignLayout design="mui" />;
export const DaisyLayout = () => <DesignLayout design="daisy" />;
export const PatternFlyLayout = () => <DesignLayout design="patternfly" />;
export const BootstrapLayout = () => <DesignLayout design="bootstrap" />;

export default DesignLayout;
