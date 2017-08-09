import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import AppRouter from './AppRouter';
import Search from './Search';
import Shelf from './Shelf';

import * as BooksAPI from './BooksAPI.js';

import './App.css';

class App extends Component {

	constructor(props){
		super(props);

		this.state ={
			shelfState: {
				currentlyReading: [],
				read: [],
				wantToRead: []
			}
		}
	}	
	//Grab Books for state. Filter in the render method

	componentDidMount() {
		BooksAPI.getAll().then(books => {
				books.map((book) => {

					if (book.shelf === "read"){
						this.setState({
							read: this.state.read.concat(book)
						})
					}

					if (book.shelf === "currentlyReading"){
						this.setState({
							currentlyReading: this.state.currentlyReading.concat(book)
						})
					}

					if (book.shelf === "wantToRead"){
						this.setState({
							wantToRead: this.state.wantToRead.concat(book)
						})
					}
				})
		})
	}

	updateBooks(book, shelf){
		BooksAPI.update(book, shelf)
	}


  render() {

		let shelves = [
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
				path: "/read"
		}]


    return (
    	<BrowserRouter>
				<div className="app">
					{shelves.map((shelf) => {
						return (
							<AppRouter path={shelf.path} key={shelf.shelfName}>
								<div className="shelf-wrapper">
									<Shelf 
										className={"shelf " + shelf.className } 
										shelfName={shelf.shelfName} 
										read={this.state.read} 
										currentlyReading={this.state.currentlyReading} 
										wantToRead={this.state.wantToRead} 
									/>
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
