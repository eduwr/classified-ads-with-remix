import { Form, Link } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {
  deleteAdvertising,
  getAdvertisingListItems,
} from "~/models/advertising.server";
import invariant from "tiny-invariant";

export async function loader() {
  return json(await getAdvertisingListItems());
}

export async function action({ request, context, params }: LoaderArgs) {
  const formData = await request.formData();

  const slug = formData.get("delete-slug")?.toString();

  invariant(slug, "Slug is required!");

  return await deleteAdvertising({ slug });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="mx-auto mt-16 max-w-7xl text-center">
        <Link to="/ad/new" className="text-xl text-blue-600 underline">
          New Advertising
        </Link>
        <div className="m-10"></div>
        <Link to="/auth/new" className="text-xl text-blue-600 underline">
          Sign In
        </Link>
      </div>
      <ul>
        {data.map((ad: any) => (
          <li className="m-16 flex flex-col bg-blue-300 p-8" key={ad.slug}>
            <h2>{ad.title}</h2>
            <p>{ad.description}</p>
            <p>{ad.tags}</p>
            <Form method="post" key={ad.slug ?? ""}>
              <button type="submit" name="delete-slug" value={ad.slug}>
                Delete ad
              </button>
            </Form>
          </li>
        ))}
      </ul>
    </main>
  );
}
