import { getEvent } from '@api/GetEvents';
import Body from '@components/htmlBody/Body';
import { getLocale } from 'next-intl/server';
import HeroImage from './components/eventHero/HeroImage';
import styles from './Event.module.css';
import EventInfo from './components/eventInfo/EventInfo';
import SideMargins from '@components/margins/SideMargins';
import { notFound } from 'next/navigation';

type Props ={ 
  params: Promise<{ 
    eventId: string 
  }> 
}

export async function generateMetadata(props : Props) {
  const locale = await getLocale();
  let event = undefined;
  
  try {
    event = await getEvent(locale, (await props.params).eventId);
  }
  catch {
    return notFound();
  }

  return {
    title: event.title,
    openGraph: {
      images: [{
        url: event.coverImageUrl,
      }],
    },
    twitter: {
      site: '@KTU_SA',
      images: [event.coverImageUrl],
    },
  };
}

export default async function Page(props : Props) {
  const locale = await getLocale();
  let event = undefined;

  try {
    event = await getEvent(locale, (await props.params).eventId);
  }
  catch {
    return notFound();
  }

  return (
    <>
      <HeroImage
        img={event.coverImageUrl}
        title={event.title}
        ticketUrl={event.fientaTicketUrl}
      />
      <SideMargins>
        <div className={styles.Container}>
          <Body
            htmlBody={event.htmlBody}
          />
          <EventInfo
            facebookUrl={event.facebookUrl}
            organizers={event.organisers}
            address={event.address}
            startDate={event.startDate}
            endDate={event.endDate}
          />
        </div>
      </SideMargins>
    </>
  );
}
