import React from 'react';

import HomeCard from './HomeCard';
import SkeletonCard from './SkeletonCard';

const HomeCards = () => {
  const dreamDataIsLoading = false;

  return (
    <section id="cards" className="container">
      <div className="grid grid-cols-1 gap-6 pb-10 md:grid-cols-2 md:gap-8 lg:mx-20 lg:grid-cols-3">
        {dreamDataIsLoading
          ? Array.from({ length: 10 }, (_, index) => (
              <React.Fragment key={`skeleton_${index}`}>
                <SkeletonCard />
              </React.Fragment>
            ))
          : Array.from({ length: 12 }, (_, index) => (
              <React.Fragment key={`card_${index}`}>
                <HomeCard />
              </React.Fragment>
            ))}
      </div>

      {/* {dreamDataMemo && dreamDataMemo.length >= 10 && <div ref={ref} />} */}
    </section>
  );
};

export default HomeCards;
