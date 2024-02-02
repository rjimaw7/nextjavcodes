import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import HomeComponent from '@/components/HomeComponent';
import getQueryClient from '@/lib/getQueryClient';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HydrationBoundary state={dehydrate(getQueryClient())}>
        <HomeComponent />
      </HydrationBoundary>
    </main>
  );
}
