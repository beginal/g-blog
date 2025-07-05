import { MapPin, Calendar } from "lucide-react";
import { PROFILE_CONFIG } from "@/config";

export default function ProfileHeader() {
  return (
    <div className="mb-4 px-2">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
        {PROFILE_CONFIG.name}
      </h2>
      <p className="text-base text-white/90 mb-2">
        {PROFILE_CONFIG.title}
      </p>
      <div className="flex items-center space-x-3 text-xs text-white/70">
        <div className="flex items-center space-x-1">
          <MapPin className="w-3 h-3" />
          <span>{PROFILE_CONFIG.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>{PROFILE_CONFIG.status}</span>
        </div>
      </div>
    </div>
  );
}