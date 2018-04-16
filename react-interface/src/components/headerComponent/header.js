import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import logo from '../../assets/img/logotype.png'


class Header extends Component {
  constructor(props) {
		super(props)
		this.state = {}
  }

  render() {
    const pages = this.props.pages;
    return (
      <header className="row">
        <div className='col-sm-12'>
          <div className='col-sm-2 App-logo'>
            <Link to="/" className="logo"><img src={logo} alt="" width='50'/></Link>
          </div>
          <div className='col-sm-10 navbar-wrap offset-sm-2'>
            <nav className="navbar navbar-expand-lg navbar-light">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                  { pages ? pages.map(page => (<li key={ page.ContentLink.Id } className="nav-item"> <Link to={`/${ page.RouteSegment }`} className="nav-link">{page.Name}</Link></li>)) : <br/> }
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
