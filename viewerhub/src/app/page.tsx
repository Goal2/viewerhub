import { redirect } from "next/navigation";

export default function Home() {
  redirect("/me"); // ou "/leaderboards" si tu préfères
}
