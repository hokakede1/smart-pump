import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Card, Icon, Button, Image, Message } from "semantic-ui-react";
import API from "../API";
import Swal from "sweetalert2";

export default function Dashboard({ user, history }) {
  const [transactions, setTransactions] = useState([]);
  let mainContentStyle;
  let transactionWrapperStyle;
  const width = window.innerWidth;
  if (width > 800) {
    mainContentStyle = `
        display: flex;
        width: 95%;
        height: 90%;
        margin: 1.5rem auto 0px;
      `;
    transactionWrapperStyle = `
        background: white;
        flex: 2;
        margin-left: 1.5rem;
        border-radius: 4px;
    `;
  } else {
    mainContentStyle = `display: flex;
        margin-top: 1.5rem
        flex-direction: column;
        align-items: center;
      `;
    transactionWrapperStyle = `
        background: white;
        flex: 2;
        border-radius: 4px;
        width: 100%;
  `;
  }

  const MainContent = styled.main`
    ${mainContentStyle}
  `;

  const TransactionSection = styled.div`
    ${transactionWrapperStyle}
  `;

  useEffect(() => {
    (async () => {
      try {
        const { transactions } = await API.getTransactions();
        setTransactions(transactions);
      } catch (err) {}
    })();
  }, []);

  const UserCard = () =>
    user && (
      <CardWrapper>
        <Image src={user.picture} wrapped ui={false} />
        <Card.Content>
          <Card.Header>
            {user.name.first} {user.name.last}
          </Card.Header>
          <Card.Meta>
            <span className="date">Company: {user.company}</span>
          </Card.Meta>
          <Card.Description>Age: {user.age}</Card.Description>
          <Card.Description>Eye Color: {user.eyeColor}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <p>
            <Icon name="address book" />
            {user.address}
          </p>
          <p>
            <Icon name="phone" />
            {user.phone}
          </p>
          <p>
            <Icon name="mail" />
            {user.email}
          </p>
        </Card.Content>
      </CardWrapper>
    );

  const Transactions = () => {
    return transactions.map(transaction => {
      return (
        <Message
          header={transaction.name}
          content={`+ ${transaction.price}`}
          floating
        />
      );
    });
  };

  return (
    <DashboardWrapper>
      <NavBar>
        <Logo src={logo} />
        <Button
          style={{ background: "#003459", color: "white" }}
          content="Logout"
          icon="sign-out"
          labelPosition="left"
          onClick={() => {
            API.logout();
            history.push("/login");
          }}
        />
      </NavBar>
      <MainContent>
        <UserCard />
        <TransactionSection>
          <BalanceWrapper>
            <h1>Balance: {user.balance}</h1>

            <PayButton
              onClick={() => {
                Swal.fire(
                  "Payment Successful",
                  "Thank you for your payment",
                  "success"
                );
              }}
              positive
            >
              Pay
            </PayButton>
          </BalanceWrapper>
          <>
            <h2>Transactions: </h2>
            <Transactions />
          </>
        </TransactionSection>
      </MainContent>
    </DashboardWrapper>
  );
}

const DashboardWrapper = styled.div`
  height: 100vh;
  background: rgb(20, 189, 235);
  background: linear-gradient(
    90deg,
    rgba(20, 189, 235, 1) 7%,
    rgba(23, 104, 172, 1) 96%
  );
  overflow: auto;
`;

const NavBar = styled.nav`
  height: 4rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 6px 24px -1px rgba(0, 0, 0, 0.41);
`;

const Logo = styled.img`
  width: 70px;
  height: 50px;
`;

const CardWrapper = styled(Card)`
  height: 515px;
`;

const BalanceWrapper = styled.div`
  height: 7rem;
  position: relative;
  text-align: center;
  border-bottom: 1px solid gray;
`;

const PayButton = styled(Button)`
  position: absolute;
  right: 30px;
  bottom: 10px;
`;
