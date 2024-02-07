'use client';

import { Code } from 'lucide-react';

import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import useGlobalStore from '@/shared/zustand/globalStore';

import { Input } from './ui/input';

const Navbar = () => {
  const { setSearchQuery, searchQuery, toggleAdminMode, isAdminMode } = useGlobalStore();

  return (
    <header className="container sticky top-0 z-50 flex flex-col items-start justify-between gap-8 py-6 backdrop-blur md:flex-row md:items-center md:gap-0 md:px-12 md:py-3">
      <div>
        <Code
          className="primary-yellow cursor-pointer"
          size={32}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
      <div className="flex w-full items-center gap-4 md:w-auto">
        <Input
          type="search"
          placeholder="Search Codes"
          className="primary-yellow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Switch id="admin-mode" checked={isAdminMode} onCheckedChange={(value) => toggleAdminMode(value)} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{`Admin Mode: ${isAdminMode ? 'ON' : 'OFF'}`}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
};

export default Navbar;
