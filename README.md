The main logic of the application is at App Component
    - using gapi and state to centeralize most important data of the application

Some small features are implemented using the local state of the feature component
    -to prevent state and logic complexity of the main component 

The Application is divided into three main pages
    1- Home
        -ChannelForm == Gets new Channel's uploads list through url
        -ChannelUploads === display Channel's uploads list in table view
    2- Details
        -display the details of the specific video whose details button is clicked
    3- Favorite
        -displays a list of videos added to the favorite list 
        -as well as their rating chosen by the user in the details pages