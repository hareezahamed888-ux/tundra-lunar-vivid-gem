import { createFileRoute } from "@tanstack/react-router";
import { XOApp } from "@/components/game/xo-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <XOApp />;
}
