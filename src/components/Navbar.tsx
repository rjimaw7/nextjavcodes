import { Code } from 'lucide-react';

import { Input } from './ui/input';

const Navbar = () => {
  return (
    <header className="container sticky top-0 z-50 flex items-center justify-between py-4 backdrop-blur md:px-12 md:py-3">
      <div>
        <Code className="primary-yellow cursor-pointer" size={32} />
      </div>
      <div>
        <Input type="search" placeholder="Search Codes" />
      </div>
    </header>
  );
};

export default Navbar;
