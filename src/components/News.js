import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Newsitem from './Newsitem'
import Spinner from './Spinner'

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles : [],
      loading : false,
      page : 1
    }
  }
   
  async componentDidMount(){
    let url = `https://newsapi.org/v2/everything?q=india&sortBy=publishedAt&language=hi&apiKey=bafa763e12a4439989faf411c593def0&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, loading: false})
  }
  
  handlePrevClick = async ()=>{
    let url = `https://newsapi.org/v2/everything?q=india&sortBy=publishedAt&language=hi&apiKey=bafa763e12a4439989faf411c593def0&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
       this.setState({loading:true});
       let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
  }
  handleNextClick = async ()=>{
    let url = `https://newsapi.org/v2/everything?q=india&sortBy=publishedAt&language=hi&apiKey=bafa763e12a4439989faf411c593def0&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});  
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false
    })
  }

  render() {
    return (
      <div>
        <div className="container my-4">
            <h2 className = "text-center">NewsApp - Top Headlines</h2>
            {this.state.loading && <Spinner/>}
            <div className="row my-4" >
              {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                  <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl ={element.urlToImage} newsUrl={element.url}/>
                </div>
              }
              )}
            </div>

        </div>
        <div className="container d-flex justify-content-between">
          <button  disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
