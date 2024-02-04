'use client';

import { CheckCircle2, XCircle } from 'lucide-react';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import useGlobalStore from '@/shared/zustand/globalStore';

import { Input } from '../ui/input';

const HomeCardInput = () => {
  const { setIsCreate } = useGlobalStore();

  return (
    <Card
      className="m-4 cursor-pointer p-8 shadow-xl shadow-yellow-500/40 transition-transform hover:scale-105
md:w-[350px]
"
    >
      <CardHeader>
        <CardTitle className="overflow-hidden text-center font-bold dark:text-white">
          <div className="flex items-center justify-between gap-4">
            <Input className="text-[#FACC15]" maxLength={15} />
            <CheckCircle2 size={34} className="text-[#FACC15]" />
            <XCircle size={34} className="text-[#FACC15]" onClick={() => setIsCreate(false)} />
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default HomeCardInput;
