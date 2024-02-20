import React, { Fragment, useState } from "react";

const InputBook = () => {
    const [book, setBook] = useState({
        title: "",
        author: "",
        sub: "",
        pub_date: ""
    });

    const { title, author, sub, pub_date } = book;

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = JSON.stringify(book);
            const response = await fetch("http://localhost:5000/Book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body
            });
            console.log(response);
            window.location.reload(); // Reload the page after adding a book
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setBook(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5">Add Book</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Author"
                    name="author"
                    value={author}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    name="sub"
                    value={sub}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    className="form-control"
                    placeholder="Publish Date"
                    name="pub_date"
                    value={pub_date}
                    onChange={handleChange}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
};

export default InputBook;
{/* <td><EditBook book={book} /></td> */}
                            {/* <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteBook(book.id)}
                                >
                                    Delete
                                </button>
                            </td> */}
// Delete book
    // const deleteBook = async id => {
    //     try {
    //         await fetch(`http://localhost:5000/Book/${id}`, {
    //             method: "DELETE"
    //         });
    //         getBooks(); // Refresh the list after deletion
    //     } catch (error) {
    //         console.error(error.message);
    //     }
    // };

    // Fetch all books