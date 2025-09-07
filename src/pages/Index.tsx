import { HomeHeader } from "@/components/home/HomeHeader";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/layout/Footer";
import { Background } from "@/components/layout/Background";

const Index = () => {
  return (
   <div className="relative min-h-screen">
  {/* Fixed 3D Background */}
  <div className="fixed inset-0 -z-10">
    <Background />
  </div>

  {/* Foreground content */}
  <div className="relative z-10 flex flex-col min-h-screen">
    {/* Sticky Header */}
    <header className="sticky top-0 left-0 w-full z-20 bg-background/70 backdrop-blur-md border-b">
      <HomeHeader />
    </header>

    {/* Page Sections */}
    <main className="flex-1">
      {/* Hero section with no top padding */}
      <section className="pt-0 md:pt-0">
        <Hero />
      </section>

      {/* Features */}
      <section className="py-12 md:py-16">
        <Features />
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <CTA />
      </section>
    </main>

    {/* Footer */}
    <footer className="mt-auto">
      <Footer />
    </footer>
  </div>
</div>




  );
};

export default Index;

