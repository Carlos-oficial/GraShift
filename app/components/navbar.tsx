"use client";

import { ImportContactsOutlined } from '@mui/icons-material';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import Link from 'next/link';
import React from 'react';

type NavbarProps = {
  title: string;
};

export default function Navbar({ title }: NavbarProps) {
  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-white">
      <div className="grid grid-cols-3 md:grid-cols-8 gap-5 py-2 px-4">
        <div className="hidden md:block md:col-span-2" />

        <div className="col-span-3 md:col-span-4 flex justify-between items-center">
          <Link href="/camera" className="flex flex-col items-center  text-black hover:text-gray-500">
            <CameraAltOutlinedIcon/>
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
