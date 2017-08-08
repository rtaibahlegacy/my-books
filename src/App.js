import React, { Component } from 'react';
import Search from './Search';
import Shelf from './Shelf';
import AppRouter from './AppRouter';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    var shelves = [
			{
				shelfName: "Currently Reading",
				className: "currently-reading",
				path:"/reading"
			},{
				shelfName: "Want to Read",
				className: "want-to-read",
				path:"/want"
			},{
				shelfName: "Read",
				className: "already-read",
				path:"/read"
			}
		]

    return (
    	<BrowserRouter>
				<div className="app">
					{shelves.map((shelf) => {
						return (
							<AppRouter path={shelf.path} key={shelf.shelfName}>
								<div className="shelf-wrapper">
									<Shelf className={"shelf " + shelf.className } shelfName={shelf.shelfName} />
								</div>
							</AppRouter>
						)})
					}
					<Route exact path='/search' component={Search} />
				<Route exact path="/" render={() => <Redirect to="/reading" />} />
				</div>
			</BrowserRouter>
    );
  }
}

export default App;


			
