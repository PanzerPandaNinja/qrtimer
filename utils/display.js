import { formatTime, formatDateTime } from './format.js';

export function displayRounds(dataArray, today, firstPost, place) {
    const roundsDiv = document.getElementById('rounds');
    firstPost = localStorage.getItem('qrtimer_' + place + '_' + today + '_' + 'firstPost');    
    console.log('dataArray:', dataArray);
    if (dataArray.length > 1) {
        var roundCounter = 0;
        var previousStartTime = new Date(dataArray[0].start);
        let roundsHTML = '';
        var previousPost = "";
        console.log('firstPost:', firstPost);
        console.log('previousStartTime:', previousStartTime);
        dataArray.forEach((item, index) => {
            console.log('index:', index);
            console.log('item.post:', item.post);
            console.log('previousPost:', previousPost);
            if (index === 0) return; // Skip the first round as it doesn't have a previous round to compare with
            if (item.post === previousPost) return; // Skip if the post is the same as the previous one, when paused
            previousPost = item.post;
            if (item.post !== firstPost) return; // Skip if the post is not same as first post
            roundCounter++;
            const currentStartTime = new Date(item.start);
            const timeDifference = currentStartTime - previousStartTime;
            const formattedTimeDifference = formatTime(timeDifference);
            console.log('**** Round: ', roundCounter);
            console.log('**** timeDifference: ', formattedTimeDifference);
            roundsHTML += `<H3> ${roundCounter}:  ${formattedTimeDifference}</H3>`;
            previousStartTime = currentStartTime;
        });
    
        roundsHTML += '';
        if (roundsHTML) {
            roundsDiv.innerHTML = roundsHTML;
        }
        else {
            roundsDiv.textContent = 'No rounds available for the first round.';
        }
    } else {
        roundsDiv.textContent = 'No rounds available for the first post.';
    }
    

}
export function renderTimeTable(timeTable) {
    const timeTableView = document.getElementById('timeTableView');
    if (!timeTableView) {
        console.error('Element with id "timeTableView" not found.');
        return;
    }

    // Clear any existing content
    timeTableView.innerHTML = '';

    // Create a table element
    const table = document.createElement('table');
    table.classList.add('time-table');

    // Create table header
    const headerRow = document.createElement('tr');
    const headers = ['Post', 'Time', 'Pause'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Populate table rows with timeTable data
    timeTable.forEach(entry => {
        const row = document.createElement('tr');

        const postCell = document.createElement('td');
        postCell.textContent = entry.post;
        row.appendChild(postCell);

        const startCell = document.createElement('td');
        startCell.textContent = entry.start;
        row.appendChild(startCell);

        const pauseCell = document.createElement('td');
        pauseCell.textContent = entry.pause ? entry.pause: '';
        row.appendChild(pauseCell);

        table.appendChild(row);
    });

    // Append the table to the timeTableView element
    timeTableView.appendChild(table);
}

// export function displayTableFromLocalStorage(dataArray, place, today, firstPost, totalTime) {
//     var time;
//     dataArray = dataArray;
//     totalTime = totalTime;
//     firstPost = firstPost;
//     const dataString = localStorage.getItem('qrtimer_' + place + '_' + today);
//     if (!dataString) {
//         console.info('No data found in localStorage.');
//         return;
//     }

//     try {
//         const dataArray = JSON.parse(dataString);
//         const table = document.createElement('table');
//         const thead = document.createElement('thead');
//         const tbody = document.createElement('tbody');

//         // Create table header row
//         const headerRow = document.createElement('tr');

//         const th = document.createElement('th');
//         th.textContent = 'Pause';
//         headerRow.appendChild(th);

//         const th2 = document.createElement('th');
//         th2.textContent = 'Post';
//         headerRow.appendChild(th2);

//         const th3 = document.createElement('th');
//         th3.textContent = 'Time';
//         headerRow.appendChild(th3);

//         thead.appendChild(headerRow);
//         table.appendChild(thead);
//         var tablePreviousTime
//         var previousPost
//         var tablePause
//         // Create table body rows
//         dataArray.forEach(item => {
//             if (!item.post.includes(previousPost)) {
//                 const row = document.createElement('tr');

//                 for (const key in item) {
//                     const td = document.createElement('td');
//                     if (key === "post") {
//                         console.log("---previousPost: " + previousPost);
//                         console.log("---Post: " + item[key]);
//                         previousPost = item[key];
//                         td.textContent = item[key];
//                     }

//                     if (key === "start") {
//                         if (!tablePreviousTime){
//                             const time = formatDateTime(item[key]);
//                             td.textContent = time;
//                             console.log("---start: " + item[key]);
//                             //tablePreviousTime = item[key];
//                         }
//                         else{
//                             console.log("---time: " + item[key]);
//                             console.log("---oldtime: " + tablePreviousTime);
//                             const date1 = new Date(item[key]);
//                             const date2 = new Date(tablePreviousTime);
//                             var diffTime = date1 - date2;
//                             totalTime = diffTime + totalTime
//                             console.log("---difftime: " + diffTime);
//                             console.log("---totalTime: " + totalTime);
//                             const hours = Math.floor(diffTime / 3600000);
//                             const minutes = Math.floor((diffTime % 3600000) / 60000);
//                             const seconds = Math.floor((diffTime % 60000) / 1000);
//                             const milliseconds = diffTime % 1000;
//                             td.textContent = '+ ' + hours + ':' + minutes + ':' +  seconds + ':' + milliseconds ;
//                         }
//                         tablePreviousTime = item.start;
//                     }
//                         if (key === "postNumber") {
//                             //td.textContent = item[key];
//                             //console.log("---postNumber: " + item[key]);
//                             if (tablePause){
//                             const date1 = new Date(tablePause);
//                             const date2 = new Date(tablePreviousTime);
//                             var diffTime = date1 - date2;
//                             console.log("---date1: " + date1);
//                             console.log("---date2: " + date2);
//                             console.log("---diffTime: " + diffTime);
//                             const hours = Math.floor(diffTime / 3600000);
//                             const minutes = Math.floor((diffTime % 3600000) / 60000);
//                             const seconds = Math.floor((diffTime % 60000) / 1000);
//                             const milliseconds = diffTime % 1000;
//                             td.textContent = '+ ' + hours + ':' + minutes + ':' +  seconds + ':' + milliseconds ;
//                             tablePause = null;
//                             }
//                         }
//                     row.appendChild(td);
//                 }

//                 tbody.appendChild(row);
//             }
//             else{
//                 if (!tablePause){
//                     tablePause = item.start;
//                     console.log("---tablePause: " + tablePause);
//                 }
//             }
//         });
//         table.appendChild(tbody);
//         document.getElementById('table').appendChild(table);
//         return totalTime;
//     } catch (error) {
//         console.error('Error parsing data from localStorage:', error);
//     }
    
// }