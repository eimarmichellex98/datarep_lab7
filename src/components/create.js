import React from 'react';
import axios from 'axios';

export class Create extends React.Component {

    //using constructor to create form object and super class
    constructor() {
        //to use forms we need super class and invoke parent class
        super();

        //binding all events to 'this' keyword
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangePoster = this.onChangePoster.bind(this);

        //fields taken to use in form
        this.state = {
            Title: '',
            Year: '',
            Poster: ''
        }
    }
    //method takes argument e, when we update the input it will display the new Title
    onChangeTitle(e) {
        this.setState({
            Title: e.target.value
        })
    }
    //method takes argument e, new input will update and then display new Year
    onChangeYear(e) {
        this.setState({
            Year: e.target.value
        })
    }
    //method takes argument e, when input is updated, a new Poster will be displayed
    onChangePoster(e) {
        this.setState({
            Poster: e.target.value
        })
    }
    //onSubmit method, argument taken is e, default prevents us from calling it multiple times
    //message appears as an alert
    onSubmit(e) {
        e.preventDefault();
        alert("Movie: " + this.state.Title + "\nYear: "
            + this.state.Year + "\nPoster: " + this.state.Poster);
        
        const newMovie = {
            title: this.state.Title,
            year: this.state.Year,
            poster: this.state.Poster
        }
        axios.post('http://localhost:4000/api/movies', newMovie)
        .then((res) =>{
            console.log(res);
        })
        .catch((err) =>{
            console.log(err);
        })
    }

    //form has a onSubmit button and once clicked it invokes a method
    //div all holding different inputs on webpage for user, Movie Title, Year, Poster
    render() {
        return (
            <div className='App'>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Movie Title:</label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Title}
                            onChange={this.onChangeTitle}></input>
                    </div>
                    <div className="form-group">
                        <label>Add Movie Year: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Year}
                            onChange={this.onChangeYear}></input>
                    </div>
                    <div className='form-group'>
                        <label>Movies Poster:</label>
                        <textarea type='text'
                            className='form-control'
                            value={this.state.Poster}
                            onChange={this.onChangePoster}></textarea>
                    </div>
                    <div className="form-group">
                        <input type='submit'
                            value='Add Movie'
                            className='btn btn-primary'></input>
                    </div>
                </form>
            </div>
        );
    }
}