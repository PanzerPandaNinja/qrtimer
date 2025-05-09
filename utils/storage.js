export function storeLocally(dataArray, postNumber, place, post, start, today) {
    dataArray = Array.isArray(dataArray) ? dataArray : [];
    console.log('From storeLocally: qrtimer_' + place + '_' + today + ' ' + postNumber, dataArray);
    let data = {
        postNumber,
        post,
        start
    };
    dataArray.push(data);

    const dataString = JSON.stringify(dataArray); // Convert the data object to a JSON string
    console.log('From storeLocally: qrtimer_' + place + '_' + today, dataString);
    localStorage.setItem('qrtimer_' + place + '_' + today, dataString); // Store the data in localStorage
    
}

export function getPreviousData(place, today) {
    const dataString = localStorage.getItem('qrtimer_' + place + '_' + today);
    if (!dataString) {
        console.info('No data found in localStorage.');
        return null;
    }

    try {
        let dataArray = JSON.parse(dataString);
        return dataArray;
    } catch (error) {
        console.error('Error parsing data from localStorage:', error);
        return null;
    }
}
