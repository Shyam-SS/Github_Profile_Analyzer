import useSWR from 'swr';
import axios from 'axios';
import { Skeleton } from './ui/skeleton';

interface Props {
  username: string;
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function RepoList({ username }: Props) {
  const { data, error, isLoading } = useSWR(`https://api.github.com/users/${username}/repos`, fetcher);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-md" />)}
      </div>
    );
  }

  if (error) return <p className="text-red-500">Failed to load repositories.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((repo: any) => (
        <div key={repo.id} className="p-4 rounded shadow bg-card">
          <h3 className="font-bold text-lg">{repo.name}</h3>
          <p className="text-sm text-muted-foreground">{repo.description || 'No description'}</p>
        </div>
      ))}
    </div>
  );
}
