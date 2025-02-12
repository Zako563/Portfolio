package com.example.portfolio.ReviewSubdomain.BusinessLayer;


import com.example.portfolio.ReviewSubdomain.PresentationLayer.ReviewRequestDTO;
import com.example.portfolio.ReviewSubdomain.PresentationLayer.ReviewResponseDTO;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ReviewService {
    Flux<ReviewResponseDTO> GetAllReviews();

    Mono<ReviewResponseDTO> AddReview(Mono<ReviewRequestDTO> reviewRequestDTOMono);
    Mono<ReviewResponseDTO> UpdateReview(Mono<ReviewRequestDTO> reviewRequestDTOMono, String reviewId);
    Mono<ReviewResponseDTO> DeleteReview(String reviewId);

    Mono<ReviewResponseDTO> GetReviewByReviewId(String reviewId);

}
