import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AshlarTransition from "@/components/AshlarTransition";
import Services from "@/components/Services";
import FeaturedWork from "@/components/FeaturedWork";
import Testimonials from "@/components/Testimonials";
import BlueprintStatement from "@/components/BlueprintStatement";
import PixelDissolve from "@/components/PixelDissolve";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <div id="top" />
      <main>
        <Hero />
        <About />
        <AshlarTransition />
        <Services />
        <FeaturedWork />
        <Testimonials />
        <BlueprintStatement />
        <PixelDissolve />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
