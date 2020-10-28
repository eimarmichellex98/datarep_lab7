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
        axios.get('https://jsonblob.com/api/jsonblob/520c3b5e-0312-11eb-a6af-cbf00d776032')
            .then((response) => {
                this.setState({ movies: response.data.Search })
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