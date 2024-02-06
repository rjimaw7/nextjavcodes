import { useMutation, useQuery } from '@tanstack/react-query';

import { addCode, deleteCode, fetchCodes, updateCode } from '@/server/actions';

import { CODE_KEY } from '../constants/constants';
import type { CodeType } from '../zod/schema';

export const useCodeService = () => {
  const GetAllCodes = (query?: string) => {
    return useQuery({
      queryFn: async () => fetchCodes(query),
      queryKey: [CODE_KEY, query]
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
