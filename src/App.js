import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

import AppRouter from './AppRouter';
import Search from './Search';
import Shelf from './Shelf';

import * as BooksAPI from './BooksAPI.js';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.updateBooks = this.updateBooks.bind(this);
    this.searchBooks = this.searchBooks.bind(this);

    this.state = {
      books: [],
      searchResults: [],
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books});
    });
  }

  updateBooks(book, shelf) {
    BooksAPI.update(book, shelf);
    const index = this.state.books.indexOf(book);
    const {books} = this.state;
    let listOfBooks = books;
    listOfBooks.push(book);

    // Handle when new book is added with no index resulting in a '-1' index
    if (index === -1) {
      console.log(book);
      this.setState({
        books: listOfBooks,
      });
      console.log(books);
    }

    if (index !== -1) {
      this.setState({
        // Get all books up to the book we want to update
        books: [
          ...books.slice(0, index),
          // Update book shelf
          {...book, shelf: shelf},
          // Append all books after book we want to update
          ...books.slice(index + 1),
        ],
      });
    }
  }

  searchBooks(query) {
    BooksAPI.search(query, 2)
      .then(searchResults => {
        searchResults && this.setState({searchResults});
      })
      .catch(e => {
        Promise.resolve();
      });
  }

  render() {
    let shelves = [
      {
        shelfName: 'currentlyReading',
        className: 'currently-reading',
        path: '/reading',
      },
      {
        shelfName: 'wantToRead',
        className: 'want-to-read',
        path: '/want',
      },
      {
        shelfName: 'read',
        className: 'already-read',
        path: '/read',
      },
    ];

    return (
      <BrowserRouter>
        <div className="app">
          {shelves.map(shelf => {
            return (
              <AppRouter path={shelf.path} key={shelf.shelfName}>
                <div className="shelf-wrapper">
                  <Shelf
                    className={'shelf ' + shelf.className}
                    shelfName={shelf.shelfName}
                    books={this.state.books}
                    updateBooks={this.updateBooks}
                  />
                </div>
              </AppRouter>
            );
          })}
          <Route
            exact
            path="/search"
            render={() =>
              <Search
                books={this.state.books}
                searchBooks={this.searchBooks}
                searchResults={this.state.searchResults}
                updateBooks={this.updateBooks}
              />}
          />
          <Route exact path="/" render={() => <Redirect to="/reading" />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
