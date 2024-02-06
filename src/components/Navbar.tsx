'use client';

import { Code } from 'lucide-react';

import useGlobalStore from '@/shared/zustand/globalStore';

import { Input } from './ui/input';

const Navbar = () => {
  const { setSearchQuery, searchQuery } = useGlobalStore();

  return (
    <header className="container sticky top-0 z-50 flex items-center justify-between py-4 backdrop-blur md:px-12 md:py-3">
      <div>
        <Code className="primary-yellow cursor-pointer" size={32} />
      </div>
      <div>
        <Input
          type="search"
          placeholder="Search Codes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Navbar;
