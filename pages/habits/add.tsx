import React from "react";
import Container from "../../components/Container";
import Panel from "../../components/Panel";
import Heading1 from "../../components/Heading1";
import FormContainer from "../../components/FormContainer";

const Add = () => {
  return (
    <Container>
      <Panel>
        <FormContainer>
          <Heading1 className="text-center">Add habit</Heading1>
        </FormContainer>
      </Panel>
    </Container>
  );
};

export default Add;
