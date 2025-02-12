package com.example.portfolio.ReviewSubdomain.BusinessLayer;


import com.example.portfolio.ReviewSubdomain.DataLayer.Review;
import com.example.portfolio.ReviewSubdomain.DataLayer.ReviewRepository;
import com.example.portfolio.ReviewSubdomain.PresentationLayer.ReviewRequestDTO;
import com.example.portfolio.ReviewSubdomain.PresentationLayer.ReviewResponseDTO;
import com.example.portfolio.utils.EntityDTOUtil;
import com.example.portfolio.utils.exceptions.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Slf4j
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public Flux<ReviewResponseDTO> GetAllReviews() {
        return reviewRepository.findAll().map(EntityDTOUtil::toReviewResponseDTO);
    }




    @Override
    public Mono<ReviewResponseDTO> AddReview(Mono<ReviewRequestDTO> reviewRequestDTOMono) {
        return reviewRequestDTOMono
                .map(EntityDTOUtil::toReviewEntity)
                .doOnNext(review -> review.setIsApproved(false)) // Set isApproved to false
                .doOnNext(review -> review.setReviewDate(LocalDateTime.now()))
                //.doOnNext(e-> e.setReviewId(EntityDtoUtil.generateReviewIdString()))
                .flatMap(reviewRepository::save)
                .map(EntityDTOUtil::toReviewResponseDTO);
    }

    @Override
    public Mono<ReviewResponseDTO> UpdateReview(Mono<ReviewRequestDTO> reviewRequestDTOMono, String reviewId) {
        return reviewRepository.findReviewByReviewId(reviewId)
                .switchIfEmpty(Mono.defer(()-> Mono.error(new NotFoundException("review id is not found: "+ reviewId))))
                .flatMap(found->reviewRequestDTOMono
                        .map(EntityDTOUtil::toReviewEntity)
                        .doOnNext(e->e.setReviewId(found.getReviewId()))
                        .doOnNext(review -> review.setReviewDate(LocalDateTime.now()))
                        .doOnNext(e->e.setId(found.getId())))
                .flatMap(reviewRepository::save)
                .map(EntityDTOUtil::toReviewResponseDTO);
    }

    @Override
    public Mono<ReviewResponseDTO> DeleteReview(String reviewId) {
        return reviewRepository.findReviewByReviewId(reviewId)
                .switchIfEmpty(Mono.defer(()-> Mono.error(new NotFoundException("review id is not found: "+ reviewId))))
                .flatMap(found ->reviewRepository.delete(found)
                        .then(Mono.just(found)))
                .map(EntityDTOUtil::toReviewResponseDTO);
    }

    @Override
    public Mono<ReviewResponseDTO> GetReviewByReviewId(String reviewId) {
        return reviewRepository.findReviewByReviewId(reviewId)
                .switchIfEmpty(Mono.defer(()-> Mono.error(new NotFoundException("review id is not found: "+ reviewId))))
                .doOnNext(c-> log.debug("the review entity is: " + c.toString()))
                .map(EntityDTOUtil::toReviewResponseDTO);
    }






}
