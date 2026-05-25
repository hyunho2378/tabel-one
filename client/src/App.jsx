import { color, font } from './tokens/web.js';
import ConsultingNav from './sections/ConsultingNav.jsx';
import ConsultingHero from './sections/ConsultingHero.jsx';
import ConsultingProblem from './sections/ConsultingProblem.jsx';
import ConsultingServices from './sections/ConsultingServices.jsx';
import ConsultingDemo from './sections/ConsultingDemo.jsx';
import ConsultingEffects from './sections/ConsultingEffects.jsx';
import ConsultingPortfolio from './sections/ConsultingPortfolio.jsx';
import ConsultingCTA from './sections/ConsultingCTA.jsx';

export default function App() {
  return (
    <div style={{
      background: color.bg,
      fontFamily: font.family,
      minHeight: '100vh',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      wordBreak: 'keep-all',
      overflowWrap: 'break-word',
    }}>
      <ConsultingNav />
      <main>
        <ConsultingHero />
        <ConsultingProblem />
        <ConsultingServices />
        <ConsultingDemo />
        <ConsultingEffects />
        <ConsultingPortfolio />
        <ConsultingCTA />
      </main>
    </div>
  );
}
