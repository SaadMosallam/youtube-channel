import React, {Component} from 'react';
import './Details.css';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0
        }
        this.handleRating = this.handleRating.bind(this)
    }
    
    parseDuration(duration) {
        let matches = duration.match(/[0-9]+[HMS]/g);
    
        let h = 0;
        let m = 0;
        let s = 0;
    
        matches.forEach(function (part) {
            let unit = part.charAt(part.length-1);
            let amount = parseInt(part.slice(0,-1));
    
            switch (unit) {
                case 'H':
                    h += amount;
                    break;
                case 'M':
                    m += amount;
                    break;
                case 'S':
                    s += amount;
                    break;
                default:
                    // noop
            }
        });
        if(h <= 9) h = "0"+h;
        if(m <= 9) m = "0"+m;
        if(s <= 9) s = "0"+s;

        return `${h}:${m}:${s}`;
    }
    
    handleRating(e){
        if(e.target.id === "one"){
            this.setState({rating:1});
        }else if(e.target.id === "two"){
            this.setState({rating:2});
        }else if(e.target.id === "three"){
            this.setState({rating:3});
        }else if(e.target.id === "four"){
            this.setState({rating:4});
        }else if(e.target.id === "five"){
            this.setState({rating:5});
        }
    }

    render() { 
        const videoItem = this.props.videoItem;
        // console.log(videoItem);
        const videoId = videoItem.id;
        let title,publishDateFromated,duration,views,likes,description;

        if(videoItem.snippet){
            title = videoItem.snippet.title;
            const publishDate = new Date(videoItem.snippet.publishedAt);
            const dd = String(publishDate.getDate()).padStart(2, '0');
            let mm = publishDate.getMonth() //January is 0!
            const monthNames = ["January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                                ];
            mm = monthNames[mm];                  
            const yyyy = publishDate.getFullYear();
            publishDateFromated = `${mm} ${dd}, ${yyyy}`;
            description = videoItem.snippet.description;
        }
        if(videoItem.contentDetails){
            duration = videoItem.contentDetails.duration;
            duration = this.parseDuration(duration);
        }
        if(videoItem.statistics){
            views = videoItem.statistics.viewCount;
            likes = videoItem.statistics.likeCount;
        }
        const rating = this.state.rating;
        return ( 
            <div className="details-card">
                <div className="resp-container">
                    <iframe className="resp-iframe" src={`https://www.youtube.com/embed/${videoId}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <div className="title-panel">
                    <h3>{title}</h3>
                    <button onClick={e=> {this.props.addToFavorite({videoId:videoId,rating:rating})}} className="btn red">Add to favorites</button>
                </div>
                <div className="divider"></div>
                <div className="rate-panel">
                    <div className="rating valign-wrapper">
                        <span className="valign-wrapper">Rate Now </span>
                        <span className="valign-wrapper"> 
                        <i id="one" onClick={this.handleRating} 
                            className={this.state.rating >= 1 ? "material-icons red-text":"material-icons"}>
                            {this.state.rating >= 1 ? "star":"star_outline"}
                        </i>
                        <i id="two" onClick={this.handleRating} 
                            className={this.state.rating >= 2 ? "material-icons red-text":"material-icons"}>
                            {this.state.rating >= 2 ? "star":"star_outline"}
                        </i>
                        <i id="three" onClick={this.handleRating} 
                            className={this.state.rating >= 3 ? "material-icons red-text":"material-icons"}>
                            {this.state.rating >= 3 ? "star":"star_outline"}
                        </i>
                        <i id="four" onClick={this.handleRating} 
                            className={this.state.rating >= 4 ? "material-icons red-text":"material-icons"}>
                            {this.state.rating >= 4 ? "star":"star_outline"}
                        </i>
                        <i id="five" onClick={this.handleRating} 
                            className={this.state.rating >= 5 ? "material-icons red-text":"material-icons"}>
                            {this.state.rating >= 5 ? "star":"star_outline"}
                        </i>
                        </span>
                    </div>
                    <div>
                        <span>Duration </span>
                        <span>{duration}</span>
                    </div>
                    <div className="views valign-wrapper">
                        <span className="valign-wrapper"><i className="material-icons">visibility</i>{views}</span>
                        <span className="valign-wrapper"><i className="material-icons">thumb_up_alt</i>{likes}</span>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="description">
                    <div className="red-text publish-date">Published on {publishDateFromated}</div>
                    <div className="description-text">{description}</div>
                </div>
            </div>
        );
    }
}
 
export default Details;