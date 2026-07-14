import React, {useEffect,useState} from "react";
import PropTypes from "prop-types";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles,setArticles] = useState([])
  const [loading,setLoading] = useState([true])
  const [pages,setPages] = useState([1])
  const [totalResults,setTotalResults] = useState([0])
  //  document.title = `${capatalizeFirstLetter(props.category)} - NewsApp`;


  const capatalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  };


  const updateNews  = async (page = 1) => {
    let url = `https://newsapi.org/v2/everything?q=${props.country} ${props.category}&sortBy=publishedAt&language=en&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  }
   useEffect(() =>{
    updateNews();
   },[])

   const fetchMoreData = async () => {
    if (loading) {
      return;
    }

    const nextPage = pages + 1;
    setLoading(true);
    setPages(nextPage);
    let url = `https://newsapi.org/v2/everything?q=${props.country} ${props.category}&sortBy=publishedAt&language=en&apiKey=${props.apikey}&page=${nextPage}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

    return (
      <div>
        <div className="container my-4">
          <h2 className="text-center" style={{ margin: "40px 0px" }}>
            NewsApp - {capatalizeFirstLetter(props.category)} Top
            Headlines
          </h2>
          {/* {loading && <Spinner />} */}

          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}
            >
            <div className="container">
            <div className="row my-4">
              {articles.map((element) => {
                return (
                  <div className="col-md-4 my-2" key={element.url}>
                    <Newsitem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
            </div>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
   News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };

  News.protoTypes = {
    country: PropTypes.String,
    pageSize: PropTypes.Number,
    category: PropTypes.String,
  };

export default News;