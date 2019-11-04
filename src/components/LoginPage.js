import React, { useRef, useState } from "react";
import { Card, Input, Icon, Button, Message } from "semantic-ui-react";
import styled from "styled-components";
import API from "../API";
import logo from "../assets/logo.png";

export default function LoginPage(props) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await API.login(
        emailRef.current.value,
        passwordRef.current.value
      );
      if (response.status === 403) {
        return setError("Username or Password is wrong");
      }
      props.history.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LoginPageBackground error={error}>
      <LoginModal id="login-modal" error={error}>
        <Logo src={logo} />
        {error && <Message error header={error} />}
        <section>
          <Input iconPosition="left" placeholder="Email" id="email">
            <Icon name="at" />
            <input ref={emailRef} />
          </Input>
          <Input
            iconPosition="left"
            placeholder="Password"
            id="password"
            type="password"
          >
            <Icon name="lock" />
            <input ref={passwordRef} />
          </Input>
          <Button primary onClick={handleLogin} id="login-button">
            Login
          </Button>
        </section>
      </LoginModal>
    </LoginPageBackground>
  );
}

const LoginPageBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(20, 189, 235);
  background: linear-gradient(
    90deg,
    rgba(20, 189, 235, 1) 7%,
    rgba(23, 104, 172, 1) 96%
  );
  & > #login-modal {
    max-height: ${({ error }) => (error ? "370px" : "340px")};
    min-height: ${({ error }) => (error ? "370px" : "330px")};
  }
`;

const LoginModal = styled(Card)`
  width: 35%;
  height: 30%;
  & > section {
    width: 80%;
    height: 70%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  & > section > #login-button {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

const Logo = styled.img`
  margin: 0 auto;
  width: 180px;
  height: 150px;
`;
