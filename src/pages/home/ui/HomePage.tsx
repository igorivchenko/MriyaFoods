import { Hero } from "@/widgets/hero";

export const HomePage = () => {
  return (
    <main>
      <Hero />
      {/* Future sections (e.g. Featured Products, About us preview) will stack here */}
    </main>
  );
};

HomePage.displayName = "HomePage";
export default HomePage;
