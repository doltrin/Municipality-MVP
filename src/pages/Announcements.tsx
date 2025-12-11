import React from 'react';
import { ArrowLeft, Droplets, AlertTriangle, Clock, MapPin, Calendar, Bell, ChevronRight, Zap, Construction, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Announcement {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  type: 'warning' | 'info' | 'urgent';
  icon: React.ElementType;
  date: string;
  time?: string;
  location?: string;
  affectedAreas?: string[];
}

const Announcements: React.FC = () => {
  const navigate = useNavigate();

  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'Water Supply Notice',
      description: 'Scheduled maintenance on Dec 8th, 09:00-14:00 in Kypseli area.',
      fullContent: 'Due to scheduled maintenance work on the main water pipeline, water supply will be temporarily interrupted in the Kypseli area. Please store sufficient water for your needs during this period. We apologize for any inconvenience caused.',
      type: 'warning',
      icon: Droplets,
      date: 'Dec 8, 2025',
      time: '09:00 - 14:00',
      location: 'Kypseli District',
      affectedAreas: ['Fokionos Negri', 'Patision Ave (120-180)', 'Kypselis Square', 'Evelpidon Street']
    },
    {
      id: '2',
      title: 'Power Outage Scheduled',
      description: 'Electrical maintenance on Dec 10th affecting Pagrati area.',
      fullContent: 'DEDDIE will perform scheduled electrical maintenance to upgrade the local grid infrastructure. Power will be restored as soon as work is completed.',
      type: 'warning',
      icon: Zap,
      date: 'Dec 10, 2025',
      time: '08:00 - 12:00',
      location: 'Pagrati District',
      affectedAreas: ['Ymittou Ave', 'Plastira Square', 'Filolaou Street']
    },
    {
      id: '3',
      title: 'Road Works - Alexandras Ave',
      description: 'Lane closures for road resurfacing until Dec 15th.',
      fullContent: 'Road resurfacing works are in progress on Alexandras Avenue. One lane will remain open in each direction. Please use alternative routes if possible to avoid delays.',
      type: 'info',
      icon: Construction,
      date: 'Until Dec 15, 2025',
      location: 'Alexandras Avenue',
      affectedAreas: ['Alexandras Ave (Ambelokipi to Goudi)', 'Panormou Junction']
    },
    {
      id: '4',
      title: 'Waste Collection Change',
      description: 'Modified schedule for holiday period Dec 24-26.',
      fullContent: 'During the Christmas holiday period, waste collection schedules will be modified. Please check the updated schedule for your area and ensure bins are placed outside by 6:00 AM.',
      type: 'info',
      icon: Trash2,
      date: 'Dec 24-26, 2025',
      location: 'All Districts'
    },
    {
      id: '5',
      title: 'Emergency: Gas Leak Repair',
      description: 'Urgent repair work in Exarchia - avoid the area.',
      fullContent: 'Emergency repair work is underway to fix a gas leak on Stournari Street. The area has been cordoned off for safety. Please avoid the area until further notice.',
      type: 'urgent',
      icon: AlertTriangle,
      date: 'Now',
      location: 'Exarchia - Stournari Street'
    }
  ];

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'urgent':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800/50',
          iconBg: 'bg-red-100 dark:bg-red-900/50',
          iconColor: 'text-red-600 dark:text-red-400',
          badge: 'bg-red-600 text-white',
          badgeText: 'URGENT'
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 dark:bg-amber-900/20',
          border: 'border-amber-200 dark:border-amber-800/50',
          iconBg: 'bg-amber-100 dark:bg-amber-900/50',
          iconColor: 'text-amber-600 dark:text-amber-400',
          badge: 'bg-amber-500 text-white',
          badgeText: 'NOTICE'
        };
      default:
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800/50',
          iconBg: 'bg-blue-100 dark:bg-blue-900/50',
          iconColor: 'text-blue-600 dark:text-blue-400',
          badge: 'bg-blue-500 text-white',
          badgeText: 'INFO'
        };
    }
  };

  const [selectedAnnouncement, setSelectedAnnouncement] = React.useState<Announcement | null>(null);

  if (selectedAnnouncement) {
    const styles = getTypeStyles(selectedAnnouncement.type);
    const Icon = selectedAnnouncement.icon;
    
    return (
      <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark">
        {/* Header */}
        <div className={`${styles.bg} ${styles.border} border-b px-6 pt-12 pb-6`}>
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setSelectedAnnouncement(null)} className="text-zinc-600 dark:text-zinc-400">
              <ArrowLeft size={24} />
            </button>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${styles.badge}`}>
              {styles.badgeText}
            </span>
          </div>
          
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 ${styles.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
              <Icon size={28} className={styles.iconColor} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">{selectedAnnouncement.title}</h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{selectedAnnouncement.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 pb-24 space-y-4">
          {/* Details Card */}
          <div className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4 space-y-4">
            {selectedAnnouncement.date && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                  <Calendar size={20} className="text-zinc-500" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Date</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{selectedAnnouncement.date}</p>
                </div>
              </div>
            )}
            
            {selectedAnnouncement.time && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                  <Clock size={20} className="text-zinc-500" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Time</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{selectedAnnouncement.time}</p>
                </div>
              </div>
            )}
            
            {selectedAnnouncement.location && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-zinc-500" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Location</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{selectedAnnouncement.location}</p>
                </div>
              </div>
            )}
          </div>

          {/* Full Content */}
          <div className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Details</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {selectedAnnouncement.fullContent}
            </p>
          </div>

          {/* Affected Areas */}
          {selectedAnnouncement.affectedAreas && (
            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4">
              <h3 className="font-bold text-slate-900 dark:text-white mb-3">Affected Areas</h3>
              <div className="space-y-2">
                {selectedAnnouncement.affectedAreas.map((area, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                    {area}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2">
            <button className="w-full bg-accent text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
              <Bell size={18} />
              Get Notified When Resolved
            </button>
            <button className="w-full bg-zinc-100 dark:bg-zinc-800 text-slate-900 dark:text-white py-3 rounded-xl font-semibold">
              Share This Notice
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-surface-dark px-6 pt-12 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate(-1)} className="text-zinc-500 dark:text-zinc-400">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Announcements</h1>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 ml-9">Service alerts and important notices</p>
      </div>

      {/* Announcements List */}
      <div className="flex-1 p-4 space-y-3">
        {announcements.map((announcement) => {
          const styles = getTypeStyles(announcement.type);
          const Icon = announcement.icon;
          
          return (
            <button
              key={announcement.id}
              onClick={() => setSelectedAnnouncement(announcement)}
              className={`w-full text-left ${styles.bg} ${styles.border} border rounded-2xl p-4 active:scale-[0.98] transition-transform`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 ${styles.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon size={24} className={styles.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm truncate">{announcement.title}</h3>
                    {announcement.type === 'urgent' && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-600 text-white shrink-0">
                        URGENT
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">{announcement.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-zinc-500 dark:text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {announcement.date}
                    </span>
                    {announcement.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {announcement.location}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight size={20} className="text-zinc-300 dark:text-zinc-600 shrink-0" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Announcements;
