import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { Categories } from "@/components/home/Categories";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedCollection />
      <Categories />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </Layout>
  );
};

export default Index;
