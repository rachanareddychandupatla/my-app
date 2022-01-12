import React, { useState, useMemo } from "react";
import { useTable } from "react-table";
import "./App.css";
import "./table.css";

const App = () => {
  const COLUMNS = [
    {
      key: "1",
      Header: "S.No",
    },
    {
      key: "2",
      Header: "Name",
      accessor: "name",
    },
    {
      key: "3",
      Header: "Project",
      accessor: "project",
    },
    {
      key: "4",
      Header: "Task",
      accessor: "taskDes",
    },
    {
      key: "5",
      Header: "Status",
      accessor: "status",
    },
    {
      key: "6",
      Header: "Start Date",
      accessor: "startDate",
    },
    {
      key: "7",
      Header: "End Date",
      accessor: "endDate",
    },
    {
      key: "8",
      Header: "Edit / Delete",
    },
  ];
  const initialValues = {
    name: "",
    email: "",
    mobileNumber: "",
    project: "",
    taskDes: "",
    startDate: "",
    endDate: "",
    status: "planned",
  };
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState(initialValues);
  const [editPerson, setEditPerson] = useState(initialValues);
  const [view, setView] = useState(false);
  const {
    name,
    email,
    mobileNumber,
    project,
    taskDes,
    startDate,
    endDate,
    status,
  } = person;
  const columns = useMemo(() => COLUMNS, []);
  const tableInstance = useTable({
    columns: columns,
    data: people,
  });

  const changeHandler = (e) => {
    let char = e.nativeEvent.data;
    switch (e.target.name) {
      case "name":
        if (
          (char >= "A" && char <= "Z") ||
          (char >= "a" && char <= "z") ||
          char === " " ||
          char === null
        ) {
          setPerson({ ...person, [e.target.name]: e.target.value });
        }
        break;
      case "mobileNumber":
        if (char >= "0" && char <= "9") {
          setPerson({ ...person, [e.target.name]: e.target.value });
        }
        break;
      case "project":
        if (
          (char >= "A" && char <= "Z") ||
          (char >= "a" && char <= "z") ||
          (char >= "0" && char <= "9") ||
          char === " " ||
          char === null
        ) {
          setPerson({ ...person, [e.target.name]: e.target.value });
        }
        break;
      default:
        setPerson({ ...person, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setPeople([...people, person]);
    setPerson(initialValues);
  };

  const removePerson = (rowId) => {
    const newPersons = people.filter((person, id) => rowId !== id);
    setPeople(newPersons);
  };
  return (
    <div>
      <center>
        <form onSubmit={submitHandler}>
          <h2>
            <u> To Do LIST</u>
          </h2>

          <div className="card">
            <div className="card-body">
              <input
                className="nameTextBox"
                type="text"
                name="name"
                placeholder="Enter Person Name (3-20 Chars only)"
                value={name}
                minLength={"3"}
                maxLength={"20"}
                onChange={changeHandler}
                required
              />{" "}
              <br />
              <input
                type="email"
                name="email"
                className="detailsTextBox"
                placeholder="Enter A Valid E-mail ID"
                value={email}
                onChange={changeHandler}
                required
              />{" "}
              &nbsp;
              <input
                type="integer"
                className="detailsTextBox"
                name="mobileNumber"
                placeholder="Enter A Valid Mobile Number"
                value={mobileNumber}
                minLength={"10"}
                maxLength={"10"}
                onChange={changeHandler}
                required
              />{" "}
              <br />
              <input
                className="nameTextBox"
                type="text"
                name="project"
                placeholder="Enter Project Name( 3-20 Chars and Numbers only)"
                minLength={"3"}
                maxLength={"20"}
                value={project}
                onChange={changeHandler}
                required
              />{" "}
              <br />
              <input
                className="nameTextBox"
                type="text"
                name="taskDes"
                value={taskDes}
                minLength={"3"}
                maxLength={"30"}
                placeholder="Enter Task Description( 3-30 Chars/Num/Spl Char also)"
                onChange={changeHandler}
                required
              />{" "}
              <br />
              <input
                type="Date"
                name="startDate"
                value={startDate}
                placeholder="Start Date dd/mm/yy"
                onChange={changeHandler}
                required
              />{" "}
              &nbsp;
              <input
                type="Date"
                name="endDate"
                value={endDate}
                min={startDate}
                placeholder="Target Date dd/mmyy"
                onChange={changeHandler}
                required
              />{" "}
              <br />
              <h3> Task status: </h3>
              <h5>
                <input
                  className="radio"
                  name="status"
                  type="radio"
                  value="planned"
                  checked={status === "planned"}
                  onChange={changeHandler}
                />
                Planned
              </h5>{" "}
              <h5>
                {" "}
                <input
                  className="radio"
                  name="status"
                  type="radio"
                  value="progress"
                  checked={status === "progress"}
                  onChange={changeHandler}
                />{" "}
                Inprogress{" "}
              </h5>{" "}
              <h5>
                {" "}
                <input
                  className="radio"
                  name="status"
                  type="radio"
                  value="done"
                  checked={status === "done"}
                  onChange={changeHandler}
                />{" "}
                Done{" "}
              </h5>
              <input className="save" type="submit" name="save" value="save" />{" "}
              &nbsp;
              <input
                className="view"
                type="button"
                name="view"
                value={view ? "hide" : "view"}
                onClick={() => setView(!view)}
              />
            </div>
          </div>
        </form>
        <BasicTable
          view={view}
          tableInstance={tableInstance}
          removePerson={removePerson}
          editPerson={editPerson}
          setEditPerson={setEditPerson}
          people={people}
          setPeople={setPeople}
        />
      </center>
    </div>
  );
};

function BasicTable({
  view,
  tableInstance,
  removePerson,
  editPerson,
  setEditPerson,
  people,
  setPeople,
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  const [edit, setEdit] = useState();
  const onSave = (rowId) => {
    let tempArray = [...people];
    tempArray[rowId] = editPerson;
    setPeople(tempArray);
    setEdit();
  };
  const onEdit = (rowId) => {
    setEditPerson(people[rowId]);
    setEdit(rowId);
  };
  const editHandler = (e) => {
    setEditPerson({ ...editPerson, [e.target.name]: e.target.value });
  };
  const nameMapping = {
    1: "name",
    2: "project",
    3: "taskDes",
    4: "status",
    5: "startDate",
    6: "endDate",
  };
  if (view && people.length > 0) {
    return (
      <article>
        <table id="table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, rowId) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, id) => {
                    if (id === 0) {
                      return <td>{rowId + 1}</td>;
                    } else if (id === 7) {
                      return rowId === edit ? (
                        <td>
                          <input
                            type="button"
                            value="Cancel"
                            onClick={() => setEdit()}
                          />{" "}
                          <input
                            type="button"
                            value="Save"
                            onClick={() => onSave(rowId)}
                          />{" "}
                        </td>
                      ) : (
                        <td>
                          <input
                            type="button"
                            value="Edit"
                            onClick={() => onEdit(rowId)}
                          />{" "}
                          <input
                            type="button"
                            value="Delete"
                            onClick={() => removePerson(rowId)}
                          />
                        </td>
                      );
                    } else {
                      return rowId === edit ? (
                        <td>
                          <input
                            type="text"
                            name={nameMapping[id]}
                            value={editPerson[nameMapping[id]]}
                            onChange={editHandler}
                          />
                        </td>
                      ) : (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </article>
    );
  }
  return <article />;
}

export default App;
