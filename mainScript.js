import { checkPreviousTime, updateTimer, processTime } from './utils/timer.js'; 
import { formatTime, formatDateTime } from './utils/format.js';
import { storeLocally, getPreviousData } from './utils/storage.js';
import { displayRounds, renderTimeTable } from './utils/display.js';
import { confirmPause } from './utils/interact.js';
import { translations } from './utils/localization.js';
// import { getRandomName, setName, uuid } from './utils/name.js'; // for future use


// Get the URL search parameters like index.html?place=test&post=start
const urlParams = new URLSearchParams(window.location.search);
const place = urlParams.get('place');
const post = urlParams.get('post');
const backend = urlParams.get('backend'); // address for the backend server, yet to be determined
var start// = new Date();
let dataArray = [{}]; // Initialize dataArray as an empty array
let postNumber = 0;

const displayHeading = document.getElementById('displayHeading');
const title = document.getElementById('title');
const displayTotalTime = document.getElementById('totalTime');

var totalTime = 0;

const now = new Date();
const today = new Date().toISOString().split('T')[0];
var firstPost; //used to indicate first post and count rounds

// Display the place in the heading
displayHeading.textContent = place ? `${place} QRtimer` : 'QRtimer';
title.textContent = place ? `${place} QRtimer` : 'QRtimer';

function setLanguage(lang) {
    const elements = {
        title: document.getElementById('title'),
        displayHeading: document.getElementById('displayHeading'),
        currentSegment: document.querySelector('h2:nth-of-type(1)'),
        rounds: document.querySelector('h2:nth-of-type(2)'),
        totalMovingTime: document.querySelector('h2:nth-of-type(3)'),
        information: document.querySelector('a[href="info.html"]'),
    };

    // Update text content based on the selected language
    elements.title.textContent = translations[lang].title;
    elements.displayHeading.textContent = translations[lang].title;
    elements.currentSegment.textContent = translations[lang].currentSegment;
    elements.rounds.textContent = translations[lang].rounds;
    elements.totalMovingTime.textContent = translations[lang].totalMovingTime;
    elements.information.textContent = translations[lang].information;

    // Optionally save the selected language to localStorage
    localStorage.setItem('qrtimer_language', lang);
}

// Attach setLanguage to the global window object
window.setLanguage = setLanguage;

// Set the default language on page load
document.addEventListener('DOMContentLoaded', () => {
    const browserLanguage = navigator.language || navigator.userLanguage;
    const savedLanguage = localStorage.getItem('qrtimer_language') || (browserLanguage.startsWith('nb' || 'nn') ? 'no' : 'en');
    setLanguage(savedLanguage);
});

try {
    dataArray = getPreviousData(place, today); // Get the previous data from localStorage
    if (!dataArray) { 
        console.info('No data, assuming first post');
        postNumber ++;
        start = new Date();
        firstPost = post;
        storeLocally(dataArray, postNumber, place, post, start, today)
        localStorage.setItem('qrtimer_' + place + '_' + today + '_' + 'firstPost', firstPost); // Store the data in localStorage
        dataArray = getPreviousData(place, today); // Get the data again after storing
    } 
    else { //only if there is more than one entry in the dataArray  
        const latestEntry = dataArray[dataArray.length - 1];
        postNumber = latestEntry.postNumber + 1; // Get the last post number from the data array and increment it
        const now = new Date();
    
        if (post === latestEntry.post) {
            if (confirmPause()) {
                start = new Date();
                storeLocally(dataArray, postNumber, place, post, start, today);
                console.log("PAUSE");
            }
            else{
                start = new Date(latestEntry.start);
                console.log("RESUME");
            }
        } else {
            start = new Date();
            storeLocally(dataArray, postNumber, place, post, start, today);
            console.log("Running");
        }
    }
} catch (info) {
        console.error('Error accessing localStorage:', info);
}

// Update the timer every millisecond, I wonder what  the performance impact of this is, it looks much better than updating each second
setInterval(() => updateTimer(start, post), 1);

displayRounds(dataArray, today, firstPost, place, totalTime);

const { totalTime2, timeTable } = processTime(dataArray, place, today, firstPost, totalTime);
console.log('TimeTable:', timeTable);
console.log('TotalTime:', totalTime2);
renderTimeTable(timeTable);
//const totalTimeDate = new Date(totalTime2);
const { hours, minutes, seconds, milliseconds } = formatTime(totalTime2);
if (hours === '00') {
    displayTotalTime.textContent = `${minutes}:${seconds}.${milliseconds}`; // Display only minutes and seconds if hours are 0
}else {
    displayTotalTime.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`; // Display hours, minutes, and seconds
}
