interface HeroSectionProps {
  firstChild?: React.ReactNode;
  secondChild?: React.ReactNode;
}

const HeroSection = ({ firstChild, secondChild }: HeroSectionProps) => {
  return (
    <section className="min-h-screen w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[2fr_3fr] lg:grid-cols-[1fr_3fr]">
      <div className="min-h-screen">{firstChild}</div>
      <div className="order-first md:order-none min-h-screen">{secondChild}</div>
    </section>
  );
};

export default HeroSection;
