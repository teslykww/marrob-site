import Hero from './sections/Hero';
import Problem from './sections/Problem';
import Solution from './sections/Solution';
import BeforeAfter from './sections/BeforeAfter';
import Catalog from './sections/Catalog';
import Gallery from './sections/Gallery';
import Reviews from './sections/Reviews';
import Certs from './sections/Certs';
import Specs from './sections/Specs';
import Warranty from './sections/Warranty';
import Scenarios from './sections/Scenarios';
import Stages from './sections/Stages';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePendingSectionScroll } from './lib/scrollToSection';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  usePendingSectionScroll(location, () => {
    navigate('.', { replace: true, state: null });
  });

  return (
    <main>
      <Hero />
      <Problem />
      <Solution />
      <BeforeAfter />
      <Catalog />
      <Gallery />
      <Reviews />
      <Certs />
      <Specs />
      <Warranty />
      <Scenarios />
      <Stages />
      <Contact />
      <FAQ />
    </main>
  );
}



export default App;
