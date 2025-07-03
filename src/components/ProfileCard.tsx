import React from 'react';
import { Mail, Phone, Github, Home } from 'lucide-react';

const ProfileCard: React.FC<{ userStats: { level: number; xp: number; xpToNextLevel: number } }> = ({ userStats }) => {
  const xpPercentage = (userStats.xp / userStats.xpToNextLevel) * 100;

  return (
    <div className="bg-[#3a404d] rounded-2xl shadow-lg text-white h-full border border-[#3a404d] overflow-hidden flex flex-col">
      <div className="flex-shrink-0">
        <img
          src="https://source.unsplash.com/random/600x450/?abstract,gradient"
          alt="프로필 배경"
          className="w-full h-auto object-cover"
          onError={e => {
            e.currentTarget.src = "https://placehold.co/600x450/262b33/ffffff?text=Image+Not+Found";
          }}
        />
      </div>
      <div className="p-8 flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-white">Your Name</h2>
          <div className="text-center">
            <div className="text-xs text-white/70">LEVEL</div>
            <div className="text-2xl font-bold text-[#6ee7b7]">{userStats.level}</div>
          </div>
        </div>
        {/* XP Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-white/80 mb-1">
            <span>XP</span>
            <span>
              {userStats.xp} / {userStats.xpToNextLevel}
            </span>
          </div>
          <div className="w-full bg-[#2c313a] rounded-full h-2.5">
            <div className="bg-[#6ee7b7] h-2.5 rounded-full transition-all duration-500" style={{ width: `${xpPercentage}%` }}></div>
          </div>
        </div>
        <p className="text-lg text-white/90 mb-6">Frontend Developer</p>
        <div className="space-y-2 text-left w-full">
          <a
            href="mailto:your.email@example.com"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            <Mail className="w-5 h-5 text-white/80" />
            <span>your.email@example.com</span>
          </a>
          <div className="flex items-center space-x-3 p-2 rounded-lg">
            <Phone className="w-5 h-5 text-white/80" />
            <span>010-1234-5678</span>
          </div>
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            <Github className="w-5 h-5 text-white/80" />
            <span>github.com/your-github</span>
          </a>
          <a
            href="https://your-blog.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            <Home className="w-5 h-5 text-white/80" />
            <span>your-blog.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
