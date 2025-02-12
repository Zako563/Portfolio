package com.example.portfolio.ReviewSubdomain.PresentationLayer;

import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectRequestModel;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectResponseModel;
import com.example.portfolio.ReviewSubdomain.BusinessLayer.ReviewService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/v1/review")
@Validated
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }


    @GetMapping()
    Flux<ReviewResponseDTO> getAllReviews() {
        return reviewService.GetAllReviews();
    }

    @PostMapping()
    Mono<ReviewResponseDTO> addReview(@RequestBody Mono<ReviewRequestDTO> reviewRequestDTO) {
        return reviewService.AddReview(reviewRequestDTO);
    }

    @PutMapping("/{reviewId}")
    Mono<ReviewResponseDTO> updateReview(@PathVariable String reviewId, @RequestBody Mono<ReviewRequestDTO> reviewRequestDTO) {
        return reviewService.UpdateReview(reviewRequestDTO, reviewId);
    }

    @GetMapping("/{reviewId}")
    Mono<ReviewResponseDTO> getReviewByReviewId(@PathVariable String reviewId) {
        return reviewService.GetReviewByReviewId(reviewId);
    }

    @DeleteMapping("/{reviewId}")
    Mono<ReviewResponseDTO> deleteReview(@PathVariable String reviewId) {
        return reviewService.DeleteReview(reviewId);
    }


}
