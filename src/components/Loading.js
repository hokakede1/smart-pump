import React from "react";
import { Loader } from "semantic-ui-react";
import styled from "styled-components";

const Loading = ({ text }) => (
  <LoadingPage>
    <Loader active inline="centered" size="massive">
      {text}
    </Loader>
  </LoadingPage>
);

const LoadingPage = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
`;

export default Loading;
