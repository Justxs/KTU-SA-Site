'use client';

import { FacebookShareButton } from 'react-share';
import { Tooltip } from '@mui/material';
import FacebookIcon from '@public/icons/social/icon-facebook.svg';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import OptimizedImage from '@components/common/OptimizedImage';

export default function FacebookShare() {
  const t = useTranslations();
  const pathname = usePathname();
  const url = 'https://www.ktusa.lt' + pathname;

  return (
    <Tooltip title={t('common.shareToFb')}>
      <div>
        <FacebookShareButton
          url={url}
        >
          <OptimizedImage 
            src={FacebookIcon} 
            alt="Facebook Icon"
            sizes='100%'
            width={0}
            height={0}
          />
        </FacebookShareButton>
      </div>
    </Tooltip>
  );
}
