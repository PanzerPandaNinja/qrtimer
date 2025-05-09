
import { formatDateTime, formatTime } from './format.js';

export function checkPreviousTime(previousTime, start) {
    const previous = new Date(previousTime);
    const difference = start - previous;
    const hours = Math.floor(difference / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);
    const milliseconds = difference % 1000;
    return { hours, minutes, seconds, milliseconds };
}

// function to update the timer
export function updateTimer(start, post) {
    const now = new Date();
    start = new Date(start);
    const elapsedMilliseconds = now.getTime() - start.getTime();

    const hours = String(Math.floor(elapsedMilliseconds / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((elapsedMilliseconds % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((elapsedMilliseconds % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(elapsedMilliseconds % 1000).padStart(3, '0');

    document.getElementById('timer').textContent = `${post}: ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export function processTime(dataArray, place, today, firstPost, totalTime) {
    var time;
    dataArray = dataArray;
    totalTime = totalTime;
    firstPost = firstPost;
    const dataString = localStorage.getItem('qrtimer_' + place + '_' + today);
    if (!dataString) {
        console.info('No data found in localStorage.');
        return;
    }

    try {
        const dataArray = JSON.parse(dataString);
        let timeTable = [];
        var tablePreviousTime;
        var previousPost;
        var tablePause;
        // Create table body rows
        dataArray.forEach(item => {
            if (!item.post.includes(previousPost)) {
                const row = {};
                for (const key in item) {
                    
                    if (key === "post") {
                        previousPost = item[key];
                        row[key]= item[key];
                    }

                    if (key === "start") {
                        if (!tablePreviousTime){
                            const { hours, minutes, seconds, milliseconds } = formatDateTime(item[key]);
                            row[key]=  hours + ':' + minutes + ':' +  seconds + ':' + milliseconds;
                        }
                        else{
                            const date1 = new Date(item[key]);
                            const date2 = new Date(tablePreviousTime);
                            var diffTime = date1 - date2;
                            totalTime = diffTime + totalTime;
                            // const hours = Math.floor(diffTime / 3600000);
                            // const minutes = Math.floor((diffTime % 3600000) / 60000);
                            // const seconds = Math.floor((diffTime % 60000) / 1000);
                            // const milliseconds = diffTime % 1000;
                            const { hours, minutes, seconds, milliseconds } = formatDateTime(diffTime);
                            if (hours === '0') {
                                row[key] ='+ '  + minutes + ':' +  seconds + ':' + milliseconds ;
                            }
                            row[key] = '+ ' + hours + ':' + minutes + ':' +  seconds + ':' + milliseconds ;
                        }
                        tablePreviousTime = item.start;
                    }
                        if (key === "postNumber") {
                            if (tablePause){
                            const date1 = new Date(tablePause);
                            const date2 = new Date(tablePreviousTime);
                            var diffTime = date1 - date2;
                            const hours = Math.floor(diffTime / 3600000);
                            const minutes = Math.floor((diffTime % 3600000) / 60000);
                            const seconds = Math.floor((diffTime % 60000) / 1000);
                            const milliseconds = diffTime % 1000;
                            row['pause'] = '+ ' + hours + ':' + minutes + ':' +  seconds + ':' + milliseconds ;
                            tablePause = null;
                            }
                        }

                }
                timeTable.push(row);

            }
            else{
                if (!tablePause){
                    tablePause = item.start;
                    console.log("&&&&&&&&&&&&&tablePause: " + tablePause);
                }
            }
        });
        
        console.log("&&&&&&&&&&&&& timeTable: ", timeTable);
        const totalTime2 = totalTime;
        return { totalTime2, timeTable };
        
    } catch (error) {
        console.error('Error parsing data from localStorage:', error);
    }
    
}
