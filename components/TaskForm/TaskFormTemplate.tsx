import useStatuses from '@/hooks/useStatuses';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IoMdAdd } from 'react-icons/io';
import { Button } from '../UI/Button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../UI/Dialog';
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormInputWrapper,
  FormItem,
  FormLabel,
  FormMessage,
} from '../UI/Form';
import { Textarea } from '../UI/Textarea';
import StatusSelect from './StatusSelect';
import SubtasksFieldArray from './SubtasksFieldArray';
import { Task, taskFormSchema } from './formSchema';

interface TaskFormTemplateProps {
  variant: 'create' | 'edit';
  defaultValues: Task;
  onSubmit: (data: Task) => void;
  isPending: boolean;
  isSuccess: boolean;
}

export default function TaskFormTemplate({
  variant,
  defaultValues,
  onSubmit,
  isPending,
  isSuccess,
}: TaskFormTemplateProps) {
  const { data: statuses, isLoading, error } = useStatuses();

  const methods = useForm<Task>({
    resolver: zodResolver(taskFormSchema),
    defaultValues,
  });

  const handleFormSubmit = (data: Task) => {
    onSubmit(data);

    if (variant === 'create' && isSuccess) {
      methods.reset();
    }
  };

  if (isLoading || error || !statuses) {
    return null;
  }

  return (
    <Dialog>
      {variant === 'create' && (
        <>
          <DialogTrigger
            className="hidden md:block"
            disabled={!statuses.length}
            asChild
          >
            <Button large>add new task</Button>
          </DialogTrigger>

          <DialogTrigger
            className="md:hidden"
            disabled={!statuses.length}
            asChild
          >
            <Button className="flex h-8 w-12 items-center justify-center p-0 md:hidden">
              <IoMdAdd className="text-lg font-bold" />
            </Button>
          </DialogTrigger>
        </>
      )}

      {variant === 'edit' && (
        <DialogTrigger className="capitalize duration-200 hover:text-primaryBlack dark:hover:text-white">
          edit task
        </DialogTrigger>
      )}

      <DialogContent className="flex flex-col gap-6">
        <DialogTitle>
          {variant === 'create' && 'add new task'}
          {variant === 'edit' && 'edit task'}
        </DialogTitle>

        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={methods.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>title</FormLabel>

                  <FormInputWrapper>
                    <FormControl>
                      <FormInput placeholder="e.g. Make coffee" {...field} />
                    </FormControl>

                    <FormMessage data-testid="title-error-message" />
                  </FormInputWrapper>
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>description</FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <SubtasksFieldArray />

            <StatusSelect statuses={statuses} />

            <Button type="submit" className="w-full" disabled={isPending}>
              {variant === 'create' && 'create task'}
              {variant === 'edit' && 'save changes'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
