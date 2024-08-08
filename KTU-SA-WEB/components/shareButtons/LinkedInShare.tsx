'use client';

import { LinkedinShareButton } from 'react-share';
import { Tooltip } from '@mui/material';
import LinkedInIcon from '@public/icons/social/icon-linkedin.svg';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

type Props = {
  title: string, 
  preview: string, 
}

export default function LinkedInShare({ title, preview} : Props) {
  const t = useTranslations();
  const pathname = usePathname();
  const url = 'https://www.ktusa.lt' + pathname;

  return (
    <Tooltip title={t('common.shareToLinkedIn')}>
      <div>
        <LinkedinShareButton
          url={url}
          title={title}
          summary={preview}
          source={''}
        >
          <Image 
            src={LinkedInIcon} 
            alt="LinkedIn Icon"
            sizes='100%'
            width={0}
            height={0}
          />
        </LinkedinShareButton>
      </div>
    </Tooltip>
  );
}

