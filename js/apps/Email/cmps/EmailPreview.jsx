import { LongTxt } from "./LongTxt.jsx";
const { Link } = ReactRouterDOM

export class EmailPreview extends React.Component {

    state = { time: null }

    componentDidMount() {
        const { timeFromTimestamp, email } = this.props;
        var time = timeFromTimestamp(email.sendAt);
        this.setState({ time })
    }

    onClickStar = (ev) => {
        ev.preventDefault();
        const { email, onChangeStar } = this.props;
        onChangeStar(email);
    }

    render() {
        const { email, filterBy, onChangeRead } = this.props;
        const { time } = this.state;
        if (!time) return '';
        return (
            <Link to={`/emails/details/${email.id}`} >
                <div className={email.isRead ? "read-email email-preview-container" : 'unread-email email-preview-container'} onClick={() => onChangeRead(email, true)}>
                    <div className="flex space-between">
                        <div className="flex">
                            <img className="star-img" onClick={this.onClickStar} src={email.isStarred ? "imgs/star_googyellow500_20dp.png" : "imgs/star_border_black_20dp.png"} alt="star-img" />
                            {filterBy && filterBy.filter === 'sent' && <p className={email.isRead ? "sender-name" : "sender-name bold-title"} > to: {email.reciver.name}</p>}
                            {!filterBy && <p className={email.isRead ? "sender-name" : "sender-name bold-title"} > {email.sender.name}</p>}
                            {filterBy && filterBy.filter !== 'sent' && <p className={email.isRead ? "sender-name" : "sender-name bold-title"} > {email.sender.name}</p>}
                            <p> <span className={email.isRead ? "" : "bold-title"}>{email.subject}</span>-<LongTxt txt={email.body} showFullTxt={false}/></p>
                        </div>
                        <p className={email.isRead ? "send-time" : "send-time bold-title"}>{time}</p>
                    </div>
                </div >
            </Link>
        )
    }
}