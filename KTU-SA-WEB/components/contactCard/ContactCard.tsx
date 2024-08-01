import MailOutlineIcon from '@mui/icons-material/MailOutline';
import styles from './ContactCard.module.css';
import { ContactDto } from '@api/GetContacts';
import Image from 'next/image';
import placeholder from '@public/assets/placeholders/avatar-placeholder.png';

export default function ContactCard({ contact, small = false } : { contact : ContactDto, small?: boolean }) {

  return (
    <div className={styles.Container} style={small ? { flexDirection: 'column' } : undefined}>
      <Image 
        className={styles.Image} 
        src={contact.imageSrc} 
        alt={contact.name}
        placeholder='blur'
        blurDataURL={placeholder.src}
        sizes='100%' 
        width={0}
        height={0}
      />
      <div className={styles.Information}>
        <div className={styles.MainSection}>
          <div className={styles.Position} style={small ? { textAlign: 'center' } : undefined}>{contact.position}</div>
          <div className={styles.Name} style={small ? { textAlign: 'center' } : undefined}>{contact.name}</div>
          <div>{contact.responsibilities}</div>
        </div>
        <div>
          <div className={styles.Contacts}>
            <MailOutlineIcon sx={{ width: '16px', height: '16px' }} />
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
