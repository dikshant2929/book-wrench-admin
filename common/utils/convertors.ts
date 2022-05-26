export const stringDateToDate = (strDate: string) => {
    if (!Boolean(strDate)) return;
    let ymd = strDate.split('-');
    return new Date(`${ymd[2]}-${ymd[1]}-${ymd[0]}`); //yyyy-mm-dd
};

export const dateToStringDDMMYYYY = (selectedDate: string | number | Date) => {
    const date = new Date(selectedDate);
    return (
        (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()) +
        '-' +
        (date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1) +
        '-' +
        date.getFullYear()
    );
};

export const dateToStringYYYYMMDD = (selectedDate: string | number | Date) => {
    const date = new Date(selectedDate);
    return (
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1) +
        '-' +
        (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate())
    );
};
export const appendDateByDays = (startDate: any, days: any) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + days);
    return (
        (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()) +
        '-' +
        (date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1) +
        '-' +
        date.getFullYear()
    );
};
