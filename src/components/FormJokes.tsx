import { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { capitalizeFirstLetter } from "../utils";
import { FormJokesInfo } from "../types";
import { useJokes } from "./TableJokes";
import { BUTTON_ADD, MESSAGE_FIELDS_EMPY } from "../constants";

const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  background-color: #ccc;
  padding: 5px;
`;

const FormInput = styled.input`
  flex: 1;
  padding: 8px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const FormButton = styled.button`
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: right;
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 5px;
`;

export const FormJokes = ({ columnName }: FormJokesInfo) => {
  const [formData, setFormData] = useState({
    type: "",
    setup: "",
    punchline: "",
  });
  const [errorForm, setErrorForm] = useState(false);
  const { data, setData } = useJokes();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorForm(false);
    if (
      Object.values(formData)
        .slice(1)
        .some((value) => !value.trim())
    ) {
      setErrorForm(true);
      return;
    }
    const newRow = {
      ...formData,
      id: Math.floor(Math.random() * 1000), // Generate a random id for the new row
    };
    setData([...data, newRow]);
    setFormData({
      type: "",
      setup: "",
      punchline: "",
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {columnName.slice(1).map((col) => (
        <FormInput
          key={col}
          type="text"
          name={col}
          value={formData[col as keyof typeof formData] as string}
          placeholder={capitalizeFirstLetter(col)}
          onChange={handleChange}
        />
      ))}
      <FormButton type="submit" aria-label={BUTTON_ADD} data-testid="add">
        {BUTTON_ADD}
      </FormButton>
      {errorForm ? (
        <ErrorMessage data-testid="error-add">
          {MESSAGE_FIELDS_EMPY}
        </ErrorMessage>
      ) : (
        ""
      )}
    </Form>
  );
};
