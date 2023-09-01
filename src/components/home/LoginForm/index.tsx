
"use client";
import { ChangeEvent, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [isInvalid, setIsInvalid] = useState(false);
    const router = useRouter();

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setIsInvalid(false);
    };

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(email)) {
            router.push("/quiz");
        } else {
            setIsInvalid(true);
        }
    };

    return (
        <Form className={styles.loginForm} onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    size="lg"
                    placeholder="name@example.com"
                    isInvalid={isInvalid}
                    value={email}
                    onChange={handleEmail}
                />
                <Form.Control.Feedback type={isInvalid ? "invalid" : "valid"}>
                    Please Enter Valid Email
                </Form.Control.Feedback>
            </Form.Group>
            <Button size="lg" type="submit" variant="danger">
                Submit
            </Button>
        </Form>
    );
};

export default LoginForm;
