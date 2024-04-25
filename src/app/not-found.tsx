import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex justify-center flex-col my-0 mx-auto w-11/12 md:max-w-2xl xl:max-w-5xl">
      <h2 className="text-3xl mb-2">404 | Not Found</h2>
      <p>Could not find the requested resource</p>
      <Link
        rel="stylesheet"
        href="/"
        className="underline font-semibold hover:opacity-80"
      >
        Return Home
      </Link>
    </main>
  );
}
