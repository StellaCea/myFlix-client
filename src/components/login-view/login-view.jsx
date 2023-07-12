import React, { useState } from "react";
import {Form, Button, Card, Container, Col, Row} from "react-bootstrap";

export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        //prevents from reloading the entire page
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch("https://myflixapi.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Login response:", data);
            if(data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
            } else {
                alert("No such user");
            }
        })
        .catch((e) => {
            alert("Something went wrong");
        });
    };
    return(
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
<<<<<<< HEAD
                            <Card.Title>Please Log in</Card.Title>
=======
                        <Card.Title>Please Log in</Card.Title>
>>>>>>> 0bfa21c25e04b2d57e29b09e9b1d1d8b7ec0daa3
                            <Form onSubmit={handleSubmit}>  
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username: </Form.Label>
                                    <Form.Control
<<<<<<< HEAD
                                        style={{backgroundColor:"white"}}
=======
>>>>>>> 0bfa21c25e04b2d57e29b09e9b1d1d8b7ec0daa3
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password:</Form.Label>
<<<<<<< HEAD
                                    <Form.Control
                                        style={{backgroundColor:"white"}}
=======
                                    <Form.Control 
>>>>>>> 0bfa21c25e04b2d57e29b09e9b1d1d8b7ec0daa3
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        
    );
};