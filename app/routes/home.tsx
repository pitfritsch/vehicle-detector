import type { Route } from "./+types/home";
import { HomePage } from "../home/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vehicle Detector" },
    { name: "description", content: "Welcome to Vehicle Detector!" },
  ];
}

export default function Home() {
  return <HomePage />;
}
