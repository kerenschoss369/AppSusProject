import { EmailFilter } from "../cmps/EmailFilter.jsx"
import { EmailList } from "../cmps/EmailList.jsx"

export class EmailPage extends React.Component {
    render() {
        const { emails, timeFromTimestamp, onChangeStar, onChangeRead, filterBy, onChangeFilterName } = this.props;
        if (!emails) return 'loading...'
        return (
            <div>
                <EmailFilter onChangeFilterName={onChangeFilterName} filterBy={filterBy} />
                <EmailList emails={emails} timeFromTimestamp={timeFromTimestamp} onChangeStar={onChangeStar} onChangeRead={onChangeRead} filterBy={filterBy} />
            </div>
        )
    }
}