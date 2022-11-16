export class LongTxt extends React.Component {
    render() {
        const { txt, showFullTxt } = this.props;
        if (showFullTxt) return (<span>{txt}</span>)
        else return (<span className="grey-txt">{txt.slice(0, 20)}{txt.length > 20 ? "..." : ""}</span>)
    }
}
