'use client';

import React, { useMemo } from 'react';

import { useCodeService } from '@/shared/services/codeService';
import useGlobalStore from '@/shared/zustand/globalStore';

import HomeCard from './HomeCard';
import HomeCardInput from './HomeCardInput';
import SkeletonCard from './SkeletonCard';

const HomeCards = () => {
  // ALL HOOKS
  const { isCreate } = useGlobalStore();
  const { GetAllCodes } = useCodeService();
  const { data: allCodesData, isLoading: allCodesLoading } = GetAllCodes();

  const allCodesDataMemo = useMemo(() => allCodesData, [allCodesData]);

  return (
    <section id="cards" className="container">
      <div className="grid grid-cols-1 gap-6 pb-10 md:grid-cols-2 md:gap-8 lg:mx-20 lg:grid-cols-3">
        {isCreate && <HomeCardInput />}
        {allCodesLoading
          ? Array.from({ length: 10 }, (_, index) => (
              <React.Fragment key={`skeleton_${index}`}>
                <SkeletonCard />
              </React.Fragment>
            ))
          : allCodesDataMemo && allCodesDataMemo.map((code) => <HomeCard code={code} key={code.id} />)}
      </div>

      {/* {dreamDataMemo && dreamDataMemo.length >= 10 && <div ref={ref} />} */}
    </section>
  );
};

export default HomeCards;
