export function formatTime(elapsedMilliseconds) {
    const hours = String(Math.floor(elapsedMilliseconds / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((elapsedMilliseconds % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((elapsedMilliseconds % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(elapsedMilliseconds % 1000).padStart(3, '0');
    return { hours, minutes, seconds, milliseconds }
}

export function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    return { hours, minutes, seconds, milliseconds }; 
}
