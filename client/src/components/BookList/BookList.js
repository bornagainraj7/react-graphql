import { useState } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../../queries/queries';
import BookDetails from '../BookDetails/BookDetails';


const BookList = ({ data: { books: bookList, loading } }) => {

  const [bookId, setBookId] = useState(null);

  const displayBooks = () => {
    if (loading) {
      return (
        <div>Loading Books...</div>
      );
    } else {
      return bookList.map((book) => {
        return (
          <button key={book.id} onClick={ () => setBookId(book.id) } type='button' className='btn btn-outline-danger m-3'>
            {book.name}
          </button>
        );
      });
    }
  };

  // const showSingleBook = (id) => {
  //   console.log(id);
  // }

  return (
    <div>
      <div className="book-list m-3">
        { displayBooks() }
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-9">
          <BookDetails className="m-3" bookId={ bookId }></BookDetails>
        </div>
      </div>
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);