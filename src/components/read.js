import React from 'react';
import { Movies } from './movies';
import axios from 'axios';

export class Read extends React.Component {

    state = {
        movies: []
    };

    componentDidMount()//Life Cycle Hook with a Component.
    {//aysnchronous!
        axios.get('http://localhost:4000/api/movies')//Now using our new API with Axios
            .then((response) => {
                this.setState({
                    movies: response.data.movies
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <Movies movies={this.state.movies}></Movies>
            </div>
        );
    }
}
