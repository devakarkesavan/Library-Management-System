import React, { Fragment, useState } from "react";

const EditBook = ({ book }) => {
    const [editedBook, setEditedBook] = useState({
        title: book.title,
        author: book.author,
        sub: book.sub,
        pub_date: book.pub_date
    });

    const { title, author, sub, pub_date } = editedBook;

    const updateBook = async () => {
        try {
            const response = await fetch(`http://localhost:5000/Book/${book.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedBook)
            });
            console.log(response);
            window.location.reload(); // Reload the page after updating book details
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#editBookModal${book.id}`}>
                Edit
            </button>

            <div className="modal" id={`editBookModal${book.id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Book</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <label htmlFor="editTitle">Title:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="editTitle"
                                value={title}
                                onChange={e => setEditedBook({ ...editedBook, title: e.target.value })}
                            />
                            <label htmlFor="editAuthor">Author:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="editAuthor"
                                value={author}
                                onChange={e => setEditedBook({ ...editedBook, author: e.target.value })}
                            />
                            <label htmlFor="editSub">Subject:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="editSub"
                                value={sub}
                                onChange={e => setEditedBook({ ...editedBook, sub: e.target.value })}
                            />
                            <label htmlFor="editPubDate">Publish Date:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="editPubDate"
                                value={pub_date}
                                onChange={e => setEditedBook({ ...editedBook, pub_date: e.target.value })}
                            />
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" onClick={updateBook}>Save Changes</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditBook;
