// pages/ReposPage.tsx
import { useParams } from "react-router-dom";
import RepoList from "../components/RepoList";

export default function ReposPage() {
  const { username } = useParams<{ username: string }>();
  
  return username ? (
    <RepoList username={username} />
  ) : (
    <p className="text-red-500">No username in URL</p>
  );
}
