import React, {useEffect, useState} from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({user, token, movies, onLoggedOut, onUpdateUser}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const favoriteMovies = movies.filter((movie) => {
        m => user.favoriteMovies.includes(m.id)
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };
            fetch(`https://myflixapi.herokuapp.com/users/${user.username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                return response.json;
            } else {
                alert ("Changing userdata failed");
                return false;
            }
        })
        .then(user => {
            if(user) {
                alert("Successfully changed userdata");
                onUpdateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    //Allow user to deregister
    const deleteAccount = () => {
        console.log("deleting")
        fetch(`https://myflixapi.herokuapp.com/users/${user.username}`,{
            method: "DELETE",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if(response.ok) {
                alert("Your account has been deleted");
                onLoggedOut();
            }else {
                alert("Deleting account has failed");
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    return (
        <>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Your info</Card.Title>
                        <p>Username: {user.Username}</p>
                        <p>Email: {user.Email}</p>
                        <p>Birthday: {user.Birthday}</p>
                    </Card.Body>
                </Card>
                <Button variant="danger" onClick={() => {
                    if (confirm ("Are you sure?")) {
                        deleteAccount();
                    }
                }}>Delete account</Button>
            </Col>

            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Update your info</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(e) => setusername(e.target.value)}
                                    required
                                    minLength="3"
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formBirthday">
                                <Form.Label>Birthday:</Form.Label> 
                                <Form.Control 
                                    type="date" 
                                    value={birthday}
                                    onChange={(e) => setBirthday (e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>

            <Col>
                <h3>Your favorite movies</h3>
            </Col>
            {favoriteMovies.map(movie => (
                <Col key={movie.id}>
                    <MovieCard movie={movie} />
                </Col>
            ))}
        </>
    );
}