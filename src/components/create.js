
import React, { Component } from 'react';
import axios from 'axios';



export class Create extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeMovieName = this.onChangeMovieName.bind(this);
        this.onChangeMovieYear = this.onChangeMovieYear.bind(this);
        this.onChangeMoviePoster = this.onChangeMoviePoster.bind(this);

        this.state = {
            Title: '',
            Year: '',
            Poster: ''
        }
    }


    handleSubmit(event) {

    }


    onChangeMovieName(event) {
        this.setState({
            Title: event.target.value
        })
    }

    onChangeMovieYear(event) {
        this.setState({
            Year: event.target.value
        })
    }

    onChangeMoviePoster(event) {
        this.setState({
            Poster: event.target.value
        })
    }

    //Now posts data to server as well as natively in the application.
    // Outputs to the browser
    handleSubmit(event) {
        event.preventDefault();
        alert('Movie Name: ' + this.state.Title +
            ' Movie Year: ' + this.state.Year +
            ' Movie Poster ' + this.state.Poster);

        const newMovie = {
            title: this.state.Title,
            year: this.state.Year,
            poster: this.state.Poster
        }//Axios again for handling HTTP
        axios.post('http://localhost:4000/api/movies', newMovie)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });


    }

    //After values have been entered into the input boxes,triggers onChange and passed values to their associated methods.
    render() {
        return (
            <div>//
                {/* Input boxes for Title/Year/Poster */}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Add Movie Name:</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Title} onChange={this.onChangeMovieName}></input>

                    </div>

                    <div className="form-group">
                        <label>Add Movie Year:</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Year} onChange={this.onChangeMovieYear}></input>

                    </div>

                    <div className="form-group">
                        <label>Add Movie Poster:</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Poster} onChange={this.onChangeMoviePoster}></input>

                    </div>

                    <div>
                        <input type="submit"
                            value="Add new Movie"
                            className="btn btn-primary"></input>
                    </div>

                </form>
            </div>
        );
    }
}
