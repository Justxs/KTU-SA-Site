import FSA_DATA from '@constants/FsaUnits';
import styles from './HeroImage.module.css';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import GoBackButton from '@components/goBackButton/GoBackButton';

type Props = {
  fsaName: string,
  coverUrl: string
}

export default async function HeroImage(props : Props) {
  const {
    fsaName,
    coverUrl
  } = props;

  const t = await getTranslations();
  const fsa = FSA_DATA(t).find((f) => f.name === fsaName.replace('%20', ' '));
  
  if (fsa === undefined) {
    return;
  }

  const fsaStyles = {
    backgroundColor: fsa.backgroundColor,
    color: fsa.textColor,
    borderColor: fsa.borderColor
  };

  return (
    <>
      <div className={styles.Container} style={fsaStyles} >
        <div className={styles.TextContainer}>
          <div className={styles.ImageContainer}>
            <GoBackButton color={fsa.textColor} onHover={fsa.backgroundColor} />
            <Image 
              className={styles.Image} 
              alt={fsa.fullName} 
              src={fsa.logo}
              sizes='100%'
              width={0}
              height={0}/>
          </div>
          <div className={styles.Text}>
            <h1>{fsa.name}</h1>
            <p>{fsa.fullName}</p>
          </div>
          <div className={styles.HeroImageContainer}>
            <Image
              className={styles.HeroImage}
              style={{
                borderColor: fsa.borderColor,
                background: fsa.borderColor
              }}
              src={coverUrl}
              alt="Hero Image"
              sizes='100%'
              width={0}
              height={0}
            />
          </div>
        </div>
      </div>
      <div
        className={styles.Divider}
        style={{ borderColor: fsa.borderColor}}
      />
    </>
  );
}
