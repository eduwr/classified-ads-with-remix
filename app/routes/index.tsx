import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="mx-auto mt-16 max-w-7xl text-center">
        <Link to="/posts" className="text-xl text-blue-600 underline">
          Blog Posts
        </Link>
      </div>
    </main>
  );
}
