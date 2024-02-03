import { colors } from '@/data/colors';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import Dot from '../Dot';
import { Button } from '../UI/Button';
import {
  FormControl,
  FormField,
  FormInput,
  FormInputWrapper,
  FormItem,
  FormMessage,
} from '../UI/Form';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../UI/Select';
import { Board } from './formSchema';

export default function StatusFieldArray() {
  const { control } = useFormContext<Board>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'statuses',
  });

  return (
    <div className="w-full">
      <p className="label-text mb-4 capitalize text-primaryMediumGrey">
        board columns
      </p>

      <ul className="mb-3 flex flex-col gap-3">
        {fields.map((item, index) => (
          <li className="flex items-center gap-1" key={item.id}>
            <div className="grid flex-1 grid-cols-[2fr_5rem] gap-2">
              <FormField
                control={control}
                name={`statuses.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormInputWrapper>
                      <FormControl>
                        <FormInput placeholder="e.g. Todo" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormInputWrapper>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`statuses.${index}.color`}
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="h-full w-full">
                        <SelectTrigger className="h-full">
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
            </div>

            <button type="button" className="p-1" onClick={() => remove(index)}>
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
            name: '',
            color: colors[0].value,
          })
        }
      >
        add new column
      </Button>
    </div>
  );
}
