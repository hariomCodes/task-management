import React from "react";
import { Form, Link } from "react-router-dom";

const Navbar = ({ userName }) => {
  return (
    <nav className="bg-gray-800 flex justify-center justify-between">
      <ul className="flex justify-start px-4 py-2">
        <li className="mr-2">
          <Link to="/" className="text-white">
            Home
          </Link>
        </li>

        {!!userName ? (
          <>
            <li className="mr-2">
              <Link to="dashboard" className="text-white">
                Dashboard
              </Link>
            </li>
            <li className="mr-2">
              <Form method="POST" action="/auth/logout">
                <button type="submit" className="text-white ">
                  Logout
                </button>
              </Form>
            </li>
          </>
        ) : (
          <>
            <li className="mr-2">
              <Link to="auth/signup" className="text-white">
                Signup
              </Link>
            </li>
            <li className="mr-2">
              <Link to="auth/login" className="text-white">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
      <ul className="px-4 py-2">
        <li className="text-white mr-2">
          {userName ? `Welcome, ${userName}` : ""}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
