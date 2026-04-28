import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { MotionProvider } from "@/components/motion-provider";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </MotionProvider>
  );
}
