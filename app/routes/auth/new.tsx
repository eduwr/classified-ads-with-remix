import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm } from "remix-validated-form";
import invariant from "tiny-invariant";
import { z } from "zod";
import { createUser } from "~/models/user.server";

import { getUser } from "~/session.server";

export const createUserValidator = withZod(
  z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Email is not valid"),

    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    middleName: z.string().optional(),
  })
);

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const fields = ["email", "firstName", "middleName", "lastName"];

  const toLowerCase = (str: string | null | undefined) =>
    str ? str.toLowerCase() : "";

  const [email, firstName, middleName, lastName] = fields.map((field) =>
    toLowerCase(formData.get(field)?.toString())
  );

  invariant(email, "email is Required");
  invariant(firstName, "firstName is Required");
  invariant(lastName, "lastName is Required");

  await createUser({ email, firstName, lastName, middleName });

  return redirect(`/`);
}
export default function AdvertisingDetailsPage() {
  const data = useLoaderData<typeof loader>();

  if (data.user?.userId) {
    redirect("/");
  }

  return (
    <section>
      <ValidatedForm validator={createUserValidator} method="post">
        <input name="email" type="email" placeholder="email"></input>
        <input name="firstName" placeholder="First Name"></input>
        <input name="middleName" placeholder="Middle Name"></input>
        <input name="lastName" placeholder="Lsat Name"></input>
        <button type="submit">Create User</button>
      </ValidatedForm>
    </section>
  );
}
