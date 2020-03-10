import React from 'react';

const ChannelUploads = (props) => {

    return ( 
        <div>
            <table className="highlight centered">
        <thead>
          <tr>
              <th></th>
              <th className="">
                <div className="valign-wrapper">
                    <i className="material-icons">unfold_more</i>Title
                </div>
              </th>
              
              <th>
                <div className="valign-wrapper">
                    <i className="material-icons">unfold_more</i>Publish Date
                </div>
              </th>
              <th></th>
          </tr>
        </thead>

        <tbody>
          {props.uploadsVideos.map((item)=>{
            const videoId = item.snippet.resourceId.videoId;
        
            const thubmnail = item.snippet.thumbnails.medium.url;
        
            const title = item.snippet.title;
        
            const publishDate = new Date(item.snippet.publishedAt);
            const dd = String(publishDate.getDate()).padStart(2, '0');
            const mm = String(publishDate.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = publishDate.getFullYear();
            const publishDateFromated = `${dd}-${mm}-${yyyy}`;

            return(<tr key={videoId}>
              <td className="thumbnail">
                <img src={thubmnail} width={250} height={120}/>
              </td>
              <td>{title}</td>
              <td>{publishDateFromated}</td>
              <td><button className="btn red center-align">Details</button></td>
            </tr>)
          })}
        </tbody>
      </table>
      <div className="right-align" id="uploads-pagination">
          {props.prevPageToken? <button onClick={props.loadPage} id="prev" className="btn-small"><i className="material-icons">chevron_left</i></button>
          : <button onClick={props.loadPage} id="prev" className="btn-small disabled"><i className="material-icons">chevron_left</i></button>}
          
          {props.nextPageToken? 
            <button onClick={props.loadPage} id="next" className="btn-small"  ><i className="material-icons">chevron_right</i></button>
            : <button onClick={props.loadPage} id="next" className="btn-small disabled"  ><i className="material-icons">chevron_right</i></button>
          }
      </div>
        </div>
        
    );
};
 
export default ChannelUploads;