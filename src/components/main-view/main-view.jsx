import {useEffect, useState} from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import {Container, Row, Col, Button, Card} from "react-bootstrap";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

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
            const moviesFromApi = data.map((doc) => {
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

    return (
        <BrowserRouter>
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col mod={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <>
                                { user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user, token) => {
                                            setUser(user);
                                            setToken(token);
                                            }} />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route 
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>the list is empty</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col className="mb-4" key={movie.id} md={3}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    )
};