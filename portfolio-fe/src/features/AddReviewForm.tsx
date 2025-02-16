import React, { useState } from 'react';
import { reviewRequestModel } from './model/reviewRequestModel';
import { addReview } from './api/addReview';
import './AddReviewForm.css'; // Import the CSS file

const AddReviewForm: React.FC = (): JSX.Element => {
  const [reviewerName, setReviewerName] = useState<string>('');
  const [review, setReview] = useState<string>('');
  const [isReviewFocused, setIsReviewFocused] = useState<boolean>(false); // Track focus state

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    const newReview: reviewRequestModel = {
      reviewerName,
      review,
      isApproved: false, // Default value
    };

    try {
      await addReview(newReview);
      alert('Review submitted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review.');
    }
  };

  return (
    <div className="add-review-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            id="review"
            placeholder="Write your comment..."
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
              setIsReviewFocused(!!e.target.value); // Show name field if review is not empty
            }}
            onFocus={() => setIsReviewFocused(true)} // Show name field when focused
            onBlur={() => !review && setIsReviewFocused(false)} // Hide name field if review is empty
            required
          ></textarea>
        </div>
        {/* Reviewer Name Field - Positioned under the review textarea */}
        <div className={`form-group ${isReviewFocused ? 'visible' : 'hidden'}`}>
          <input
            type="text"
            id="reviewerName"
            placeholder="Name"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReviewForm;