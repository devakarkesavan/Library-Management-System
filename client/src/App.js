import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputBook from "./Components/InputBook";
import ListBooks from "./Components/ListBooks";

function App() {
  return (
    <Router>
      <Fragment>
        <div className='container'>
        <h1 className="text-center text-info">Library Management System</h1>
          <Routes>
            <Route exact path="/" element={<ListBooks />} />
            <Route path="/InputBook" element={<InputBook />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
