import { Mail, Phone, Github, Home } from "lucide-react";
import { PROFILE_CONFIG } from "@/config";

interface ProfileContactInfoProps {
  show?: boolean;
}

export default function ProfileContactInfo({ show = true }: ProfileContactInfoProps) {
  if (!show) return null;

  return (
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
  );
}