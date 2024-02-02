import { useFieldArray, useFormContext } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import { Button } from '../UI/Button';
import {
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormMessage,
} from '../UI/Form';
import { Task } from './formSchema';

export default function SubtasksFieldArray() {
  const { control } = useFormContext<Task>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subtasks',
  });

  return (
    <div className="w-full">
      <p className="label-text mb-4 text-primaryMediumGrey">Subtasks</p>
      <ul className="mb-3 flex flex-col gap-3">
        {fields.map((item, index) => (
          <li className="flex items-center gap-2" key={item.id}>
            <FormField
              control={control}
              name={`subtasks.${index}.title`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <FormInput placeholder="e.g. Make coffee" {...field} />
                    <FormMessage />
                  </FormControl>
                </FormItem>
              )}
            />

            <button type="button" className="p-2" onClick={() => remove(index)}>
              <MdClose className="text-2xl text-primaryMediumGrey duration-200 hover:text-primaryRed" />
            </button>
          </li>
        ))}
      </ul>

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={() =>
          append({
            id: 0,
            title: '',
            isComplete: false,
          })
        }
      >
        add new subtask
      </Button>
    </div>
  );
}
