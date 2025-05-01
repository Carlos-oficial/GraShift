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
     <nav className="sticky top-0 left-0 right-0 w-full z-50">
     <div className="grid grid-cols-8 gap-5 py-5">
       
       <div className="col-span-3" />
       {/* Buttons in center 4 columns (3–6) */}
       <div className="col-span-2 flex justify-around items-center">
          <Link href="/camera" className="flex flex-col items-center text-gray-600 hover:text-black">
           <CameraAltOutlinedIcon />
         </Link>
         <span className="text-lg font-semibold">{title}</span>
         <Link href="/diary" className="flex flex-col items-center text-gray-600 hover:text-black">
           <ImportContactsOutlined />
         </Link>
       </div>
       {/* Empty columns 7–8 */}
       <div className="col-span-3" />
     </div>
   </nav>
  );
}
