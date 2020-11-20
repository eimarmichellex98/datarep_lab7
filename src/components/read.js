import React from 'react';
import { Movies } from './movies';
import axios from 'axios';


export class Read extends React.Component {
    //JSON added holding data that will be used to display on read component online
    state = {
        movies: []
    };

    componentDidMount() {
        //axios resource goes to retrieve JSON file and displays it 
        axios.get('http://localhost:4000/api/movies')
            .then((response) => {
                this.setState({ movies: response.data })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {
        //passing to movies.js
        return (
            <div>
                <h1>Read Component</h1>
                <Movies movies={this.state.movies}></Movies>
            </div>
        );
    }
}