        // Get the URL search parameters like index.html?place=test&post=start
        const urlParams = new URLSearchParams(window.location.search);
        const place = urlParams.get('place');
        const post = urlParams.get('post');
        const backend = urlParams.get('backend'); // address for the backend server, yet to be determined
        var start// = new Date();
        let dataArray = [];
        //var uuid;
        const displayHeading = document.getElementById('displayHeading');
        const title = document.getElementById('title');
        //const uuidDisplay = document.getElementById('uuidOut');
        const displayTotalTime = document.getElementById('totalTime');
        //const name = document.getElementById('userName');
        //var userName;
        var totalTime = 0;
        const animals = [
            'Dog', 'Cat', 'Panda', 'Lion', 'Giraffe', 'Bear',
            'Elephant', 'Tiger', 'Zebra', 'Kangaroo', 'Monkey', 'Horse',
            'Rabbit', 'Deer', 'Fox', 'Wolf', 'Sheep', 'Goat',
            'Cow', 'Pig', 'Chicken', 'Duck', 'Goose', 'Turkey',
            'Peacock', 'Ostrich', 'Penguin', 'Dolphin', 'Whale', 'Shark'
        ];

        const colors = [
            'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Black', 'Orange', 'Pink', 'White',
            'Brown', 'Gray', 'Cyan', 'Magenta', 'Lime', 'Teal', 'Navy', 'Maroon', 'Olive',
            'Gold', 'Silver', 'Beige', 'Coral', 'Turquoise', 'Lavender', 'Indigo', 'Violet',
            'Peach', 'Mint', 'Salmon', 'Aqua'
        ];

        const now = new Date();
        const today = new Date().toISOString().split('T')[0];
        var firstPost; //used to indicate first post and count rounds
        

        // Get a UUID for sending to the server in the future
        // try {
        //     uuid = localStorage.getItem('qrtimer_uuid');
        // } catch (info) {
        //     console.error('Error accessing localStorage:', info);
        // }

        // if (!uuid) {
        //     uuid = crypto.randomUUID();
        //     localStorage.setItem('qrtimer_uuid', uuid);
        // }

        // console.log(uuid);

        // Display the place in the heading
        displayHeading.textContent = place ? `${place} QRtimer` : 'QRtimer';
        title.textContent = place ? `${place} QRtimer` : 'QRtimer';


        try {
            const earlier_data = localStorage.getItem('qrtimer_' + place + '_' + today);
            if (earlier_data) {
                dataArray = JSON.parse(earlier_data);
            }
        } catch (info) {
            console.info('No data, assuming first post', info);
            firstPost = post;
            localStorage.setItem('qrtimer_' + place + '_' + today + '_' + 'firstPost', firstPost); // Store the data in localStorage
        }

        // try {
        //     userName = localStorage.getItem('qrtimer_userName');
        // } catch (info) {
        //     console.error('Error accessing localStorage:', info);
        // }

        // if (!userName) {
        //     userName = getRandomName().toString();
        //     localStorage.setItem('qrtimer_userName', userName);
        // }

        // name.textContent = userName ? `${userName}` : 'userName';



        const postNumber = dataArray.length + 1;
        console.log("postNumber: " + postNumber);

        if (dataArray.length > 0) {
            const latestEntry = dataArray[dataArray.length - 1];
            console.log(latestEntry);
            const now = new Date();

            if (post === latestEntry.post) {
                if (confirmPause()) {
                    start = new Date();
                    storeLocally(postNumber, place, post, start);
                    console.log(checkPreviousTime(latestEntry.start, now));
                    console.log("PAUSE");
                }
                else{
                    start = new Date(latestEntry.start);
                }
            } else {
                start = new Date();
                storeLocally(postNumber, place, post, start);
                console.log("Running");
            }
        }
        else{
            start = new Date();
            storeLocally(postNumber, place, post, start);
            //firstPost = post;
            localStorage.setItem('qrtimer_' + place + '_' + today + '_' + 'firstPost', post); // Store firstPost the data in localStorage
            localStorage.setItem('qrtimer_' + place + '_' + today + '_' + 'firstPostTime', start); // Store firstPost the data in localStorage
        }
        // Update the timer every second
        setInterval(updateTimer, 1000);
        // Call the function to create the table
        
        createTableFromLocalStorage(place);

        const totalTimeDate = new Date(totalTime);
        displayTotalTime.textContent = formatTime(totalTimeDate.getTime()) ? `Total moving time: ${formatTime(totalTimeDate.getTime())}` : `totalTime`;
        createRoundsTable(dataArray, firstPost);
        //uuidDisplay.textContent = uuid ? `${uuid}` : `UUID`;


        // ****** Functions **********

        function createRoundsTable(dataArray, firstPost) {
            firstPost = localStorage.getItem('qrtimer_' + place + '_' + today + '_' + 'firstPost');
            const roundTableDiv = document.getElementById('roundTable');
            roundTableDiv.innerHTML = ''; // Clear any existing content

            // Filter rows containing firstPost
            const filteredData = dataArray.filter(item => item.post === firstPost);

            if (filteredData.length === 0) {
                roundTableDiv.textContent = 'First round, lets go!';
                return;
            }

            // Create table elements
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            // Create table header row
            const headerRow = document.createElement('tr');
            var roundNumber = 0;
            const headers = ['Round', 'Post', 'Time'];
            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);

            // Create table body rows
            filteredData.forEach(item => {
                const row = document.createElement('tr');

                const postNumberCell = document.createElement('td');
                postNumberCell.textContent = roundNumber;
                row.appendChild(postNumberCell);
                roundNumber++;


                const postCell = document.createElement('td');
                postCell.textContent = item.post;
                row.appendChild(postCell);

                const startTimeCell = document.createElement('td');
                const firstStart = new Date(localStorage.getItem('qrtimer_' + place + '_' + today + '_' + 'firstPostTime'));
                const itemStart = new Date(item.start);
                const diffTime = itemStart - firstStart;
                const formattedDiffTime = formatTime(diffTime);
                startTimeCell.textContent = '+ ' + formattedDiffTime;
                //startTimeCell.textContent = formatDateTime(item.start);
                row.appendChild(startTimeCell);

                tbody.appendChild(row);
            });

            // Append thead and tbody to the table
            table.appendChild(thead);
            table.appendChild(tbody);

            // Append the table to the roundTable div
            roundTableDiv.appendChild(table);
        }

        function confirmPause (){
            const userResponse = confirm("Restrart timer for this post? The elapsed time will be counted as a pause.")
            return userResponse;
        }

        function formatTime(elapsedMilliseconds){
            const hours = String(Math.floor(elapsedMilliseconds / 3600000)).padStart(2, '0');
            const minutes = String(Math.floor((elapsedMilliseconds % 3600000) / 60000)).padStart(2, '0');
            const seconds = String(Math.floor((elapsedMilliseconds % 60000) / 1000)).padStart(2, '0');
            const milliseconds = String(elapsedMilliseconds % 1000).padStart(3, '0');

            return  `${hours}:${minutes}:${seconds}.${milliseconds}`;
        }

        function formatDateTime(dateTime) {
            const date = new Date(dateTime);

            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

            return `${hours}:${minutes}:${seconds}:${milliseconds}`;
        }

        function checkPreviousTime(previousTime, start) {
            const previous = new Date(previousTime);

            // Calculate the difference in milliseconds
            const difference = start - previous;

            // Convert the difference to a more readable format (hours, minutes, seconds, milliseconds)
            const hours = Math.floor(difference / 3600000);
            const minutes = Math.floor((difference % 3600000) / 60000);
            const seconds = Math.floor((difference % 60000) / 1000);
            const milliseconds = difference % 1000;

            return {
                hours: hours,
                minutes: minutes,
                seconds: seconds,
                milliseconds: milliseconds
            };
        }

        // Function to generate a random name
        function getRandomName() {
            const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            return `${randomColor}${randomAnimal}`;
        }

        // Function to update the timer
        function updateTimer() {
            const now = new Date();
            const elapsedMilliseconds = now.getTime() - start.getTime();

            const hours = String(Math.floor(elapsedMilliseconds / 3600000)).padStart(2, '0');
            const minutes = String(Math.floor((elapsedMilliseconds % 3600000) / 60000)).padStart(2, '0');
            const seconds = String(Math.floor((elapsedMilliseconds % 60000) / 1000)).padStart(2, '0');
            const milliseconds = String(elapsedMilliseconds % 1000).padStart(3, '0');

            document.getElementById('timer').textContent = `${post}: ${hours}:${minutes}:${seconds}.${milliseconds}`;
        }

        function storeLocally(postNumber, place, post, start) {
            const data = {
                postNumber,
                post,
                start
            };
            dataArray.push(data);

            const dataString = JSON.stringify(dataArray); // Convert the data object to a JSON string
            localStorage.setItem('qrtimer_' + place + '_' + today, dataString); // Store the data in localStorage
            console.log(dataString);
        }

        function createTableFromLocalStorage(place) {
            var time;
            const dataString = localStorage.getItem('qrtimer_' + place + '_' + today);
            if (!dataString) {
                console.info('No data found in localStorage.');
                return;
            }

            try {
                const dataArray = JSON.parse(dataString);
                const table = document.createElement('table');
                const thead = document.createElement('thead');
                const tbody = document.createElement('tbody');

                // Create table header row
                const headerRow = document.createElement('tr');

                const th = document.createElement('th');
                th.textContent = 'Pause';
                headerRow.appendChild(th);

                const th2 = document.createElement('th');
                th2.textContent = 'Post';
                headerRow.appendChild(th2);

                const th3 = document.createElement('th');
                th3.textContent = 'Time';
                headerRow.appendChild(th3);

                thead.appendChild(headerRow);
                table.appendChild(thead);
                var tablePreviousTime
                var previousPost
                var tablePause
                // Create table body rows
                dataArray.forEach(item => {
                    if (!item.post.includes(previousPost)) {
                        const row = document.createElement('tr');

                        for (const key in item) {
                            const td = document.createElement('td');
                            if (key === "post") {
                                console.log("---previousPost: " + previousPost);
                                console.log("---Post: " + item[key]);
                                previousPost = item[key];
                                td.textContent = item[key];
                            }

                            if (key === "start") {
                                if (!tablePreviousTime){
                                    const time = formatDateTime(item[key]);
                                    td.textContent = time;
                                    console.log("---start: " + item[key]);
                                    //tablePreviousTime = item[key];
                                }
                                else{
                                    console.log("---time: " + item[key]);
                                    console.log("---oldtime: " + tablePreviousTime);
                                    const date1 = new Date(item[key]);
                                    const date2 = new Date(tablePreviousTime);
                                    var diffTime = date1 - date2;
                                    totalTime = diffTime + totalTime
                                    console.log("---difftime: " + diffTime);
                                    console.log("---totalTime: " + totalTime);
                                    const hours = Math.floor(diffTime / 3600000);
                                    const minutes = Math.floor((diffTime % 3600000) / 60000);
                                    const seconds = Math.floor((diffTime % 60000) / 1000);
                                    const milliseconds = diffTime % 1000;
                                    td.textContent = '+ ' + hours + ':' + minutes + ':' +  seconds + ':' + milliseconds ;
                                }
                                tablePreviousTime = item.start;
                            }
                             if (key === "postNumber") {
                                 //td.textContent = item[key];
                                 //console.log("---postNumber: " + item[key]);
                                 if (tablePause){
                                 const date1 = new Date(tablePause);
                                    const date2 = new Date(tablePreviousTime);
                                    var diffTime = date1 - date2;
                                    console.log("---date1: " + date1);
                                    console.log("---date2: " + date2);
                                    console.log("---diffTime: " + diffTime);
                                    const hours = Math.floor(diffTime / 3600000);
                                    const minutes = Math.floor((diffTime % 3600000) / 60000);
                                    const seconds = Math.floor((diffTime % 60000) / 1000);
                                    const milliseconds = diffTime % 1000;
                                    td.textContent = '+ ' + hours + ':' + minutes + ':' +  seconds + ':' + milliseconds ;
                                    tablePause = null;
                                 }
                             }
                            row.appendChild(td);
                        }

                        tbody.appendChild(row);
                    }
                    else{
                        if (!tablePause){
                            tablePause = item.start;
                            console.log("---tablePause: " + tablePause);
                        }
                    }
                });
                table.appendChild(tbody);
                document.getElementById('table').appendChild(table);
            } catch (error) {
                console.error('Error parsing data from localStorage:', error);
            }
        }