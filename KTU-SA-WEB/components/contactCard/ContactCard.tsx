'use client';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { ContactDto } from '@api/GetContacts';
import Image from 'next/image';
import placeholder from '@public/assets/placeholders/avatar-placeholder.png';
import { Box } from '@mui/material';
import colors from '@theme/colors';
import { focusOutlineInline } from '@theme/styles';

export default function ContactCard({
  contact,
  small = false,
}: Readonly<{ contact: ContactDto; small?: boolean }>) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        maxWidth: 480,
        ...(small && { flexDirection: 'column' }),
        '@media (max-width: 600px)': {
          flexDirection: 'column',
          maxWidth: 300,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 264,
          height: 320,
          flexShrink: 0,
          backgroundColor: colors.activeYellow,
          border: `10px solid ${colors.activeYellow}`,
          borderRadius: '8px',
          overflow: 'hidden',
          '@media (max-width: 400px)': {
            width: 200,
            height: 240,
          },
        }}
      >
        <Image
          src={contact.imageSrc}
          alt={contact.name}
          placeholder="blur"
          blurDataURL={placeholder.src}
          fill
          sizes="264px"
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          '@media (max-width: 600px)': {
            alignItems: 'center',
            textAlign: 'center',
          },
        }}
      >
        <Box
          sx={{
            '@media (max-width: 600px)': {
              alignItems: 'center',
              textAlign: 'center',
            },
          }}
        >
          <Box component="h3" sx={{ fontWeight: 700, m: 0, ...(small && { textAlign: 'center' }) }}>
            {contact.position}
          </Box>
          <Box component="p" sx={{ fontSize: 25, m: 0, ...(small && { textAlign: 'center' }) }}>
            {contact.name}
          </Box>
          <Box component="p" sx={{ m: 0 }}>
            {contact.responsibilities}
          </Box>
        </Box>
        <Box>
          <Box
            sx={{ color: colors.grayContact, display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <MailOutlineIcon sx={{ width: '16px', height: '16px' }} aria-hidden="true" />
            <Box
              component="a"
              href={`mailto:${contact.email}`}
              sx={{
                color: colors.grayContact,
                textDecoration: 'underline',
                '&:hover': { color: colors.linkBlue },
                ...focusOutlineInline,
              }}
            >
              {contact.email}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
