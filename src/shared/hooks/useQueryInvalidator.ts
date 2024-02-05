import { useQueryClient } from '@tanstack/react-query';

const useQueryInvalidator = () => {
  const queryClient = useQueryClient();

  const invalidateQuery = (queryKey: string) => {
    queryClient.invalidateQueries({ queryKey: [`${queryKey}`] });
  };

  return invalidateQuery;
};

export default useQueryInvalidator;
