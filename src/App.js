import React , { Component } from 'react';
import Navbar from './components/Navbar';
import { gapi } from 'gapi-script';
import Home from './components/Home';
import { BrowserRouter, Route } from 'react-router-dom';
import Favorite from './components/Favorite';
import Details from './components/Details';
import { Offline, Online } from "react-detect-offline";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelId: 'UC29ju8bIPH5as8OGnQzwJyA',
      UploadsPlayListId: '',
      videos: [],
      searchResults: [],
      favoriteVideos: [],
      videoDetails: [],
      nextPageToken: '',
      prevPageToken: ''
    };
    this.loadPage = this.loadPage.bind(this);
    this.getId = this.getId.bind(this);
    this.setSearchResult = this.setSearchResult.bind(this);
    this.componentDetails = this.componentDetails.bind(this);
    this.addToFavorite = this.addToFavorite.bind(this);
    this.removeFromFavorite = this.removeFromFavorite.bind(this);
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
                  localStorage.setItem('uploads', JSON.stringify(videos));
                  this.setState({videos: videos, searchResults: videos,nextPageToken: nextPageToken,prevPageToken: prevPageToken});
                  console.log(videos,nextPageToken,prevPageToken);
                },
                function(err) { console.error("Execute error", err); });
  }

  getVideoDetails(videoId){
    return gapi.client.youtube.videos.list({
      "part": "snippet,contentDetails,statistics",
      "id": videoId
    })
        .then((response) => {
                // Handle the results here (response.result has the parsed body).
                // console.log("Response", response);
                const videoDetails = response.result.items[0];
                this.setState({videoDetails:videoDetails});
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


  loadPage(e){
    if(e.target.id === 'next'){
      console.log(e.target.id);
      this.getUploadsPlayLisVidoes(this.state.UploadsPlayListId,'next');
    }else if(e.target.id === 'prev'){
      console.log(e.target.id);
      this.getUploadsPlayLisVidoes(this.state.UploadsPlayListId,'prev');
    }
  }

  getId(url){
    this.getChannelId(url);
  }

  setSearchResult(searchResult){
    this.setState({searchResults:searchResult});
  }

  componentDetails(videoId){
    this.getVideoDetails(videoId);
  }

  addToFavorite(videoItem){
    let alreadyExist = false;
    this.state.favoriteVideos.map(item=>{
      if ( Object.values(item).indexOf(videoItem.videoId) > -1 ) {
        alreadyExist = true;
      }
    });
    if(!alreadyExist){
      this.setState(prevState=> ({favoriteVideos: [...prevState.favoriteVideos,videoItem] }));
    }
  }
  removeFromFavorite(videoItem){
    let index = this.state.favoriteVideos.findIndex(x => x.videoId === videoItem.videoId);
    let favoriteVideos = this.state.favoriteVideos;
    favoriteVideos.splice(index,1);
    console.log(favoriteVideos);
    this.setState({favoriteVideos:[...favoriteVideos]});
  }

  render() { 
    // console.log(this.state);
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar videos={this.state.videos} setSearchResult={this.setSearchResult} favoriteVideos={this.state.favoriteVideos}/>
          <Online>
            <Route exact path="/" render={(props)=> <Home {...props} 
                                                    getId={this.getId}
                                                    searchResults={this.state.searchResults}
                                                    nextPageToken={this.state.nextPageToken}
                                                    prevPageToken={this.state.prevPageToken}
                                                    loadPage={this.loadPage}
                                                    componentDetails={this.componentDetails}
            />}/>
          
          </Online>
          <Offline>
            <h3 className="center">Offline Mode</h3>
            {localStorage.getItem('uploads') ? 
              <Route exact path="/" render={(props)=> <Home {...props} 
                                                    getId={this.getId}
                                                    searchResults={JSON.parse(localStorage.getItem('uploads'))}
                                                    nextPageToken={this.state.nextPageToken}
                                                    prevPageToken={this.state.prevPageToken}
                                                    loadPage={this.loadPage}
                                                    componentDetails={this.componentDetails}
            />}/>
            : null}
          </Offline>
          
          <Route path="/favorite" render={(props)=> <Favorite {...props} favoriteVideos={this.state.favoriteVideos}
            removeFromFavorite={this.removeFromFavorite}
          />}/>
          <Route path="/details" render={(props)=> <Details {...props} videoItem={this.state.videoDetails} 
            addToFavorite={this.addToFavorite}
          />}/>
        </div>
      </BrowserRouter>
    );
  }
}
 
export default App;