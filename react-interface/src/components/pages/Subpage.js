import React, { Component } from 'react';



class Subpage extends Component {
  constructor(props) {
		super(props)
		this.state = {
      currentPage : null
    }
  }

  componentDidMount() {
      if(this.props.pageId) {
        // Build the Menus and Routes.
        fetch(this.props.apiBase + '/content/' + this.props.pageId, {
              headers: {
                  'Accept': 'application/json',
                  'Accept-Language': 'en'
              }
          })
          .then( response => response.json() )

          .then((responseData) =>
            {
              fetch(this.props.apiBase + '/content/' + responseData.PageImage.Value.Id, {
                    headers: {
                        'Accept': 'application/json',
                        'Accept-Language': 'en'
                    }
                })
                .then( response => response.json() )
                .then( img => {
                  responseData.PageImage.Value.ProviderName = img.Url
                  this.setState({currentPage : responseData})
                })
            }
          )

        }

      }

  render() {
    const currentPage = this.state.currentPage;
    return (
      (currentPage) ? (
        <div className="Main-body row">
            <div className="jumbotron">
              <div className='col-sm-12'>
                <h1 className="display-4">{ currentPage.Name }</h1>
                {(currentPage.PageImage.Value.ProviderName) ? <img width='300' className='img-responsive' src={ currentPage.PageImage.Value.ProviderName.replace('localhost', '192.168.1.144') } alt="" /> : ''}
                <h6 className="lead">{ currentPage.MetaDescription.Value }</h6>
              </div>
            </div>
          </div>
        ) : (
        <div className="Main-body row">
          <h1>Loading...</h1>
        </div>
      )

    );
  }
}

export default Subpage;
