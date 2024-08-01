import ESA from '@public/icons/fsa-logos/ESA.png';
import FUMSA from '@public/icons/fsa-logos/FUMSA.png';
import INDI from '@public/icons/fsa-logos/INDI.png';
import INFOSA from '@public/icons/fsa-logos/INFOSA.png';
import SHM from '@public/icons/fsa-logos/SHM.png';
import STATIUS from '@public/icons/fsa-logos/STATIUS.png';
import VFSA from '@public/icons/fsa-logos/VFSA.png';
import VIVAT from '@public/icons/fsa-logos/VIVAT.png';
import BRK from '@public/icons/fsa-logos/BRK.png';
import KTUSA from '@public/icons/logos/KTU_SA_Logo.svg';
import { StaticImageData } from 'next/image';

type FsaLogo = {
  name: string;
  logo: StaticImageData;
}

const SA_UNITS_LOGO : Array<FsaLogo> = [
  {
    name: 'VIVAT chemija',
    logo: VIVAT
  },
  {
    name: 'FUMSA',
    logo: FUMSA
  },
  {
    name: 'InDi',
    logo: INDI
  },
  {
    name: 'SHM',
    logo: SHM
  },
  {
    name: 'STATIUS',
    logo: STATIUS
  },
  {
    name: 'VFSA',
    logo: VFSA
  },
  {
    name: 'ESA',
    logo: ESA
  },
  {
    name: 'InfoSA',
    logo: INFOSA
  },
  {
    name: 'CSA',
    logo: KTUSA
  },
  {
    name: 'BRK',
    logo: BRK
  }
];

export default SA_UNITS_LOGO;
