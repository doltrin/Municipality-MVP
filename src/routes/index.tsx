import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// ============================================
// Route Configuration with Lazy Loading
// Optimizes bundle size through code splitting
// ============================================

// Layouts - Load immediately as they're needed for structure
import MobileLayout from '../layout/MobileLayout';
import Material3Layout from '../layout/Material3Layout';
import { 
  CarbonLayout, AntLayout, ChakraLayout, 
  MuiLayout, DaisyLayout, PatternFlyLayout, BootstrapLayout 
} from '../layout/DesignLayout';

// Core Pages - Lazy loaded for bundle optimization
const Home = lazy(() => import('../pages/Home'));
const Services = lazy(() => import('../pages/Services'));
const Requests = lazy(() => import('../pages/Requests'));
const News = lazy(() => import('../pages/News'));
const Profile = lazy(() => import('../pages/Profile'));

// Sub Pages - Lazy loaded
const DigitalWallet = lazy(() => import('../pages/DigitalWallet'));
const NewsDetail = lazy(() => import('../pages/NewsDetail'));
const Settings = lazy(() => import('../pages/Settings'));
const PersonalData = lazy(() => import('../pages/PersonalData'));
const RequestHistory = lazy(() => import('../pages/RequestHistory'));
const RequestDetails = lazy(() => import('../pages/RequestDetails'));
const LocationPicker = lazy(() => import('../pages/LocationPicker'));
const Notifications = lazy(() => import('../pages/Notifications'));
const HelpSupport = lazy(() => import('../pages/HelpSupport'));
const Announcements = lazy(() => import('../pages/Announcements'));

// Waste Management
const PAYT = lazy(() => import('../pages/waste/PAYT'));
const BulkyBooking = lazy(() => import('../pages/waste/BulkyBooking'));
const ReusePlatform = lazy(() => import('../pages/waste/ReusePlatform'));
const CollectionSchedule = lazy(() => import('../pages/waste/CollectionSchedule'));
const PostItem = lazy(() => import('../pages/waste/PostItem'));

// Mobility
const SmartParking = lazy(() => import('../pages/mobility/SmartParking'));
const BusTracker = lazy(() => import('../pages/mobility/BusTracker'));
const ParkingSession = lazy(() => import('../pages/mobility/ParkingSession'));
const RoutePlanner = lazy(() => import('../pages/mobility/RoutePlanner'));

// Community
const StrayAnimals = lazy(() => import('../pages/community/StrayAnimals'));
const VolunteerRegistry = lazy(() => import('../pages/community/VolunteerRegistry'));
const AdoptionForm = lazy(() => import('../pages/community/AdoptionForm'));

// Admin & Permits
const PermitDashboard = lazy(() => import('../pages/permits/PermitDashboard'));
const NewPermit = lazy(() => import('../pages/permits/NewPermit'));
const CivilRegistry = lazy(() => import('../pages/registry/CivilRegistry'));

// Payments
const PaymentGateway = lazy(() => import('../pages/payments/PaymentGateway'));
const AddCard = lazy(() => import('../pages/payments/AddCard'));

// Services
const ServiceDetail = lazy(() => import('../pages/services/ServiceDetail'));
const BirthCertificate = lazy(() => import('../pages/services/civil/BirthCertificate'));
const ParticipatoryBudget = lazy(() => import('../pages/services/participation/ParticipatoryBudget'));
const IdeaSubmission = lazy(() => import('../pages/services/participation/IdeaSubmission'));
const EmergencyContacts = lazy(() => import('../pages/services/health/EmergencyContacts'));

// Benefits
const FreeParking = lazy(() => import('../pages/benefits/FreeParking'));
const MuseumAccess = lazy(() => import('../pages/benefits/MuseumAccess'));
const RecyclingReward = lazy(() => import('../pages/benefits/RecyclingReward'));

