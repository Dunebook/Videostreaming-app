import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

export default class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videoId: this.props.match.params.id,
      videoData: {}
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch(`http://localhost:4000/video/${this.state.videoId}/data`);
      const data = await res.json();
      this.setState({ videoData: data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="App-header">
        <Header />
        <video controls muted autoPlay crossOrigin="anonymous">
          <source src={`http://localhost:4000/video/${this.state.videoId}`} type="video/mp4"></source>
          <track label="English" kind="captions" srcLang="en" src={`http://localhost:4000/video/${this.state.videoId}/caption`} default></track>
        </video>
        <h1>{ this.state.videoData.name }</h1>
        <Footer />
      </div>
    )
  }
}
