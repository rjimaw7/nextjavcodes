import { Loader2, MoreHorizontal } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { CODE_KEY } from '@/shared/constants/constants';
import useQueryInvalidator from '@/shared/hooks/useQueryInvalidator';
import type { ICodes } from '@/shared/interfaces/ICodes';
import { useCodeService } from '@/shared/services/codeService';
import useGlobalStore from '@/shared/zustand/globalStore';

import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import HomeToast from './HomeToast';

interface Props {
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  code: ICodes;
}

const HomeCardMenu = ({ openMenu, setOpenMenu, code }: Props) => {
  const { DeleteCodeMutation } = useCodeService();
  const { DeleteCode } = DeleteCodeMutation();
  const { isCreate, setIsCreate, setSelectedCode } = useGlobalStore();
  const { toast } = useToast();
  const invalidateQuery = useQueryInvalidator();

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
  );
};

export default HomeCardMenu;
