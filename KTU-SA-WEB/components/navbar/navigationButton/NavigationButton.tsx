import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Box } from '@mui/material';
import colors from '@theme/colors';

type Props = {
  title: string;
  expanded: boolean;
  onExpand: (a: string) => void;
};

export default function NavigationButton(props: Readonly<Props>) {
  const { title, expanded, onExpand } = props;

  return (
    <Box
      component="button"
      onClick={() => onExpand(title)}
      type="button"
      aria-expanded={expanded}
      sx={{
        display: 'inline-flex',
        p: '4px',
        pl: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--primary-dark)',
        borderRadius: '4px',
        border: 0,
        bgcolor: colors.white,
        fontSize: '20px',
        fontFamily: 'PFDinTextPro-Medium',
        transition: '0.3s',
        cursor: 'pointer',
        '&:hover': {
          bgcolor: colors.navbarLightBlue,
          transition: '0.3s',
        },
        '&:focus-visible': {
          bgcolor: colors.navbarLightBlue,
          transition: '0.3s',
        },
      }}
    >
      {title}
      {expanded ? (
        <ArrowDropDownIcon sx={{ color: colors.arrowGray }} aria-hidden="true" />
      ) : (
        <ArrowRightIcon sx={{ color: colors.arrowGray }} aria-hidden="true" />
      )}
    </Box>
  );
}
