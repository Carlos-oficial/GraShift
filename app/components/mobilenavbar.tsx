"use client";

import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { AllOutOutlined, CheckroomOutlined, GraphicEqOutlined } from "@mui/icons-material";

export default function MobileNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-8 gap-5 px-4 py-2">
        {/* Empty left columns (1–2) */}
        <div className="col-span-2" />

        {/* Navigation buttons in center 4 columns (3–6) */}
        <div className="col-span-4 flex justify-around items-center">
          <button className="flex flex-col items-center text-gray-600 hover:text-black">
            <AllOutOutlined fontSize="medium" />
            <span className="text-xs">Grafit</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 hover:text-black">
            <CheckroomOutlined fontSize="medium" />
            <span className="text-xs">Closet</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 hover:text-black">
            <AccountCircleOutlinedIcon fontSize="medium" />
            <span className="text-xs">Profile</span>
          </button>
        </div>

        {/* Empty right columns (7–8) */}
        <div className="col-span-2" />
      </div>
    </nav>
  );
}
