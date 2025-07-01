
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E0E0E0]">
      <Hero />
      <Benefits />
      <HowItWorks />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
