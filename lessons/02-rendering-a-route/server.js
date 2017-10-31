var express = require('express')
var path = require('path')
var compression = require('compression')

import React from 'react'
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server'
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router'
import routes from './modules/routes'

//send all requests to index.html so browserHistory works
app.get('*', (req, res) => {
  //match the routes to the url
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // in here we can make some decisions all at once
    if (err) {
      // there was an error somewher during route matching
      res.status(500).send(err.message)
    } else if (redirect) {
      // we haven't talked about onEnter hooks on routes ,but before a 
      // route is entered ,it can redirect .Here we handle on the server.
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      //if we got props then we matched a route and can render
        // RouterContenxt is what the router renders. Router keeps these props in its state
        // as it listens to browserHistory
        // But on the server our app is stateless, so we need to use match to 
        // get these props before rendering
        const appHtml = renderToString(<RouteContext {...props}/>)
        //dump the HTML into a template, lots of ways to do this 
        // but none are really infulenced by React Router
        // so we're just using a little function `renderPage`
        res.send(renderPage(appHtml))
    } else {
      res.status(404).send('Not Found')
    }
    // RouterContenxt is what the router renders. Router keeps these props in its state
    // as it listens to browserHistory
    // But on the server our app is stateless, so we need to use match to 
    // get these props before rendering
    const appHtml = renderToString(<RouteContext {...props}/>)
    //dump the HTML into a template, lots of ways to do this 
    // but none are really infulenced by React Router
    // so we're just using a little function `renderPage`
    res.send(renderPage(appHtml))
  })
})

var app = express()
//must be first 
app.use(compression())

//server our static stuff like index.css
app.use(express.static(__dirname))
//add path.join here
app.use(express.static(path.join(__dirname, 'public')))

//send all requests to index.html so broswerHistory in ReactRouter works

// app.get('*', function(req, res) {
//   // res.sendFile(path.join(__dirname, 'index.html'))
//   // add drop 'public' in the middle of here
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
