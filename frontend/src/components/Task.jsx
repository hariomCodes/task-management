import React, { useState } from "react";
import { Form } from "react-router-dom";

const Task = ({ id, status, title, description, user_id }) => {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedStatus, setEditedStatus] = useState(status);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = (e) => {
    // Perform save operation here, e.g. update the task in the database
    // setEditing(false);
    // You can also pass the edited values to a parent component for further processing
  };

  const statusText =
    status === "todo"
      ? "Todo"
      : status === "progress"
      ? "In Progress"
      : "Completed";

  const showInfoTree = (
    <div className="border p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <p className="mb-2">{description}</p>
      <p>Status: {statusText}</p>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleEdit}
        >
          Edit
        </button>
        <Form method="DELETE" action={`delete/${id}`}>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
            Delete
          </button>
        </Form>
      </div>
    </div>
  );

  const editInfoTree = (
    <div className="border p-4 mb-4">
      <Form method="POST" action={`edit/${id}`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">
            <input
              type="text"
              value={editedTitle}
              name="title"
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </h3>
        </div>
        <p className="mb-2">
          <textarea
            value={editedDescription}
            name="description"
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        </p>
        <div className="mb-2">
          <label className="mr-2">Status:</label>
          <select
            value={editedStatus}
            name="status"
            onChange={(e) => setEditedStatus(e.target.value)}
          >
            <option value="todo">Todo</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );

  return editing ? editInfoTree : showInfoTree;
};

export default Task;
