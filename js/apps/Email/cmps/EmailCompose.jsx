import emailService from "../services/emailService.js"
import utilService from "../../../services/utilService.js";

export class EmailCompose extends React.Component {

    state = {
        email: {
            to: '',
            cc: '',
            bcc: '',
            subject: '',
            body: '',
        }
    }

    componentDidMount() {
        const { props } = this.props;
        const data = props.location.search;
        if (data) this.organizeData(data);
        const emailId = props.match.params.emailId;
        if (emailId) {
            this.createEmailToShow(emailId)
        }
    }

    createEmailToShow = (emailId) => {
        emailService.getById(emailId).then((email) => {
            this.setState({
                email: {
                    to: email.sender.address,
                    cc: email.others.cc,
                    bcc: email.others.bcc,
                    subject: email.subject,
                    body: 'Re: ' + email.body,
                }
            });
        });
    }

    organizeData = (data) => {
        var preSubject = data.substring(data.indexOf('=') + 1, data.indexOf('&'));
        var subject = this.organizeQueryString(preSubject);
        data = data.substring(data.indexOf('&') + 1, data.length);
        var preBody = data.substring(data.indexOf('=') + 1, data.length);
        var body = this.organizeQueryString(preBody);
        this.setState((prevState) => ({
            email: { ...prevState.email, body, subject },
        }));
    }

    organizeQueryString = (str) => {
        str = str.split('%20');
        var txt = ''
        str.forEach(word => {
            txt += word + ' ';
        });
        return txt;
    }

    handleChange = ({ target }) => {
        this.setState((prevState) => ({
            email: { ...prevState.email, [target.name]: target.value },
        }));
    };

    onAddEmail = (ev, isDraft = false) => {
        ev.preventDefault();
        const { to, cc, bcc, subject, body } = this.state.email;
        var { onAddEmail, history } = this.props;
        const email = {
            id: utilService.makeId(10),
            sender: {
                name: 'You',
                address: 'me@appsus.com'
            },
            reciver: {
                name: to.substring(0, to.indexOf('@')),
                address: to,
            },
            others: {
                cc: cc ? cc.split(';') : '',
                bcc: bcc ? bcc.split(';') : '',
            },
            subject,
            body,
            isRead: false,
            sendAt: Date.now(),
            isStarred: false,
            isDraft,
        }
        onAddEmail(email);
        history.push('/emails/inbox')
    }

    render() {
        const { email } = this.state;
        return (
            <div className="compose-container">
                <section className="compose-title flex align-center space-between">
                    <h3>New Message</h3>
                    <button onClick={(ev) => this.onAddEmail(ev, true)}>x</button>
                </section>
                <form onSubmit={(ev) => this.onAddEmail(ev)}>
                    <section className="flex column" >
                        <input type="text" onChange={this.handleChange} value={email.to ? email.to : ''} name="to" placeholder="To:" />
                        <input type="text" onChange={this.handleChange} value={email.cc ? email.cc : ''} name="cc" placeholder="Cc:" />
                        <input type="text" onChange={this.handleChange} value={email.bcc ? email.bcc : ''} name="bcc" placeholder="Bcc:" />
                        <input type="text" onChange={this.handleChange} value={email.subject ? email.subject : ''} name="subject" placeholder="subject:" />
                        <textarea onChange={this.handleChange} value={email.body ? email.body : ''} name="body" cols="40" rows="6" />
                    </section>
                    <section>
                        <button className="add-email-btn">Send</button>
                    </section>
                </form>
            </div>
        )
    }
}