// New Full-Flow Services
const SmartParkingNew = lazy(() => import('../pages/parking/SmartParking'));
const BusTrackerNew = lazy(() => import('../pages/transport/BusTracker'));
const SocialServices = lazy(() => import('../pages/social/SocialServices'));
const BusinessLicensing = lazy(() => import('../pages/licensing/BusinessLicensing'));
const UrbanPlanning = lazy(() => import('../pages/planning/UrbanPlanning'));
const YouthCard = lazy(() => import('../pages/cards/YouthCard'));

// Design System Variants
const DesignShowcaseLayout = lazy(() => import('../pages/designs/DesignShowcaseLayout'));
const DesignGallery = lazy(() => import('../pages/designs/DesignGallery'));
const MaterialShowcase = lazy(() => import('../pages/designs/variants/MaterialShowcase'));
const CarbonShowcase = lazy(() => import('../pages/designs/variants/CarbonShowcase'));
const AntShowcase = lazy(() => import('../pages/designs/variants/AntShowcase'));
const ChakraShowcase = lazy(() => import('../pages/designs/variants/ChakraShowcase'));
const MuiShowcase = lazy(() => import('../pages/designs/variants/MuiShowcase'));
const DaisyShowcase = lazy(() => import('../pages/designs/variants/DaisyShowcase'));
const PatternFlyShowcase = lazy(() => import('../pages/designs/variants/PatternFlyShowcase'));
const BootstrapShowcase = lazy(() => import('../pages/designs/variants/BootstrapShowcase'));

// Home Variants
const HomeMaterial3 = lazy(() => import('../pages/HomeMaterial3'));
const HomeCarbon = lazy(() => import('../pages/HomeCarbon'));
const HomeAnt = lazy(() => import('../pages/HomeAnt'));
const HomeChakra = lazy(() => import('../pages/HomeChakra'));
const HomeMui = lazy(() => import('../pages/HomeMui'));
const HomeDaisy = lazy(() => import('../pages/HomeDaisy'));
const HomePatternFly = lazy(() => import('../pages/HomePatternFly'));
const HomeBootstrap = lazy(() => import('../pages/HomeBootstrap'));

// Loading Fallback Component
const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-zinc-100 dark:bg-background-dark">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-3 border-accent border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading...</p>
    </div>
  </div>
);

