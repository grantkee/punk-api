import React, {Component} from 'react';
// import logo from '../media/thumbs-up.png';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      beers: [],
      isLiked: false
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch ('https://api.punkapi.com/v2/beers')
    .then(response => response.json())
    .then(parsedJSON => parsedJSON.map(beer => ({
      id: `${beer.id}`,
      name: `${beer.name}`,
      tagline: `${beer.tagline}`,
      abv: `${beer.abv}`,
      ibu: `${beer.ibu}`,
      image: `${beer.image_url}`
      // mash_temp_value_c: `${beer.method.mash_temp.temp.value}`
    })))
    .then(beers => this.setState({
      beers,
      isLoading: false,
      isLiked: false
    }))
    .catch(error => console.log("parsing failed", error))
    }

  isLiked() {
    // this.setState({isLiked: true});
    console.log('haha you actually like this beer??')
  }

  render() {
    const {isLoading, beers} = this.state;
    return (
      <div>
        <header><h1>Good Beers</h1></header>
        <div className={`content ${isLoading ? 'is-loading' : ''}`}>
          <div className="beer-info">
            {
              // how to do if statement everything is wrapped in????
              !isLoading && beers.length > 0 ? beers.map(beer => {
                const {name, tagline, abv, ibu, image} = beer;
                return <div key={beer.id} title={name} className="beer-div">
                    <p>Name: {name} <button type="button" className="like-button" onClick={this.isLiked}>Like</button></p> 
                    {/* <button><img src={logo} alt="like" className="img-responsive"></img></button> */}
                    <p>Tagline: {tagline}</p>
                    <p>ABV: {abv}</p>
                    <p>IBU: {ibu}</p>
                      <img src={image} className="beer-pic" atl="pic"/>
                    <br/>
                  </div>
              }) : null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App;
