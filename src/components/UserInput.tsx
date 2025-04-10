
import { useState } from 'react';
import { Button } from './ui/button';

interface Props {
  onSubmit: (username: string) => void;
}

export default function UserInput({ onSubmit }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const sanitizedUsername = input
        .trim()
        .replace('https://github.com/', '')
        .replace(/\/$/, ''); // remove trailing slash if present
      onSubmit(sanitizedUsername);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
      <input
        className="border p-2 rounded w-full"
        type="text"
        placeholder="Enter GitHub username"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
