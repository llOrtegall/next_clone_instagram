import { signIn } from "@/auth";

export default function Home() {
  return (
    <div className="">
      <h1>Home</h1>
      <br />
      <form action={async () => {
        'use server';
        await signIn('google');
      }}>
        <button
          className="border px-4 py-2 bg-ig-red text-white rounded-md"
          type="submit">Sign in with Google
        </button>
      </form>
    </div>
  );
}
