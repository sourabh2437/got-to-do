export const sortByDate = (arr, ascendingOrder = true) => {
    arr.sort((a, b) => {
        const aDate = new Date(a.dueDate)
        const bDate = new Date(b.dueDate)
        return ascendingOrder ? aDate - bDate : bDate - aDate
    });
    return arr;
}

export const getTodaysDate = () => {
    let dtToday = new Date();
    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    let maxDate = year + '-' + month + '-' + day;
    return maxDate;
}

export const isTouchFriendly =
    navigator.userAgent.toLowerCase().indexOf('android') !== -1 ||
    navigator.userAgent.toLowerCase().indexOf('iphone') !== -1 ||
    navigator.userAgent.toLowerCase().indexOf('ipad') !== -1 ||
    navigator.userAgent.toLowerCase().indexOf('react-native') !== -1;