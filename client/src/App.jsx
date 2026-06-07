import { useState } from 'react';
import { color, font } from './tokens/web.js';
import ConsultingNav from './sections/ConsultingNav.jsx';
import ConsultingHero from './sections/ConsultingHero.jsx';
import ConsultingProblem from './sections/ConsultingProblem.jsx';
import ConsultingServices from './sections/ConsultingServices.jsx';
import ConsultingDemo from './sections/ConsultingDemo.jsx';
import ConsultingEffects from './sections/ConsultingEffects.jsx';
import ConsultingPortfolio from './sections/ConsultingPortfolio.jsx';
import ConsultingCTA from './sections/ConsultingCTA.jsx';
import koData from './data/consulting.json';
import enData from './data/consulting.en.json';

export default function App() {
  const [lang, setLang] = useState('ko');
  const data = lang === 'ko' ? koData : enData;

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
      <ConsultingNav data={data} lang={lang} onLangChange={setLang} />
      <main>
        <ConsultingHero data={data} lang={lang} />
        <ConsultingProblem data={data} />
        <ConsultingServices data={data} />
        <ConsultingDemo data={data} />
        <ConsultingEffects data={data} />
        <ConsultingPortfolio data={data} />
        <ConsultingCTA data={data} />
      </main>
    </div>
  );
}
