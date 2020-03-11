import React from 'react';

const Favorite = (props) => {
    return ( 
        <div>
            <h3 className="right">You Have {props.favoriteVideos.length} Favorite videos</h3>
            {props.favoriteVideos.length ? 
                <table className="highlight centered">
                    <thead>
                    <tr>
                        <th></th>
                        
                        <th className="">
                            <div className="valign-wrapper">
                                <i className="material-icons">unfold_more</i>Rating
                            </div>
                        </th>
                        
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    {props.favoriteVideos.map((item)=>{
                        const videoId = item.videoId;

                        return(<tr key={videoId}>
                        <td className="highlight centered">
                            <iframe width={250} height={120} src={`https://www.youtube.com/embed/${videoId}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </td>
                        <td className="">
                            <i id="one" 
                            className={item.rating >= 1 ? "material-icons red-text":"material-icons"}>
                            {item.rating >= 1 ? "star":"star_outline"}
                        </i>
                        <i id="two" 
                            className={item.rating >= 2 ? "material-icons red-text":"material-icons"}>
                            {item.rating >= 2 ? "star":"star_outline"}
                        </i>
                        <i id="three" 
                            className={item.rating >= 3 ? "material-icons red-text":"material-icons"}>
                            {item.rating >= 3 ? "star":"star_outline"}
                        </i>
                        <i id="four" 
                            className={item.rating >= 4 ? "material-icons red-text":"material-icons"}>
                            {item.rating >= 4 ? "star":"star_outline"}
                        </i>
                        <i id="five" 
                            className={item.rating >= 5 ? "material-icons red-text":"material-icons"}>
                            {item.rating >= 5 ? "star":"star_outline"}
                        </i>
                        </td>
                        <td><button onClick={e=> {props.removeFromFavorite({videoId:videoId,rating:item.rating})}} className="btn red center-align">Remove</button></td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            : null}
            
        </div>
        
    );
}

 
export default Favorite;