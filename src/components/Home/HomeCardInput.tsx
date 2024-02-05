'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { isStringEnclosedInBrackets } from '@/lib/utils';
import { CODE_KEY } from '@/shared/constants/constants';
import useQueryInvalidator from '@/shared/hooks/useQueryInvalidator';
import { useCodeService } from '@/shared/services/codeService';
import type { CodeType } from '@/shared/zod/schema';
import { CodeSchema } from '@/shared/zod/schema';
import useGlobalStore from '@/shared/zustand/globalStore';

import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';
import HomeToast from './HomeToast';

const HomeCardInput = () => {
  // ALL HOOKS
  const { setIsCreate } = useGlobalStore();
  const { AddCodeMutation } = useCodeService();
  const { AddCode } = AddCodeMutation();
  const invalidateQuery = useQueryInvalidator();
  const { toast } = useToast();

  const form = useForm<CodeType>({
    resolver: zodResolver(CodeSchema),
    defaultValues: {
      title: ''
    }
  });

  const onSubmit = (values: CodeType) => {
    const checkCodeString = isStringEnclosedInBrackets(values.title) ? values.title : `[${values.title}]`;

    AddCode.mutate(
      {
        title: checkCodeString
      },
      {
        onSuccess: () => {
          toast({
            description: <HomeToast message="Created" />
          });
          invalidateQuery(CODE_KEY);
          form.reset();
          setIsCreate(false);
        },
        onError: () => {
          toast({
            title: 'Uh oh! Something went wrong.',
            description: <HomeToast message="Create Error" />
          });
        }
      }
    );
  };

  const onCancel = () => {
    setIsCreate(false);
    form.reset();
  };

  return (
    <Card
      className="m-4 cursor-pointer py-8 shadow-xl shadow-yellow-500/40 transition-transform hover:scale-105
md:w-[350px]
"
    >
      <CardHeader>
        <CardTitle className="overflow-hidden text-center font-bold dark:text-white">
          <Form {...form}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center justify-between gap-4">
                      <Input className="text-[#FACC15]" maxLength={15} {...field} />
                      {!AddCode.isPending && (
                        <>
                          <CheckCircle2
                            size={34}
                            className="cursor-pointer text-[#FACC15]"
                            onClick={() => form.handleSubmit(onSubmit)()}
                          />
                          <XCircle size={34} className="cursor-pointer text-[#FACC15]" onClick={onCancel} />
                        </>
                      )}

                      {AddCode.isPending && <Loader2 size={34} className="animate-spin text-[#FACC15]" />}
                    </div>
                  </FormControl>
                  <FormMessage className="flex justify-start" />
                </FormItem>
              )}
            />
          </Form>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default HomeCardInput;
