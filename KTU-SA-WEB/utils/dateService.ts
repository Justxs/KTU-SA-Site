
type TranslateFunction = (key: string) => string;

const dateService = {
  formatTimeAgo(dateInput : Date, t : TranslateFunction) {
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    const ago = Date.now() - date.getDate();

    const daysAgo = Math.round(ago / 86400000);
    const monthsAgo = Math.round(daysAgo / 30);

    if (daysAgo < 1) {
      return t('dates.today');
    } if (daysAgo === 1) {
      return t('dates.yesterday');
    } if (daysAgo < 30) {
      // return t('dates.daysAgo', { count: daysAgo });
    } if (monthsAgo < 12) {
      // return t('dates.monthsAgo', { count: monthsAgo });
    }
    return date.toISOString().split('T')[0];
  },

  formatToDateAndTime(dateInput : Date) : string {
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return `${formattedDate} ${formattedTime}`;
  },

  formatToDate(dateInput : Date) {
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    return formattedDate;
  }
};

export default dateService;
