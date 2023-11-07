import type { FunctionComponent, ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import i18nRoutesGenerator from '../config/router/i18nRoutesGenerator';
import { KasaNavbar } from './KasaNavbar';
import KasaRouterRescue from './KasaRouterRescue';

export interface KasaPublicRoutes {
  HOME_PAGE: string;
  ABOUT_PAGE: string;
  NOTFOUND_PAGE: string;
  HOUSING_SHEETS_PAGE: string;
}

export type KasaPublicRoutesReactElements = {
  [Property in keyof KasaPublicRoutes]: ReactElement;
};

interface KasaRouterProps {}

const KasaRouter: FunctionComponent<KasaRouterProps> = () => {
  return (
    <BrowserRouter>
      <KasaNavbar />
      <main className="main-wrapper">
        <Routes>
          {i18nRoutesGenerator()}
          <Route path="*" element={<KasaRouterRescue />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default KasaRouter;
