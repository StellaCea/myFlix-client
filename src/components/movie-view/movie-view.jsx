import "./movie-view.scss";
import PropTypes from "prop-types";
import {Row, Col, Button} from "react-bootstrap";


export const MovieView = ({ movie, onBackClick}) =>{
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
                    <Button 
                        onClick={onBackClick} 
                        className="back-button"
                        style={{ cursor:"pointer"}}
                    >
                        Back
                    </Button>
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