import React from "react";
import WomenHeader from "@/components/headers/WomenHeader";
import LeatherGoodsGrid from "@/components/women/LeatherGoodsGrid";

export default function Womanpage() {
  return (
    <section className="w-full bg-white text-black">
      <WomenHeader />
      <LeatherGoodsGrid />
    </section>
  );
}