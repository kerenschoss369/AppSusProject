import storageService from "../../../services/storageService.js";
import utilService from "../../../services/utilService.js";

const STORAGE_KEY = "reviews";

var gReviews = [];
const gDefaultReviews = []

_createReviews();

export default {
    query,
    getReviewsByBookId,
    createReview,
    removeReview,
    addReview
};

function query() {
    return Promise.resolve(gReviews);
}

function getReviewsByBookId(bookId) {
    const reviews = gReviews.filter((review) => review.bookId === bookId);
    return Promise.resolve(reviews);
}

function _createReviews() {
    gReviews = storageService.load(STORAGE_KEY, gDefaultReviews);
    storageService.store(STORAGE_KEY, gReviews);
}

function removeReview(reviewId) {
    gReviews = gReviews.filter(review => review.id !== reviewId);
    storageService.store(STORAGE_KEY, gReviews);
}

function createReview(review) {
    gReviews.unshift(review)
    storageService.store(STORAGE_KEY, gReviews);
}

function addReview(bookId, review) {
    const reviewToAdd = {
        id: utilService.makeId(),
        bookId,
        ...review
    }
    createReview(reviewToAdd);
}