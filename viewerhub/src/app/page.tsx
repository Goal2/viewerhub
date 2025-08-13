// src/app/page.tsx
import { redirect } from "next/navigation";
export default function Home() {
  redirect("/leaderboards");   // ou "/me" si tu préfères
  return null;
}
