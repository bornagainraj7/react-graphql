import { graphql } from 'react-apollo';
import { getSingleBookQuery } from '../../queries/queries';

const BookDetails = ({ bookId, data: { book, loading } }) => {

  const displayBookDetails = () => {
    if (book) {
      return (
        <div>
          <h2>{ book.name }</h2>
          <h4>{ book.genre }</h4>
          <h5>{ book.author.name }</h5>
          <h5>Other Books by { book.author.name }:</h5>
          <ul className="other-books">
            { book.author.books.map((item) => {
              return <li className='fw-600 fs-16' key={item.id}>{ item.name }</li> 
            }) }
          </ul>
        </div>
      )
    } else {
      return (
        <div>
          <h3>No book selected</h3>
        </div>
      )
    }
  };

  return (
    <div className="book-details m-4">
      { displayBookDetails() }
    </div>
  );
}
 
export default graphql(getSingleBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId,
      }
    }
  }
})(BookDetails);