import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Status } from '../BoardForm/formSchema';
import { FormControl, FormField, FormItem, FormLabel } from '../UI/Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../UI/Select';
import { Task } from './formSchema';

interface StatusSelectProps {
  statuses: Status[];
}

export default function StatusSelect({ statuses }: StatusSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { control } = useFormContext<Task>();

  return (
    <FormField
      control={control}
      name="statusId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>status</FormLabel>

          <Select
            open={isOpen}
            onOpenChange={() => setIsOpen((prev) => !prev)}
            onValueChange={(value) => {
              field.onChange(parseInt(value, 10));
            }}
            // while we are creating task the statusId from database will be no te provided
            defaultValue={
              field.value === 0 ? undefined : field.value.toString()
            }
          >
            <FormControl>
              <SelectTrigger isOpen={isOpen}>
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
  );
}
