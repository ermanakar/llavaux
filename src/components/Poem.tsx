import React, { useEffect, useState } from 'react';
import { useTrail, a } from '@react-spring/web';
import './Poem.css';

const poem = [
  "Expositio Sine Fine",
  "In hac tabula,",
  "visio efflorescit,",
  "Ubi somnia surgunt",
  "sub noctis pectore.",
  "In vasto infinito,",
  "gratiam suam invenit,",
  "Solitaria anima",
  "in spatio sine fine.",
  "Hic ideae florent",
  "sicut astra in mente,",
  "Micant et evanescunt,",
  "sed relicta relinquunt",
  "Vestigia miraculi,",
  "fragilia et libera,",
  "In regno",
  "creativitatis infinitae.",
  "Non quaeritur permanens,",
  "nec mansio longa,",
  "Sed in tuo aspectu",
  "leniter se inclinant.",
  "Saltus imaginum,",
  "fugax spectaculum,",
  "In horto codicis,",
  "veniunt et abeunt.",
  "Solus errator,",
  "in altis profundis,",
  "Libere fingit",
  "ubi spes residet.",
  "Iteratione iteratio,",
  "novas visiones texit,",
  "In hac imaginandi infinitate,",
  "fidit.",
  "Siste igitur et cogita",
  "dum contemplaris,",
  "In hoc regno",
  "tam puro et claro.",
  "Scito licet",
  "haec visio fatiscat,",
  "Pulchritudo eorum manet",
  "ut umbra crepusculi."
];

type TrailProps = {
  open: boolean;
  children: React.ReactNode;
};

const Trail: React.FC<TrailProps> = ({ open, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    from: { opacity: 0, x: 20 },
  });
  return (
    <div>
      {trail.map(({ x, ...style }, index) => (
        <a.div key={index} className="trailsText" style={{ ...style, transform: x.to(x => `translate3d(${x}px,0,0)`) }}>
          <a.div>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};

const Poem = () => {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentLine((prev) => (prev + 1) % poem.length);
    }, 5000); // Change line every 5 seconds
    return () => clearTimeout(timer);
  }, [currentLine]);

  return (
    <div className="poem-container">
      <Trail open={true}>
        <span>{poem[currentLine]}</span>
      </Trail>
    </div>
  );
};

export default Poem;
