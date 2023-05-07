
import PropTypes from "prop-types";
import {Row, Col, Button, Image, Container} from "react-bootstrap";
import { useParams } from "react-router";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";


export const MovieView = ({ movies, user, updateUser }) =>{
    const [favorite, setFavorite] = useState(false);
    const {movieId} = useParams();
    const movie = movies.find((movie) => movie.id === movieId);

    //GET request
    useEffect(() => {
        if (user.favoriteMovies && movie.id){
            setFavorite(user.favoriteMovies.includes(movie.id))}
            }, [movie]);
        

    const addFavorite = () => {
        const token = localStorage.getItem("token");
        fetch(`https://myflixapi.herokuapp.com/users/${user.username}/movies/${movieId}`, {
            method: "POST",
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            }else {
                alert("Failed");
                return false;
            }
        })
        .then(user => {
            if (user) {
                alert("Added to favorites!");
                setFavorite(true);
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    const removeFavorite = () => {
        const token = localStorage.getItem("token");
        fetch(`https://myflixapi.herokuapp.com/users/${user.username}/movies/${movieId}`, {
            method: "DELETE",
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                alert("Failed");
                return false;
            }
        })
        .then(user => {
            if (user) {
                alert("Removed from favorites!");
                setFavorite(false);
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }
        
    return (
        <>
            <Row>
                <Col xs={12} md={6} lg={4} className="mb-4" >
                    <Image className="img-fluid h-auto" src={movie.image} />
                </Col>

                <Col xs={12} md={6} lg={8} className="mt-4">
                    <h2>{movie.title}</h2>
                    <h4>Description:</h4>
                    <p>{movie.description}</p>
                    <h4>Genre:</h4><p>{movie.genre}</p>
                    <h4>Director:</h4>
                    <p>{movie.director}</p>

                    {favorite ? (
                        <Button
                            onClick={removeFavorite}
                            variant="warning"
                            className="movie-fav-button mt-4">
                            Remove from list
                        </Button>
                    ): (
                        <Button
                            onClick={addFavorite}
                            variant="primary"
                            className="movie-fav-button mt-4">
                            Add to favorites
                        </Button>
                    )}
                    <Link to="/">
                        <Button
                            variant="outline-primary"
                            className="mt-4">
                            Back
                        </Button>
                    </Link>
                </Col>
            </Row>
        </>
        
    );
};

//Defining prop types constraints:
MovieView.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            genre: PropTypes.string.isRequired,
            director: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired
        }).isRequired
    ),
};