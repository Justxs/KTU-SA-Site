export type EventPreviewDto = {
  id: string;
  title: string;
  startDate: Date;
  coverImageUrl: string;
};

export type EventContentDto = {
  id: string;
  title: string;
  facebookUrl: string;
  fientaTicketUrl?: string;
  address?: string;
  htmlBody: string;
  startDate: Date;
  endDate: Date;
  coverImageUrl: string;
  organisers: Array<string>;
};

export async function getEvents(lang: string): Promise<Array<EventPreviewDto>> {
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/${lang}/Events`);

  if (!res.ok) {
    console.error(`Failed to fetch events (${res.status}): ${res.statusText}`);
    return [];
  }

  return res.json();
}

export async function getEventsBySaUnit(
  lang: string,
  saUnit: string,
): Promise<Array<EventPreviewDto>> {
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/${lang}/Events/SaUnits/${saUnit}`);

  if (!res.ok) {
    console.error(`Failed to fetch events by SA unit (${res.status}): ${res.statusText}`);
    return [];
  }

  return res.json();
}

export async function getEvent(lang: string, id: string): Promise<EventContentDto> {
  const res = await fetch(`${process.env.KTU_SA_WEB_API_URL}/${lang}/Events/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch event ${id} (${res.status}): ${res.statusText}`);
  }

  return res.json();
}
