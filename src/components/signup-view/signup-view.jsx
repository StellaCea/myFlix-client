import React from "react";
import { useState } from "react";
import { Container, Row, Form, Col, Card, Button } from "react-bootstrap";

export const SignupView = () => {
    const [username, setusername] = useState("");
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
                window.location.reload();
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
                    </Card>
                </Col>
            </Row>
        </Container>

    )
}