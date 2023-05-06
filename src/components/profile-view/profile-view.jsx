
import React, {useEffect, useState} from "react";
import { Row, Button, Card, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({user, token, favoriteMovies, favoriteMovieList}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: user.username,
            Password: user.password,
            Email: user.email,
            Birthday: user.birthday
        }


        fetch("https://myflixapi.herokuapp.com/users/${user.Username}", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/JSON",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            }else{
                alert("Failed to change data");
                return false;
            }
        })
        .then(user => {
            if(user) {
                alert("Data changed successfully");
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    const deleteAccount = () => {
        fetch("https://myflixapi.herokuapp.com/users/${user.Username}", {
            method: "DELETE",
            headers: {Authorization: `Bearer ${token}`}
        })
        .then (response => {
            if(response.ok) {
                alert("Account has been deleted!");
                onLoggedOut();
            } else {
                alert("Can not delete account");
            }
        })
        .catch(e => {
            alert(e);
        })
    }

    return (
        <>
            
            <Row>
                <Col sm={{offset: 2}} md={{offset: 1}}>
                    <Card className="mt-2 mb-3">
                        <Card.Body>
                            <Card.Title>
                                <h3>Your information</h3></Card.Title>
                            <Col>
                                <p >Username: {user.Username}</p>
                            </Col>
                            
                            <Col sm={{offset: 2}} md={{offset: 8}}>
                                <Link to={`/users/settings/username`}>Change username</Link>
                            </Col>
                            <p>Password: ********</p>
                            <Col sm={{offset: 2}} md={{offset: 8}}>
                                <Link to={`/users/settings/password`}>Change password</Link>
                            </Col>
                            <p>E-mail: {user.Email}</p>
                            <Col sm={{offset: 2}} md={{offset: 8}}>
                                <Link to={`/users/settings/email`}>Change email</Link>
                            </Col>
                            <p>Birthday: {user.Birthday}</p>
                            <Col sm={{offset: 2}} md={{offset: 8}}>
                                <Link to={`/users/settings/birthday`}>Change birthday</Link>
                            </Col>
                            <Button variant="danger" className="centered" onClick={() => {
                        if(confirm("Are you sure?")) {
                            deleteAccount();
                        }
                    }}>Delete account</Button>
                        </Card.Body>
                    </Card>
                    
                </Col>
                <Col md={12}>
                    <h3>Your favorite movies:</h3>
                </Col>
            </Row>
            
        </>
    );

}
