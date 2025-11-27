'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface AchievementBadgeProps {
  icon: string;
  name: string;
  description: string;
  unlocked: boolean;
  className?: string;
}

export function AchievementBadge({ icon, name, description, unlocked, className }: AchievementBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: unlocked ? 1 : 0.5, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={className}
    >
      <Badge
        variant={unlocked ? 'cyberpunk' : 'outline'}
        className={`flex flex-col items-center gap-1 p-3 h-auto ${unlocked ? '' : 'opacity-50'}`}
        title={description}
      >
        <span className="text-2xl">{icon}</span>
        <span className="text-xs font-mono">{name}</span>
      </Badge>
    </motion.div>
  );
}

