import { QueryClient } from '@tanstack/react-query';

import { fetchCodes } from '@/server/actions';
import { CODE_KEY } from '@/shared/constants/constants';

import HomeCards from './HomeCards';
import HomeHero from './HomeHero';

const Home = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [CODE_KEY],
    queryFn: () => fetchCodes()
  });

  return (
    <div className="container flex min-h-screen flex-col">
      <HomeHero />
      <HomeCards />
    </div>
  );
};

export default Home;
