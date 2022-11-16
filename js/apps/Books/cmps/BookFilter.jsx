export class BookFilter extends React.Component {
    state = {
        filter: {
            name: "",
            maxPrice: "",
            minPrice: "",
        },
    };

    handleChange = ({ target }) => {
        if (target.name === "minPrice" || target.name === "maxPrice")
            target.value ? Number(target.value) : "";
        this.setState(
            (prevState) => ({
                filter: { ...prevState.filter, [target.name]: target.value },
            })
        );
    };

    filterBooks = (ev) => {
        ev.preventDefault()
        this.props.onFilterBooks(this.state.filter);

    };

    render() {
        const { filter } = this.state;
        return (
            <form className="filter-container flex justify-center" onSubmit={this.filterBooks}>
                <input
                    className="filter-input"
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={this.handleChange}
                    value={filter.name}
                />
                <input
                    className="filter-input"
                    type="text"
                    placeholder="Min price"
                    name="minPrice"
                    onChange={this.handleChange}
                    value={filter.minPrice}
                />
                <input
                    className="filter-input"
                    type="text"
                    placeholder="Max price"
                    name="maxPrice"
                    onChange={this.handleChange}
                    value={filter.maxPrice}
                />
                <button className="filter-btn">Submit</button>
            </form>
        );
    }
}