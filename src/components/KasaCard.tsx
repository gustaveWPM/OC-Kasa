import type { FunctionComponent } from 'react';
import { memo } from 'react';
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
    <article className="housing-sheets-grid-gallery-item">
      <div className="housing-sheets-grid-gallery-item-title-wrapper">
        <h2 className="housing-sheets-grid-gallery-item-title">{title}</h2>
      </div>
    </article>
  );
};

export const KasaCard: FunctionComponent<KasaCardProps> = ({ id, title, cover }) => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');

  if (!id || !cover) return <DummyKasaCard title={title} />;

  return (
    <Link to={`${i18nRouteAccessor(kasaPublicRoutes.HOUSING_SHEETS_PAGE)}/${id}`}>
      <article className="housing-sheets-grid-gallery-item" style={{ backgroundImage: `url(${cover})`, backgroundSize: 'cover' }}>
        <div className="housing-sheets-grid-gallery-item-title-wrapper">
          <h2 className="housing-sheets-grid-gallery-item-title">{title}</h2>
        </div>
      </article>
    </Link>
  );
};

export default memo(KasaCard);
