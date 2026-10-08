import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { settings } = await getSiteContent();
  return (
    <>
      <SiteHeader title={settings.siteTitle} />
      {children}
      <SiteFooter />
    </>
  );
}
