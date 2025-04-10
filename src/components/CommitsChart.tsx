import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from 'next-themes';
import { Skeleton } from '@/components/ui/skeleton'; // Ensure correct path

interface Props {
  username: string;
}

type CommitData = {
  date: string;
  count: number;
};

export default function CommitsChart({ username }: Props) {
  const [data, setData] = useState<CommitData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `https://api.github.com/users/${username}/events/public`
        );

        const commitsPerDay: Record<string, number> = {};

        res.data.forEach((event: any) => {
          if (event.type === 'PushEvent') {
            const day = new Date(event.created_at).toLocaleDateString();
            commitsPerDay[day] =
              (commitsPerDay[day] || 0) + event.payload.commits.length;
          }
        });

        const chartData: CommitData[] = Object.entries(commitsPerDay).map(
          ([date, count]) => ({
            date,
            count,
          })
        );

        setData(chartData);
      } catch (e) {
        console.error('Error fetching commit data:', e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [username]);

  if (loading) return <Skeleton className="h-64 w-full" />;
  if (error)
    return <p className="text-red-500">Failed to load chart data.</p>;

  return (
    <div className="mt-8">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis
            dataKey="date"
            stroke={resolvedTheme === 'dark' ? '#fff' : '#000'}
          />
          <YAxis stroke={resolvedTheme === 'dark' ? '#fff' : '#000'} />
          <Tooltip />
          <Bar
            dataKey="count"
            fill={resolvedTheme === 'dark' ? '#60a5fa' : '#3b82f6'}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
