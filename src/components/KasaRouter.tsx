import { FunctionComponent, ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import KasaRouterRescue from './KasaRouterRescue';

import kasaPublicRoutes, { KasaPublicRouteElementKey, PARAMS_ROUTES } from '../config/router/KasaPublicRoutes';
import kasaPublicRoutesComponents from '../config/router/KasaPublicRoutesComponents';
import wpmDebugger from '../dev/wpmDebugger';

const DEBUGGER_LABEL = 'Kasa Router (React Component)';

interface KasaRouterProps {}

function routesGenerator() {
  function atomicRouteGenerator(componentRouteKey: string, route: string, rElement: ReactElement): ReactElement {
    const buildNotParametredRoute = (): ReactElement => <Route key={componentRouteKey} path={route} element={rElement} />;

    for (const paramRoute of PARAMS_ROUTES) {
      const buildParametredRoute = (): ReactElement => (
        <Route key={componentRouteKey} path={route} element={rElement}>
          {paramRoute.params}
        </Route>
      );

      if (route === paramRoute.route) {
        return buildParametredRoute();
      }
    }
    return buildNotParametredRoute();
  }

  const elements: ReactElement[] = [];
  for (const matchKey in kasaPublicRoutesComponents) {
    const castedKey = matchKey as KasaPublicRouteElementKey;
    const [rPath, rElement] = [kasaPublicRoutes[castedKey], kasaPublicRoutesComponents[castedKey]];
    elements.push(atomicRouteGenerator(matchKey, rPath, rElement));
  }
  return elements;
}

export const KasaRouter: FunctionComponent<KasaRouterProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');

  return (
    <BrowserRouter>
      <Routes>
        {routesGenerator()}
        <Route path="*" element={<KasaRouterRescue />} />
      </Routes>
    </BrowserRouter>
  );
};

export default KasaRouter;
