import "./movie-view.scss";
import PropTypes from "prop-types";
import {Row, Col, Button} from "react-bootstrap";
import { useParams } from "react-router";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";


export const MovieView = ({ movies }) =>{
    const {movieId} = useParams();
    const movie = movies.find((m) => m.id === movieId);
    const [favorite, setFavorite] = useState(user.favoriteMovies.includes(movie.id));

    useEffect(() => {
        setFavorite(user.favoriteMovies.includes(movie.id));
    }, [movieId])

    const addFavorite = () => {
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
                onUpdatedUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    const removeFavorite = () => {
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
                onUpdatedUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }
        
    return (
        <Row className="justify-content-md-center">
            <Col>
                <div>
                    <div>
                        <img className="w-100" src={movie.image} />
                    </div>
                    <div>
                        <span>Title:</span>
                        <span>{movie.title}</span>
                    </div>
                    <div>
                        <span>Description:</span>
                        <span>{movie.description}</span>
                    </div>
                    <div>
                        <span>Genre:</span>
                        <span>{movie.genre}</span>
                    </div>
                    <div>
                        <span>Director:</span>
                        <span>{movie.director}</span>
                    </div>
                    <Link to={`/`}>
                        <Button className="back-button" style={{ cursor:"pointer"}}>Back</Button>
                    </Link>
                    {favorite ? 
                        <Button variant="danger" className="ms-2" onClick={removeFavorite}>Remove from favorites</Button>
                        : <Button variant="success" className="ms-2" onClick={addFavorite}>Add to favorites</Button>
                    }                  
                </div>
            </Col>
        </Row>
        
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