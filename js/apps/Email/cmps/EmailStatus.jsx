export class EmailStatus extends React.Component {

    render() {
        const { calcPresentReaden } = this.props
        return (
            <div className="email-status-container">
                <div className="flex">
                    <section style={{ color: "#0546bd", backgroundColor: "#0546bd", width: `${calcPresentReaden()}%` }}>.</section>
                    <section style={{ color: "#e2e2e2", backgroundColor: "#e2e2e2", width: `${100 - calcPresentReaden()}%` }}>.</section>
                </div>
                <p>{Math.floor(calcPresentReaden())}% was readen</p>
            </div>
        );
    }
}