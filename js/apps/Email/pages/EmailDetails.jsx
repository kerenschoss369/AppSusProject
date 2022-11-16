import emailService from "../services/emailService.js"

export class EmailDetails extends React.Component {

    state = {
        email: null,
        fullDate: null,
    }

    componentDidMount() {
        const emailId = this.props.path.emailId;
        emailService.getById(emailId).then((email) => {
            this.setState({ email });
            var fullDate = this.props.createFullDateFormat(email);
            this.setState({ fullDate });
        });

    }

    onRemoveEmail = (emailId) => {
        const { onRemoveEmail } = this.props;
        onRemoveEmail(emailId);
    }

    render() {
        const { onChangeStar, onChangeRead, onChangeDraft, onCreateNoteFromEmail, onReply } = this.props;
        const { email, fullDate } = this.state;
        if (!email) return "loading..."
        return (
            <main className="email-container">
                <div className="email-title-container flex align-center space-between">
                    <h3>{email.subject}</h3>
                    <section>
                        {email.isDraft && <img className="icon-img" onClick={() => onChangeDraft(email)} title="Move out from drafts" src="imgs/inbox_black_20dp.png" alt="undraft-img" />}
                        <img className="icon-img" onClick={() => onChangeRead(email)} title={email.isRead ? "Mark as unread" : "Mark as read"} src={email.isRead ? "imgs/icons8-envelope-24 (1).png" : "imgs/icons8-envelope-24.png"} alt="isread-img" />
                    </section>
                </div>
                <div className="flex space-between">
                    <section className="flex column sender-container">
                        <p>{email.sender.name}</p>
                        <span key="sender-address">&lt;{email.sender.address}&gt;</span>
                        <section className="flex">
                            {email.others.cc && <span key="cc-title">Cc: </span>}
                            {email.others.cc && email.others.cc.map((cc) =>
                                (<span key="all-cc"> &lt;{cc}&gt;</span>))
                            }
                        </section>
                        <section className="flex">
                            {email.others.bcc && <span key="bcc-title">Bcc:</span>}
                            {email.others.bcc && email.others.bcc.map((bcc) =>
                                (<span key="all-bcc"> &lt;{bcc}&gt;</span>))
                            }
                        </section>
                        <span key="date">{fullDate}</span>
                    </section>
                    <section className="flex align-center">
                        <img className="icon-img" onClick={() => onChangeStar(email)} title={email.isStarred ? "Remove from starred" : "Add to starred"} src={email.isStarred ? "imgs/star_googyellow500_20dp.png" : "imgs/star_border_black_20dp.png"} alt="star-img" />
                        <img className="icon-img" onClick={() => this.onRemoveEmail(email.id)} title="remove-note" src="imgs/icons8-trash-24.png" alt="delete-img" />
                        <img className="icon-img" onClick={() => onCreateNoteFromEmail(email)} title="Create mail as a note" src="imgs/icons8-note-24.png" alt="mail-to-note-img" />
                        <img className="icon-img" onClick={() => onReply(email.id)} title="Reply" src="imgs/icons8-reply-arrow-24.png" alt="reply-img" />
                    </section>
                </div>
                <div>
                    {email.body}
                </div>

            </main>
        )

    }
}