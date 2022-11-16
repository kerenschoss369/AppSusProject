const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

// BOOKS
import { BookPage } from "./js/apps/Books/pages/BookPage.jsx";
import { BookDetailsPage } from "./js/apps/Books/pages/BookDetailsPage.jsx";

// MAIN
import { HomePage } from "./js/pages/HomePage.jsx";
import { Navbar } from "./js/cmps/Navbar.jsx";

// NOTE
import { NotePage } from "./js/apps/Note/pages/NotePage.jsx";

//EMAIL
import { EmailApp } from "./js/apps/Email/pages/EmailApp.jsx";


const history = History.createBrowserHistory()

export class Appsus extends React.Component {
    render() {
        return (
            <Router>
                <div>
                <Navbar />
                    <main>
                        <Switch>
                            {/* BOOKS */}
                            <Route component={BookDetailsPage} path="/book/:bookId" />
                            <Route component={BookPage} path="/book" />

                            {/* NOTE */}
                            <Route component={NotePage} path="/note" />

                            {/* EMAIL */}
                            <Route component={EmailApp} path="/emails" />

                            {/* MAIN */}
                            <Route component={HomePage} path="/" />

                        </Switch>
                    </main>
                </div>
            </Router>
        )
    }
}

