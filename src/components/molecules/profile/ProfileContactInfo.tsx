import { Mail, Phone, Github, Home } from "lucide-react";
import { PROFILE_CONFIG } from "@/config";

interface ProfileContactInfoProps {
  show?: boolean;
  maxItems?: number;
  layout?: 'default' | 'compact';
}

export default function ProfileContactInfo({ 
  show = true, 
  maxItems = 4, 
  layout = 'default' 
}: ProfileContactInfoProps) {
  if (!show) return null;

  const contactItems = [
    {
      icon: Mail,
      label: PROFILE_CONFIG.email,
      href: `mailto:${PROFILE_CONFIG.email}`,
      isClickable: true
    },
    {
      icon: Phone,
      label: PROFILE_CONFIG.phone,
      href: null,
      isClickable: false
    },
    {
      icon: Github,
      label: PROFILE_CONFIG.github.replace('https://', ''),
      href: PROFILE_CONFIG.github,
      isClickable: true
    },
    {
      icon: Home,
      label: PROFILE_CONFIG.website.replace('https://', ''),
      href: PROFILE_CONFIG.website,
      isClickable: true
    }
  ].slice(0, maxItems);

  const compactSpacing = layout === 'compact' ? 'space-y-1' : 'space-y-2';
  const compactPadding = layout === 'compact' ? 'p-2' : 'p-3';
  const compactTextSize = layout === 'compact' ? 'text-xs sm:text-sm' : 'text-sm sm:text-base';

  return (
    <div className={compactSpacing}>
      {contactItems.map((item, index) => {
        const Icon = item.icon;
        const content = (
          <>
            <Icon className="w-4 h-4 text-white/80 group-hover:text-[#6ee7b7] transition-colors flex-shrink-0" />
            <span className={`${compactTextSize} truncate`}>{item.label}</span>
          </>
        );

        if (item.isClickable && item.href) {
          return (
            <a
              key={index}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`flex items-center space-x-2 ${compactPadding} rounded-lg hover:bg-white/10 transition-all duration-200 group`}
            >
              {content}
            </a>
          );
        }

        return (
          <div key={index} className={`flex items-center space-x-2 ${compactPadding} rounded-lg`}>
            {content}
          </div>
        );
      })}
    </div>
  );
}