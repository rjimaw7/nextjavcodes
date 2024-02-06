'use client';

import { Eye, Loader2, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { formatNumber } from '@/lib/utils';
import { CODE_KEY } from '@/shared/constants/constants';
import useQueryInvalidator from '@/shared/hooks/useQueryInvalidator';
import type { ICodes } from '@/shared/interfaces/ICodes';
import { useCodeService } from '@/shared/services/codeService';
import useGlobalStore from '@/shared/zustand/globalStore';

import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import HomeToast from './HomeToast';

interface Props {
  code: ICodes;
}

const HomeCard = ({ code }: Props) => {
  const { isCreate, setIsCreate, setSelectedCode } = useGlobalStore();
  const [openMenu, setOpenMenu] = useState(false);
  const { DeleteCodeMutation } = useCodeService();
  const invalidateQuery = useQueryInvalidator();
  const { DeleteCode } = DeleteCodeMutation();
  const { toast } = useToast();

  const handleDeleteCode = (id: string) => {
    DeleteCode.mutate(id, {
      onSuccess: () => {
        toast({
          description: <HomeToast message="Deleted" />
        });
        invalidateQuery(CODE_KEY);
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Delete Error'
        });
      }
    });
  };

  return (
    <Card
      className="relative m-4 cursor-pointer p-8 shadow-xl
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
        <CardTitle className="overflow-hidden text-center font-bold">
          <p className="primary-yellow">{code.title.toUpperCase()}</p>
        </CardTitle>
        <div className="absolute -left-4 bottom-3 flex w-full items-center justify-end gap-2">
          <Eye size={18} className="text-muted-foreground" />
          <small className="text-muted-foreground">{formatNumber(code.views)}</small>
        </div>
      </CardHeader>

      <div className="absolute right-2 top-2">
        <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="text-muted-foreground" size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="primary-yellow cursor-pointer"
              onClick={() => {
                if (!isCreate) {
                  window.open(`https://www.google.com/search?q=${encodeURIComponent(code.title)}`, '_blank');
                }
              }}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              className="primary-yellow cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCode(code);
                setIsCreate(true);
              }}
              disabled={DeleteCode.isPending}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="primary-yellow cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteCode(code.id!);
              }}
              disabled={DeleteCode.isPending}
            >
              {DeleteCode.isPending && <Loader2 size={34} className="animate-spin text-[#FACC15]" />}
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};

export default HomeCard;
