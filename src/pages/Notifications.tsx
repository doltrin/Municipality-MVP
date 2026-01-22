import React, { useMemo } from 'react';
import { ArrowLeft, AlertTriangle, Info, Bell, CheckCheck, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../stores';

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const notifications = useAppStore((s) => s.notifications);
  const unreadCount = useAppStore((s) => s.unreadCount);
  const markAsRead = useAppStore((s) => s.markAsRead);
  const markAllAsRead = useAppStore((s) => s.markAllAsRead);

  const viewModels = useMemo(() => {
    const formatTime = (iso: string) => {
      const date = new Date(iso);
      if (Number.isNaN(date.getTime())) return '';
      return date.toLocaleString(undefined, {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    const metaForType = (type: string) => {
      switch (type) {
        case 'success':
          return { icon: CheckCircle, color: 'text-emerald-600 bg-emerald-100', darkColor: 'dark:text-emerald-400 dark:bg-emerald-900/30' };
        case 'warning':
          return { icon: AlertTriangle, color: 'text-amber-600 bg-amber-100', darkColor: 'dark:text-amber-400 dark:bg-amber-900/30' };
        case 'error':
          return { icon: AlertTriangle, color: 'text-red-600 bg-red-100', darkColor: 'dark:text-red-400 dark:bg-red-900/30' };
        case 'info':
        default:
          return { icon: Info, color: 'text-blue-600 bg-blue-100', darkColor: 'dark:text-blue-400 dark:bg-blue-900/30' };
      }
    };

    return notifications.map((n) => {
      const meta = metaForType(n.type);
      return {
        ...n,
        time: formatTime(n.createdAt),
        icon: meta.icon,
        color: meta.color,
        darkColor: meta.darkColor,
      };
    });
  }, [notifications]);

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-surface-dark px-6 pt-12 pb-4 sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)} 
              className="text-zinc-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-white transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{unreadCount} unread</p>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
              aria-label="Mark all notifications as read"
            >
              <CheckCheck size={16} />
              Mark all read
            </button>
          )}
        </div>
      </header>

      <main className="p-4 space-y-3">
        {viewModels.length === 0 ? (
          <div className="text-center py-16">
            <Bell size={48} className="mx-auto text-zinc-300 dark:text-zinc-600 mb-4" />
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">No notifications</p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">You're all caught up!</p>
          </div>
        ) : (
          viewModels.map((notif) => (
            <button 
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`w-full text-left bg-white dark:bg-surface-dark p-4 rounded-2xl border flex gap-4 transition-all active:scale-[0.99] ${
                notif.read 
                  ? 'border-zinc-200 dark:border-zinc-700' 
                  : 'border-accent/30 dark:border-accent/20 bg-accent/5 dark:bg-accent/10'
              }`}
              aria-label={`${notif.read ? '' : 'Unread: '}${notif.title}`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.color} ${notif.darkColor}`}>
                <notif.icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`font-bold text-sm ${
                    notif.read ? 'text-slate-800 dark:text-white' : 'text-accent'
                  }`}>{notif.title}</h3>
                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                  )}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1 line-clamp-2">{notif.message}</p>
                <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mt-2 block">{notif.time}</span>
              </div>
            </button>
          ))
        )}
      </main>
    </div>
  );
};

export default Notifications;
