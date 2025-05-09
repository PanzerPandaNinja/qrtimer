export function getRandomName() {
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
    
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return `${randomColor}${randomAnimal}`;
}

export function getName() {
    //const name = document.getElementById('userName');
    //var userName;
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
}


// Get a UUID for sending to the server in the future
export function uuid() {
    var uuid;
    try {
        uuid = localStorage.getItem('qrtimer_uuid');
    } catch (info) {
        console.error('Error accessing localStorage:', info);
    }

    if (!uuid) {
        uuid = crypto.randomUUID();
        localStorage.setItem('qrtimer_uuid', uuid);
    }

    console.log(uuid);
        //return uuid;
        //uuidDisplay.textContent = uuid ? `${uuid}` : `UUID`;
        const uuidDisplay = document.getElementById('uuidOut');
    
}