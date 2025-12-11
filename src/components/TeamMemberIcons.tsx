import React from 'react';
import { motion } from 'framer-motion';
import { useTeamStore } from '../stores';

// ============================================
// Team Member Icons - Displays team avatars in header
// ============================================

export const TeamMemberIcons: React.FC = () => {
  const { members, selectMember } = useTeamStore();

  // Colors for each member avatar
  const avatarColors = [
    'from-violet-500 to-purple-600',
    'from-blue-500 to-cyan-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-pink-500 to-rose-600',
  ];

  return (
    <div className="flex items-center -space-x-2">
      {members.map((member, index) => (
        <motion.button
          key={member.id}
          onClick={() => selectMember(member)}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center 
            text-white text-xs font-bold shadow-md
            bg-gradient-to-br ${avatarColors[index % avatarColors.length]}
            border-2 border-white dark:border-zinc-900
            hover:scale-110 hover:z-10 transition-transform
            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
          `}
          style={{ zIndex: members.length - index }}
          whileHover={{ scale: 1.15, zIndex: 20 }}
          whileTap={{ scale: 0.95 }}
          title={member.name}
          aria-label={`Team member: ${member.name}`}
        >
          {member.name.charAt(0)}
        </motion.button>
      ))}
    </div>
  );
};

export default TeamMemberIcons;
