import React from 'react'
//import { Link } from 'react-router'
// user NavLink
import NavLink from './NavLink'
import { browserHistory } from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  //add method 
  handleSubmit(event) {
    event.preventDefault()
    const userName = event.target.elements[0].value
    const repo = event.target.elements[1].value
    const path = `/repos/${userName}/${repo}`
    browserHistory.push(path)
    console.log(path)
    this.context.router.push(path)
  },

  render() {
    return (
      <div>
        <h2>Repos</h2>
        {/*add some links*/}
        <ul>
          <li><NavLink to="/repos/reactjs/rect-router">React Router~~</NavLink></li>
          <li><NavLink to="/repos/facebook/react">React~~</NavLink></li>
          {/*add this form*/}
          <li>
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="userName"/> / {' '}
              <input type="text" placeholder="repo"/>{' '}
              <button type="submit">Go</button>
            </form>
          </li>
        </ul>
        {/*will render Repo.js when at /repos/:userName/:repoName*/}
        {this.props.children}
      </div>
    )
  }
})