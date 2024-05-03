import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex justify-center flex-col mx-auto w-11/12 lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7x">
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
