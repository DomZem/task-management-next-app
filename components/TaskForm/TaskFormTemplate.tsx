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
} from '../UI/Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../UI/Select';
import { Textarea } from '../UI/Textarea';
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
            <Button large>Add new task</Button>
          </DialogTrigger>
          <DialogTrigger className="md:hidden" asChild>
            <Button className="flex h-8 w-12 items-center justify-center p-0 md:hidden">
              <IoMdAdd className="text-lg font-bold" />
            </Button>
          </DialogTrigger>
        </>
      )}

      {variant === 'edit' && (
        <DialogTrigger asChild>
          <button>Edit Task</button>
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
              name={`title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>title</FormLabel>

                  <FormControl>
                    <FormInputWrapper>
                      <FormInput placeholder="e.g. Make coffee" {...field} />
                    </FormInputWrapper>
                  </FormControl>
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

            <FormField
              control={methods.control}
              name="statusId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>status</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(parseInt(value, 10));
                    }}
                    // while we are creating task the statusId from database will be no te provided
                    defaultValue={
                      field.value === 0 ? undefined : field.value.toString()
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map(({ id, name }) => (
                        <SelectItem value={id.toString()} key={id}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {variant === 'create' && 'Create Task'}
              {variant === 'edit' && 'Save Changes'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
