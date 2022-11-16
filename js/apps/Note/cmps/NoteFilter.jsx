export class NoteFilter extends React.Component {
    state = {
        filter: {
            name: "",
        },
    };

    handleFilterChange = ({ target }) => {
        this.setState(
            (prevState) => ({
                filter: { ...prevState.filter, name: target.value }
            }),
            () => {
                this.props.onFilterNotes(this.state.filter);
            }

        );
    };

    onClearFilter = () => {
        this.setState({ filter: { name: "" } },
            () => {
                this.props.onFilterNotes(this.state.filter);
            });
    }

    render() {
        const { filter } = this.state;
        return (
            <div className="search-note-container flex justify-center space-between">
                <div className="flex">
                    <p>🔍</p>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search note here..."
                    name="name"
                    onChange={this.handleFilterChange}
                    value={filter.name}
                    autoComplete="off"
                />
                </div>
                {filter.name && <button onClick={this.onClearFilter} className="clear-search-btn">x</button>}
            </div>
        );
    }
}