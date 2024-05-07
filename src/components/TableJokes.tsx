import { useState, useEffect, createContext, useContext } from "react";
import styled from "styled-components";
import { FiChevronUp, FiChevronDown, FiTrash } from "react-icons/fi";
import { capitalizeFirstLetter, columnName } from "../utils";
import { JokesData, JokesContextType } from "../types";
import { FormJokes } from "./FormJokes";
import {
  BUTTON_DELETE,
  BUTTON_REFRESH,
  MESSAGE_ACTIONS,
  MESSAGE_API_ERROR,
  MESSAGE_ERROR_CONTEXT,
} from "../constants";
import { fetchData } from "../api";

const TableContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #ccc;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  text-align: center;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
`;

const RefreshButton = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  background-color: ${({ disabled }) => (!disabled ? "#4caf50" : "gray")};
  cursor: ${({ disabled }) => (!disabled ? "pointer" : null)};
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 5px;
`;

export const JokesContext = createContext<JokesContextType | undefined>(
  undefined
);

// Custom hook to get the context
export const useJokes = () => {
  const context = useContext(JokesContext);
  if (!context) {
    throw new Error(MESSAGE_ERROR_CONTEXT);
  }
  return context;
};

//Main component
export const TableJokes = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<JokesData[]>([]);
  const [sortedColumn, setSortedColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchDataAndUpdateState = async () => {
    try {
      setError(false);
      setLoading(true);
      const newData = await fetchData();
      setData(newData);
      setLoading(false);
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchDataAndUpdateState();
  }, []);

  const handleSort = (columnName: string) => {
    if (columnName === sortedColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(columnName);
      setSortOrder("asc");
    }
  };

  const handleDeleteRow = (id: number) => {
    const updatedData = data.filter((row) => row.id !== id);
    setData(updatedData);
  };

  const sortedData = sortedColumn
    ? [...data].sort((a: JokesData, b: JokesData) => {
        if (sortOrder === "asc") {
          return (a[sortedColumn as keyof JokesData] as string) >
            (b[sortedColumn as keyof JokesData] as string)
            ? 1
            : -1;
        } else {
          return (a[sortedColumn as keyof JokesData] as string) <
            (b[sortedColumn as keyof JokesData] as string)
            ? 1
            : -1;
        }
      })
    : data;

  const renderSortIcon = (columnName: string) => {
    if (columnName === sortedColumn) {
      return sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />;
    }
    return null;
  };

  return (
    <JokesContext.Provider value={{ data, setData }}>
      {error ? <ErrorMessage> {MESSAGE_API_ERROR}</ErrorMessage> : ""}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columnName.map((col) => (
                <TableHeader
                  onClick={() => handleSort(col)}
                  key={col}
                  aria-label={capitalizeFirstLetter(col)}
                >
                  {capitalizeFirstLetter(col)}
                  {renderSortIcon(col)}
                </TableHeader>
              ))}
              <TableHeader> {MESSAGE_ACTIONS}</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {sortedData?.map((row) => (
              <TableRow key={row.id} data-testid="jokes-row">
                {columnName.map((col) => (
                  <TableCell aria-label="{row[col]}">
                    {row[col as keyof typeof row] as string}
                  </TableCell>
                ))}
                <TableCell>
                  <DeleteButton
                    onClick={() => handleDeleteRow(row.id)}
                    aria-label={BUTTON_DELETE}
                    title={BUTTON_DELETE}
                  >
                    <FiTrash />
                  </DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
        <RefreshButton
          onClick={fetchDataAndUpdateState}
          disabled={loading}
          aria-label={BUTTON_REFRESH}
          data-testid="Refresh"
        >
          {BUTTON_REFRESH}
        </RefreshButton>
        <FormJokes columnName={columnName} />
      </TableContainer>
    </JokesContext.Provider>
  );
};

export default TableJokes;
