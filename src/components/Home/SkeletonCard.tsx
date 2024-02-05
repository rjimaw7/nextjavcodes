import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCard = () => {
  return (
    <Card
      className="relative m-4 cursor-pointer p-8 shadow-xl
shadow-yellow-500/40
transition-transform hover:scale-105
md:w-[350px]
"
    >
      <CardHeader>
        <CardTitle className="overflow-hidden text-center font-bold dark:text-white">
          <Skeleton className="flex h-5 w-full items-center justify-center border bg-gray-300" />
        </CardTitle>
        <div className="absolute -left-4 bottom-3 flex w-full items-center justify-end gap-2">
          <Skeleton className="flex h-5 w-[75px] items-center justify-center border bg-gray-300" />
        </div>
      </CardHeader>
    </Card>
  );
};

export default SkeletonCard;
