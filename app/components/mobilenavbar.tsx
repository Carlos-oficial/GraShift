import Link from 'next/link';
import { AllOutOutlined, CheckroomOutlined } from '@mui/icons-material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function MobileNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white">
      {/* Grid layout adapts: 3 cols on mobile, 8 cols on md+ */}
      <div className="grid grid-cols-3 md:grid-cols-8 gap-5 px-4 py-2">
      
      {/* Left gap on desktop (columns 1-2), hidden on mobile */}
      <div className="hidden md:block md:col-span-2" />

      {/* Nav buttons (3 cols on mobile, 4 cols centered on desktop) */}
      <div className="col-span-3 md:col-span-4 flex justify-around items-center">
        <Link href="/" className="flex flex-col items-center text-black hover:text-gray-500">
        <img src="/grafit.svg" alt="Logo" className="h-8 w-8" />
        <span className="text-xs">Grafit</span>
        </Link>
        <Link href="/closet" className="flex flex-col items-center text-black hover:text-gray-500">
        <CheckroomOutlined fontSize="medium" />
        <span className="text-xs">Closet</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-black hover:text-gray-500">
        <AccountCircleOutlinedIcon fontSize="medium" />
        <span className="text-xs">Profile</span>
        </Link>
      </div>

      {/* Right gap on desktop (columns 7-8), hidden on mobile */}
      <div className="hidden md:block md:col-span-2" />
      </div>
    </nav>
  );
}
