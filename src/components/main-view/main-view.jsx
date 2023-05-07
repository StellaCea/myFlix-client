import {useEffect, useState} from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import {Container, Row, Col, Button, Card, Form, FormControl} from "react-bootstrap";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { UsernameSettings } from "../profile-view/username-settings";
import { PasswordSettings } from "../profile-view/password-settings";
import { EmailSettings } from "../profile-view/email-settings";
import { BirthdaySettings } from "../profile-view/birthday-settings";



export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [searchMovies, setSearchMovies] = useState(movies);

    const updateUser = (user) => {
        delete user.password;
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        
    }

    useEffect(() => {
        if(!token) {
            return;
        }

        fetch("https://myflixapi.herokuapp.com/movies", {
            headers: {Authorization: `Bearer ${token}` },
        })
        .then((response) => response.json())
        .then((movies) => {
            const moviesFromApi = movies.map((doc) => {
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

    useEffect(() => {
        setSearchMovies(movies);
    }, [movies]);


    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
                onSearch={(query) => {
                    setSearchMovies(movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase())));
                }}
            />
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
                        path="/users"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <ProfileView user={user} token={token} movies={movies} onLoggedOut={() => {
                                        setUser(null);
                                        setToken(null);
                                        localStorage.clear();
                                    }}updateUser={updateUser} />
                                )}
                            </>
                        }
                    />

                    <Route 
                        path="/users/settings/username"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <UsernameSettings user={user} token={token} movies=
                                    {movies} onLoggedOut={() => {
                                        setUser(null);
                                        setToken(null);
                                        localStorage.clear();
                                    }}updateUser={updateUser} />
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/users/settings/password"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <PasswordSettings user={user} token={token}
                                    updateUser={() => {
                                        setUser(null),
                                        setToken(null),
                                        localStorage.clear();
                                    }}
                                    />
                                )
                            }
                            </>
                        }
                    />

                    <Route 
                        path="/users/settings/email"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <EmailSettings user={user} token={token}
                                    updateUser={() => {
                                        setUser(null),
                                        setToken(null),
                                        localStorage.clear();
                                    }}
                                    />
                                )
                            } 
                            </>
                        }
                    />

                    <Route 
                        path="/users/settings/birthday"
                        element={
                            <>
                                {! user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <BirthdaySettings user={user} token={token}
                                    updateUser={() => {
                                        setUser(null),
                                        setToken(null),
                                        localStorage.clear();
                                    }}
                                    />
                                )
                            }
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
                                        <MovieView movies={movies} user={user} token={token} updateUser={updateUser} />
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
                                    <Col>The list is empty</Col>
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