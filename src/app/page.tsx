import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Home from '@/components/Home/Home';
import getQueryClient from '@/lib/getQueryClient';

export default function Main() {
  return (
    <HydrationBoundary state={dehydrate(getQueryClient())}>
      <Home />
    </HydrationBoundary>
  );
}
