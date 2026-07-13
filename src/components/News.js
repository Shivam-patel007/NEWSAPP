import React, { Component } from "react";
import PropTypes from "prop-types";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };

  static protoTypes = {
    country: PropTypes.String,
    pageSize: PropTypes.Number,
    category: PropTypes.String,
  };
  capatalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults :0,
    };
    document.title = `${this.capatalizeFirstLetter(this.props.category)} - NewsApp`;
  }

  async updateNews(page = 1) {
    let url = `https://newsapi.org/v2/everything?q=${this.props.country} ${this.props.category}&sortBy=publishedAt&language=en&apiKey=bafa763e12a4439989faf411c593def0&page=${page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState((prevState) => ({
      articles: page === 1 ? parsedData.articles : prevState.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    }));
  }

  async componentDidMount() {
    await this.updateNews();
  }

  fetchMoreData = async () => {
    if (this.state.loading) {
      return;
    }

    const nextPage = this.state.page + 1;
    this.setState({ loading: true, page: nextPage });

    let url = `https://newsapi.org/v2/everything?q=${this.props.country} ${this.props.category}&sortBy=publishedAt&language=en&apiKey=bafa763e12a4439989faf411c593def0&page=${nextPage}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState((prevState) => ({
      articles: prevState.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    }));
  };

  render() {
    return (
      <div>
        <div className="container my-4">
          <h2 className="text-center" style={{ margin: "40px 0px" }}>
            NewsApp - {this.capatalizeFirstLetter(this.props.category)} Top
            Headlines
          </h2>
          {/* {this.state.loading && <Spinner />} */}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
            >
            <div className="container">
            <div className="row my-4">
              {this.state.articles.map((element) => {
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
}

export default News;
