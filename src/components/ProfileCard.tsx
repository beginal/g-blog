import React, { memo } from 'react';
import { Mail, Phone, Github, Home, MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/config';
import type { ProfileCardProps } from '@/types';

const ProfileCard: React.FC<ProfileCardProps> = memo(({ 
  className, 
  variant = 'default',
  showBackground = true,
  showContactInfo = true 
}) => {
  const baseClasses = 'bg-[#3a404d] rounded-2xl shadow-lg text-white border border-[#3a404d] overflow-hidden flex flex-col animate-fade-in';
  const variantClasses = {
    default: 'h-full',
    compact: 'h-auto',
    minimal: 'bg-transparent border-none shadow-none'
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {showBackground && (
        <div className="flex-shrink-0 relative">
        <Image
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=450&fit=crop&auto=format"
          alt="프로필 배경"
          width={600}
          height={450}
          className="w-full h-48 sm:h-64 md:h-auto object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDYwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjM2E0MDRkIi8+Cjwvc3ZnPgo="
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3a404d] via-transparent to-transparent"></div>
        </div>
      )}
      <div className="p-6 sm:p-8 flex-grow">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{PROFILE_CONFIG.name}</h2>
          <p className="text-lg text-white/90 mb-2">{PROFILE_CONFIG.title}</p>
          <div className="flex items-center space-x-4 text-sm text-white/70">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{PROFILE_CONFIG.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{PROFILE_CONFIG.status}</span>
            </div>
          </div>
        </div>
        
        {showContactInfo && (
          <div className="space-y-2">
          <a
            href={`mailto:${PROFILE_CONFIG.email}`}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
          >
            <Mail className="w-5 h-5 text-white/80 group-hover:text-[#6ee7b7] transition-colors" />
            <span className="text-sm sm:text-base truncate">{PROFILE_CONFIG.email}</span>
          </a>
          <div className="flex items-center space-x-3 p-3 rounded-lg">
            <Phone className="w-5 h-5 text-white/80" />
            <span className="text-sm sm:text-base">{PROFILE_CONFIG.phone}</span>
          </div>
          <a
            href={PROFILE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
          >
            <Github className="w-5 h-5 text-white/80 group-hover:text-[#6ee7b7] transition-colors" />
            <span className="text-sm sm:text-base">{PROFILE_CONFIG.github.replace('https://', '')}</span>
          </a>
          <a
            href={PROFILE_CONFIG.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
          >
            <Home className="w-5 h-5 text-white/80 group-hover:text-[#6ee7b7] transition-colors" />
            <span className="text-sm sm:text-base">{PROFILE_CONFIG.website.replace('https://', '')}</span>
          </a>
          </div>
        )}
      </div>
    </div>
  );
});

ProfileCard.displayName = 'ProfileCard';

export default ProfileCard;
