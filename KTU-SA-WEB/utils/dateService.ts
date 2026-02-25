type TranslateFunction = (key: string, vars?: Record<string, any>) => string;

const dateService = {
  formatTimeAgo(dateInput: Date, t: TranslateFunction) {
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) {
      return 'Invalid date';
    }
    // compute milliseconds difference correctly
    const ago = Date.now() - date.getTime();

    const daysAgo = Math.round(ago / 86400000);
    const monthsAgo = Math.round(daysAgo / 30);

    if (daysAgo < 1) {
      return t('dates.today');
    }
    if (daysAgo === 1) {
      return t('dates.yesterday');
    }
    if (daysAgo < 30) {
      return t('dates.daysAgo', { count: daysAgo });
    }
    if (monthsAgo < 12) {
      return t('dates.monthsAgo', { count: monthsAgo });
    }
    return date.toISOString().split('T')[0];
  },

  formatToDateAndTime(dateInput: Date): string {
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return `${formattedDate} ${formattedTime}`;
  },

  formatToDate(dateInput: Date) {
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    return formattedDate;
  },

  /** Check whether an event has already passed based on its date */
  isEventPassed(dateInput: Date): boolean {
    const date = new Date(dateInput);
    return !Number.isNaN(date.getTime()) && Date.now() > date.getTime();
  },
};

export default dateService;
