export const useDateFormat = (dateStr: Date):string => {
    const date = new Date(dateStr);


const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    const formattedDate = adjustedDate.toISOString().split('T')[0];
    return formattedDate
} 