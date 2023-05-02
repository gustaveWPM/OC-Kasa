import { FunctionComponent, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import kasaPublicRoutes from '../config/router/KasaPublicRoutes';
import { i18nRouteAccessor, VocabAccessor } from '../config/vocab/VocabAccessor';

enum UseCase {
  HEADER,
  FOOTER
}

type UseCaseValue = keyof typeof UseCase;

const logoPxDimsDictionnary: { [index: number]: { width: number; height: number } } = {
  [UseCase.HEADER]: { width: 210.32, height: 68 },
  [UseCase.FOOTER]: { width: 122, height: 39.44 }
};

interface KasaLogoProps {
  currentUseCase?: UseCaseValue;
}

const defaultUseCase: UseCaseValue = 'HEADER';

export const KasaLogo: FunctionComponent<KasaLogoProps> = ({ currentUseCase = defaultUseCase }) => {
  const getThemedLogoElement = (): ReactElement => {
    const width = logoPxDimsDictionnary[UseCase[currentUseCase]].width;
    const height = logoPxDimsDictionnary[UseCase[currentUseCase]].height;
    if (currentUseCase === 'FOOTER') {
      return <img src="/img/icons/logo-dark.svg" draggable="false" width={width} height={height} alt="" />;
    }
    return <img src="/img/icons/logo-light.svg" draggable="false" width={width} height={height} alt="" />;
  };

  const getLogo = (): ReactElement => {
    if (currentUseCase === 'HEADER') {
      return <Link to={i18nRouteAccessor(kasaPublicRoutes.HOME_PAGE)}>{getThemedLogoElement()}</Link>;
    }
    return <>{getThemedLogoElement()}</>;
  };

  return (
    <div className={`kasa-logo ${currentUseCase?.toLowerCase()}-use-case`} aria-label={VocabAccessor('KASA_LOGO_ALT')}>
      {getLogo()}
    </div>
  );
};

KasaLogo.defaultProps = {
  currentUseCase: defaultUseCase
};

export default KasaLogo;
