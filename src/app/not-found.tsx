import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dacc-bg flex flex-col items-center justify-center px-4">
      <h1 className="font-mono text-6xl font-bold text-dacc-red mb-4">404</h1>
      <p className="font-mono text-lg text-dacc-muted mb-2">
        [ERROR] Target not found.
      </p>
      <p className="font-sans text-sm text-dacc-muted mb-8">
        This analysis doesn&apos;t exist or has expired.
      </p>
      <Link href="/" className="btn-primary">
        Return to base
      </Link>
    </div>
  );
}
