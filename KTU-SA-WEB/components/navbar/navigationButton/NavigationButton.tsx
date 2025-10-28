import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import styles from './NavigationButton.module.css';

type Props = {
  title: string;
  expanded: boolean;
  onExpand: (a: string) => void;
};

export default function NavigationButton(props: Readonly<Props>) {
  const { title, expanded, onExpand } = props;

  return (
    <button
      className={styles.Button}
      onClick={() => onExpand(title)}
      type="button"
    >
      {title}
      {expanded ? (
        <ArrowDropDownIcon sx={{ color: '#B5BEC4' }} />
      ) : (
        <ArrowRightIcon sx={{ color: '#B5BEC4' }} />
      )}
    </button>
  );
}
