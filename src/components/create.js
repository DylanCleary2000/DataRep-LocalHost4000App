
import React, { Component } from 'react';



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

    // Outputs to the browser
    handleSubmit(event) {
        alert('Movie Name: ' + this.state.Title +
            ' Movie Year: ' + this.state.Year +
            ' Movie Poster ' + this.state.Poster);
        event.preventDefault();
        this.setState({
            Title: '',
            Year: '',
            Poster: ''
        })
    }


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