import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

// Assets
import './assets/css/App.css';

//Components
import Header from './components/headerComponent/header.js';
import Footer from './components/footerComponent/footer.js';
import Startpage from './components/pages/startPage.js';
import Subpage from './components/pages/Subpage.js'



class App extends Component {
  constructor(props) {
		super(props)
		this.state = {
      StartPageId : null,
      AppName : "EPiServer React Demo",
      children : []
    }
  }

  componentDidMount() {
    if(this.props.apiBase) {
      // GetStartPageId
      fetch(this.props.apiBase + '/site/', {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then( response => response.json() )
        .then( (responseData) =>
          {this.setState({StartPageId : responseData[0].ContentRoots.StartPage.Id })
          // Build the Menus and Routes.
          fetch(this.props.apiBase + '/content/' + responseData[0].ContentRoots.StartPage.Id + '/children', {
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': 'en'
                }
            })
            .then( response => response.json() )
            .then( (responseData) => this.setState({children : [...responseData]}))
        })
      }
	}

  render() {
    const pages = this.state.children;
    const StartPageId = this.state.StartPageId;
    return (
      <Router>
      <div className="App">
        { pages ? <Header pages={ this.state.children } StartPageId={ this.state.StartPageId }/> : <div>Loading...</div> }
        { StartPageId ? <Route key={ this.state.StartPageId } exact path='/' render={()=> <Startpage StartPageId="5" apiBase={ this.props.apiBase }/>}/> : <div>Loading...</div> }
        { pages ? pages.map(page => (<Route key={ page.ContentLink.Id } exact path={`/${ page.RouteSegment }`} render={()=> <Subpage apiBase={ this.props.apiBase } pageId={ page.ContentLink.Id }/>}/>)) : <div>Loading...</div> }
        <Footer/>
      </div>
    </Router>
    );
  }
}

export default App;
