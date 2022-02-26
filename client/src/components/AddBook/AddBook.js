import { useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../../queries/queries';


const AddBook = ({ getAuthorsQuery, addBookMutation, addBookMutationResult }) => {

  let { loading, authors } = getAuthorsQuery;

  const [book, setBook] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');

  const addBook = (e) => {
    e.preventDefault();
    addBookMutation({
      variables: {
        name: book,
        authorId: author,
        genre,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  }

  return (
    <div className="add-book my-5">
      <div className="row d-flex justify-content-start">
        <div className="card">
          <h2 className="card-title text-center m-4 mt-5">Add Book</h2>
          <div className="card-body p-5">
            <form onSubmit={addBook}>
              <div className="mb-3">
                <label htmlFor="book-name text-start text-left" className="form-label">Book Name: </label>
                <input
                  type="text"
                  name="book"
                  className="form-control"
                  id="book-name"
                  placeholder='Enter book name'
                  value={book}
                  onChange={ (e) => setBook(e.target.value) }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="genre" className="form-label">Genre: </label>
                <input
                  type="text"
                  name="genre" 
                  className="form-control"
                  id="genre"
                  placeholder='Enter genre for book'
                  value={genre}
                  onChange={ (e) => setGenre(e.target.value) }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="author">Author: </label>
                <select
                  name="author"
                  id="author"
                  className="form-control"
                  value={author}
                  onChange={ (e) => setAuthor(e.target.value) }
                  required
                >
                  <option value="" disabled>Select Author</option>
                  { !loading && authors.map((author) => {
                    return <option key={ author.id } value={ author.id }>{ author.name }</option>
                  }) }
                </select>
              </div>
              <div className="row d-flex justify-content-end my-4">
                <div className="col-auto">
                  <button type="submit" className='btn btn-outline-primary px-3 py-2'>Add Book</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" }),
)(AddBook);
