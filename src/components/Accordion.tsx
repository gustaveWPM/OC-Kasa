// * ... https://dominicarrojado.com/posts/how-to-create-your-own-accordion-in-react-and-typescript-with-tests/

import { FunctionComponent, memo, useState } from 'react';
import AccordionItem from './AccordionItem';
import './styles/accordion.scss';
import { AccordionData } from './_types';

interface AccordionProps {
  items: Array<AccordionData>;
  defaultOpenedItemIndex?: number;
}

const Accordion: FunctionComponent<AccordionProps> = ({ items, defaultOpenedItemIndex }) => {
  const UNDEFINED_ACCORDION_ITEM_INDEX = -1;

  function getDefaultOpenedItemIndex() {
    const isValidIndex = (n: number | undefined) => n !== undefined && n >= 0 && items.length - 1 >= n;
    if (isValidIndex(defaultOpenedItemIndex)) {
      return defaultOpenedItemIndex;
    }
    return UNDEFINED_ACCORDION_ITEM_INDEX;
  }

  const [currentIdx, setCurrentIdx] = useState(getDefaultOpenedItemIndex());
  const btnOnClick = (idx: number) => {
    setCurrentIdx((currentValue) => (currentValue !== idx ? idx : UNDEFINED_ACCORDION_ITEM_INDEX));
  };

  return (
    <ul className="accordion">
      {items.map((item, idx) => (
        <AccordionItem key={`accordion-item-${idx}`} data={item} isOpen={idx === currentIdx} btnOnClick={() => btnOnClick(idx)} />
      ))}
    </ul>
  );
};

export default memo(Accordion);
