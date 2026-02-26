import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
        p: '6px 12px',
        justifyContent: 'center',
        alignItems: 'center',
        color: expanded ? colors.mediumBlue : colors.primaryDark,
        borderRadius: '8px',
        border: 0,
        bgcolor: expanded ? colors.navbarLightBlue : 'transparent',
        fontSize: 16,
        fontFamily: 'PFDinTextPro-Medium',
        letterSpacing: '0.3px',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        '&:hover': {
          bgcolor: colors.navbarLightBlue,
          color: colors.mediumBlue,
        },
        '&:focus-visible': {
          outline: `2px solid ${colors.focusBlue}`,
          borderRadius: '8px',
        },
      }}
    >
      {title}
      <ArrowDropDownIcon
        sx={{
          color: expanded ? colors.mediumBlue : colors.arrowGray,
          transition: 'transform 0.2s ease, color 0.2s ease',
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          fontSize: 20,
          ml: '2px',
        }}
        aria-hidden="true"
      />
    </Box>
  );
}
