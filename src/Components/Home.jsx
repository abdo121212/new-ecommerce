import HomeSlider from "./HomeSlider";
import CategorySlider from "./CategorySlider";
import Products from "./Products";
const Home = () => {
  return (
    <main className="container px-10 py-6 mx-auto">
      <HomeSlider />
      <CategorySlider />
      <Products />
    </main>
  );
};

export default Home;
