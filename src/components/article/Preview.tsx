import Image from 'next/image';
import Link from 'next/link';

export const ArticlePreview = ({
  title,
  thumbnail,
  description,
  url,
}: {
  title: string;
  thumbnail: string;
  description: string;
  url: string;
}) => {
  return (
    <Link href={url}>
      <div className="w-full max-h-[150px] flex border border-primary-fg rounded-lg hover:bg-active-bg overflow-hidden">
        <div className="hidden md:block w-[150px] min-w-[150px]">
          <Image
            src={thumbnail}
            alt={`${title} article thumbnail`}
            width={150}
            height={150}
          />
        </div>
        <div className="w-full md:w-[calc(100%-150px)] p-2">
          <h2 className="w-full text-[20px] md:text-[30px] text-secondary-fg text-ellipsis line-clamp-4 md:truncate">
            {title}
          </h2>
          <p className="hidden md:block text-ellipsis line-clamp-4">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};
