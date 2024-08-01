import { FacebookShareButton } from 'react-share';
import { Tooltip } from '@mui/material';
import FacebookIcon from '@public/icons/social/icon-facebook.svg';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export default async function FacebookShare({ currentUrl = '' } : { currentUrl? : string }) {
  const t = await getTranslations();

  return (
    <Tooltip title={t('common.shareToFb')}>
      <div>
        <FacebookShareButton
          url={currentUrl}
        >
          <Image 
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
