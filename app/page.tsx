import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="">
      test <br />

      {session && (
        <form action={async () => {
          'use server';
          await signOut();
        }}>

          <button
            className="px-4 py-2 bg-red text-white rounded-md"

            type="submit">Logout</button>
        </form>
      )}

      {!session && (
        <form action={async () => {
          'use server';
          await signIn('google');
        }}>

          <button
            className="px-4 py-2 bg-red text-white rounded-md"

            type="submit">Sign in with Google</button>
        </form>
      )}


    </div>
  );
}
