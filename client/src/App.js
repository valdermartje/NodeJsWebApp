import React from 'react';


export default class App extends React.Component {

  state = {
    data: ['']
  }

  componentDidMount = () => {
    this.fetchApi('http://localhost:3000/'
      , {
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      }
    );
  }

  fetchApi(url, params) {
    fetch(url, params)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => {
        console.error('Error: ' + error)
      })
    console.warn(params);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
      </div>
    );
  }
}
