import React from 'react'
import { Link, IndexLink } from 'react-router'
import NavLink from './NavLink'
import Home from './Home'
export default React.createClass({
  render() {
    return (
      <div>
        <h1>React Router tutorial</h1>
        <ul role="nav">
          <li>
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
          </li>
          <li>
            <NavLink to="/" onlyActiveOnIndex={true}>another Home</NavLink>
          </li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/repos">Repos</NavLink></li>
        </ul>
        {/*add this*/}
        {/*see if have any children in app ,if not render Home*/}
        {this.props.children || <Home/>}
      </div>
    )
  }
})
