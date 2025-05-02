import Image from "next/image";

type AvatarProps = {
  imageSrc: string;
  alt?: string;
  sizeClass?: string; // Tailwind sizing overrides if needed
};

export default function ResponsiveAvatar({
  imageSrc,
  alt = "User Avatar",
  sizeClass = "w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-[180px] lg:h-[180px]",
}: AvatarProps) {
  return (
    <div className={`rounded-full overflow-hidden ${sizeClass} min-w-[24px] min-h-[24px]`}>
      <Image
        src={imageSrc}
        alt={alt}
        width={400}
        height={400}
        className="object-cover w-full h-full"
        priority
      />
    </div>
  );
}
