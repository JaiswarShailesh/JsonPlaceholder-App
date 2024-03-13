import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const getData = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    setUserData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sr.No</th>
          <th>Name</th>
          <th>View Posts</th>
          <th>View Albums</th>
          <th>View Tasks</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((data) => (
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>
              <Link
                to={`/posts/${data.id}`}
                className="text-white text-decoration-none"
              >
                <Button variant="primary" size="sm">
                  Posts
                </Button>
              </Link>
            </td>
            <td>
              <Link
                to={`/albums/${data.id}`}
                className="text-white text-decoration-none"
              >
                <Button variant="success" size="sm">
                  Albums
                </Button>
              </Link>
            </td>
            <td>
              <Link
                to={`/todos/${data.id}`}
                className="text-white text-decoration-none"
              >
                <Button variant="secondary" size="sm">
                  TODOS
                </Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Dashboard;
