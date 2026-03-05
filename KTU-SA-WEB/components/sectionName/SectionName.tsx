import ArrowIcon from '@public/icons/action/Arrow.svg';
import Image from 'next/image';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import colors from '@theme/colors';

type Props = {
  title: string;
  id?: string;
  showArrow?: boolean;
  sx?: SxProps<Theme>;
  headingSx?: SxProps<Theme>;
};

function createSectionId(title: string): string {
  const normalized = title
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036f]/g, '')
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/^-+|-+$/g, '');

  if (normalized.length > 0) return normalized;

  const hash = Array.from(title).reduce((acc, char) => {
    const codePoint = char.codePointAt(0);
    if (!codePoint) return acc;
    return (acc * 31 + codePoint) >>> 0;
  }, 7);

  return `section-${hash}`;
}

export default function SectionName(props: Readonly<Props>) {
  const { title, id, showArrow = false, sx, headingSx } = props;
  const sectionId = id ?? createSectionId(title);

  return (
    <Box
      id={sectionId}
      sx={[
        {
          mb: 4,
          scrollMarginTop: { xs: '96px', md: '120px' },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        component="h2"
        sx={[
          {
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            color: colors.nearBlackText,
            fontSize: { xs: 30, sm: 34, md: 38 },
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: '-0.5px',
            gap: 2,
            m: 0,
            textWrap: 'balance',
            '@media (max-width: 940px)': {
              textAlign: 'center',
              justifyContent: 'center',
              width: '100%',
            },
          },
          ...(Array.isArray(headingSx) ? headingSx : [headingSx]),
        ]}
      >
        {title}
        {showArrow && (
          <Box component="span" aria-hidden="true" sx={{ mt: '4px', flexShrink: 0, lineHeight: 0 }}>
            <Image src={ArrowIcon} alt="" width={32} height={35} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
