'use client';

export default function GreetingTitle() {
  return (
    <h2 className="text-heading-m">
      Hello, {localStorage.getItem('user_name')}
    </h2>
  );
}
