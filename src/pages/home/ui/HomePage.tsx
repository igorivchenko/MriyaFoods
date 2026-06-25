import { Hero } from "@/widgets/hero";
import { About } from "@/widgets/about";
import { ProductCarousel } from "@/widgets/product-carousel";
import { Cooperation } from "@/widgets/cooperation";
import { popularProducts, newProducts } from "@/entities/product";

export const HomePage = () => {
  return (
    <main>
      <Hero />
      <About />
      <ProductCarousel title="Popular" products={popularProducts} />
      <ProductCarousel title="NEW!" products={newProducts} autoplay={true} />
      <Cooperation />
    </main>
  );
};

HomePage.displayName = "HomePage";
export default HomePage;
