import { Box } from '@mui/material';
import colors from '@theme/colors';
import { sanitizeCmsHtml } from '@/lib/content/sanitizeCmsHtml';
type Props = {
  html: string;
};

const paragraphSx = {
  mb: '12px',
  width: '100%',
  minWidth: 0,
  '& p': {
    mt: 0,
    mb: '12px',
    lineHeight: 1.7,
  },
  '& h1, & h2': {
    color: colors.primaryDark,
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: 1.35,
    mt: '44px',
    mb: '16px',
    letterSpacing: '-0.015em',
  },
  '& h3, & h4, & h5, & h6': {
    color: colors.darkBlueSecondary,
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: 1.4,
    mt: '36px',
    mb: '12px',
    letterSpacing: '-0.01em',
  },
  '& h1:first-child, & h2:first-child, & h3:first-child, & h4:first-child, & h5:first-child, & h6:first-child':
    {
      mt: 0,
    },
  '& a': {
    color: colors.linkBlue,
    letterSpacing: '0.01em',
    textDecoration: 'underline',
    textDecorationColor: 'rgba(35, 131, 212, 0.3)',
    textDecorationThickness: '1.5px',
    textUnderlineOffset: '3px',
    borderRadius: '3px',
    p: '1px 3px',
    m: '-1px -3px',
    overflowWrap: 'anywhere',
  },
  '& strong, & b': {
    fontWeight: 700,
    color: '#1a2a3a',
  },
  '& ul, & ol': {
    pl: '24px',
    mt: 0,
    mb: '18px',
  },
  '& li': {
    mb: '8px',
    lineHeight: 1.75,
    pl: '4px',
  },
  '& li::marker': {
    color: colors.linkBlue,
  },
  '& blockquote': {
    borderLeft: `4px solid ${colors.linkBlue}`,
    m: '28px 0',
    p: '14px 24px',
    bgcolor: colors.lightBlueBg,
    borderRadius: '0 8px 8px 0',
    color: colors.darkBlueSecondary,
    fontStyle: 'italic',
    lineHeight: 1.7,
  },
  '& blockquote p:last-child': {
    mb: 0,
  },
  '& img, & video, & iframe': {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
  },
  '& iframe': {
    width: '100%',
    minHeight: { xs: 220, sm: 320, md: 420 },
    border: 0,
  },
  '& table': {
    display: 'block',
    width: '100%',
    overflowX: 'auto',
    borderCollapse: 'collapse',
    WebkitOverflowScrolling: 'touch',
  },
  '& th, & td': {
    whiteSpace: 'nowrap',
  },
  '& pre': {
    maxWidth: '100%',
    overflowX: 'auto',
    p: '16px',
    borderRadius: '8px',
    bgcolor: '#0f2238',
    color: colors.white,
  },
  '@media (max-width: 768px)': {
    '& h1, & h2': {
      fontSize: '20px',
      mt: '32px',
      mb: '12px',
    },
    '& h3, & h4, & h5, & h6': {
      fontSize: '18px',
      mt: '26px',
      mb: '10px',
    },
    '& blockquote': {
      px: '16px',
      py: '12px',
    },
  },
};

export default function ParagraphBlock({ html }: Readonly<Props>) {
  return <Box dangerouslySetInnerHTML={{ __html: sanitizeCmsHtml(html) }} sx={paragraphSx} />;
}
