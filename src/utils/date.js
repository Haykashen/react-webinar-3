export const toCommentDate = (isoDate) => {
    const date = new Date(isoDate);
    const dateOptions = {day: 'numeric', month: 'long', year: 'numeric'}
    const formattedDate = date.toLocaleDateString('ru-RU', dateOptions);
    const timeOptions = {hour: '2-digit', minute: '2-digit'}
    const formattedTime = date.toLocaleTimeString('ru-RU', timeOptions);
    return `${formattedDate.slice(0, -3)} в ${formattedTime}`;
  };