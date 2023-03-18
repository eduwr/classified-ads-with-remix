import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getAdvertising } from "~/models/advertising.server";

export async function loader({ params }: LoaderArgs) {
  const slug = params.slug;
  invariant(slug, "Slug is required");
  return json(await getAdvertising({ slug }));
}

export default function AdvertisingDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <section>
      <h1>{data.title}</h1>
      <p>{data.slug}</p>
      <p>{data.description}</p>
      <p>{data.tags}</p>
    </section>
  );
}
