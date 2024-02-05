'use client';

import { Eye } from 'lucide-react';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { formatNumber } from '@/lib/utils';
import type { ICodes } from '@/shared/interfaces/ICodes';
import useGlobalStore from '@/shared/zustand/globalStore';

interface Props {
  code: ICodes;
}

const HomeCard = ({ code }: Props) => {
  const { isCreate } = useGlobalStore();

  return (
    <Card
      className="relative m-4 cursor-pointer border border-white p-8 shadow-xl
    shadow-yellow-500/40
    transition-transform hover:scale-105
    md:w-[350px]
    "
      onClick={() => {
        if (!isCreate) {
          window.open(`https://www.google.com/search?q=${encodeURIComponent(code.title)}`, '_blank');
        }
      }}
    >
      <CardHeader>
        <CardTitle className="overflow-hidden text-center font-bold dark:text-white">
          <p className="primary-yellow">{code.title}</p>
        </CardTitle>
        <div className="absolute -left-4 bottom-3 flex w-full items-center justify-end gap-2">
          <Eye size={18} className="text-muted-foreground" />
          <small className="text-muted-foreground">{formatNumber(code.views)}</small>
        </div>
      </CardHeader>
    </Card>
  );
};

export default HomeCard;
