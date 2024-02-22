import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './hello.css';

const ListBooks = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10);

    // Fetch all books
    const getBooks = async () => {
        try {
            const response = await axios.get("https://library-management-system-9vhg.onrender.com/book");
            setBooks(response.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    // Load books on component mount
    useEffect(() => {
        getBooks();
    }, []);

    // Get current books
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Filter books based on search term
    const filteredBooks = currentBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Fragment>
            <div className="container mt-5">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Title"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6 text-right">
                        <Link to="/InputBook" className="btn btn-primary">Add Book</Link>
                    </div>
                </div>
                <h1 className="text-center mb-4">List Of Books</h1>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Subject</th>
                                <th>Publish Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.map(book => (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.sub}</td>
                                    <td>{book.pub_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
<nav className="d-flex justify-content-center">
    <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link btn btn-primary" onClick={() => paginate(currentPage - 1)}>Previous</button>
        </li>
        <li className="page-item disabled">
            <span className="page-link">Page {currentPage}</span>
        </li>
        <li className={`page-item ${books.length <= indexOfLastBook ? 'disabled' : ''}`}>
            <button className="page-link btn btn-secondary" onClick={() => paginate(currentPage + 1)}>Next</button>
        </li>
    </ul>
</nav>

            </div>
        </Fragment>
    );
};

export default ListBooks;
