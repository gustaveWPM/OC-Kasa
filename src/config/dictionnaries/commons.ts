const BRAND = 'Kasa';

type Commons = {
  BRAND: string;
  KASA_COPYRIGHT: string;
};

const COMMONS: Commons = {
  BRAND,
  KASA_COPYRIGHT: `© ${new Date().getFullYear()} ${BRAND}.`
} as const;

export default COMMONS;
