const { Link } = ReactRouterDOM

export class EmailTools extends React.Component {

    state = {
        clickedBtn: 'inbox'
    }

    onFilterEmails = (filter) => {
        const { onFilterEmails } = this.props;
        this.setState({ clickedBtn: filter });
        onFilterEmails(filter);
    }

    render() {
        const { onToggleCompose } = this.props;
        const { clickedBtn } = this.state;
        return (
            <div className="tools-conatiner flex column align-start">
                <section className="compose-btn-container flex justify-center">
                    <Link to={`/emails/compose`}>
                        <button className="compose-btn flex align-center" onClick={onToggleCompose}>
                            <div className="flex align-center">
                                <img src="imgs/create_32dp.png" alt="composr-img" />
                                <span>Compose</span>
                            </div>
                        </button>
                    </Link>
                </section>
                <section>
                    <Link to={`/emails/inbox`} onClick={() => this.onFilterEmails('inbox')}>
                        <button className={clickedBtn === 'inbox' ? "clicked-inbox-btn folder-btn inbox-btn" : "folder-btn inbox-btn"} ><div className="flex align-center"><img src="imgs/inbox_gm_googlered600_20dp.png" alt="inbox-img" /><span>Inbox</span></div></button>
                    </Link>
                    <Link to={`/emails/star`} onClick={() => this.onFilterEmails('star')}>
                        <button className={clickedBtn === 'star' ? "clicked-folder-btn folder-btn" : "folder-btn"} ><div className="flex align-center"><img src="imgs/grade_black_20dp.png" alt="inbox-img" /><span>Starred</span></div></button>
                    </Link>
                    <Link to={`/emails/sent`} onClick={() => this.onFilterEmails('sent')}>
                        <button className={clickedBtn === 'sent' ? "clicked-folder-btn folder-btn" : "folder-btn"} ><div className="flex align-center"><img src="imgs/send_black_20dp.png" alt="inbox-img" /><span>Sent Mail</span></div></button>
                    </Link>
                    <Link to={`/emails/draft`} onClick={() => this.onFilterEmails('draft')}>
                        <button className={clickedBtn === 'draft' ? "clicked-folder-btn folder-btn" : "folder-btn"} ><div className="flex align-center"><img src="imgs/insert_drive_file_black_20dp.png" alt="inbox-img" /><span>Drafts</span></div></button>
                    </Link>
                </section>
            </div>
        )
    }
}