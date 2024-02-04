import { Button } from '../ui/button';

const HomeHero = () => {
  return (
    <section id="hero" className="container">
      <div className="mb-10 mt-16 flex flex-col gap-8 text-center">
        <h1 className="text-center text-6xl font-bold tracking-tighter md:text-8xl">
          <span className="primary-yellow">Jav</span>Codes
        </h1>
        <p className="text-lg font-semibold italic text-black dark:text-white md:text-xl">Share your favorite code</p>

        <div className="flex items-center justify-center gap-4">
          <Button>Share</Button>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
