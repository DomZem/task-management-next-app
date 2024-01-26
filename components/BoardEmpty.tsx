import EditBoardForm from './BoardForm/EditBoardForm';
import { Button } from './UI/Button';
import { DialogTrigger } from './UI/Dialog';

interface BoardEmptyProps {
  boardId: number;
  boardName: string;
}

export default function BoardEmpty({ boardId, boardName }: BoardEmptyProps) {
  return (
    <section className="flex h-full items-center justify-center">
      <div className="text-center">
        <h3 className="mb-6 text-heading-l text-primaryMediumGrey">
          This board is empty. Create a new column to get started.
        </h3>

        <EditBoardForm boardId={boardId} boardName={boardName} statuses={[]}>
          <DialogTrigger asChild>
            <Button large>add new column</Button>
          </DialogTrigger>
        </EditBoardForm>
      </div>
    </section>
  );
}
