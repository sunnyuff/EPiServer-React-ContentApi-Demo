import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class Startpage extends Component {
  constructor(props) {
		super(props)
		this.state = {
      currentPage : null,
      childItems : []
    }
  }

componentDidMount() {
    if(this.props.StartPageId) {
      // Build the Menus and Routes.
      fetch(this.props.apiBase + '/content/' + this.props.StartPageId, {
            headers: {
                'Accept': 'application/json',
                'Accept-Language': 'en'
            }
        })
        .then( response => response.json() )

        .then((responseData) =>
          {this.setState({currentPage : responseData})
          responseData.MainContentArea.Value.map( item =>
            fetch(this.props.apiBase + '/content/' + item.ContentLink.Id, {
                  headers: {
                      'Accept': 'application/json',
                      'Accept-Language': 'en'
                  }
              })
              .then( response => response.json() )
              .then( (childItem) => this.setState((prevState) => (
                fetch(this.props.apiBase + '/content/' + childItem.Image.Value.Id, {
                      headers: {
                          'Accept': 'application/json',
                          'Accept-Language': 'en'
                      }
                  })
                  .then( response => response.json() )
                  .then( img => {
                    childItem.Image.Value.ProviderName = img.Url
                    this.setState((prevState) => (prevState.childItems.push(childItem)))
                  })
                  )
                   ))
          )}
        )

      }

    }
//
  render() {
    const currentPage = this.state.currentPage;
    const childItems = this.state.childItems;
    return (
      (currentPage && childItems) ? (
        <div className="Main-body row" >
          { childItems.map(item => (
            (item.ContentType[1] === 'JumbotronBlock')
              ?
              <div key={item.ContentLink.Id} className="jumbotron">
                <div className='col-sm-4 jumbotron-img'>
                  <img width='300' className='img-responsive' src={ item.Image.Value.ProviderName.replace('localhost', '192.168.1.144') } alt="" />
                </div>
                <div className='col-sm-8 offset-sm-4 jumbotron-body'>
                  <h1 className="display-4">{item.Heading.Value}</h1>
                  <p className="lead">{item.SubHeading.Value}</p>
                  <p className="lead">
                    <Link to={`/${ item.ButtonLink.Value.substring(4) }`} className="btn btn-primary right">{ item.ButtonText.Value }</Link>
                  </p>
                </div>
              </div> : ''
          )) }
          { childItems.map(item => (
            (item.ContentType[1] === 'TeaserBlock')
              ? <div key={item.ContentLink.Id} className='col-sm-4 TeaserBlock'>
                <h2>{item.Heading.Value}</h2>
                <p>{item.Text.Value}</p>
                <img width='300' className='img-responsive' src={ item.Image.Value.ProviderName.replace('localhost', '192.168.1.144') } alt="" />

              </div> : ''
          )) }

        </div>
      ) : (
        <div className="Main-body" >
          Loading...
        </div>
      )


    );
  }
}

export default Startpage;
