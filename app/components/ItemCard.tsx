'use client';

import Link from 'next/link';
import Image from 'next/image';

type ItemCardProps = {
  id: string;
  title: string;
  imageUrl: string;
};

export default function ItemCard({ id, title, imageUrl }: ItemCardProps) {
  return (
    <Link
      href={`/items/${id}`}
      className="block col-span-1 hover:shadow-md transition-shadow"
    >
      <div className="aspect-square relative w-full rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 160px, 100vw"
        />
      </div>
      <h3 className="text-sm mt-2 px-2 text-gray-600">{title}</h3>
    </Link>
  );
}
