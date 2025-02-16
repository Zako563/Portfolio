import React, { useState, useEffect } from 'react';
import { reviewResponseModel } from './model/reviewResponseModel';
import { getAllReviews } from './api/getAllReviews';
import { updateReview } from './api/updateReview';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReviewList.css';

const ReviewList: React.FC = (): JSX.Element => {
  const [reviews, setReviews] = useState<reviewResponseModel[]>([]);
  const [isZako, setIsZako] = useState<boolean>(false);
  const [userData, setUserData] = useState<{ nickname: string; picture: string } | null>(null);
  const [, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        setUserData(null);
        return;
      }

      try {
        const response = await fetch('https://dev-gvcipzccm8rh8aqe.us.auth0.com/userinfo', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const userInfo = await response.json();
        setUserData({ nickname: userInfo.nickname, picture: userInfo.picture });

        // Decode JWT to check roles
        const base64Url = accessToken.split('.')[1];
        const decodedPayload = JSON.parse(atob(base64Url));
        const roles = decodedPayload['https://portfolio/roles'] || [];

        setIsZako(roles.includes('Zako'));
      } catch (err) {
        console.error('Error fetching user info:', err);
      }
    };

    const fetchReviewData = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await getAllReviews();
        if (Array.isArray(response)) {
          setReviews(response);
        } else {
          console.error('Fetched data is not an array:', response);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
    fetchReviewData();
  }, []);

  const handleApproveReview = async (reviewId: string) => {
    try {
      const reviewToUpdate = reviews.find((review) => review.reviewId === reviewId);
      if (!reviewToUpdate) {
        console.error('Review not found');
        return;
      }

      const updatedReview = {
        reviewerName: reviewToUpdate.reviewerName,
        review: reviewToUpdate.review,
        isApproved: true,
      };

      await updateReview(reviewId, updatedReview);

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.reviewId === reviewId ? { ...review, isApproved: true } : review
        )
      );
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/v1/review/${reviewId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete review');
      }

      setReviews((prevReviews) => prevReviews.filter((review) => review.reviewId !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  // Sort reviews by dateTime, most recent first
  const sortedReviews = [...reviews].sort((a, b) => new Date(String(b.reviewDate)).getTime() - new Date(String(a.reviewDate)).getTime());

  return (
    <div>
      <div className="review-list-container">
        <div className="review-row">
          {sortedReviews.length > 0 ? (
            sortedReviews
              .filter((review) => isZako || review.isApproved)
              .map((review) => {
                const isCurrentUser = userData && review.reviewerName === userData.nickname;
                const reviewerImage = isCurrentUser
                  ? userData.picture
                  : 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png';

                return (
                  <div className="review-item" key={review.reviewId}>
                    <img className="reviewer-logo" src={reviewerImage} alt="Reviewer logo" />
                    <div>
                      <div className="reviewer-name">{review.reviewerName}</div>
                      <p className="review-text">{review.review}</p>
                      <p className="review-date">
                        {new Date(review.reviewDate + "Z").toLocaleString('en-CA', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          timeZone: 'America/Toronto',
                        })}
                      </p>
                    </div>
                    {isZako && !review.isApproved && (
                      <button className="approve-button" onClick={() => handleApproveReview(review.reviewId)}>
                        Approve
                      </button>
                    )}
                    {isZako && (
                      <button className="delete-button" onClick={() => handleDeleteReview(review.reviewId)}>
                        &times;
                      </button>
                    )}
                  </div>
                );
              })
          ) : (
            <p className="no-reviews">No reviews available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
