import React, { Component } from 'react'
import loading from './loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div>
        <div className="text-center my-10" >
            <img src={loading} alt="Loading..." />
        </div>
      </div>
    )
  }
}
