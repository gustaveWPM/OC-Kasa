/*
[CAUTION: READ ME!]
This interface is not isolated from the rest of the code for no reason.
Make first sure you really need to use it.

If you import any of the specified files just above, DO NOT import this interface with this file's path,
but import it directly from the specified module where it has been injected to avoid any Circular-Dependency risk!

If you find it relevant to inject this interface in another module,
do it and update the injections documentation section just here:

[INJECTIONS DOCUMENTATION]
  - Injected in KasaPublicRoutes
*/

import { KasaPublicRouteElementKey } from '../config/router/KasaPublicRoutes';

export interface IDamLevRouteBestScore {
  ROUTE_KEY?: KasaPublicRouteElementKey;
  SCORE?: number;
  FORCED_SUGGEST_ROUTE_KEY?: KasaPublicRouteElementKey;
  FORCED_SUGGEST_ROUTE_SCORE?: number;
}

export default IDamLevRouteBestScore;
