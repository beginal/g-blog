import Image from "next/image";

interface ProfileBackgroundProps {
  show?: boolean;
}

export default function ProfileBackground({ show = true }: ProfileBackgroundProps) {
  if (!show) return null;

  return (
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
  );
}