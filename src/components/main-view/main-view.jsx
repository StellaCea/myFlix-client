import {useEffect, useState} from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        if(!token) {
            return;
        }

        fetch("https://myflixapi.herokuapp.com/movies", {
            headers: {Authorization: `Bearer ${token}` },
        })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.docs.map((doc) => {
                return {
                    id: doc._id,
                    title: doc.Title,
                    description: doc.Description,
                    genre: doc.Genre.Name,
                    image: doc.ImagePath,
                    director: doc.Director.Name
                };
            });

            setMovies(moviesFromApi);
        });
    }, [token]);

    if(!user) {
        return (
            <>
                <LoginView onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }} />
                or 
                <SignupView />
            </>
        );
    }

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={()=> setSelectedMovie(null)} />
        );
    }

    if(movies.length === 0) {
        return (
            <>
                <button 
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                >
                    Logout
                </button>
                <div>The list is empty</div>
            </>
        );
    }

    return (
        <div>
            {movies.map((movie) => (
                < MovieCard
                    key = {movie.id}
                    movie = {movie}
                    onMovieClick = {(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};