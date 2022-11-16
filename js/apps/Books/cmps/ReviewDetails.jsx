export function ReviewDetails({ review, onRemoveReview }) {
    var stars = '';
    switch (review.rate) {
        case 'one':
            stars = '★';
            break;
        case 'two':
            stars = '★★';
            break;
        case 'three':
            stars = '★★★';
            break;
        case 'four':
            stars = '★★★★';
            break;
        case 'five':
            stars = '★★★★★';
            break;
        default:
            stars = 'ZERO!';
    }
    return (
        <div className="review-container flex align-center space-between" key={review.id}>
            <div className="review-info-container flex column">
                <h3 className="">{review.fullName}</h3>
                <p className="">Rate:{stars}</p>
                <p className="">Read At: {review.readAt}</p>
                <p className="">Review: {review.reviewTxt}</p>
            </div>
            <div>
                <button onClick={() => onRemoveReview(review.id)} className="filter-btn" >✖</button>
            </div>
        </div>
    );
}