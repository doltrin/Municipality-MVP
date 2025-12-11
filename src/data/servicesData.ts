import { 
  FileText, Building2, Heart, Car, Trash2, CreditCard, Users, 
  GraduationCap, Home, Briefcase, Scale, Baby, HeartPulse, 
  TreePine, Droplets, Zap, Shield, MapPin, Calendar, 
  Landmark, PiggyBank, Bike, Bus, ParkingCircle, Dog,
  Recycle, Leaf, Sun, Wind, Waves, Mountain, Building,
  Store, Utensils, Music, Palette, BookOpen, Trophy,
  Accessibility, Stethoscope, Pill, Siren, Phone, Mail,
  FileCheck, FilePlus, FileSearch, ClipboardList, Receipt,
  Banknote, Wallet, HandCoins, BadgeCheck, UserCheck,
  AlertTriangle, Construction, Hammer, Wrench, HardHat,
  Church, Cross, Flag, Vote, Megaphone, Newspaper,
  Wifi, Camera, Lightbulb, Thermometer, CloudRain, Flame
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  name: string;
  nameGr: string;
  description: string;
  path: string;
  icon: any;
  popular?: boolean;
  new?: boolean;
  requiresAuth?: boolean;
  estimatedTime?: string;
  fee?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  nameGr: string;
  icon: any;
  color: string;
  bgColor: string;
  darkBgColor: string;
  description: string;
  services: ServiceItem[];
}

