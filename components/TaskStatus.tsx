import useUpdateTaskStatus from '@/hooks/task/useUpdateTaskStatus';
import useStatuses from '@/hooks/useStatuses';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './UI/Select';

interface TaskStatusProps {
  taskId: number;
  statusId: number;
}

export default function TaskStatus({
  taskId,
  statusId: currentStatusId,
}: TaskStatusProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: statuses, error, isLoading } = useStatuses();
  const { mutate, isPending } = useUpdateTaskStatus(taskId, currentStatusId);

  // Return null, because in component above called StatusList which also uses useStatuses hook handle these request states
  if (isLoading || error || !statuses?.length) {
    return null;
  }

  return (
    <div>
      <p className="label-text mb-2">current status</p>

      <Select
        open={isOpen}
        onOpenChange={() => setIsOpen((prev) => !prev)}
        defaultValue={currentStatusId.toString()}
        disabled={isPending}
        onValueChange={(statusId) => mutate(parseInt(statusId))}
      >
        <SelectTrigger isOpen={isOpen}>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>

        <SelectContent>
          {statuses.map(({ id, name }) => (
            <SelectItem value={id.toString()} key={id}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
