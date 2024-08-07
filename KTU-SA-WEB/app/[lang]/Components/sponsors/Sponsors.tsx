import { Tooltip } from '@mui/material';
import styles from './Sponsors.module.css';
import SectionName from '@components/sectionName/SectionName';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

type SponsorDto = {
  id: string;
  name: string;
  websiteUrl: string;
  logoId: string;
};

async function getSponsors(): Promise<Array<SponsorDto>> {
  const res = await fetch('https://ktusaheadlesscms20240406034017.azurewebsites.net/api/Sponsors');

  return res.json();
}

export default async function Sponsors() {
  const t = await getTranslations();
  const sponsors = await getSponsors();

  if (sponsors.length === 0) return null;

  return (
    <div className={styles.Container}>
      <SectionName title={t('sections.sponsors')} />
      <div className={styles.Logos}>
        {sponsors.map((sponsor) => (
          <a
            href={sponsor.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.Logo}
            key={sponsor.id}
          >
            <Tooltip title={sponsor.name}>
              <div style={{ position: 'relative', width: '200px', height: '100px' }}>
                <Image
                  src={sponsor.logoId}
                  alt={sponsor.name}
                  fill
                  sizes="100%"
                  style={{
                    objectFit: 'contain'
                  }}
                />
              </div>
            </Tooltip>
          </a>
        ))}
      </div>
    </div>
  );
}
