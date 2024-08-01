import ArrowIcon from '@public/icons/action/Arrow.svg';
import Styles from './SectionName.module.css';
import Image from 'next/image';

type Props = {
  title: string;
  showArrow?: boolean;
}

export default function SectionName(props : Readonly<Props>) {
  const { title, showArrow = false } = props;

  return (
    <div className={Styles.Container} id={title}>
      <div className={Styles.Header}>
        {title}
        {showArrow && 
          <Image 
            src={ArrowIcon} 
            className={Styles.Arrow} 
            alt="" />
        }
      </div>
    </div>
  );
}
