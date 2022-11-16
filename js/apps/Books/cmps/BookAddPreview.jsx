import { eventBus } from "../../../services/eventBusService.js";

export class BookAddPreview extends React.Component {

    state = {
        item: this.props.item,
    }

    onAddGoogleBook = () => {
        this.props.addGoogleBook(this.state.item);
        eventBus.emit("new-book", this.state.item);
        eventBus.emit("show-msg", this.state.item);
    }
    render() {
        return (
            <div className="result-container flex space-between align-center">
                <p className="flex wrap">{this.state.item.volumeInfo.title}</p>
                <button className="filter-btn" onClick={this.onAddGoogleBook}>+</button>
            </div>
        );
    }
}
