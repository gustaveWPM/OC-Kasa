import type { ReactElement } from 'react';
import { Fragment } from 'react';
import { Navigate, Route } from 'react-router-dom';
import type { KasaPublicRouteElementKey } from '../../config/router/KasaPublicRoutes';
import { PARAMS_ROUTES, SKIPPED_FROM_i18n_ROUTES, kasaPublicRoutes } from '../../config/router/KasaPublicRoutes';
import kasaPublicRoutesComponents from '../../config/router/KasaPublicRoutesComponents';
import wpmDebugger from '../../dev/wpmDebugger';
import Vocab from '../vocab/Vocab';
import { i18nRouteAccessor, routeWithoutI18nAccessor, userLangAndRouteLangMismatch } from '../vocab/VocabAccessor';

const DEBUGGER_LABEL = 'Kasa AtomicRouteGenerator';

function atomicRouteGenerator(componentRouteKey: string, route: string, rElement: ReactElement): ReactElement {
  const needle: string = routeWithoutI18nAccessor(route);
  const buildNotParametredRoute = (): ReactElement => <Route key={`not-parametred-route-${componentRouteKey}`} path={route} element={rElement} />;

  for (const paramRoute of PARAMS_ROUTES) {
    function tryToBuildParametredRouteRedirection(): ReactElement {
      const href = window.location.href;
      const needleIndex = href.indexOf(needle);
      if (needleIndex !== -1) {
        const params = href.substring(needleIndex + needle.length);
        const i18nRouteAccessorUnsafeCtx = true;
        const routeWithParams = route + params;
        const redirectURL = i18nRouteAccessor(routeWithParams, i18nRouteAccessorUnsafeCtx);
        const rElementRedirect = <Navigate key={`parametred-route-redirect-navigate-component-${componentRouteKey}`} to={redirectURL} replace />;
        wpmDebugger(DEBUGGER_LABEL, [`Built parametred route redirection!`, { route: routeWithParams, redirectURL }]);
        return (
          <Route key={`parametred-route-redirect-${componentRouteKey}`} path={routeWithParams} element={rElementRedirect}>
            {paramRoute.params}
          </Route>
        );
      }

      const pureRoute = routeWithoutI18nAccessor(route);
      throw new Error(
        `Didn't build parametred route redirection (maybe I'm just lazy?).\n\nTo know if this message is more than a warning, make sure your navigator HREF matches one of the concerned route(s): ${
          route !== pureRoute ? `["${route}", "${pureRoute}"]` : `["${route}"]`
        }`
      );
    }

    const buildParametredRoute = (): ReactElement => (
      <Route key={`parametred-route-${componentRouteKey}`} path={route} element={rElement}>
        {paramRoute.params}
      </Route>
    );

    if (needle === paramRoute.route) {
      if (rElement.props.replace) {
        let parametredRouteRedirectionElement: ReactElement = <Fragment key={`parametred-route-redirect-fragment-${componentRouteKey}`}></Fragment>;
        try {
          parametredRouteRedirectionElement = tryToBuildParametredRouteRedirection();
        } catch (error) {
          if (error) {
            wpmDebugger(
              DEBUGGER_LABEL,
              [
                `${error}\n\nIf you don't consider this message as a warning but as an error, you might be interested by the following dump of rElement:`,
                rElement
              ],
              {
                errorCodeKey: 'IS_WARNING'
              }
            );
          }
        } finally {
          return parametredRouteRedirectionElement;
        }
      } else return buildParametredRoute();
    }
  }
  return buildNotParametredRoute();
}

export function i18nRoutesGenerator(): ReactElement[] {
  const elements: ReactElement[] = [];

  for (const matchKey in kasaPublicRoutesComponents) {
    const curI18nRoutes: string[] = [];
    function buildI18nRoutes() {
      const haveToSkipRoute = (): boolean => SKIPPED_FROM_i18n_ROUTES.includes(rPath);

      for (const languageSymbol in Vocab) {
        if (haveToSkipRoute()) continue;
        curI18nRoutes.push('/' + languageSymbol + rPath);
      }

      curI18nRoutes.forEach((route) => {
        if (!userLangAndRouteLangMismatch(route)) {
          elements.push(atomicRouteGenerator(matchKey, route, rElement));
          return;
        }

        const i18nRouteAccessorUnsafeCtx = true;
        const rTo = i18nRouteAccessor(route, i18nRouteAccessorUnsafeCtx);
        const rElementRedirect = <Navigate key={`i18n-lang-mismatch-redirect-component-${matchKey}`} to={rTo} replace />;
        elements.push(atomicRouteGenerator(matchKey, route, rElementRedirect));
      });
    }

    const currentRouteKey = matchKey as KasaPublicRouteElementKey;
    const [rPath, rElement] = [kasaPublicRoutes[currentRouteKey], kasaPublicRoutesComponents[currentRouteKey]];
    buildI18nRoutes();
    const curI18nRoute = i18nRouteAccessor(rPath);
    if (curI18nRoutes.includes(curI18nRoute)) {
      const rElementRedirect = <Navigate key={`i18n-not-ignored-route-redirect-component-${matchKey}`} to={curI18nRoute} replace />;
      elements.push(atomicRouteGenerator(matchKey, rPath, rElementRedirect));
    } else {
      elements.push(atomicRouteGenerator(matchKey, rPath, rElement));
    }
  }
  return elements;
}

export default i18nRoutesGenerator;
