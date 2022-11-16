import { eventBus } from "../services/eventBusService.js";
const { Link } = ReactRouterDOM

export class UserMsg extends React.Component {

    state = {
        book: null,
    }

    componentDidMount() {
        eventBus.on("show-msg", (book) => {
            this.setState({ book });
            setTimeout(()=>{this.setState({ book: null })}, 3000);
        });
    }

    render() {
        const book= this.state.book;
        if (!book) return '';
        return (
            <Link to={`/book/${book.id}`}>
            <div className="msg-container flex column">
                <h3 className="green">Success!</h3>
                <p>Book "{book.volumeInfo.title}" was added successfully</p>
            </div>
            </Link>
        );
    }
}