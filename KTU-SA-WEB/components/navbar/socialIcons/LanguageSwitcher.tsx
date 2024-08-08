'use client';

import { LANGUAGES } from '@constants/Languages';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import LtFlag from '@public/assets/flags/LT-flag.svg';
import EnFlag from '@public/assets/flags/EN-flag.svg';
import styles from './SocialIcons.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === LANGUAGES.EN ? LANGUAGES.LT : LANGUAGES.EN;

    startTransition(() => {
      router.push(pathname.replace(locale, newLocale));
    });
  };
  
  const flagSrc = locale === LANGUAGES.EN ? EnFlag : LtFlag;
  const altText = locale === LANGUAGES.EN ? 'English' : 'Lithuanian';

  return (
    <button 
      type="button" 
      onClick={toggleLanguage}
      disabled={isPending}
      className={styles.Language}>
      <Image
        alt={altText}
        src={flagSrc}
        className={styles.Flag}
      />
    </button>
  );
}
