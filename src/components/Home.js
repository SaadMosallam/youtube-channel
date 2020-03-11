import React from 'react';
import ChannelForm from './ChannelForm';
import ChannelUploads from './ChannelUploads';

const Home = (props) => {
    return ( 
        <div>
            <ChannelForm getChannelId={props.getId}/>
            <ChannelUploads uploadsVideos={props.searchResults} 
            nextPageToken={props.nextPageToken} prevPageToken={props.prevPageToken}
            loadPage={props.loadPage} componentDetails={props.componentDetails}/>
        </div>
    );
}
 
export default Home;