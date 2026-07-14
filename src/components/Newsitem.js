import React from "react";


const Newsitem = (props) => {
    let { title, description, imageUrl ,newsUrl,author,date,source} = props;
    return (
      <div>
        <div className="card" >
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
             <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'1%',zIndex:'1'}}>
            {source}
          </span>
            <h5 className="card-title">{title}....</h5>
            <p className="card-text">
              {description}...
            </p>
            <p className="card-text">
              <small className="text-muted">
                By {author?author:'Unknown'} on { new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl}  target ="_blank"className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }


export default Newsitem;
