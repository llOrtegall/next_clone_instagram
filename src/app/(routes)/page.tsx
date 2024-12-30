import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="">
      <h1>Home</h1>
      <br />
      {
        session && (
          <div>
            <p>Session:</p>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <br />
            <form action={async () => {
              'use server';
              await signOut();
            }}>
              <button
                className="border px-4 py-2 bg-ig-red text-white rounded-md"
                type="submit">Log out
              </button>
            </form>
          </div>
        )
      }
      {
        !session && (
          <form action={async () => {
            'use server';
            await signIn('google');
          }}>
            <button
              className="border px-4 py-2 bg-ig-red text-white rounded-md"
              type="submit">Sign in with Google
            </button>
          </form>
        )
      }
    </div>
  );
}
