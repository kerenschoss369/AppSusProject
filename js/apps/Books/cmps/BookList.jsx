import utilService from "../../../services/utilService.js";
import bookService from "../services/bookService.js";
import { eventBus } from "../../../services/eventBusService.js";
import { BookFilter } from "./BookFilter.jsx";
import { BookPreview } from "./BookPreview.jsx";

export class BookList extends React.Component {
  state = {
    books: null,
    filterBy: null,
  };

  componentDidMount() {
    this.loadBooks();
    eventBus.on("new-book", (book) => {
      this.setState({ book });
    });
  }

  loadBooks() {
    bookService.query(this.state.filterBy).then((books) => {
      this.setState({ books });
    });
  }

  onFilterBooks = (filterBy) => {
    this.setState(
      (prevState) => ({ ...prevState, filterBy }),
      () => {
        this.loadBooks();
      }
    );
  };

  render() {
    if (!this.state.books) return "Loading...";
    return (
      <main className="main-container container">
        <BookFilter onFilterBooks={this.onFilterBooks} />
        <div className="books-container flex wrap justify-center">
          {this.state.books.map((book) => (
            <BookPreview book={book} key={utilService.makeId(10)} />
          ))}
        </div>
      </main>
    )
  }
}