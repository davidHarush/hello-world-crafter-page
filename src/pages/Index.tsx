
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Hero />
      <Benefits />
      <HowItWorks />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
