import { FunctionComponent } from 'react';
interface HomePageInnerProps {}

import './styles/homepage.scss';

export const HomePageInner: FunctionComponent<HomePageInnerProps> = () => {
  return (
    <>
      <h1>This is the homepage</h1>
    </>
  );
};

export default HomePageInner;
