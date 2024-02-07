/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { useDebounce } from '@uidotdev/usehooks';
import React, { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import type { SortByType } from '@/shared/interfaces/ICodes';
import { useCodeService } from '@/shared/services/codeService';
import useGlobalStore from '@/shared/zustand/globalStore';

import HomeCard from './HomeCard';
import HomeCardInput from './HomeCardInput';
import HomeFilter from './HomeFilter';
import SkeletonCard from './SkeletonCard';

const HomeCards = () => {
  const [sort, setSort] = useState<SortByType>('latest');

  // ALL HOOKS
  const { isCreate, searchQuery } = useGlobalStore();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { GetAllCodes } = useCodeService();
  const {
    data: allCodesData,
    isLoading: allCodesLoading,
    hasNextPage,
    fetchNextPage
    // SEARCH // PAGE // LIMIT // SORT
  } = GetAllCodes(debouncedSearchQuery, 1, 10, sort);

  const { ref, inView } = useInView({
    threshold: 0
  });

  // const allCodesDataMemo = useMemo(() => allCodesData, [allCodesData]);

  const allCodesDataMemo = useMemo(() => {
    if (allCodesData) {
      return allCodesData.pages.flatMap((page) => page);
    }
    return [];
  }, [allCodesData]);

  // FOR INFINITE SCROLL
  useEffect(() => {
    if (inView) {
      if (hasNextPage) {
        fetchNextPage();
      }
    }
  }, [inView, hasNextPage]);

  return (
    <section id="cards" className="container flex flex-col gap-6">
      <HomeFilter sort={sort} setSort={setSort} allCodesLoading={allCodesLoading} />

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

      {allCodesDataMemo && allCodesDataMemo.length >= 10 && hasNextPage && (
        <div className="mb-4 flex w-full items-center justify-center" ref={ref} />
      )}
    </section>
  );
};

export default HomeCards;
