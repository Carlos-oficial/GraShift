import ResponsiveAvatar from "./UserAvatar";

type ProfileHeaderProps = {
  imageSrc: string;
  name: string;
  username: string;
  outfitCount: number;
};

export default function ProfileHeader({
  imageSrc,
  name,
  username,
  outfitCount,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 p-4 md:p-6">
      <ResponsiveAvatar imageSrc={imageSrc} />

      <div className="text-center sm:text-left">
        <h1 className="text-xl md:text-2xl font-semibold">{name}</h1>
        <p className="text-gray-500">@{username}</p>
        <p className="mt-2 text-sm text-gray-700">
          {outfitCount} {outfitCount === 1 ? "outfit" : "outfits"} in closet
        </p>
      </div>
    </div>
  );
}
