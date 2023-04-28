import { FunctionComponent } from 'react';
import { VocabAccessor } from '../config/vocab/VocabAccessor';
import KasaLogo from './KasaLogo';

import './styles/footer.scss';

interface KasaFooterProps {}

export const KasaFooter: FunctionComponent<KasaFooterProps> = () => {
  return (
    <footer className="footer">
      <section className="footer-content-wrapper">
        <KasaLogo currentUseCase="FOOTER" />
        <p className="footer-copyright">
          {VocabAccessor('KASA_COPYRIGHT')}&nbsp;
          <span className="footer-copyright-mention">{VocabAccessor('ALL_RIGHTS_RESERVED')}</span>
        </p>
      </section>
    </footer>
  );
};

export default KasaFooter;
