import { LANGUAGE } from "../constants/language";

const dateService = {
  formatTimeAgo(dateStr, language) {
    const date = new Date(dateStr);
    const ago = new Date() - date;
    
    const daysAgo = Math.round(ago / 86400000);
    const monthsAgo = Math.round(daysAgo / 30);

    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    if (daysAgo < 1) {
      return language === LANGUAGE.LT 
        ? 'Šiandien' 
        : 'Today';
    } else if (daysAgo === 1) {
      return language === LANGUAGE.LT 
        ? "Vakar" 
        : 'Yesterday';
    } else if (daysAgo < 30) {
      return language === LANGUAGE.LT 
        ? `Prieš ${daysAgo} dienas` 
        : `${daysAgo} days ago`;
    } else if (monthsAgo < 12) {
      const men = monthsAgo === 1 
        ? 'mėnesį' 
        : 'mėnesius';

      return language === LANGUAGE.LT 
        ? `Prieš ${monthsAgo} ${men}` 
        : `${monthsAgo} month(s) ago`;
    } else {
      return date.toISOString().split('T')[0];
    }
  }
};

export default dateService;