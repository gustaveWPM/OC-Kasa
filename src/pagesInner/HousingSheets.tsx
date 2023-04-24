import { FunctionComponent, ReactElement } from 'react';
import { Navigate, Route, useParams } from 'react-router-dom';
import kasaPublicRoutes from '../config/router/KasaPublicRoutes';

interface HousingSheetsInnerProps {}

export const HousingSheetsInner: FunctionComponent<HousingSheetsInnerProps> = () => {
  let { sheet_id } = useParams();

  function buildSheet(id?: string): ReactElement {
    if (id === undefined) {
      return <Navigate to={kasaPublicRoutes.HOME_PAGE} replace />;
    }
    return <h1>This is the housing sheets page, id: {id}</h1>;
  }

  return <>{buildSheet(sheet_id)}</>;
};

export function getRouteParams(): ReactElement {
  return (
    <>
      <Route path=":sheet_id" element={<HousingSheetsInner />} />
    </>
  );
}

export default HousingSheetsInner;
