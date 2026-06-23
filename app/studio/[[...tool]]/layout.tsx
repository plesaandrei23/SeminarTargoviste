/**
 * Standalone layout for Sanity Studio that bypasses the public site's
 * <header>/<footer> chrome. Studio renders its own shell.
 */
export const metadata = {
  title: "Seminar CMS",
  robots: "noindex",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
