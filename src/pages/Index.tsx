import { HomeHeader } from "@/components/home/HomeHeader";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/layout/Footer";
import { Background } from "@/components/layout/Background";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* 3D Background */}
      <Background />

      <div className="relative z-10">
        <HomeHeader />
        <main>
          <Hero />
          <Features />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;

