import { LinkedinShareButton } from 'react-share';
import { Tooltip } from '@mui/material';
import LinkedInIcon from '@public/icons/social/icon-linkedin.svg';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

type Props = {
  title: string, 
  preview: string, 
  currentUrl?: string
}

export default async function LinkedInShare({ title, preview, currentUrl = '' } : Props) {
  const t = await getTranslations();

  return (
    <Tooltip title={t('common.shareToLinkedIn')}>
      <div>
        <LinkedinShareButton
          url={currentUrl}
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

