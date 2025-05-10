
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
                let row = {};
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
                            const currentStartTime = new Date(item[key]);
                            const previousStartTime = new Date(tablePreviousTime);
                            let diffTime = currentStartTime - previousStartTime;
                            totalTime = diffTime + totalTime;
                            const { hours, minutes, seconds, milliseconds } = formatTime(diffTime);
                            if (hours === '00') {
                                row[key] ='+'  + minutes + ':' +  seconds + ':' + milliseconds ;
                            }
                            else{
                                row[key] = '+' + hours + ':' + minutes + ':' +  seconds + ':' + milliseconds ;
                            }

                        }
                        tablePreviousTime = item.start;
                    }
                        if (key === "postNumber") {
                            if (tablePause){
                            const currentStartTime = new Date(tablePause);
                            const previousStartTime = new Date(tablePreviousTime);
                            var diffTime = currentStartTime - previousStartTime;
                            const { hours, minutes, seconds, milliseconds } = formatTime(diffTime);
                            if (hours === '00') {
                                row['pause'] ='+'  + minutes + ':' +  seconds + ':' + milliseconds ;
                            }
                            else{
                                row['pause'] = '+' + hours + ':' + minutes + ':' +  seconds + ':' + milliseconds ;
                            }
                            tablePause = null;
                            }
                        }

                }
                timeTable.push(row);

            }
            else{
                if (!tablePause){
                    tablePause = item.start;
                }
            }
        });
        const totalTime2 = totalTime;
        return { totalTime2, timeTable };
        
    } catch (error) {
        console.error('Error parsing data from localStorage:', error);
    }
    
}
