const { Link } = ReactRouterDOM
import { LongTxt } from "../cmps/LongTxt.jsx";
import { AddReview } from "../cmps/AddReview.jsx";
import { ReviewList } from "../cmps/ReviewList.jsx";
import bookService from "../services/bookService.js";
import reviewService from "../services/reviewService.js";

export class BookDetailsPage extends React.Component {
    state = {
        book: null,
        nextBookId: 0,
        prevBookId: 0,
        readingType: '',
        isLongTxtShown: false,
        reviews: null
    };

    componentDidMount() {
        const bookId = this.props.match.params.bookId;
        bookService.getById(bookId).then((book) => {
            this.setState({ book });
        });
        bookService.getNextBookId(bookId).then((nextBookId) => {
            this.setState({ nextBookId });
        });
        bookService.getPrevBookId(bookId).then((prevBookId) => {
            this.setState({ prevBookId });
        });
        this.loadReviews();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            const bookId = this.props.match.params.bookId;
            bookService.getById(bookId).then((book) => {
                this.setState({ book });
            });
            bookService.getNextBookId(bookId).then((nextBookId) => {
                this.setState({ nextBookId });
            });
            bookService.getPrevBookId(bookId).then((prevBookId) => {
                this.setState({ prevBookId });
            });
            this.loadReviews();
        }
    }

    loadReviews() {
        reviewService.getReviewsByBookId(this.props.match.params.bookId).then((reviews) => {
            this.setState({ reviews });
        });
    }

    get currency() {
        const { book } = this.state;
        switch (book.listPrice.currencyCode) {
            case 'EUR':
                return '€';
            case 'ILS':
                return '₪';
            case 'USD':
                return '$';
            case 'FREE':
                return 'FREE';
            case 'NOT_FOR_SALE':
                return 'NOT FOR SALE';
            default:
                return '';
        }
    }

    get readingType() {
        const { book } = this.state;
        if (book.pageCount > 500)
            return '(Long Reading)';
        else if (book.pageCount > 200)
            return '(Decent Reading)';
        else if (book.pageCount < 500)
            return '(Light Reading)';
        else
            return '';

    }

    get bookType() {
        const { book } = this.state;
        var today = new Date();
        var year = today.getFullYear();
        if (year - book.publishedDate > 10) return '(Veteran Book)'
        else if (year - book.publishedDate < 1) return '(New!)'
    }


    get txtColor() {
        const { book } = this.state;
        if (book.listPrice.amount === 0) return '';
        if (book.listPrice.amount > 150) return 'red'
        else if (book.listPrice.amount < 20) return 'green'
        else return '';
    }

    onClickNext = () => {
        const { nextBookId } = this.state;
        bookService.getById(nextBookId).then((book) => {
            this.setState({ book });
        });
    }

    onClickPrev = () => {
        const { prevBookId } = this.state;
        bookService.getById(prevBookId).then((book) => {
            this.setState({ book });
        });
    }

    onClickToggle = () => {
        this.setState(prevState => ({ isLongTxtShown: !prevState.isLongTxtShown }));
    }

    onAddReview = (review) => {
        reviewService.addReview(this.props.match.params.bookId, review);
        this.loadReviews()
    }

    onRemoveReview = (reviewId) => {
        reviewService.removeReview(reviewId);
        this.loadReviews();
    }

    render() {
        const { book, nextBookId } = this.state;
        if (!book || !nextBookId) return "Loading...";
        return (
            <div>
                <div className="book container flex align-start">
                    <img className="book-img" src={book.thumbnail} alt="book-img" />
                    <div className="info-container flex column">
                        <div>
                            <h1>{book.title}</h1>
                            <p>{book.subtitle}</p>
                            <p>Authors: {book.authors}</p>
                        </div>
                        <div>
                            <p>Publish Date:{book.publishedDate} {this.bookType}</p>
                            <p>Page Count: {book.pageCount} {this.readingType}</p>
                        </div>
                        <div>
                            {(book.description) && <p>Description: {book.description.substring(0, 100)}</p>}
                            {(book.description) && (book.description.length > 100) && <LongTxt text={book.description} isLongTxtShown={this.state.isLongTxtShown} onClickToggle={this.onClickToggle} />}
                        </div>
                        <div>
                            <p>Categories:{book.categories}</p>
                            <p>Language:{book.language}</p>
                            <p className={this.txtColor}>{book.listPrice.amount !== 0 && <span>Price:{book.listPrice.amount}</span>}{this.currency}</p>
                            <p className={book.listPrice.isOnSale ? 'on-sale' : 'hidden'}>On Sale!</p>
                        </div>
                        <div>
                            <button className="filter-btn" onClick={() => {
                                this.props.history.push('/book')
                            }}>Go Back</button>
                        </div>
                    </div>
                    <div className="flex">
                        <Link to={`/book/${this.state.prevBookId}`}>
                            <button className="filter-btn prev-btn" onClick={this.onClickPrev}>&lt;</button>
                        </Link>
                        <Link to={`/book/${this.state.nextBookId}`}>
                            <button className="filter-btn" onClick={this.onClickNext}>&gt;</button>
                        </Link>
                    </div>
                </div>
                <div>
                    <AddReview onAddReview={this.onAddReview} />
                </div>
                <div className="reviews-container container">
                    <ReviewList reviews={this.state.reviews} onRemoveReview={this.onRemoveReview} />
                </div>
            </div>

        );
    }
}