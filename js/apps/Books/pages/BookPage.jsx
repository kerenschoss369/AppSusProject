import { BookList } from "../cmps/BookList.jsx";
import { BookAdd } from "../cmps/BookAdd.jsx";
import { UserMsg } from "../../../cmps/UserMsg.jsx";


export class BookPage extends React.Component {
    render() {
        return (
            <main>
                {/* <h1 className="main-title">Books</h1> */}
                <BookAdd/>
                <BookList/>
                <UserMsg/>
            </main>
        )
    }
}
