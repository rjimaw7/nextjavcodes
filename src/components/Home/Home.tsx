'use client';

import HomeCards from './HomeCards';
import HomeHero from './HomeHero';

const Home = () => {
  return (
    <div className="container flex min-h-screen flex-col">
      <HomeHero />
      <HomeCards />
    </div>
  );
};

export default Home;
