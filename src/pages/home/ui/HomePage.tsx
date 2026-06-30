import { Hero } from "@/widgets/hero";
import { About } from "@/widgets/about";
import { ProductCarousel } from "@/widgets/product-carousel";
import { DeliveryMap } from "@/widgets/delivery-map";
import { Cooperation } from "@/widgets/cooperation";
import { fetchPopularProducts, fetchNewProducts } from "@/entities/product";

export const HomePage = async () => {
  const popularProducts = await fetchPopularProducts();
  const newProducts = await fetchNewProducts();

  return (
    <main>
      <Hero />
      <About />
      <ProductCarousel title="Popular" products={popularProducts} />
      <ProductCarousel title="NEW!" products={newProducts} autoplay={true} />
      <Cooperation />
      <DeliveryMap />
    </main>
  );
};

HomePage.displayName = "HomePage";
export default HomePage;
