import { FunctionComponent, memo } from 'react';
import { Link } from 'react-router-dom';
import kasaPublicRoutes from '../config/router/KasaPublicRoutes';
import { i18nRouteAccessor } from '../config/vocab/VocabAccessor';
import wpmDebugger from '../dev/wpmDebugger';

const DEBUGGER_LABEL = 'Kasa Card (React Component)';

interface KasaCardProps {
  id?: string;
  title: string;
  cover?: string;
}

const DummyKasaCard: FunctionComponent<KasaCardProps> = ({ title }) => {
  return (
    <>
      <article className="housing-sheets-grid-gallery-item">
        <div className="housing-sheets-grid-gallery-item-title-wrapper">
          <h3 className="housing-sheets-grid-gallery-item-title">{title}</h3>
        </div>
      </article>
    </>
  );
};

export const KasaCard: FunctionComponent<KasaCardProps> = ({ id, title, cover }) => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');

  if (id && cover) {
    return (
      <>
        <Link to={`${i18nRouteAccessor(kasaPublicRoutes.HOUSING_SHEETS_PAGE)}/${id}`}>
          <article className="housing-sheets-grid-gallery-item" style={{ backgroundImage: `url(${cover})`, backgroundSize: 'cover' }}>
            <div className="housing-sheets-grid-gallery-item-title-wrapper">
              <h3 className="housing-sheets-grid-gallery-item-title">{title}</h3>
            </div>
          </article>
        </Link>
      </>
    );
  }

  return (
    <>
      <DummyKasaCard title={title} />
    </>
  );
};

export default memo(KasaCard);
