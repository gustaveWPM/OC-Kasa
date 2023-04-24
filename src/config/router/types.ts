import { ReactElement } from 'react';

export interface KasaPublicRoutes {
  HOME_PAGE: string;
  ABOUT_PAGE: string;
  NOTFOUND_PAGE: string;
  HOUSING_SHEETS_PAGE: string;
}

export type KasaPublicRoutesReactElements = {
  [Property in keyof KasaPublicRoutes]: ReactElement;
};
