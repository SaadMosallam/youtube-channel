import React, { createContext, Component } from 'react';
import { gapi } from 'gapi-script';


export const GapiContext = createContext();

class GapiContextProvider extends Component {
  state = { 
    channelId: 'UC29ju8bIPH5as8OGnQzwJyA',
    UploadsPlayListId: '',
    videos: [],
    searchResults: [],
    nextPageToken: '',
    prevPageToken: ''
  }

  getChannelId(url){
    let channelId = "";
    if( /https:\/\/www\.youtube\.com\/user\//.test(url) ){
      url= url.replace(/https:\/\/www\.youtube\.com\/user\//,'');
      return gapi.client.youtube.channels.list({
        "part": "contentDetails",
        "forUsername": url
      })
          .then(function(response) {
                  // Handle the results here (response.result has the parsed body).
                  channelId = response.result.items[0].id;
                  // console.log("Response", response,url,channelId);
                },
                function(err) { console.error("Execute error", err); });
    }else if( /https:\/\/www\.youtube\.com\/channel\//.test(url) ){
      channelId = url.replace(/https:\/\/www\.youtube\.com\/channel\//,'');
    }
    this.setState({channelId:channelId});
    this.getUploadsPlayListId(channelId);
  }

  getUploadsPlayListId(channelId) {
    return gapi.client.youtube.channels.list({
      "part": "contentDetails",
      "id": channelId
    })
        .then((response) => {
                // Handle the results here (response.result has the parsed body).
                // console.log("getUploadsPlayListId Response", response);
                const UploadsPlayListId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
                this.setState({UploadsPlayListId: UploadsPlayListId});
                // console.log("UploadsPlayListId", UploadsPlayListId);
                this.getUploadsPlayLisVidoes(this.state.UploadsPlayListId);
              },
              function(err) { console.error("Execute error", err); });
  }

  getUploadsPlayLisVidoes(UploadsPlayListId,type) {
      let pageToken;
      if(!type){
        pageToken = '';
      }else if(type === 'next'){
        pageToken = this.state.nextPageToken;
      }else if(type === 'prev'){
        pageToken = this.state.prevPageToken;
      }
      return gapi.client.youtube.playlistItems.list({
        "part": "snippet",
        "maxResults": 8,
        "pageToken": pageToken,
        "playlistId": UploadsPlayListId
      })
          .then((response) => {
                  // Handle the results here (response.result has the parsed body).
                  // console.log("getUploadsPlayLisVidoes Response", response);
                  const videos = response.result.items;
                  const nextPageToken = response.result.nextPageToken;
                  const prevPageToken = response.result.prevPageToken;
                  // console.log("videos", videos);
                  this.setState({videos: videos, searchResults: videos,nextPageToken: nextPageToken,prevPageToken: prevPageToken});
                  console.log(videos,nextPageToken,prevPageToken);
                },
                function(err) { console.error("Execute error", err); });
  }
  
  componentDidMount(){
    const API_KEY = 'AIzaSyBHZhrtWL7ezQ-SkuOHakIB0V6M0qFdnKg';
    const channelId = this.state.channelId;
    const self = this;
    function loadClient() {
      gapi.client.setApiKey(API_KEY);
      return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
          .then(() => { 
            console.log("GAPI client loaded for API");
            self.getUploadsPlayListId(channelId);
          },
                function(err) { console.error("Error loading GAPI client for API", err); });
    }
    gapi.load("client", loadClient);
  }

  loadPage = (e) => {
    if(e.target.id === 'next'){
      console.log(e.target.id);
      this.getUploadsPlayLisVidoes(this.state.UploadsPlayListId,'next');
    }else if(e.target.id === 'prev'){
      console.log(e.target.id);
      this.getUploadsPlayLisVidoes(this.state.UploadsPlayListId,'prev');
    }
  };

  getId = (url) => {
    this.getChannelId(url);
  };

  setSearchResult = (searchResult) => {
    console.log(this.state);
    this.setState({searchResults:searchResult});
  };

  render() { 
    return ( 
      <GapiContext.Provider value={{...this.state}}>
          {this.props.children}
      </GapiContext.Provider>
    );
  }
}
 
export default GapiContextProvider;