import { ReviewDetails } from "./ReviewDetails.jsx";

export class ReviewList extends React.Component {
    onRemoveReview = (reviewId) => {
        this.props.onRemoveReview(reviewId);
    }

    render() {
        const { reviews, onRemoveReview } = this.props
        if (!reviews) return "";
        return (
            <div className="reviews-container flex column">
                {reviews.length !== 0 && <h2>Reviews</h2>}
                {reviews.map((review) => (
                    <ReviewDetails review={review} key={review.id} onRemoveReview={() => {this.onRemoveReview(review.id)}} />
                ))}
            </div>
        );
    }
}