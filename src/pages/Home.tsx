import { useState } from 'react';
import UserInput from '../components/UserInput';
import RepoList from '../components/RepoList';
import CommitsChart from '../components/CommitsChart';

export default function Home() {
  const [username, setUsername] = useState('');

  return (
    <div className="container mx-auto p-4">
      <UserInput onSubmit={setUsername} />
      {username && (
        <>
          <RepoList username={username} />
          <CommitsChart username={username} />
        </>
      )}
    </div>
  );
}
