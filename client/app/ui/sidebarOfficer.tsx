import Link from 'next/link';
import NavLinksOfficer from '@/app/ui/navlinksOfficer';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SidebarOfficer() {
    return (
      <div className="hidden md:flex md:h-full md:flex-col md:px-3 md:py-4 ">
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinksOfficer />
          <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        </div>
      </div>
    );
  }