import SuitsGrid from "@/components/men/SuitsGrid";
import LeatherGoodsGrid from "@/components/women/LeatherGoodsGrid";
import Footer from "@/pages/Footer";

export default function Home() {
  return (
    <div>
      {/* Men's Section */}
      <SuitsGrid />

      {/* Women's Section */}
      <LeatherGoodsGrid />

      <Footer />
    </div>
  );
}