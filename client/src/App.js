import './App.css';
import ApolloClient from 'apollo-boost';
import BookList from './components/BookList/BookList';
import { ApolloProvider } from 'react-apollo';
import AddBook from './components/AddBook/AddBook';

// apollo client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App" id="main">
        <div className="container-fluid">
        <div className="row d-flex justify-content-start">
          <div className="col-8">
            <BookList></BookList>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 col-sm-9 col-lg-4">
            <AddBook></AddBook>
          </div>
        </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
