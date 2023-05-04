import { FunctionComponent, ReactElement, useState } from 'react';

import './styles/accordion.scss';

interface AccordionProps {
  title: string;
  content: string;
}

export const Accordion: FunctionComponent<AccordionProps> = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  function toggleAccordionItem() {
    setIsActive(!isActive);
  }

  function activeClassToggler() {
    if (!isActive) {
      return '';
    }
    return 'active ';
  }

  function accordionButtonClassBuilder() {
    return activeClassToggler() + 'accordion-button';
  }

  return (
    <div className="accordion-item">
      <button className={accordionButtonClassBuilder()} onClick={toggleAccordionItem}>
        <h2 className="accordion-label">{title}</h2>
      </button>
      <p className="accordion-content">{content}</p>
    </div>
  );
};

export function accordionsGenerator(accordionContent: Record<string, string>): ReactElement {
  const fragments: ReactElement[] = [];

  for (const [key, value] of Object.entries(accordionContent)) {
    fragments.push(<Accordion key={`accordion-entity-${key}-${value}`} title={key} content={value} />);
  }
  return <div className="accordion-wrapper">{fragments}</div>;
}

export default Accordion;
