const { Link } = ReactRouterDOM

export function BookPreview({ book }) {
  var currency='';
  switch (book.listPrice.currencyCode) {
    case 'EUR':
      currency = '€';
      break;
    case 'ILS':
      currency = '₪';
      break;
    case 'USD':
      currency = '$';
      break;
    case 'FREE':
      currency = 'FREE';
      break;
    case 'NOT_FOR_SALE':
      currency = 'NOT FOR SALE';
      break;
    default:
      currency = '';
  }
  return (
    <Link to={`/book/${book.id}`}>
      <div className="book-container flex column align-center">
        <img className="book-prev-img" src={book.thumbnail} alt="book-img" />
        <p className="book-prev-title">{book.title}</p>
        <p>{book.listPrice.amount !==0 && <span>{book.listPrice.amount}</span>}{currency}</p>
      </div>
    </Link>
  );
}
