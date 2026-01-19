import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      {/* 404 number */}
      <h1 className="text-8xl font-bold text-primary">404</h1>

      {/* Title */}
      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="mt-2 max-w-md text-muted-foreground">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
      >
        ⬅ Return Home
      </Link>
    </div>
  )
}
