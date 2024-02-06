'use client';

import { Eye } from 'lucide-react';
import { useState } from 'react';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { formatNumber } from '@/lib/utils';
import type { ICodes } from '@/shared/interfaces/ICodes';
import useGlobalStore from '@/shared/zustand/globalStore';

import HomeCardMenu from './HomeCardMenu';

interface Props {
  code: ICodes;
}

const HomeCard = ({ code }: Props) => {
  // ALL HOOKS
  const { isCreate, isAdminMode } = useGlobalStore();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Card
      className="relative m-4 cursor-pointer p-8 shadow-xl
    shadow-yellow-500/40
    transition-transform hover:scale-105
    "
      onClick={() => {
        if (!isCreate) {
          window.open(`https://www.google.com/search?q=${encodeURIComponent(code.title)}`, '_blank');
        }
      }}
    >
      <CardHeader>
        <CardTitle className="overflow-hidden text-center font-bold">
          <p className="primary-yellow">{code.title.toUpperCase()}</p>
        </CardTitle>
        <div className="absolute -left-4 bottom-3 flex w-full items-center justify-end gap-2">
          <Eye size={18} className="text-muted-foreground" />
          <small className="text-muted-foreground">{formatNumber(code.views)}</small>
        </div>
      </CardHeader>

      {isAdminMode && <HomeCardMenu code={code} openMenu={openMenu} setOpenMenu={setOpenMenu} />}
    </Card>
  );
};

export default HomeCard;
