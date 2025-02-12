package com.example.portfolio.ReviewSubdomain.PresentationLayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponseDTO {
    private String reviewId;
    private String reviewerName;
    private String review;
    private Boolean isApproved;
    private LocalDateTime reviewDate;
}
