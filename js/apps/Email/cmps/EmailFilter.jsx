
export class EmailFilter extends React.Component {

    render() {
        const { onChangeFilterName, filterBy } = this.props
        return (
            <div className="search-email-container flex space-between">
                <section className="flex">
                    <p>🔍</p>
                    <input
                        autoFocus
                        className="search-input"
                        type="text"
                        placeholder="Search on email..."
                        value={filterBy.name}
                        key="search"
                        onChange={({ target }) => onChangeFilterName(target.value)} />
                </section>
                {filterBy.name && <button className="clear-search-btn" onClick={() => onChangeFilterName('')}>x</button>}
            </div>
        )
    }
}