export class AddReview extends React.Component {
    state = {
        review: {
            fullName: 'Book Reader',
            rate: "0",
            readAt: '',
            reviewTxt: '',
        },
    }

    handleChange = ({ target }) => {
        this.setState((prevState) => ({
            review: { ...prevState.review, [target.name]: target.value },
        })
        );
    };

    onAddReview = (ev) => {
        ev.preventDefault();
        this.props.onAddReview(this.state.review)
    }
    render() {
        return <div className="add-review-container container">
            <h3>Add Your Own Review</h3>
            <form className="filter-container flex column" onSubmit={this.onAddReview}>
                <label>
                    <span>Full Name:</span>
                    <input onChange={this.handleChange} name="fullName" placeholder="Enter your first name..." />
                </label>
                <label>
                    <span>Rate:</span>
                    <select onChange={this.handleChange} name="rate">
                        <option value="zero"></option>
                        <option value="one">★</option>
                        <option value="two">★★</option>
                        <option value="three">★★★</option>
                        <option value="four">★★★★</option>
                        <option value="five">★★★★★</option>
                    </select>
                </label>
                <label>
                <span>Reat At:</span>
                <input onChange={this.handleChange} type="date" name="readAt"></input>
                </label>
                <label>
                <textarea onChange={this.handleChange} name="reviewTxt" rows="4"></textarea>
                </label>
                <button className="filter-btn">Add Review</button>
            </form>
        </div>
    }
}