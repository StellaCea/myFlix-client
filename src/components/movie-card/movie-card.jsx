import PropTypes from "prop-types";

export const MovieCard = ({movie, onMovieClick}) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.title}     
        </div> 
    );
};

//Define prop constraints
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        image: PropTypes.ImagePath.isRequired,
        director: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick:PropTypes.func.isRequired
};