export class LongTxt extends React.Component {
    render() {
        return (
            <div>
                <div>{this.props.isLongTxtShown && <span>{this.props.text.substring(100, this.props.text.length)}</span>}</div>
                <button className="filter-btn" onClick={this.props.onClickToggle}>
                    {this.props.isLongTxtShown ? 'Read Less' : 'Read More'}
                </button>
            </div>
        );
    }
}