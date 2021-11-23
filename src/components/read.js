import React from 'react';
import { Movies } from './movies';
import axios from 'axios';

export class Read extends React.Component {

    constructor()
    {
        super();
        this.ReloadData = this.ReloadData.bind(this);
    }

    state = {
        movies: []
    };

    componentDidMount()//Life Cycle Hook with a Component.
    {//aysnchronous!
        axios.get('http://localhost:4000/api/movies')//Now using our new API with Axios 
            .then((response) => {
                this.setState({
                    movies: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //Refreshes Movie data being displayed
    ReloadData()
    {
        axios.get('http://localhost:4000/api/movies')
        .then((response) => {
            this.setState({
                movies: response.data
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                {/* Passes ReloadData functionality to its child "movies.js" */}
                <Movies movies={this.state.movies} ReloadData={this.ReloadData}></Movies>
            </div>
        );
    }
}
