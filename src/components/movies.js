import React from 'react';
import { MovieItem } from './movieitem';

export class Movies extends React.Component{
    render()
    {
        return this.props.movies.map( (movie)=>{
            //Gets ReloadData from read.js and passes that functionality to its child movieItem.js
            return <MovieItem movie={movie} ReloadData = {this.props.ReloadData}></MovieItem>
        })
    }
            
       
    
}