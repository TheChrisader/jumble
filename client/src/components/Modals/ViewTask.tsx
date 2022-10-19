import React from "react";
import styled from "styled-components";
import Checkbox from "../shared/Checkbox";
import DropDown from "../shared/DropDown";
import Select from "../shared/Select";

const ViewTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const TaskTitle = styled.h1`
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 25px;
  color: ${(props) => props.theme.colors.main.primary.default};
`;

const TaskDescription = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 400;
  margin-bottom: 30px;
`;

const Heading = styled.h3`
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 10px;
`;

const CheckboxContainer = styled.div`
  margin-bottom: 30px;
`;

const ViewTask = () => {
  const [status, setStatus] = React.useState("g");
  return (
    <ViewTaskContainer>
      <TitleContainer>
        <TaskTitle>View Task</TaskTitle>
        <DropDown />
      </TitleContainer>
      <TaskDescription>
        No description Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quas ratione, quisquam id odio ad tenetur officiis dignissimos, fugiat
        recusandae consectetur earum itaque suscipit cupiditate nisi, aspernatur
        facere modi obcaecati nobis!
      </TaskDescription>
      <Heading>Subtasks (0 of 2)</Heading>
      <CheckboxContainer>
        <Checkbox checked>First SubTask</Checkbox>
        <Checkbox>Second SubTask</Checkbox>
      </CheckboxContainer>
      <Heading>Current Status</Heading>
      <Select
        options={["wring", "status", "jumbo", "one more thing onto it"]}
        status={status}
        setStatus={setStatus}
      />
    </ViewTaskContainer>
  );
};

export default ViewTask;
