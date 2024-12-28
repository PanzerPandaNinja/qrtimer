# qrtimer
Its an app to keep track of the time you are using on a course using qrcodes.

## Usage
Scan the qrcode and follow the link to start the timer.
Go to the next qrcode and scan it, the time it took will be displayed. If you want a restitution pause taken out of your time, scan the qrcode again when you are ready to start. You can take as much rest as you like. And as manytimes as you like. Go to next qrcode to get a new workout time.

Maybe future: You can download your data as a json-file using the download button and upload it using the upload button. This is usefull if you change devices and want your history.
Maybe future: You can see historic data on the history link on the bottom. This will pause your timer.
Maybe future: You can see a graph on the graph link on the bottom. This will pause your timer.


## Data and cookies
The app uses a GUID from your phone and browser to identify you for two hours after last scan from your phone. Your timings is saved in local storage on your phone only, when its deleted so are all your data.

## Admin
Future: To create a qrcode you need to log on to the admin panel and make a track. The track must have a name and number of posts, it can also have a distance between the posts and a description of the track.
The admin setup can be downloaded as a json-file for safe-keeping, nothing is stored on the servers, the json-file can then be uploaded when changes are needed.

Alternative: When you create an organisation you register an url to the logo, a name for the organization and an address for the backendserver if you want.
