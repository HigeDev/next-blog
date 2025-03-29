// app/page.tsx
import { Button } from "flowbite-react";

export default function Home() {
  return (
    <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
      Purple to Blue
    </Button>
  );
}
