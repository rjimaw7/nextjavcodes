import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCard = () => {
  return (
    <Card
      className="w-[316px] cursor-pointer p-8  transition-transform hover:scale-105
  dark:shadow-lg  md:w-[350px]"
    >
      <CardHeader>
        <CardTitle className="flex justify-center overflow-hidden text-center font-bold">
          <Skeleton className="flex h-5 w-[75px] items-center justify-center border bg-gray-300" />
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default SkeletonCard;
