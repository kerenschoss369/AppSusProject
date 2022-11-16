import emailService from "../services/emailService.js";
import { EmailTools } from "../cmps/EmailTools.jsx"
import { EmailCompose } from "../cmps/EmailCompose.jsx";
import { EmailStatus } from "../cmps/EmailStatus.jsx";
import { EmailPage } from "./EmailPage.jsx";
import { EmailDetails } from "./EmailDetails.jsx";

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export class EmailApp extends React.Component {
    state = {
        emails: null,
        filterBy: {
            name: '',
            filter: 'inbox'
        },
        isComposeOpen: false,
    }

    componentDidMount() {
        this.loadEmails();
    }

    loadEmails() {
        emailService.query(this.state.filterBy).then((emails) => {
            this.setState({ emails });
        });
    }

    timeFromTimestamp = (timestamp) => {
        var time = new Date(timestamp);
        time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        return time;
    }

    onFilterEmails = (filter) => {
        this.setState((prevState) => ({ ...prevState, filterBy: { name: prevState.name, filter } }),
            () => {
                this.loadEmails();
            });

    }

    onToggleCompose = () => {
        this.setState((prevState) => ({ isComposeOpen: !prevState.isComposeOpen }));
    }

    onChangeStar = (email) => {
        email.isStarred = !email.isStarred;
        this.updateEmail(email);
    }

    onChangeDraft = (email) => {
        email.isDraft = !email.isDraft;
        this.updateEmail(email);
    }

    onChangeRead = (email, isDetailsOpen = false) => {
        if (isDetailsOpen && email.isRead) return;
        email.isRead = !email.isRead;
        this.updateEmail(email);
    }

    onReply=(emailId)=>{
        this.props.history.push(`/emails/compose/${emailId}`)
    }
    updateEmail = (email) => {
        emailService.updateEmail(email);
        this.loadEmails();
    }

    onAddEmail = (email) => {
        emailService.addEmail(email);
        this.loadEmails();
    }

    onRemoveEmail = (emailId) => {
        emailService.removeEmail(emailId);
        this.loadEmails();
        this.props.history.goBack();
    }

    calcPresentReaden() {
        return emailService.calcPresentReaden();
    }

    createFullDateFormat = (email) => {
        if (email && email.sendAt) {
            var date = new Date(email.sendAt);
            var fullDate = new Intl.DateTimeFormat('en-IL', { dateStyle: 'full', timeStyle: 'long' }).format(date);
            return fullDate;
        }
        else return '';
    }

    onChangeFilterName = (name) => {
        this.setState((prevState) => ({ ...prevState, filterBy: { ...prevState.filterBy, name } }),
            () => this.loadEmails()
        );
    }

    onCreateNoteFromEmail = (email) => {
        this.props.history.push(`/note?title=${email.subject}&txt=${email.body}`)
    }


    render() {
        const { emails } = this.state;
        if (!emails) return 'loading...'
        return (
            <Router>
                <div className="flex">
                    <section className="tools-status-container" >
                        <EmailTools filterBy={this.state.filterBy} onFilterEmails={this.onFilterEmails} onToggleCompose={this.onToggleCompose} />
                        <EmailStatus calcPresentReaden={this.calcPresentReaden} />
                    </section>
                    <main className="data-container">
                        <Switch>
                            <Route component={(props) => <EmailDetails path={props.match.params} history={props.history} onChangeStar={this.onChangeStar} onChangeRead={this.onChangeRead} createFullDateFormat={this.createFullDateFormat} onRemoveEmail={this.onRemoveEmail} onChangeDraft={this.onChangeDraft} onCreateNoteFromEmail={this.onCreateNoteFromEmail} onReply={this.onReply}/>} path="/emails/details/:emailId" />
                            <Route component={(props) => <EmailCompose props={props} history={props.history} onAddEmail={this.onAddEmail} />} path="/emails/compose/:emailId?" />
                            <Route component={() => <EmailPage emails={this.state.emails} timeFromTimestamp={this.timeFromTimestamp} onChangeStar={this.onChangeStar} onChangeRead={this.onChangeRead} filterBy={this.state.filterBy} onChangeFilterName={this.onChangeFilterName} filterBy={this.state.filterBy} />} path="/:emailFilter" />
                        </Switch>
                    </main>
                </div>
            </Router>
        )
    }
}

