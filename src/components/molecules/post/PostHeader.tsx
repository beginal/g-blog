interface PostHeaderProps {
  title: string;
  date: string;
  tags?: string[];
}

const TITLE_CLASSES = "text-3xl sm:text-4xl font-bold mb-4 leading-tight";
const DATE_CLASSES = "text-white/60 text-sm text-center";
const TAG_CLASSES = "px-2 py-1 bg-[#3a404d] rounded-full text-xs";

export default function PostHeader({ title, date, tags }: PostHeaderProps) {
  const hasTags = tags && tags.length > 0;

  return (
    <div className="text-center mb-8">
      <h1 className={TITLE_CLASSES}>{title}</h1>
      <div className="space-y-2">
        <div className={DATE_CLASSES}>
          <span>{date}</span>
        </div>
        {hasTags && (
          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag, index) => (
              <span key={index} className={TAG_CLASSES}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}