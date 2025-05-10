import { formatTime, formatDateTime } from './format.js';

export function displayRounds(dataArray, today, firstPost, place) {
    const roundsDiv = document.getElementById('rounds');
    firstPost = localStorage.getItem('qrtimer_' + place + '_' + today + '_' + 'firstPost');    
    if (dataArray.length > 1) {
        var roundCounter = 0;
        var previousStartTime = new Date(dataArray[0].start);
        let roundsHTML = '';
        var previousPost = "";
        console.log('firstPost:', firstPost);
        console.log('previousStartTime:', previousStartTime);
        dataArray.forEach((item, index) => {
            if (index === 0) return; // Skip the first round as it doesn't have a previous round to compare with
            if (item.post === previousPost) return; // Skip if the post is the same as the previous one, when paused
            previousPost = item.post;
            if (item.post !== firstPost) return; // Skip if the post is not same as first post
            roundCounter++;
            const currentStartTime = new Date(item.start);
            const timeDifference = currentStartTime - previousStartTime;
            const { hours, minutes, seconds, milliseconds } = formatTime(timeDifference);
            const formattedTimeDifference = `${hours}:${minutes}:${seconds}.${milliseconds}`;
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
