import { useQuery } from '@tanstack/react-query';

import { fetchCodes } from '@/server/actions';

export const useCodeService = () => {
  const GetAllCodes = () => {
    return useQuery({
      queryFn: async () => fetchCodes(),
      queryKey: ['codes']
    });
  };

  return {
    GetAllCodes
  };
};
