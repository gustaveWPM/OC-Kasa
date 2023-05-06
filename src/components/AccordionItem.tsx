import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { getRefValue } from '../dev/plainJS/getRefValue';
import { AccordionData } from './_types';

import './styles/accordionItem.scss';

interface AccordionItemProps {
  data: AccordionData;
  isOpen: boolean;
  btnOnClick: () => void;
}

const AccordionItem: FunctionComponent<AccordionItemProps> = ({ data, isOpen, btnOnClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  useEffect(() => {
    function handleResize() {
      const refValue = getRefValue(contentRef);
      if (refValue) {
        setMaxHeight(refValue.offsetHeight);
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <li className={`accordion-item ${isOpen ? 'active' : ''}`}>
      <h2 className="accordion-item-title">
        <button className="accordion-item-btn" onClick={btnOnClick}>
          {data.title}
        </button>
      </h2>
      <div className="accordion-item-container" style={{ maxHeight: isOpen && maxHeight !== null ? `${maxHeight}px` : '0px' }}>
        <div ref={contentRef} className="accordion-item-content">
          {data.content}
        </div>
      </div>
    </li>
  );
};

export default AccordionItem;
