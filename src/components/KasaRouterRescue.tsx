import type { FunctionComponent } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { IDamLevRouteBestScore, KasaPublicRouteElementKey } from '../config/router/KasaPublicRoutes';
import kasaPublicRoutes, {
  DAMERAU_LEVENSHTEIN_RESCUE_REDIRECT_DISTANCE_THRESHOLD,
  DAMERAU_LEVENSHTEIN_RESCUE_SUGGEST_DISTANCE_THRESHOLD,
  MINIMAL_AMOUNT_OF_CHARACTERS_IN_USER_TRIED_ROUTE_TO_FORCE_A_SUGGEST,
  SKIPPED_FROM_404_SUGGESTIONS_ROUTES
} from '../config/router/KasaPublicRoutes';
import { i18nRouteAccessor, routeWithoutI18nAccessor } from '../config/vocab/VocabAccessor';
import damerauLevenshtein from '../dev/math/DamerauLevenshtein';

interface KasaRouterRescueProps {}

const KasaRouterRescue: FunctionComponent<KasaRouterRescueProps> = () => {
  const { pathname } = useLocation();
  const bestScoreData: IDamLevRouteBestScore = {};

  for (const routeKey in kasaPublicRoutes) {
    const currentRouteKey = routeKey as KasaPublicRouteElementKey;
    const currentRoute: string = routeWithoutI18nAccessor(kasaPublicRoutes[currentRouteKey]);
    const currentPathname: string = routeWithoutI18nAccessor(pathname);
    const currentScore: number = damerauLevenshtein(currentPathname, currentRoute);

    const haveToSkipRoute = (): boolean => SKIPPED_FROM_404_SUGGESTIONS_ROUTES.includes(currentRoute);
    if (haveToSkipRoute()) continue;

    function haveToAppendForcedSuggestRouteData(): boolean {
      function computeConsecutiveCommonCharacters(): number {
        let commonCharacters = 0;

        for (let i: number = 0; currentRoute[i] && currentPathname[i]; i++) {
          if (currentPathname[i] === currentRoute[i]) commonCharacters += 1;
        }
        return commonCharacters;
      }

      const consecutiveCommonCharacters = computeConsecutiveCommonCharacters();
      return (
        currentScore > DAMERAU_LEVENSHTEIN_RESCUE_REDIRECT_DISTANCE_THRESHOLD &&
        (bestScoreData.FORCED_SUGGEST_ROUTE_SCORE ? bestScoreData.FORCED_SUGGEST_ROUTE_SCORE > currentScore : true) &&
        consecutiveCommonCharacters >= MINIMAL_AMOUNT_OF_CHARACTERS_IN_USER_TRIED_ROUTE_TO_FORCE_A_SUGGEST
      );
    }

    if (haveToAppendForcedSuggestRouteData()) {
      bestScoreData.FORCED_SUGGEST_ROUTE_KEY = currentRouteKey;
      bestScoreData.FORCED_SUGGEST_ROUTE_SCORE = currentScore;
    }

    if (!bestScoreData.SCORE || currentScore < bestScoreData.SCORE) {
      bestScoreData.ROUTE_KEY = currentRouteKey;
      bestScoreData.SCORE = currentScore;
    }
  }

  if (
    bestScoreData.FORCED_SUGGEST_ROUTE_SCORE &&
    bestScoreData.SCORE &&
    bestScoreData.SCORE <= DAMERAU_LEVENSHTEIN_RESCUE_SUGGEST_DISTANCE_THRESHOLD
  ) {
    if (bestScoreData.FORCED_SUGGEST_ROUTE_SCORE > bestScoreData.SCORE) {
      bestScoreData.FORCED_SUGGEST_ROUTE_SCORE = undefined;
      bestScoreData.FORCED_SUGGEST_ROUTE_KEY = undefined;
    }
  }

  let rTo = kasaPublicRoutes.NOTFOUND_PAGE;
  let rState: { bestScoreData: IDamLevRouteBestScore } = { bestScoreData: {} };
  if (bestScoreData.ROUTE_KEY && bestScoreData.SCORE) {
    if (bestScoreData.SCORE <= DAMERAU_LEVENSHTEIN_RESCUE_REDIRECT_DISTANCE_THRESHOLD) {
      rTo = i18nRouteAccessor(kasaPublicRoutes[bestScoreData.ROUTE_KEY]);
    } else if (bestScoreData.FORCED_SUGGEST_ROUTE_KEY || bestScoreData.SCORE <= DAMERAU_LEVENSHTEIN_RESCUE_SUGGEST_DISTANCE_THRESHOLD) {
      rState = { bestScoreData };
    }
  }
  return <Navigate to={rTo} state={rState} replace />;
};

export default KasaRouterRescue;
