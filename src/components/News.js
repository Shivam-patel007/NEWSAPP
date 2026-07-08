import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Newsitem from './Newsitem'

export class News extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
        <div className="container my-4">
            <h2>NewsApp - Top Headlines</h2>
            <div className="row my-4" >
                <div className="col-md-4">
                    <Newsitem/>
                </div>
                <div className="col-md-4">
                    <Newsitem/>
                </div>
                <div className="col-md-4">
                    <Newsitem/>
                </div>
            </div>

        </div>
      </div>
    )
  }
}

export default News
