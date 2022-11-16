import { EmailPreview } from "./EmailPreview.jsx"

export class EmailList extends React.Component {
    render() {
        const { emails, timeFromTimestamp, onChangeStar, filterBy, onChangeRead } = this.props;
        if (!emails) return 'loading...';
        return (
            <div className="email-list-container">
                {emails.map((email) => (
                    <EmailPreview email={email} key={email.id} timeFromTimestamp={timeFromTimestamp} onChangeStar={onChangeStar} filterBy={filterBy} onChangeRead={onChangeRead} />
                ))}
            </div>
        )
    }
}