// Main App Routes
export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Main App Routes */}
        <Route path="/" element={<MobileLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          
          {/* Requests */}
          <Route path="requests" element={<Requests />} />
          <Route path="requests/history" element={<RequestHistory />} />
          <Route path="requests/details/:id" element={<RequestDetails />} />
          <Route path="requests/location" element={<LocationPicker />} />
          
          {/* News */}
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="announcements" element={<Announcements />} />
          
          {/* Profile */}
          <Route path="profile" element={<Profile />} />
          <Route path="profile/settings" element={<Settings />} />
          <Route path="profile/personal" element={<PersonalData />} />
          <Route path="profile/help" element={<HelpSupport />} />
          <Route path="notifications" element={<Notifications />} />
          
          {/* Wallet & Payments */}
          <Route path="wallet" element={<DigitalWallet />} />
          <Route path="payments" element={<PaymentGateway />} />
          <Route path="payments/add-card" element={<AddCard />} />
          
          {/* Waste */}
          <Route path="waste/payt" element={<PAYT />} />
          <Route path="waste/booking" element={<BulkyBooking />} />
          <Route path="waste/reuse" element={<ReusePlatform />} />
          <Route path="waste/reuse/post" element={<PostItem />} />
          <Route path="waste/schedule" element={<CollectionSchedule />} />
          
          {/* Mobility */}
          <Route path="parking" element={<SmartParking />} />
          <Route path="parking/session" element={<ParkingSession />} />
          <Route path="transport" element={<BusTracker />} />
          <Route path="transport/route" element={<RoutePlanner />} />
          
          {/* Community */}
          <Route path="animals" element={<StrayAnimals />} />
          <Route path="animals/adopt/:id" element={<AdoptionForm />} />
          <Route path="volunteer" element={<VolunteerRegistry />} />
          
          {/* Admin */}
          <Route path="permits" element={<PermitDashboard />} />
          <Route path="permits/new" element={<NewPermit />} />
          <Route path="registry" element={<CivilRegistry />} />
          
          {/* Service Flows */}
          <Route path="services/:categoryId/:serviceId" element={<ServiceDetail />} />
          <Route path="services/civil/birth" element={<BirthCertificate />} />
          <Route path="services/civil/*" element={<ServiceDetail />} />
          <Route path="services/property/*" element={<ServiceDetail />} />
          <Route path="services/business/*" element={<ServiceDetail />} />
          <Route path="services/environment/*" element={<ServiceDetail />} />
          <Route path="services/mobility/*" element={<ServiceDetail />} />
          <Route path="services/social/*" element={<ServiceDetail />} />
          <Route path="services/education/*" element={<ServiceDetail />} />
          <Route path="services/health/emergency" element={<EmergencyContacts />} />
          <Route path="services/health/*" element={<ServiceDetail />} />
          <Route path="services/culture/*" element={<ServiceDetail />} />
          <Route path="services/utilities/*" element={<ServiceDetail />} />
          <Route path="services/animals/*" element={<ServiceDetail />} />
          <Route path="services/participation/budget" element={<ParticipatoryBudget />} />
          <Route path="services/participation/ideas" element={<IdeaSubmission />} />
          <Route path="services/participation/*" element={<ServiceDetail />} />
          <Route path="services/payments/*" element={<ServiceDetail />} />
          
          {/* New Full-Flow Services */}
          <Route path="parking-new" element={<SmartParkingNew />} />
          <Route path="transport-new" element={<BusTrackerNew />} />
          <Route path="social-services" element={<SocialServices />} />
          <Route path="licensing" element={<BusinessLicensing />} />
          <Route path="urban-planning" element={<UrbanPlanning />} />
          <Route path="youth-card" element={<YouthCard />} />
          
          {/* Benefits */}
          <Route path="benefits/parking" element={<FreeParking />} />
          <Route path="benefits/museum" element={<MuseumAccess />} />
          <Route path="benefits/recycling" element={<RecyclingReward />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        {/* Design System Variants */}
        <Route path="/material3" element={<Material3Layout />}>
          <Route index element={<HomeMaterial3 />} />
        </Route>
        <Route path="/carbon" element={<CarbonLayout />}>
          <Route index element={<HomeCarbon />} />
        </Route>
        <Route path="/ant" element={<AntLayout />}>
          <Route index element={<HomeAnt />} />
        </Route>
        <Route path="/chakra" element={<ChakraLayout />}>
          <Route index element={<HomeChakra />} />
        </Route>
        <Route path="/mui" element={<MuiLayout />}>
          <Route index element={<HomeMui />} />
        </Route>
        <Route path="/daisy" element={<DaisyLayout />}>
          <Route index element={<HomeDaisy />} />
        </Route>
        <Route path="/patternfly" element={<PatternFlyLayout />}>
          <Route index element={<HomePatternFly />} />
        </Route>
        <Route path="/bootstrap" element={<BootstrapLayout />}>
          <Route index element={<HomeBootstrap />} />
        </Route>
        
        {/* Design Showcase */}
        <Route path="/designs" element={<DesignShowcaseLayout />}>
          <Route index element={<DesignGallery />} />
          <Route path="material" element={<MaterialShowcase />} />
          <Route path="carbon" element={<CarbonShowcase />} />
          <Route path="ant" element={<AntShowcase />} />
          <Route path="chakra" element={<ChakraShowcase />} />
          <Route path="mui" element={<MuiShowcase />} />
          <Route path="daisy" element={<DaisyShowcase />} />
          <Route path="patternfly" element={<PatternFlyShowcase />} />
          <Route path="bootstrap" element={<BootstrapShowcase />} />
          <Route path="*" element={<Navigate to="/designs" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
