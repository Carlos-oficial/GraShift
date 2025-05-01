"use client";

import { ImportContactsOutlined } from '@mui/icons-material';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import React from 'react';

type NavbarProps = {
  title: string;
};

export default function Navbar({ title }: NavbarProps) {
  return (
     <nav className="sticky top-0 left-0 right-0 w-full bg-white border-b border-gray-200 shadow z-50">
     <div className="grid grid-cols-8 gap-5 px-4 py-2">
       {/* Empty columns 1–2 */}
       <div className="col-span-2" />
       {/* Buttons in center 4 columns (3–6) */}
       <div className="col-span-4 flex justify-around items-center">
         <button className="flex flex-col items-center text-gray-600 hover:text-black">
           <CameraAltOutlinedIcon />
         </button>
         <span className="text-lg font-semibold">{title}</span>
         <button className="flex flex-col items-center text-gray-600 hover:text-black">
           <ImportContactsOutlined />
         </button>
       </div>
       {/* Empty columns 7–8 */}
       <div className="col-span-2" />
     </div>
   </nav>
  );
}
