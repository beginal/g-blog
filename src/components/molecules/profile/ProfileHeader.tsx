import { MapPin, Calendar } from "lucide-react";
import { PROFILE_CONFIG } from "@/config";

export default function ProfileHeader() {
  return (
    <div className="mb-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        {PROFILE_CONFIG.name}
      </h2>
      <p className="text-lg text-white/90 mb-2">
        {PROFILE_CONFIG.title}
      </p>
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
  );
}