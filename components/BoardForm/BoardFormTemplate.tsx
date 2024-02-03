import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../UI/Button';
import { Dialog, DialogContent, DialogTitle } from '../UI/Dialog';
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormInputWrapper,
  FormItem,
  FormLabel,
} from '../UI/Form';
import StatusFieldArray from './StatusFieldArray';
import { Board, boardFormSchema } from './formSchema';

interface BoardFormTemplateProps {
  variant: 'create' | 'edit';
  defaultValues: Board;
  onSubmit: (data: Board) => void;
  isPending: boolean;
  isSuccess: boolean;
  children: React.ReactNode;
}

export default function BoardFormTemplate({
  variant,
  defaultValues,
  onSubmit,
  isPending,
  isSuccess,
  children: dialogTrigger,
}: BoardFormTemplateProps) {
  const methods = useForm<Board>({
    resolver: zodResolver(boardFormSchema),
    defaultValues,
  });

  const handleFormSubmit = (data: Board) => {
    onSubmit(data);

    if (variant === 'create' && isSuccess) {
      methods.reset();
    }
  };

  return (
    <Dialog>
      {dialogTrigger}

      <DialogContent>
        <DialogTitle>
          {variant === 'create' && 'add new board'}
          {variant === 'edit' && 'edit board'}
        </DialogTitle>
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={methods.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>board name</FormLabel>

                  <FormInputWrapper>
                    <FormControl>
                      <FormInput placeholder="e.g. Web Design" {...field} />
                    </FormControl>
                  </FormInputWrapper>
                </FormItem>
              )}
            />

            <StatusFieldArray />

            <Button type="submit" disabled={isPending} className="w-full">
              {variant === 'create' && 'create new board'}
              {variant === 'edit' && 'save changes'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
