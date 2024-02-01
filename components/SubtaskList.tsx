import { getCompletedSubtasksAmount } from '@/lib/utils';
import SubtaskListItem from './SubtaskListItem';
import { Subtask } from './TaskForm/formSchema';

interface SubtaskListProps {
  subtasks: Subtask[];
}

export default function SubtaskList({ subtasks }: SubtaskListProps) {
  return (
    <div>
      <p className="label-text mb-4" data-testid="completed-subtasks-count">
        Subtasks ({getCompletedSubtasksAmount(subtasks)}{' '}
        <span className="normal-case">of</span> {subtasks.length})
      </p>

      <ul className="flex flex-col gap-2">
        {subtasks.map((subtask) => (
          <SubtaskListItem subtask={subtask} key={subtask.id} />
        ))}
      </ul>
    </div>
  );
}
