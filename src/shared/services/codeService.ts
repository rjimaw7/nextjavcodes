import { useMutation, useQuery } from '@tanstack/react-query';

import { addCode, fetchCodes } from '@/server/actions';

import { CODE_KEY } from '../constants/constants';
import type { CodeType } from '../zod/schema';

export const useCodeService = () => {
  const GetAllCodes = () => {
    return useQuery({
      queryFn: async () => fetchCodes(),
      queryKey: [CODE_KEY]
    });
  };

  const AddCode = useMutation({
    mutationFn: (values: CodeType) => addCode(values)
  });
  const AddCodeMutation = () => {
    return {
      AddCode
    };
  };

  return {
    GetAllCodes,
    AddCodeMutation
  };
};
