import { BookAddPreview } from "./BookAddPreview.jsx";
import bookService from "../services/bookService.js";


export class BookAdd extends React.Component {
    state = {
        items: null,

    }

    onSearchBook = ({ target }) => {
        if (!target.value) {
            this.setState({ items: null })
            return;
        }
        return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${target.value}`)
            .then(res => { return res.data })
            .then(resData => { return resData.items })
            .then(items => { this.setState({ items }) })
    }

    render() {
        return (
            <div className="book-add-container container flex column">
                <input className="filter-input blue" onChange={this.onSearchBook} type="text" placeholder="Search any book that you want to add..." />
                {
                    this.state.items &&

                    <div className="results-container flex column justify-center">
                        {this.state.items.map((item) => (
                            <BookAddPreview item={item} key={item.id} addGoogleBook={bookService.addGoogleBook} />
                        ))}
                    </div>
                }
            </div>
        )
    }
}