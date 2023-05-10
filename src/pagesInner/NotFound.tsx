import { FunctionComponent, ReactNode, memo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import kasaPublicRoutes, { KasaPublicRouteElementKey, kasaPublicRoutesTitles } from '../config/router/KasaPublicRoutes';
import { VocabAccessor, i18nRouteAccessor } from '../config/vocab/VocabAccessor';
import { useForceUpdate } from '../dev/hooks/useForceUpdate';
import wpmDebugger from '../dev/wpmDebugger';

import './styles/notfound.scss';

const DEBUGGER_LABEL = 'Not Found Page (React Component)';

interface NotFoundInnerProps {}

export const NotFoundInner: FunctionComponent<NotFoundInnerProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');

  let renderSuggestLink: ReactNode = false;
  const { state } = useLocation();

  const [forcedUpdateState, setForcedUpdateState] = useState(0);
  useForceUpdate(forcedUpdateState, setForcedUpdateState);

  if (state) {
    const bestScoreData = state.bestScoreData;
    if (bestScoreData?.ROUTE_KEY || bestScoreData?.FORCED_SUGGEST_ROUTE_KEY) {
      const routeKey = (
        bestScoreData.FORCED_SUGGEST_ROUTE_KEY ? bestScoreData.FORCED_SUGGEST_ROUTE_KEY : bestScoreData.ROUTE_KEY
      ) as KasaPublicRouteElementKey;
      const rTo = i18nRouteAccessor(kasaPublicRoutes[routeKey]);
      renderSuggestLink = <Link to={rTo}>{kasaPublicRoutesTitles[routeKey]()}</Link>;
    }
  }

  const rTo = i18nRouteAccessor(kasaPublicRoutes.HOME_PAGE);
  return (
    <div className="not-found-wrapper">
      <section className="not-found-main">
        <h1>404</h1>
        <h2>{VocabAccessor('NOTFOUND_ERROR_MSG')}</h2>
        {renderSuggestLink && (
          <p className="notfound-page-suggestion">
            <em>
              {VocabAccessor('SUGGEST_PAGE_INFO_MSG')}&nbsp;{renderSuggestLink}
            </em>
          </p>
        )}
      </section>
      <Link to={rTo}>{VocabAccessor('GO_BACK_TO_HOME_MSG')}</Link>
    </div>
  );
};

export default memo(NotFoundInner);
