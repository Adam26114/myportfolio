import { format } from 'date-fns'

export function formatDate(date?: Date | string): string {
    if (!date) {
        return 'Present'
    }

    return format(new Date(date), 'yyyy, d MMM')
}

export function onlyYearFormatDate(date?: Date | string): string {
    if (!date) {
        return 'Present'
    }

    return format(new Date(date), 'yyyy')
}
