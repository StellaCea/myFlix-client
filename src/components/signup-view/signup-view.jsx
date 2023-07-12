import React from "react";
import { useState } from "react";
<<<<<<< HEAD
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
=======
import { Container, Row, Form, Col, Card, Button } from "react-bootstrap";
>>>>>>> 0bfa21c25e04b2d57e29b09e9b1d1d8b7ec0daa3

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://myflixapi.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert ("Signup successful");
                window.location.replace("/login");
            } else {
                alert ("Signup failed");
            }
        });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
<<<<<<< HEAD
                        <Card.Body>
                            <Card.Title>Please Register</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        style={{backgroundColor:"white"}}
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        minLength="3"
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control 
                                        style={{backgroundColor:"white"}}
                                        type="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        style={{backgroundColor:"white"}}
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBirthday">
                                    <Form.Label>Birthday:</Form.Label> 
                                    <Form.Control 
                                        style={{backgroundColor:"white"}}
                                        type="date" 
                                        value={birthday}
                                        onChange={(e) => setBirthday (e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">Submit</Button>
                            </Form>
                        </Card.Body>
=======
                        <Card.Title>Please Register</Card.Title>
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
                            <Button variant="promary" type="submit">Submit</Button>
                        </Form>
>>>>>>> 0bfa21c25e04b2d57e29b09e9b1d1d8b7ec0daa3
                    </Card>
                </Col>
            </Row>
        </Container>

    )
}