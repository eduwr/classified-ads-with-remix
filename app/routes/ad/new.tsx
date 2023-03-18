import { redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { createAdvertising } from "~/models/advertising.server";
import { ValidatedForm } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import invariant from "tiny-invariant";

export const validator = withZod(
  z.object({
    slug: z.string().min(1, { message: "Slug is required" }),
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is Required" }),
    tags: z.string().optional(),
  })
);

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const fields = ["title", "description", "slug", "tags"];

  const [title, description, slug, tags] = fields.map((field) =>
    formData.get(field)?.toString()
  );

  invariant(title, "Title is Required");
  invariant(description, "description is Required");
  invariant(slug, "slug is Required");
  invariant(tags, "tags is Required");

  const ad = await createAdvertising({ slug, title, description, tags });

  return redirect(`/ad/${ad.slug}`);
}

export default function AdNewPage() {
  return (
    <ValidatedForm validator={validator} method="post">
      <label htmlFor="slug">Slug</label>
      <input name="slug"></input>
      <label htmlFor="title">Title</label>
      <input name="title"></input>
      <label htmlFor="description">Description</label>
      <input name="description"></input>
      <label htmlFor="tags">Tags</label>
      <input name="tags"></input>
      <button type="submit">Create Advertising</button>
    </ValidatedForm>
  );
}
