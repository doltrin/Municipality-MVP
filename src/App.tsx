import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import MobileLayout from './layout/MobileLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import Requests from './pages/Requests';
import News from './pages/News';
import Profile from './pages/Profile';
import DigitalWallet from './pages/DigitalWallet';
import PAYT from './pages/waste/PAYT';
import BulkyBooking from './pages/waste/BulkyBooking';
import ReusePlatform from './pages/waste/ReusePlatform';
import CollectionSchedule from './pages/waste/CollectionSchedule';
import SmartParking from './pages/mobility/SmartParking';
import BusTracker from './pages/mobility/BusTracker';
import StrayAnimals from './pages/community/StrayAnimals';
import VolunteerRegistry from './pages/community/VolunteerRegistry';
import PermitDashboard from './pages/permits/PermitDashboard';
import PaymentGateway from './pages/payments/PaymentGateway';
import CivilRegistry from './pages/registry/CivilRegistry';
import NewsDetail from './pages/NewsDetail';
import Settings from './pages/Settings';
import PersonalData from './pages/PersonalData';
import RequestHistory from './pages/RequestHistory';
import RequestDetails from './pages/RequestDetails';
import LocationPicker from './pages/LocationPicker';
import Notifications from './pages/Notifications';
import AddCard from './pages/payments/AddCard';
import PostItem from './pages/waste/PostItem';
import ParkingSession from './pages/mobility/ParkingSession';
import AdoptionForm from './pages/community/AdoptionForm';
import RoutePlanner from './pages/mobility/RoutePlanner';
import NewPermit from './pages/permits/NewPermit';
import ServiceDetail from './pages/services/ServiceDetail';
import BirthCertificate from './pages/services/civil/BirthCertificate';
import ParticipatoryBudget from './pages/services/participation/ParticipatoryBudget';
import IdeaSubmission from './pages/services/participation/IdeaSubmission';
import DesignShowcaseLayout from './pages/designs/DesignShowcaseLayout';
import DesignGallery from './pages/designs/DesignGallery';
import MaterialShowcase from './pages/designs/variants/MaterialShowcase';
import CarbonShowcase from './pages/designs/variants/CarbonShowcase';
import AntShowcase from './pages/designs/variants/AntShowcase';
import ChakraShowcase from './pages/designs/variants/ChakraShowcase';
import MuiShowcase from './pages/designs/variants/MuiShowcase';
import DaisyShowcase from './pages/designs/variants/DaisyShowcase';
import PatternFlyShowcase from './pages/designs/variants/PatternFlyShowcase';
import BootstrapShowcase from './pages/designs/variants/BootstrapShowcase';
import Material3Layout from './layout/Material3Layout';
import HomeMaterial3 from './pages/HomeMaterial3';
import { CarbonLayout, AntLayout, ChakraLayout, MuiLayout, DaisyLayout, PatternFlyLayout, BootstrapLayout } from './layout/DesignLayout';
import HomeCarbon from './pages/HomeCarbon';
import HomeAnt from './pages/HomeAnt';
import HomeChakra from './pages/HomeChakra';
import HomeMui from './pages/HomeMui';
import HomeDaisy from './pages/HomeDaisy';
import HomePatternFly from './pages/HomePatternFly';
import HomeBootstrap from './pages/HomeBootstrap';
import FreeParking from './pages/benefits/FreeParking';
import MuseumAccess from './pages/benefits/MuseumAccess';
import RecyclingReward from './pages/benefits/RecyclingReward';
import EmergencyContacts from './pages/services/health/EmergencyContacts';
import HelpSupport from './pages/HelpSupport';
import Announcements from './pages/Announcements';
import SmartParkingNew from './pages/parking/SmartParking';
import BusTrackerNew from './pages/transport/BusTracker';
import SocialServices from './pages/social/SocialServices';
import BusinessLicensing from './pages/licensing/BusinessLicensing';
import UrbanPlanning from './pages/planning/UrbanPlanning';
import YouthCard from './pages/cards/YouthCard';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="athens-app-theme">
      <BrowserRouter>
        <Routes>
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
          <Route path="services/civil/marriage" element={<ServiceDetail />} />
          <Route path="services/civil/death" element={<ServiceDetail />} />
          <Route path="services/civil/family" element={<ServiceDetail />} />
          <Route path="services/civil/residence" element={<ServiceDetail />} />
          <Route path="services/civil/citizenship" element={<ServiceDetail />} />
          <Route path="services/civil/name-change" element={<ServiceDetail />} />
          <Route path="services/civil/partnership" element={<ServiceDetail />} />
          
          {/* Property & Planning */}
          <Route path="services/property/*" element={<ServiceDetail />} />
          
          {/* Business */}
          <Route path="services/business/*" element={<ServiceDetail />} />
          
          {/* Environment */}
          <Route path="services/environment/*" element={<ServiceDetail />} />
          
          {/* Mobility */}
          <Route path="services/mobility/*" element={<ServiceDetail />} />
          
          {/* Social */}
          <Route path="services/social/*" element={<ServiceDetail />} />
          
          {/* Education */}
          <Route path="services/education/*" element={<ServiceDetail />} />
          
          {/* Health */}
          <Route path="services/health/emergency" element={<EmergencyContacts />} />
          <Route path="services/health/*" element={<ServiceDetail />} />
          
          {/* Culture */}
          <Route path="services/culture/*" element={<ServiceDetail />} />
          
          {/* Utilities */}
          <Route path="services/utilities/*" element={<ServiceDetail />} />
          
          {/* Animals */}
          <Route path="services/animals/*" element={<ServiceDetail />} />
          
          {/* Participation */}
          <Route path="services/participation/budget" element={<ParticipatoryBudget />} />
          <Route path="services/participation/ideas" element={<IdeaSubmission />} />
          <Route path="services/participation/*" element={<ServiceDetail />} />
          
          {/* New Full-Flow Services */}
          <Route path="parking-new" element={<SmartParkingNew />} />
          <Route path="transport-new" element={<BusTrackerNew />} />
          <Route path="social-services" element={<SocialServices />} />
          <Route path="licensing" element={<BusinessLicensing />} />
          <Route path="urban-planning" element={<UrbanPlanning />} />
          <Route path="youth-card" element={<YouthCard />} />
          
          {/* Payments */}
          <Route path="services/payments/*" element={<ServiceDetail />} />
          
          {/* Benefits */}
          <Route path="benefits/parking" element={<FreeParking />} />
          <Route path="benefits/museum" element={<MuseumAccess />} />
          <Route path="benefits/recycling" element={<RecyclingReward />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        {/* Design System Variants - Each uses same layout pattern as prototype */}
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
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
