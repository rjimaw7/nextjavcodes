/* eslint-disable no-unsafe-optional-chaining */
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

import { addCode, deleteCode, fetchCodes, updateCode } from '@/server/actions';

import { CODE_KEY } from '../constants/constants';
import type { ICodes } from '../interfaces/ICodes';
import type { CodeType } from '../zod/schema';

export const useCodeService = () => {
  // const GetAllCodes = (querys?: string) => {
  //   return useQuery({
  //     queryFn: async () => fetchCodes(query),
  //     queryKey: [CODE_KEY, query]
  //   });
  // };

  const GetAllCodes = (query?: string, page?: number, limit?: number) => {
    return useInfiniteQuery<ICodes[], Error>({
      queryKey: [CODE_KEY, query, page, limit],
      queryFn: ({ pageParam = page }) => fetchCodes(query, pageParam as number, limit),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage?.length > 0 ? allPages?.length + 1 : null;
        return nextPage;
      }
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

  const UpdateCode = useMutation({
    mutationFn: (values: CodeType) => updateCode(values)
  });
  const UpdateCodeMutation = () => {
    return {
      UpdateCode
    };
  };

  const DeleteCode = useMutation({
    mutationFn: (id: string) => deleteCode(id)
  });
  const DeleteCodeMutation = () => {
    return {
      DeleteCode
    };
  };

  return {
    GetAllCodes,
    AddCodeMutation,
    UpdateCodeMutation,
    DeleteCodeMutation
  };
};
