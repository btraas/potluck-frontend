import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Navigation from './layout/Navigation';
import Footer from './layout/Footer';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div style={{width:"100%"}}>
        <Navigation />
        <Home />
        <Footer />
      </div>
    );
  }
}

export default App;
