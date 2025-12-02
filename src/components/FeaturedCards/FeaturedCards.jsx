import PrimaryCard from "../SingleFeaturedCard/PrimaryCard";
import SecondaryCard from "../SingleFeaturedCard/SecondaryCard";

export default function FeaturedCards() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 py-8 md:px-16">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <PrimaryCard />
        <SecondaryCard />
      </div>
    </section>
  );
}
