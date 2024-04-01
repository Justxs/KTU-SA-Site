const dateService = {
  formatTimeAgo(dateStr, t) {
    const date = new Date(dateStr);
    const ago = new Date() - date;

    const daysAgo = Math.round(ago / 86400000);
    const monthsAgo = Math.round(daysAgo / 30);

    if (Number.isNaN(date.getTime())) {
      return 'Invalid date';
    }

    if (daysAgo < 1) {
      return t('dates.today');
    } if (daysAgo === 1) {
      return t('dates.yesterday');
    } if (daysAgo < 30) {
      return t('dates.daysAgo', { count: daysAgo });
    } if (monthsAgo < 12) {
      return t('dates.monthsAgo', { count: monthsAgo });
    }
    return date.toISOString().split('T')[0];
  },

  formatToDateAndTime(dateInput) {
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

  formatToDate(dateInput) {
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    return formattedDate;
  },
};
export default dateService;
