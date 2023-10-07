/* Got some inspiration from:
- https://dominicarrojado.com/posts/how-to-create-your-own-accordion-in-react-and-typescript-with-tests/
*/

import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { getRefCurrentPtr } from '../dev/plainJS/getRefCurrentPtr';
import { AccordionData } from './_types';

import './styles/accordionItem.scss';

interface AccordionItemProps {
  data: AccordionData;
  isOpened: boolean;
  btnOnClick: () => void;
}

const AccordionItem: FunctionComponent<AccordionItemProps> = ({ data, isOpened, btnOnClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  useEffect(() => {
    function handleResize() {
      const DOMElementPtr = getRefCurrentPtr(contentRef);

      if (DOMElementPtr) {
        const computeHeight = () => {
          const { height } = DOMElementPtr.getBoundingClientRect();
          const { marginTop, marginBottom } = getComputedStyle(DOMElementPtr);
          const heightDeltas = [marginTop, marginBottom].map(parseFloat);
          const computedHeight = height + heightDeltas.reduce((acc, value) => acc + value, 0);
          return computedHeight;
        };
        setMaxHeight(computeHeight());
      } else {
        setMaxHeight(null);
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function getStyle() {
    const fallbackStyle = { maxHeight: '0px' };

    if (isOpened && maxHeight !== null) {
      return { maxHeight: `${maxHeight}` + 'px' };
    }
    return fallbackStyle;
  }

  return (
    <li className={`accordion-item ${isOpened ? 'active' : ''}`}>
      <h2 className="accordion-item-title">
        <button className="accordion-item-btn" onClick={btnOnClick}>
          {data.title}
        </button>
      </h2>
      <div className="accordion-item-container" style={getStyle()}>
        <div ref={contentRef} className="accordion-item-content">
          {data.content}
        </div>
      </div>
    </li>
  );
};

export default AccordionItem;
