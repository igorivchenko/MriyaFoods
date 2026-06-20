import { Hero } from "@/widgets/hero";
import { About } from "@/widgets/about";

export const HomePage = () => {
  return (
    <main>
      <Hero />
      <About />
    </main>
  );
};

HomePage.displayName = "HomePage";
export default HomePage;
