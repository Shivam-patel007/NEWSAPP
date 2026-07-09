import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Newsitem from './Newsitem'

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articeles : [],
      loading : false
    }
  }
   
  async componentDidMount(){
    let url = "https://newsapi.org/v2/everything?q=india&sortBy=publishedAt&language=hi&apiKey=bafa763e12a4439989faf411c593def0";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articeles: parsedData.articles})
  }

  render() {
    return (
      <div>
        <div className="container my-4">
            <h2>NewsApp - Top Headlines</h2>
            <div className="row my-4" >
              {this.state.articeles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                  <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl ={element.urlToImage} newsUrl={element.url}/>
                </div>
              }
              )}
            </div>

        </div>
      </div>
    )
  }
}

export default News
