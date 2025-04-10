
import { useEffect, useState } from 'react';
import UserInput from '../components/UserInput';
import RepoList from '../components/RepoList';
import CommitsChart from '../components/CommitsChart';
import { Button } from '@/components/ui/button';


export default function Home() {
  const [username, setUsername] = useState('');

  // Load username from localStorage (on mount)
  useEffect(() => {
    const storedUsername = localStorage.getItem('github_username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Save to localStorage when username changes
  useEffect(() => {
    if (username) {
      localStorage.setItem('github_username', username);
    }
  }, [username]);

  const clearUsername = () => {
    setUsername('');
    localStorage.removeItem('github_username');
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <UserInput onSubmit={setUsername} />

      {username && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">GitHub Profile: {username}</h2>
            <Button variant="outline" onClick={clearUsername}>
              Clear
            </Button>
          </div>

          <RepoList username={username} />
          <CommitsChart username={username} />
        </div>
      )}
    </div>
  );
}
