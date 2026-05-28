import { color, font } from './tokens/web.js';
import Nav from './components/Nav.jsx';
import TableOneHero from './sections/TableOneHero.jsx';
import TableOneOverview from './sections/TableOneOverview.jsx';
import TableOneResearchOverview from './sections/TableOneResearchOverview.jsx';
import TableOneSurvey from './sections/TableOneSurvey.jsx';
import TableOneIDI from './sections/TableOneIDI.jsx';
import TableOneServiceSafari from './sections/TableOneServiceSafari.jsx';
import TableOneAffinity from './sections/TableOneAffinity.jsx';
import TableOnePersona from './sections/TableOnePersona.jsx';
import TableOneAsIsCJM from './sections/TableOneAsIsCJM.jsx';
import TableOneInsights from './sections/TableOneInsights.jsx';
import TableOneStrategyShift from './sections/TableOneStrategyShift.jsx';
import TableOneBMC from './sections/TableOneBMC.jsx';
import TableOneOutro from './sections/TableOneOutro.jsx';

export default function App() {
  return (
    <div
      style={{
        background: color.bg,
        fontFamily: font.family,
        minHeight: '100vh',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        wordBreak: 'keep-all',
        overflowWrap: 'break-word',
      }}
    >
      <Nav />
      <main>
        <TableOneHero />
        <TableOneOverview />
        <TableOneResearchOverview />
        <TableOneSurvey />
        <TableOneIDI />
        <TableOneServiceSafari />
        <TableOnePersona />
        <TableOneAsIsCJM />
        <TableOneInsights />
        <TableOneAffinity />
        <TableOneStrategyShift />
        <TableOneBMC />
        <TableOneOutro />
      </main>
    </div>
  );
}