export const serviceCategories: ServiceCategory[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // 1. CIVIL REGISTRY & CERTIFICATES (Ληξιαρχείο & Πιστοποιητικά)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'civil-registry',
    name: 'Civil Registry',
    nameGr: 'Ληξιαρχείο',
    icon: FileText,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-50',
    darkBgColor: 'dark:bg-indigo-900/20',
    description: 'Birth, marriage, death certificates and family records',
    services: [
      { id: 'birth-cert', name: 'Birth Certificate', nameGr: 'Πιστοποιητικό Γέννησης', description: 'Request official birth certificate', path: '/services/civil/birth', icon: Baby, popular: true, estimatedTime: '2-3 days', fee: '€0' },
      { id: 'marriage-cert', name: 'Marriage Certificate', nameGr: 'Πιστοποιητικό Γάμου', description: 'Request marriage certificate', path: '/services/civil/marriage', icon: Heart, estimatedTime: '2-3 days', fee: '€0' },
      { id: 'death-cert', name: 'Death Certificate', nameGr: 'Πιστοποιητικό Θανάτου', description: 'Request death certificate', path: '/services/civil/death', icon: Cross, estimatedTime: '2-3 days', fee: '€0' },
      { id: 'family-status', name: 'Family Status Certificate', nameGr: 'Πιστοποιητικό Οικογενειακής Κατάστασης', description: 'Official family composition document', path: '/services/civil/family', icon: Users, popular: true, estimatedTime: '1-2 days', fee: '€0' },
      { id: 'residence-cert', name: 'Residence Certificate', nameGr: 'Πιστοποιητικό Μόνιμης Κατοικίας', description: 'Proof of permanent residence', path: '/services/civil/residence', icon: Home, estimatedTime: '1-2 days', fee: '€0' },
      { id: 'citizenship-cert', name: 'Citizenship Certificate', nameGr: 'Πιστοποιητικό Ιθαγένειας', description: 'Greek citizenship documentation', path: '/services/civil/citizenship', icon: Flag, estimatedTime: '5-7 days', fee: '€0' },
      { id: 'name-change', name: 'Name Change Application', nameGr: 'Αίτηση Αλλαγής Ονόματος', description: 'Apply for legal name change', path: '/services/civil/name-change', icon: UserCheck, estimatedTime: '30-60 days', fee: '€15' },
      { id: 'civil-partnership', name: 'Civil Partnership', nameGr: 'Σύμφωνο Συμβίωσης', description: 'Register civil partnership', path: '/services/civil/partnership', icon: Heart, estimatedTime: '7-14 days', fee: '€0' },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. PROPERTY & URBAN PLANNING (Πολεοδομία & Ακίνητα)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'property',
    name: 'Property & Planning',
    nameGr: 'Πολεοδομία',
    icon: Building2,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50',
    darkBgColor: 'dark:bg-orange-900/20',
    description: 'Building permits, property taxes, and urban planning',
    services: [
      { id: 'building-permit', name: 'Building Permit', nameGr: 'Άδεια Δόμησης', description: 'Apply for construction permit', path: '/services/property/building-permit', icon: Building, estimatedTime: '30-90 days', fee: 'Variable' },
      { id: 'renovation-permit', name: 'Renovation Permit', nameGr: 'Άδεια Ανακαίνισης', description: 'Minor works and renovations', path: '/services/property/renovation', icon: Hammer, estimatedTime: '15-30 days', fee: 'Variable' },
      { id: 'demolition-permit', name: 'Demolition Permit', nameGr: 'Άδεια Κατεδάφισης', description: 'Apply for demolition authorization', path: '/services/property/demolition', icon: Construction, estimatedTime: '30-45 days', fee: 'Variable' },
      { id: 'property-tax', name: 'Property Tax (TAP)', nameGr: 'Τέλος Ακίνητης Περιουσίας', description: 'View and pay property taxes', path: '/services/property/tax', icon: Receipt, popular: true, estimatedTime: 'Instant', fee: 'Variable' },
      { id: 'land-use-cert', name: 'Land Use Certificate', nameGr: 'Βεβαίωση Χρήσης Γης', description: 'Zoning and land use verification', path: '/services/property/land-use', icon: MapPin, estimatedTime: '5-10 days', fee: '€20' },
      { id: 'topographic', name: 'Topographic Survey Request', nameGr: 'Αίτηση Τοπογραφικού', description: 'Request municipal topographic data', path: '/services/property/topographic', icon: Mountain, estimatedTime: '10-15 days', fee: '€50' },
      { id: 'street-number', name: 'Street Number Assignment', nameGr: 'Απόδοση Αριθμού Οδού', description: 'Get official street number', path: '/services/property/street-number', icon: Home, estimatedTime: '5-7 days', fee: '€0' },
      { id: 'encroachment', name: 'Sidewalk Encroachment Permit', nameGr: 'Άδεια Κατάληψης Πεζοδρομίου', description: 'Permit for sidewalk use', path: '/services/property/encroachment', icon: Store, estimatedTime: '7-14 days', fee: 'Variable' },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. BUSINESS & LICENSING (Επιχειρήσεις & Αδειοδοτήσεις)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'business',
    name: 'Business & Licenses',
    nameGr: 'Επιχειρήσεις',
    icon: Briefcase,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50',
    darkBgColor: 'dark:bg-amber-900/20',
    description: 'Business permits, trade licenses, and commercial activities',
    services: [
      { id: 'business-license', name: 'Business Operating License', nameGr: 'Άδεια Λειτουργίας Επιχείρησης', description: 'General business operation permit', path: '/services/business/license', icon: BadgeCheck, popular: true, estimatedTime: '15-30 days', fee: 'Variable' },
      { id: 'food-license', name: 'Food Service License', nameGr: 'Άδεια Υγειονομικού Ενδιαφέροντος', description: 'Restaurant, cafe, food business permit', path: '/services/business/food', icon: Utensils, estimatedTime: '20-40 days', fee: 'Variable' },
      { id: 'outdoor-seating', name: 'Outdoor Seating Permit', nameGr: 'Άδεια Τραπεζοκαθισμάτων', description: 'Permit for outdoor tables and chairs', path: '/services/business/seating', icon: Store, popular: true, estimatedTime: '10-20 days', fee: 'Variable' },
      { id: 'music-license', name: 'Music/Entertainment License', nameGr: 'Άδεια Μουσικής', description: 'Permit for music and entertainment', path: '/services/business/music', icon: Music, estimatedTime: '15-30 days', fee: 'Variable' },
      { id: 'market-stall', name: 'Market Stall License', nameGr: 'Άδεια Λαϊκής Αγοράς', description: 'Farmers market vendor permit', path: '/services/business/market', icon: Store, estimatedTime: '7-14 days', fee: '€50-200' },
      { id: 'advertising', name: 'Advertising Sign Permit', nameGr: 'Άδεια Διαφημιστικής Πινακίδας', description: 'Outdoor advertising authorization', path: '/services/business/advertising', icon: Megaphone, estimatedTime: '10-20 days', fee: 'Variable' },
      { id: 'kiosk-license', name: 'Kiosk License', nameGr: 'Άδεια Περιπτέρου', description: 'Kiosk operation permit', path: '/services/business/kiosk', icon: Store, estimatedTime: '30-60 days', fee: 'Variable' },
      { id: 'taxi-license', name: 'Taxi License', nameGr: 'Άδεια Ταξί', description: 'Taxi operation permit', path: '/services/business/taxi', icon: Car, estimatedTime: '30-45 days', fee: 'Variable' },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. WASTE & ENVIRONMENT (Καθαριότητα & Περιβάλλον)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'environment',
    name: 'Waste & Environment',
    nameGr: 'Περιβάλλον',
    icon: Leaf,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50',
    darkBgColor: 'dark:bg-emerald-900/20',
    description: 'Waste collection, recycling, and environmental services',
    services: [
      { id: 'waste-schedule', name: 'Collection Schedule', nameGr: 'Πρόγραμμα Αποκομιδής', description: 'View garbage collection times', path: '/waste/schedule', icon: Calendar, popular: true, estimatedTime: 'Instant', fee: '€0' },
      { id: 'bulky-waste', name: 'Bulky Waste Pickup', nameGr: 'Αποκομιδή Ογκωδών', description: 'Schedule large item collection', path: '/waste/booking', icon: Trash2, popular: true, estimatedTime: '3-7 days', fee: '€0' },
      { id: 'recycling-info', name: 'Recycling Guide', nameGr: 'Οδηγός Ανακύκλωσης', description: 'Learn what and where to recycle', path: '/services/environment/recycling', icon: Recycle, estimatedTime: 'Instant', fee: '€0' },
      { id: 'green-bin', name: 'Green Bin Request', nameGr: 'Αίτηση Πράσινου Κάδου', description: 'Request organic waste bin', path: '/services/environment/green-bin', icon: Leaf, estimatedTime: '7-14 days', fee: '€0' },
      { id: 'composting', name: 'Home Composting Program', nameGr: 'Πρόγραμμα Κομποστοποίησης', description: 'Join home composting initiative', path: '/services/environment/composting', icon: TreePine, new: true, estimatedTime: '14-21 days', fee: '€0' },
      { id: 'payt', name: 'Pay-As-You-Throw (PAYT)', nameGr: 'Πληρώνω Όσο Πετάω', description: 'Smart waste management program', path: '/waste/payt', icon: PiggyBank, new: true, estimatedTime: 'Instant', fee: 'Variable' },
      { id: 'reuse-platform', name: 'Reuse Platform', nameGr: 'Πλατφόρμα Επαναχρησιμοποίησης', description: 'Give away or find free items', path: '/waste/reuse', icon: Recycle, estimatedTime: 'Instant', fee: '€0' },
      { id: 'tree-planting', name: 'Tree Planting Request', nameGr: 'Αίτηση Φύτευσης Δέντρου', description: 'Request tree in public space', path: '/services/environment/tree', icon: TreePine, estimatedTime: '30-90 days', fee: '€0' },
      { id: 'pest-control', name: 'Pest Control Request', nameGr: 'Αίτηση Απεντόμωσης', description: 'Report pest issues in public areas', path: '/services/environment/pest', icon: AlertTriangle, estimatedTime: '3-7 days', fee: '€0' },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. TRANSPORTATION & MOBILITY (Μεταφορές & Κινητικότητα)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'mobility',
    name: 'Transportation',
    nameGr: 'Μεταφορές',
    icon: Car,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50',
    darkBgColor: 'dark:bg-blue-900/20',
    description: 'Parking, public transport, and mobility services',
    services: [
      { id: 'smart-parking', name: 'Smart Parking', nameGr: 'Έξυπνη Στάθμευση', description: 'Find and pay for parking', path: '/parking', icon: ParkingCircle, popular: true, estimatedTime: 'Instant', fee: 'Variable' },
      { id: 'resident-parking', name: 'Resident Parking Permit', nameGr: 'Κάρτα Στάθμευσης Μόνιμου Κατοίκου', description: 'Apply for resident parking card', path: '/services/mobility/resident-parking', icon: Car, popular: true, estimatedTime: '7-14 days', fee: '€20-50/year' },
      { id: 'bus-tracker', name: 'Bus Tracker', nameGr: 'Παρακολούθηση Λεωφορείων', description: 'Real-time bus arrivals', path: '/transport', icon: Bus, estimatedTime: 'Instant', fee: '€0' },
      { id: 'bike-sharing', name: 'Bike Sharing', nameGr: 'Κοινόχρηστα Ποδήλατα', description: 'Rent municipal bikes', path: '/services/mobility/bikes', icon: Bike, new: true, estimatedTime: 'Instant', fee: '€1/hour' },
      { id: 'disabled-parking', name: 'Disabled Parking Card', nameGr: 'Κάρτα Στάθμευσης ΑμεΑ', description: 'Apply for disability parking permit', path: '/services/mobility/disabled-parking', icon: Accessibility, estimatedTime: '14-21 days', fee: '€0' },
      { id: 'traffic-fine', name: 'Traffic Fine Payment', nameGr: 'Πληρωμή Κλήσης', description: 'Pay parking and traffic fines', path: '/services/mobility/fines', icon: Receipt, estimatedTime: 'Instant', fee: 'Variable' },
      { id: 'road-closure', name: 'Road Closure Permit', nameGr: 'Άδεια Διακοπής Κυκλοφορίας', description: 'Request temporary road closure', path: '/services/mobility/road-closure', icon: Construction, estimatedTime: '7-14 days', fee: 'Variable' },
      { id: 'ev-charging', name: 'EV Charging Stations', nameGr: 'Σταθμοί Φόρτισης Η/Ο', description: 'Find electric vehicle chargers', path: '/services/mobility/ev-charging', icon: Zap, new: true, estimatedTime: 'Instant', fee: 'Variable' },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. SOCIAL SERVICES & WELFARE (Κοινωνικές Υπηρεσίες)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'social',
    name: 'Social Services',
    nameGr: 'Κοινωνικές Υπηρεσίες',
    icon: HeartPulse,
    color: 'text-rose-600 dark:text-rose-400',
    bgColor: 'bg-rose-50',
    darkBgColor: 'dark:bg-rose-900/20',
    description: 'Social support, welfare programs, and community assistance',
    services: [
      { id: 'social-grocery', name: 'Social Grocery', nameGr: 'Κοινωνικό Παντοπωλείο', description: 'Apply for food assistance', path: '/services/social/grocery', icon: Store, estimatedTime: '7-14 days', fee: '€0' },
      { id: 'social-pharmacy', name: 'Social Pharmacy', nameGr: 'Κοινωνικό Φαρμακείο', description: 'Access free medications', path: '/services/social/pharmacy', icon: Pill, estimatedTime: '7-14 days', fee: '€0' },
      { id: 'home-help', name: 'Home Help Program', nameGr: 'Βοήθεια στο Σπίτι', description: 'Elderly and disabled home assistance', path: '/services/social/home-help', icon: Home, popular: true, estimatedTime: '14-30 days', fee: '€0' },
      { id: 'daycare-elderly', name: 'Elderly Day Care (KAPI)', nameGr: 'ΚΑΠΗ', description: 'Senior citizen day centers', path: '/services/social/kapi', icon: Users, estimatedTime: '7-14 days', fee: '€0' },
      { id: 'disability-support', name: 'Disability Support', nameGr: 'Υποστήριξη ΑμεΑ', description: 'Services for people with disabilities', path: '/services/social/disability', icon: Accessibility, estimatedTime: '14-21 days', fee: '€0' },
      { id: 'homeless-services', name: 'Homeless Services', nameGr: 'Υπηρεσίες Αστέγων', description: 'Shelter and support for homeless', path: '/services/social/homeless', icon: Home, estimatedTime: 'Immediate', fee: '€0' },
      { id: 'refugee-support', name: 'Refugee Support', nameGr: 'Υποστήριξη Προσφύγων', description: 'Integration and assistance services', path: '/services/social/refugees', icon: Users, estimatedTime: '7-14 days', fee: '€0' },
      { id: 'psychological', name: 'Psychological Support', nameGr: 'Ψυχολογική Υποστήριξη', description: 'Free counseling services', path: '/services/social/psychological', icon: HeartPulse, estimatedTime: '3-7 days', fee: '€0' },
      { id: 'legal-aid', name: 'Free Legal Aid', nameGr: 'Δωρεάν Νομική Βοήθεια', description: 'Legal consultation for citizens', path: '/services/social/legal', icon: Scale, estimatedTime: '7-14 days', fee: '€0' },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 7. EDUCATION & YOUTH (Παιδεία & Νεολαία)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'education',
    name: 'Education & Youth',
    nameGr: 'Παιδεία & Νεολαία',
    icon: GraduationCap,
    color: 'text-violet-600 dark:text-violet-400',
    bgColor: 'bg-violet-50',
    darkBgColor: 'dark:bg-violet-900/20',
    description: 'Schools, daycare, youth programs, and educational services',
    services: [
      { id: 'daycare', name: 'Municipal Daycare', nameGr: 'Δημοτικός Παιδικός Σταθμός', description: 'Apply for daycare enrollment', path: '/services/education/daycare', icon: Baby, popular: true, estimatedTime: 'Seasonal', fee: 'Income-based' },
      { id: 'kindergarten', name: 'Kindergarten Registration', nameGr: 'Εγγραφή Νηπιαγωγείου', description: 'Register for public kindergarten', path: '/services/education/kindergarten', icon: GraduationCap, estimatedTime: 'Seasonal', fee: '€0' },
      { id: 'school-meals', name: 'School Meals Program', nameGr: 'Σχολικά Γεύματα', description: 'Apply for free school meals', path: '/services/education/meals', icon: Utensils, estimatedTime: '7-14 days', fee: '€0' },
      { id: 'school-transport', name: 'School Transport', nameGr: 'Σχολική Μεταφορά', description: 'Apply for school bus service', path: '/services/education/transport', icon: Bus, estimatedTime: '14-21 days', fee: '€0' },
      { id: 'youth-card', name: 'Youth Card', nameGr: 'Κάρτα Νέων', description: 'Discounts and benefits for youth', path: '/services/education/youth-card', icon: BadgeCheck, new: true, estimatedTime: '7-14 days', fee: '€0' },
      { id: 'summer-camps', name: 'Summer Camps', nameGr: 'Κατασκηνώσεις', description: 'Municipal summer camp registration', path: '/services/education/camps', icon: Sun, estimatedTime: 'Seasonal', fee: 'Subsidized' },
      { id: 'conservatory', name: 'Municipal Conservatory', nameGr: 'Δημοτικό Ωδείο', description: 'Music school enrollment', path: '/services/education/conservatory', icon: Music, estimatedTime: 'Seasonal', fee: 'Variable' },
      { id: 'library', name: 'Library Services', nameGr: 'Δημοτική Βιβλιοθήκη', description: 'Library card and services', path: '/services/education/library', icon: BookOpen, estimatedTime: 'Instant', fee: '€0' },
      { id: 'sports-programs', name: 'Sports Programs', nameGr: 'Αθλητικά Προγράμματα', description: 'Municipal sports activities', path: '/services/education/sports', icon: Trophy, estimatedTime: 'Seasonal', fee: 'Variable' },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 8. HEALTH & SAFETY (Υγεία & Ασφάλεια)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'health',
    name: 'Health & Safety',
    nameGr: 'Υγεία & Ασφάλεια',
    icon: Stethoscope,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-50',
    darkBgColor: 'dark:bg-red-900/20',
    description: 'Public health, emergency services, and safety programs',
    services: [
      { id: 'health-center', name: 'Municipal Health Center', nameGr: 'Δημοτικό Ιατρείο', description: 'Book medical appointment', path: '/services/health/center', icon: Stethoscope, popular: true, estimatedTime: '1-7 days', fee: '€0' },
      { id: 'vaccination', name: 'Vaccination Programs', nameGr: 'Προγράμματα Εμβολιασμού', description: 'Free vaccination services', path: '/services/health/vaccination', icon: Pill, estimatedTime: '1-3 days', fee: '€0' },
      { id: 'blood-donation', name: 'Blood Donation', nameGr: 'Αιμοδοσία', description: 'Find blood donation events', path: '/services/health/blood', icon: HeartPulse, estimatedTime: 'Instant', fee: '€0' },
      { id: 'emergency', name: 'Emergency Contacts', nameGr: 'Τηλέφωνα Έκτακτης Ανάγκης', description: 'Quick access to emergency numbers', path: '/services/health/emergency', icon: Siren, estimatedTime: 'Instant', fee: '€0' },
      { id: 'civil-protection', name: 'Civil Protection', nameGr: 'Πολιτική Προστασία', description: 'Emergency alerts and preparedness', path: '/services/health/civil-protection', icon: Shield, estimatedTime: 'Instant', fee: '€0' },
      { id: 'fire-safety', name: 'Fire Safety Certificate', nameGr: 'Πιστοποιητικό Πυρασφάλειας', description: 'Fire safety inspection request', path: '/services/health/fire-safety', icon: Flame, estimatedTime: '14-30 days', fee: 'Variable' },
      { id: 'food-inspection', name: 'Food Safety Report', nameGr: 'Αναφορά Υγειονομικού Ελέγχου', description: 'Report food safety concerns', path: '/services/health/food-inspection', icon: AlertTriangle, estimatedTime: '3-7 days', fee: '€0' },
      { id: 'noise-complaint', name: 'Noise Complaint', nameGr: 'Καταγγελία Θορύβου', description: 'Report noise violations', path: '/services/health/noise', icon: AlertTriangle, estimatedTime: '1-3 days', fee: '€0' },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 9. CULTURE & EVENTS (Πολιτισμός & Εκδηλώσεις)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'culture',
    name: 'Culture & Events',
    nameGr: 'Πολιτισμός',
    icon: Palette,
    color: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-50',
    darkBgColor: 'dark:bg-pink-900/20',
    description: 'Cultural events, venues, and artistic programs',
    services: [
      { id: 'events-calendar', name: 'Events Calendar', nameGr: 'Ημερολόγιο Εκδηλώσεων', description: 'Discover local events', path: '/services/culture/events', icon: Calendar, popular: true, estimatedTime: 'Instant', fee: '€0' },
      { id: 'venue-booking', name: 'Venue Booking', nameGr: 'Κράτηση Χώρου', description: 'Book municipal venues', path: '/services/culture/venues', icon: Building, estimatedTime: '7-14 days', fee: 'Variable' },
      { id: 'theater', name: 'Municipal Theater', nameGr: 'Δημοτικό Θέατρο', description: 'Theater tickets and programs', path: '/services/culture/theater', icon: Music, estimatedTime: 'Instant', fee: 'Variable' },
      { id: 'museum', name: 'Municipal Museums', nameGr: 'Δημοτικά Μουσεία', description: 'Museum information and tickets', path: '/services/culture/museums', icon: Landmark, estimatedTime: 'Instant', fee: 'Variable' },
      { id: 'art-classes', name: 'Art Classes', nameGr: 'Μαθήματα Τέχνης', description: 'Painting, sculpture, crafts', path: '/services/culture/art', icon: Palette, estimatedTime: 'Seasonal', fee: 'Variable' },
      { id: 'dance-classes', name: 'Dance Classes', nameGr: 'Μαθήματα Χορού', description: 'Traditional and modern dance', path: '/services/culture/dance', icon: Music, estimatedTime: 'Seasonal', fee: 'Variable' },
      { id: 'event-permit', name: 'Event Permit', nameGr: 'Άδεια Εκδήλωσης', description: 'Organize public event', path: '/services/culture/event-permit', icon: FileCheck, estimatedTime: '14-30 days', fee: 'Variable' },
      { id: 'film-permit', name: 'Film Permit', nameGr: 'Άδεια Κινηματογράφησης', description: 'Filming in public spaces', path: '/services/culture/film', icon: Camera, estimatedTime: '7-14 days', fee: 'Variable' },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 10. UTILITIES & INFRASTRUCTURE (Υποδομές & Δίκτυα)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'utilities',
    name: 'Utilities',
    nameGr: 'Υποδομές',
    icon: Zap,
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-50',
    darkBgColor: 'dark:bg-yellow-900/20',
    description: 'Water, electricity, street lighting, and infrastructure',
    services: [
      { id: 'water-supply', name: 'Water Supply Issues', nameGr: 'Προβλήματα Ύδρευσης', description: 'Report water supply problems', path: '/services/utilities/water', icon: Droplets, estimatedTime: '1-3 days', fee: '€0' },
      { id: 'street-lighting', name: 'Street Lighting', nameGr: 'Δημοτικός Φωτισμός', description: 'Report broken street lights', path: '/services/utilities/lighting', icon: Lightbulb, popular: true, estimatedTime: '3-7 days', fee: '€0' },
      { id: 'pothole', name: 'Pothole Report', nameGr: 'Αναφορά Λακκούβας', description: 'Report road damage', path: '/services/utilities/pothole', icon: AlertTriangle, popular: true, estimatedTime: '7-14 days', fee: '€0' },
      { id: 'sidewalk-repair', name: 'Sidewalk Repair', nameGr: 'Επισκευή Πεζοδρομίου', description: 'Report sidewalk damage', path: '/services/utilities/sidewalk', icon: Construction, estimatedTime: '14-30 days', fee: '€0' },
      { id: 'drainage', name: 'Drainage Issues', nameGr: 'Προβλήματα Αποχέτευσης', description: 'Report drainage problems', path: '/services/utilities/drainage', icon: Waves, estimatedTime: '3-7 days', fee: '€0' },
      { id: 'public-wifi', name: 'Public WiFi', nameGr: 'Δημόσιο WiFi', description: 'Find free WiFi hotspots', path: '/services/utilities/wifi', icon: Wifi, estimatedTime: 'Instant', fee: '€0' },
      { id: 'excavation-permit', name: 'Excavation Permit', nameGr: 'Άδεια Εκσκαφής', description: 'Road excavation authorization', path: '/services/utilities/excavation', icon: HardHat, estimatedTime: '14-21 days', fee: 'Variable' },
      { id: 'weather-alerts', name: 'Weather Alerts', nameGr: 'Καιρικές Προειδοποιήσεις', description: 'Severe weather notifications', path: '/services/utilities/weather', icon: CloudRain, estimatedTime: 'Instant', fee: '€0' },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 11. ANIMALS & PETS (Ζώα & Κατοικίδια)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'animals',
    name: 'Animals & Pets',
    nameGr: 'Ζώα',
    icon: Dog,
    color: 'text-teal-600 dark:text-teal-400',
    bgColor: 'bg-teal-50',
    darkBgColor: 'dark:bg-teal-900/20',
    description: 'Pet registration, stray animals, and animal welfare',
    services: [
      { id: 'pet-registration', name: 'Pet Registration', nameGr: 'Δήλωση Κατοικίδιου', description: 'Register your pet', path: '/services/animals/register', icon: Dog, popular: true, estimatedTime: '3-7 days', fee: '€0' },
      { id: 'stray-adoption', name: 'Stray Animal Adoption', nameGr: 'Υιοθεσία Αδέσποτου', description: 'Adopt a stray animal', path: '/animals', icon: Heart, popular: true, estimatedTime: '7-14 days', fee: '€0' },
      { id: 'stray-report', name: 'Report Stray Animal', nameGr: 'Αναφορά Αδέσποτου', description: 'Report stray animals', path: '/services/animals/report', icon: AlertTriangle, estimatedTime: '1-3 days', fee: '€0' },
      { id: 'animal-abuse', name: 'Report Animal Abuse', nameGr: 'Καταγγελία Κακοποίησης', description: 'Report animal mistreatment', path: '/services/animals/abuse', icon: AlertTriangle, estimatedTime: 'Immediate', fee: '€0' },
      { id: 'vet-services', name: 'Municipal Vet Services', nameGr: 'Δημοτικό Κτηνιατρείο', description: 'Free vet services for strays', path: '/services/animals/vet', icon: Stethoscope, estimatedTime: '1-7 days', fee: '€0' },
      { id: 'dog-park', name: 'Dog Parks', nameGr: 'Πάρκα Σκύλων', description: 'Find dog-friendly parks', path: '/services/animals/parks', icon: TreePine, estimatedTime: 'Instant', fee: '€0' },
      { id: 'lost-found', name: 'Lost & Found Pets', nameGr: 'Χαμένα & Βρεθέντα', description: 'Report or find lost pets', path: '/services/animals/lost-found', icon: Dog, estimatedTime: 'Instant', fee: '€0' },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 12. CITIZEN PARTICIPATION (Συμμετοχή Πολιτών)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'participation',
    name: 'Citizen Participation',
    nameGr: 'Συμμετοχή Πολιτών',
    icon: Vote,
    color: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-50',
    darkBgColor: 'dark:bg-cyan-900/20',
    description: 'Participate in local democracy and community decisions',
    services: [
      { id: 'participatory-budget', name: 'Participatory Budget', nameGr: 'Συμμετοχικός Προϋπολογισμός', description: 'Vote on budget priorities', path: '/services/participation/budget', icon: PiggyBank, new: true, estimatedTime: 'Seasonal', fee: '€0' },
      { id: 'public-consultation', name: 'Public Consultations', nameGr: 'Δημόσιες Διαβουλεύσεις', description: 'Participate in policy discussions', path: '/services/participation/consultations', icon: Megaphone, estimatedTime: 'Instant', fee: '€0' },
      { id: 'petition', name: 'Submit Petition', nameGr: 'Υποβολή Αναφοράς', description: 'Submit citizen petition', path: '/services/participation/petition', icon: FileText, estimatedTime: '14-30 days', fee: '€0' },
      { id: 'council-meetings', name: 'Council Meetings', nameGr: 'Συνεδριάσεις Δ.Σ.', description: 'Watch council meetings live', path: '/services/participation/council', icon: Users, estimatedTime: 'Instant', fee: '€0' },
      { id: 'volunteer', name: 'Volunteer Registry', nameGr: 'Μητρώο Εθελοντών', description: 'Join volunteer programs', path: '/volunteer', icon: Heart, popular: true, estimatedTime: '3-7 days', fee: '€0' },
      { id: 'neighborhood-committee', name: 'Neighborhood Committee', nameGr: 'Συμβούλιο Γειτονιάς', description: 'Join local committee', path: '/services/participation/neighborhood', icon: Users, estimatedTime: '7-14 days', fee: '€0' },
      { id: 'idea-submission', name: 'Submit Idea', nameGr: 'Υποβολή Ιδέας', description: 'Propose improvements', path: '/services/participation/ideas', icon: Lightbulb, new: true, estimatedTime: 'Instant', fee: '€0' },
      { id: 'satisfaction-survey', name: 'Satisfaction Survey', nameGr: 'Έρευνα Ικανοποίησης', description: 'Rate municipal services', path: '/services/participation/survey', icon: ClipboardList, estimatedTime: 'Instant', fee: '€0' },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 13. PAYMENTS & FINANCES (Πληρωμές & Οικονομικά)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'payments',
    name: 'Payments',
    nameGr: 'Πληρωμές',
    icon: CreditCard,
    color: 'text-slate-600 dark:text-slate-400',
    bgColor: 'bg-slate-50',
    darkBgColor: 'dark:bg-slate-900/20',
    description: 'Pay municipal fees, taxes, and fines',
    services: [
      { id: 'pay-all', name: 'Pay Municipal Fees', nameGr: 'Πληρωμή Τελών', description: 'One-stop payment portal', path: '/payments', icon: CreditCard, popular: true, estimatedTime: 'Instant', fee: 'Variable' },
      { id: 'property-tax-pay', name: 'Property Tax Payment', nameGr: 'Πληρωμή ΤΑΠ', description: 'Pay property taxes', path: '/services/payments/property-tax', icon: Home, estimatedTime: 'Instant', fee: 'Variable' },
      { id: 'cleaning-fee', name: 'Cleaning Fee', nameGr: 'Τέλη Καθαριότητας', description: 'Pay cleaning fees', path: '/services/payments/cleaning', icon: Trash2, estimatedTime: 'Instant', fee: 'Variable' },
      { id: 'water-bill', name: 'Water Bill', nameGr: 'Λογαριασμός Ύδρευσης', description: 'Pay water bills', path: '/services/payments/water', icon: Droplets, estimatedTime: 'Instant', fee: 'Variable' },
      { id: 'cemetery-fees', name: 'Cemetery Fees', nameGr: 'Τέλη Κοιμητηρίου', description: 'Pay cemetery fees', path: '/services/payments/cemetery', icon: Cross, estimatedTime: 'Instant', fee: 'Variable' },
      { id: 'fine-payment', name: 'Fine Payment', nameGr: 'Πληρωμή Προστίμου', description: 'Pay municipal fines', path: '/services/payments/fines', icon: Receipt, estimatedTime: 'Instant', fee: 'Variable' },
      { id: 'debt-certificate', name: 'Debt Certificate', nameGr: 'Βεβαίωση Οφειλών', description: 'Get debt-free certificate', path: '/services/payments/debt-cert', icon: FileCheck, estimatedTime: '1-3 days', fee: '€0' },
      { id: 'payment-plan', name: 'Payment Plan', nameGr: 'Διακανονισμός Οφειλών', description: 'Arrange payment installments', path: '/services/payments/plan', icon: HandCoins, estimatedTime: '7-14 days', fee: '€0' },
    ]
  },
];

// Helper function to get all services flattened
export const getAllServices = (): (ServiceItem & { categoryId: string; categoryName: string })[] => {
  return serviceCategories.flatMap(cat => 
    cat.services.map(service => ({
      ...service,
      categoryId: cat.id,
      categoryName: cat.name
    }))
  );
};

// Helper function to get popular services
export const getPopularServices = () => {
  return getAllServices().filter(s => s.popular);
};

// Helper function to get new services
export const getNewServices = () => {
  return getAllServices().filter(s => s.new);
};

// Helper function to search services
export const searchServices = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return getAllServices().filter(s => 
    s.name.toLowerCase().includes(lowerQuery) ||
    s.nameGr.toLowerCase().includes(lowerQuery) ||
    s.description.toLowerCase().includes(lowerQuery)
  );
};
