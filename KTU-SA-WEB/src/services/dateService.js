const dateService = {
  formatTimeAgo(dateStr, t) {
    const date = new Date(dateStr);
    const ago = new Date() - date;
    
    const daysAgo = Math.round(ago / 86400000);
    const monthsAgo = Math.round(daysAgo / 30);

    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    if (daysAgo < 1) {
      return t('dates.today');
    } else if (daysAgo === 1) {
      return t('dates.yesterday');
    } else if (daysAgo < 30) {
      return t('dates.daysAgo', { count: daysAgo });
    } else if (monthsAgo < 12) {
      return t('dates.monthsAgo', { count: monthsAgo });
    } else {
      return date.toISOString().split('T')[0];
    }
  }
};

export default dateService;