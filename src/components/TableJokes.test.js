import { fireEvent, render, screen } from "@testing-library/react";
import TableJokes from "./TableJokes";
import * as api from "../api";

test("renders Refresh button", () => {
  render(<TableJokes />);
  const refreshButton = screen.getByTestId("Refresh");
  expect(refreshButton).toBeInTheDocument();
});

test("fetchData executed", () => {
  const spyFetchData = jest.spyOn(api, "fetchData");
  render(<TableJokes />);
  expect(spyFetchData).toHaveBeenCalledTimes(1);
  spyFetchData.mockRestore();
});

test("add empty fields", () => {
  render(<TableJokes />);
  expect(screen.queryByTestId("error-add")).not.toBeInTheDocument();
  const addButon = screen.getByTestId("add");
  expect(addButon).toBeInTheDocument();
  fireEvent.click(addButon);
  expect(screen.getByTestId("error-add")).toBeInTheDocument();
});
