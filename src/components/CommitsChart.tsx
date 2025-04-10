
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from 'next-themes';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  username: string;
}

interface GitHubCommit {
  message: string;
  sha: string;
}

interface GitHubEvent {
  type: string;
  created_at: string;
  payload: {
    commits?: GitHubCommit[];
  };
}

interface CommitData {
  date: string;
  count: number;
  messages: string[];
}

export default function CommitsChart({ username }: Props) {
  const [data, setData] = useState<CommitData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const sanitizedUsername = username
          .replace('https://github.com/', '')
          .replace(/\/$/, '');

        const res = await axios.get<GitHubEvent[]>(
          `https://api.github.com/users/${sanitizedUsername}/events/public`
        );

        const commitsPerDay: Record<string, CommitData> = {};

        res.data.forEach((event) => {
          if (event.type === 'PushEvent' && event.payload.commits) {
            const date = event.created_at.split('T')[0];
            const messages = event.payload.commits.map((commit) => commit.message);

            if (!commitsPerDay[date]) {
              commitsPerDay[date] = { date, count: 0, messages: [] };
            }

            commitsPerDay[date].count += messages.length;
            commitsPerDay[date].messages.push(...messages);
          }
        });

        const chartData = Object.values(commitsPerDay)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(-30);

        setData(chartData);
      } catch (err) {
        console.error('Error fetching GitHub events:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [username]);

  const totalCommits = data.reduce((sum, entry) => sum + entry.count, 0);

  if (loading) return <Skeleton className="h-64 w-full" />;
  if (error) return <p className="text-red-500">Could not load commits.</p>;
  if (data.length === 0) return <p>No recent commits.</p>;

  return (
    <div className="mt-6 space-y-2">
      <p className="text-sm text-muted-foreground">
        Total commits (last 30 days): <span className="font-semibold">{totalCommits}</span>
      </p>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            stroke={resolvedTheme === 'dark' ? '#ccc' : '#333'}
            fontSize={10}
          />
          <YAxis
            stroke={resolvedTheme === 'dark' ? '#ccc' : '#333'}
            fontSize={10}
            allowDecimals={false}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload[0]) {
                const messages = data.find(d => d.date === label)?.messages || [];
                return (
                  <div className="bg-popover text-popover-foreground p-2 rounded shadow text-xs max-w-xs">
                    <p className="font-medium">📅 {label}</p>
                    <p>🟢 {payload[0].value} commits</p>
                    {messages.length > 0 && (
                      <ul className="mt-1 list-disc list-inside max-h-24 overflow-y-auto">
                        {messages.slice(0, 4).map((m, i) => (
                          <li key={i} className="truncate">{m}</li>
                        ))}
                        {messages.length > 4 && <li>...and more</li>}
                      </ul>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke={resolvedTheme === 'dark' ? '#60a5fa' : '#3b82f6'}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

