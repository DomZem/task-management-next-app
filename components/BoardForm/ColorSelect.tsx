import { colors } from '@/data/colors';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Dot from '../Dot';
import { FormControl, FormField, FormItem } from '../UI/Form';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../UI/Select';
import { Board } from './formSchema';

interface ColorSelectProps {
  index: number;
}

export default function ColorSelect({ index }: ColorSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { control } = useFormContext<Board>();

  return (
    <FormField
      control={control}
      name={`statuses.${index}.color`}
      render={({ field }) => (
        <FormItem>
          <Select
            open={isOpen}
            onOpenChange={() => setIsOpen((prev) => !prev)}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl className="h-full w-full">
              <SelectTrigger className="h-full" isOpen={isOpen}>
                <Dot color={field.value} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {colors.map(({ name, value }) => (
                <div className="flex items-center gap-3" key={value}>
                  <div>
                    <Dot color={value} />
                  </div>
                  <SelectItem value={value}>{name}</SelectItem>
                </div>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
