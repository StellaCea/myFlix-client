import React from "react";
import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";

export const MovieCard = ({movie, favoriteMovies}) => {
    return (
        <Card border="primary" style={{width:"19rem"}} className="h-100">
            <Card.Img variant="top" src={movie.image}/>
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button style={{width:"270px"}} variant="primary">Open</Button>
                </Link>             
            </Card.Body>
        </Card>
    );
};

//Define prop constraints
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired
    }).isRequired
};