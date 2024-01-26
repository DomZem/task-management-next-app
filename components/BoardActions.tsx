'use client';

import CreateTaskForm from './TaskForm/CreateTaskForm';

export default function BoardActions() {
  return (
    <section className="flex items-center gap-2">
      <CreateTaskForm />
    </section>
  );
}
