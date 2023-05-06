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
        function computeHeight() {
          const { height } = DOMElementPtr.getBoundingClientRect();
          const { paddingTop, paddingBottom, marginTop, marginBottom } = getComputedStyle(DOMElementPtr);
          const values = [paddingTop, paddingBottom, marginTop, marginBottom].map(parseFloat);
          const computedHeight = height + values.reduce((acc, value) => acc + value, 0);
          return computedHeight;
        }
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

  return (
    <li className={`accordion-item ${isOpened ? 'active' : ''}`}>
      <h2 className="accordion-item-title">
        <button className="accordion-item-btn" onClick={btnOnClick}>
          {data.title}
        </button>
      </h2>
      <div className="accordion-item-container" style={{ maxHeight: isOpened && maxHeight !== null ? `${maxHeight}px` : '0px' }}>
        <div ref={contentRef} className="accordion-item-content">
          {data.content}
        </div>
      </div>
    </li>
  );
};

export default AccordionItem;
