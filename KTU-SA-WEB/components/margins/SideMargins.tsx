import styles from './Margins.module.css';

export default function SideMargins({children} : Readonly<{children: React.ReactNode}>) {
  return (
    <div className={styles.SideMargin}>
      {children}
    </div>
  );
}
