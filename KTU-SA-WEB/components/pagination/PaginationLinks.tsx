'use client';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, type Theme } from '@mui/material';
import type { SystemStyleObject } from '@mui/system';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import colors from '@theme/colors';
import { focusOutline } from '@theme/styles';
import { buildPageWindow } from '@/lib/pagination/pageWindow';

type Props = {
  page: number;
  totalPages: number;
  basePath: string;
  params?: Record<string, string>;
};

const itemSx: SystemStyleObject<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 40,
  height: 40,
  px: 1,
  borderRadius: '10px',
  border: `1px solid ${colors.navbarLightBlue}`,
  color: colors.primaryDark,
  fontFamily: 'PFDinTextPro-Medium',
  fontSize: 15,
  textDecoration: 'none',
  transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
  '&:hover': {
    bgcolor: colors.lightBlueBg,
    borderColor: colors.lightBlueAccent,
    color: colors.mediumBlue,
  },
  ...focusOutline,
};

const currentSx: SystemStyleObject<Theme> = {
  ...itemSx,
  bgcolor: colors.navDarkBlue,
  borderColor: colors.navDarkBlue,
  color: colors.white,
  fontWeight: 700,
  '&:hover': {
    bgcolor: colors.navDarkBlue,
    borderColor: colors.navDarkBlue,
    color: colors.white,
  },
};

const disabledSx: SystemStyleObject<Theme> = {
  ...itemSx,
  color: colors.arrowGray,
  borderColor: `${colors.navbarLightBlue}80`,
  pointerEvents: 'none',
};

export default function PaginationLinks({ page, totalPages, basePath, params }: Readonly<Props>) {
  const t = useTranslations('pagination');

  if (totalPages <= 1) return null;

  const buildHref = (target: number) => {
    const search = new URLSearchParams(params);
    if (target > 1) search.set('page', String(target));
    const query = search.toString();

    return query ? `${basePath}?${query}` : basePath;
  };

  const tokens = buildPageWindow(page, totalPages);

  return (
    <Box
      component="nav"
      aria-label={t('label')}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 5 }}
    >
      {page > 1 ? (
        <Box component={Link} href={buildHref(page - 1)} aria-label={t('previousPage')} sx={itemSx}>
          <ChevronLeftIcon sx={{ fontSize: 20 }} />
        </Box>
      ) : (
        <Box component="span" aria-hidden="true" sx={disabledSx}>
          <ChevronLeftIcon sx={{ fontSize: 20 }} />
        </Box>
      )}

      {tokens.map((token) =>
        token.page === null ? (
          <Box
            key={token.key}
            component="span"
            aria-hidden="true"
            sx={{ ...itemSx, border: 'none', color: colors.grayText, pointerEvents: 'none' }}
          >
            &hellip;
          </Box>
        ) : (
          <Box
            key={token.key}
            component={Link}
            href={buildHref(token.page)}
            aria-label={t('goToPage', { page: token.page })}
            aria-current={token.page === page ? 'page' : undefined}
            sx={token.page === page ? currentSx : itemSx}
          >
            {token.page}
          </Box>
        ),
      )}

      {page < totalPages ? (
        <Box component={Link} href={buildHref(page + 1)} aria-label={t('nextPage')} sx={itemSx}>
          <ChevronRightIcon sx={{ fontSize: 20 }} />
        </Box>
      ) : (
        <Box component="span" aria-hidden="true" sx={disabledSx}>
          <ChevronRightIcon sx={{ fontSize: 20 }} />
        </Box>
      )}
    </Box>
  );
}
