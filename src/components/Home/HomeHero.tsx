'use client';

import useGlobalStore from '@/shared/zustand/globalStore';

import { Button } from '../ui/button';

const HomeHero = () => {
  const { setIsCreate } = useGlobalStore();

  return (
    <section id="hero" className="container">
      <div className="mb-10 mt-16 flex flex-col gap-8 text-center">
        <h1 className="text-center text-6xl font-bold tracking-tighter md:text-8xl">
          <span className="primary-yellow">Jav</span>Codes
        </h1>
        <div>
          <p className="primary-yellow text-base font-semibold italic md:text-xl">Explore Japanese Adult Films</p>
          <p className="text-lg font-semibold italic md:text-xl">Share Your Top Codes</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button onClick={() => setIsCreate(true)}>Share</Button>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
