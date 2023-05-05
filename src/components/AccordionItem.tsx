import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { getRefValue } from '../dev/plainJS/getRefValue';
import './styles/accordionItem.scss';
import { AccordionData } from './_types';

interface AccordionItemProps {
  data: AccordionData;
  isOpen: boolean;
  btnOnClick: () => void;
}

const AccordionItem: FunctionComponent<AccordionItemProps> = ({ data, isOpen, btnOnClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const contentEl = getRefValue(contentRef);
      setHeight(contentEl.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <li className={`accordion-item ${isOpen ? 'active' : ''}`}>
      <h2 className="accordion-item-title">
        <button className="accordion-item-btn" onClick={btnOnClick}>
          {data.title}
        </button>
      </h2>
      <div className="accordion-item-container" style={{ height }}>
        <div ref={contentRef} className="accordion-item-content">
          {data.content}
        </div>
      </div>
    </li>
  );
};

export default AccordionItem;
