import React, { Component } from 'react';

class Changer extends Component {
	render (){
		return (
			<div className="book-shelf-changer">
				<select onChange={(event) => this.props.updateBooks(this.props.book, event.target.value)}>
					<option value="none" disabled>Move to...</option>
					<option value="currentlyReading">Currently Reading</option>
					<option value="wantToRead">Want to Read</option>
					<option value="read">Read</option>
					<option value="none">None</option>
				</select>
			</div>
		)
	}
}

export default Changer;
