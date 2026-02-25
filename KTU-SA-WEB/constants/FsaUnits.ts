import ESA from '@public/icons/fsa-logos/ESA.png';
import FUMSA from '@public/icons/fsa-logos/FUMSA.png';
import INDI from '@public/icons/fsa-logos/INDI.png';
import INFOSA from '@public/icons/fsa-logos/INFOSA.png';
import SHM from '@public/icons/fsa-logos/SHM.png';
import STATIUS from '@public/icons/fsa-logos/STATIUS.png';
import VFSA from '@public/icons/fsa-logos/VFSA.png';
import VIVAT from '@public/icons/fsa-logos/VIVAT.png';
import { StaticImageData } from 'next/image';

type TranslateFunction = (key: string) => string;

type Fsa = {
  name: string;
  fullName: string;
  logo: StaticImageData;
  backgroundColor: string;
  mainColor: string;
  borderColor: string;
  textColor: string;
};

const FSA_DATA = (t: TranslateFunction): Array<Fsa> => [
  {
    name: 'VIVAT chemija',
    fullName: t('fsanames.vivat'),
    logo: VIVAT,
    backgroundColor: '#fef5ee',
    mainColor: '#ec6b32',
    borderColor: '#dc481a',
    textColor: '#752719',
  },
  {
    name: 'FUMSA',
    fullName: t('fsanames.fumsa'),
    logo: FUMSA,
    backgroundColor: '#fef2f2',
    mainColor: '#eb383b',
    borderColor: '#d9292c',
    textColor: '#7e1e20',
  },
  {
    name: 'InDi',
    fullName: t('fsanames.indi'),
    logo: INDI,
    backgroundColor: '#eef1ff',
    mainColor: '#6d66ee',
    borderColor: '#5d49e2',
    textColor: '#352d78',
  },
  {
    name: 'SHM',
    fullName: t('fsanames.shm'),
    logo: SHM,
    backgroundColor: '#fcf3f9',
    mainColor: '#d85ca1',
    borderColor: '#c53d81',
    textColor: '#78264c',
  },
  {
    name: 'STATIUS',
    fullName: t('fsanames.statius'),
    logo: STATIUS,
    backgroundColor: '#f1fcf4',
    mainColor: '#29be64',
    borderColor: '#1c9d4f',
    textColor: '#17502f',
  },
  {
    name: 'VFSA',
    fullName: t('fsanames.vfsa'),
    logo: VFSA,
    backgroundColor: '#f4f6fa',
    mainColor: '#7985b8',
    borderColor: '#676fa9',
    textColor: '#3a3c5a',
  },
  {
    name: 'ESA',
    fullName: t('fsanames.esa'),
    logo: ESA,
    backgroundColor: '#f3f6fc',
    mainColor: '#3f75b8',
    borderColor: '#2e5c9b',
    textColor: '#23395b',
  },
  {
    name: 'InfoSA',
    fullName: t('fsanames.infosa'),
    logo: INFOSA,
    backgroundColor: '#f2f8fd',
    mainColor: '#258dd2',
    borderColor: '#176fb2',
    textColor: '#164064',
  },
];

export default FSA_DATA;
