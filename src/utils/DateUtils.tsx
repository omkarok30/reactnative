
import { format, isToday, isYesterday } from "date-fns";
import { fr } from "date-fns/locale";

export const formatISOToCustom = (isoString: string) => {
    const date = new Date(isoString)

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')
    const seconds = String(date.getUTCSeconds()).padStart(2, '0')

    const day = date.getUTCDate()
    const month = months[date.getUTCMonth()]
    const year = date.getUTCFullYear()

    return `${hours}:${minutes}:${seconds} ${day} ${month}, ${year}`
}

export const formatMessageDate = (date: Date) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000); // Convert UTC to local

    if (isToday(localDate)) {
        return format(localDate, 'HH:mm', { locale: fr }); // Show hours if today
    } else if (isYesterday(localDate)) {
        return 'Hier'; // Show "Yesterday"
    } else {
        return format(localDate, 'dd/MM/yy', { locale: fr }); // Show full date
    }
};
