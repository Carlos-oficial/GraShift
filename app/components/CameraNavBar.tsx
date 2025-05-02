"use client";

import { ImportContactsOutlined } from '@mui/icons-material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Link from 'next/link';
import React from 'react';

type CameranavbarProps = {
  title: string;
};

export default function CameraNavbar({ title }: CameranavbarProps) {
  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-red-500 bg-opacity-5 backdrop-blur-sm">
      <div className="grid grid-cols-3 md:grid-cols-8 gap-5 py-2 px-4">
        <div className="hidden md:block md:col-span-2" />

        <div className="col-span-3 md:col-span-4 flex justify-between items-center">
          <Link href="/" className="flex flex-col items-center  text-black hover:text-gray-500">
            <CloseOutlinedIcon/>
          </Link>
          <span className="text-base md:text-lg font-semibold">{title}</span>
          <Link href="/diary" className="flex flex-col items-center  text-black hover:text-gray-500">
            <ImportContactsOutlined />
          </Link> 
        </div>

        {/* Desktop: right empty cols 7–8 */}
        <div className="hidden md:block md:col-span-2" />
      </div>
    </nav>
  );
}