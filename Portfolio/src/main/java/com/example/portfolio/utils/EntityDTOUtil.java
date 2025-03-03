package com.example.portfolio.utils;


import com.example.portfolio.MyselfSubdomain.DataLayer.Zako;
import com.example.portfolio.MyselfSubdomain.PresentationLayer.ZakoRequestModel;
import com.example.portfolio.MyselfSubdomain.PresentationLayer.ZakoResponseModel;
import com.example.portfolio.ProjectSubdomain.DataLayer.Project;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectRequestModel;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectResponseModel;
import com.example.portfolio.ReviewSubdomain.DataLayer.Review;
import com.example.portfolio.ReviewSubdomain.PresentationLayer.ReviewRequestDTO;
import com.example.portfolio.ReviewSubdomain.PresentationLayer.ReviewResponseDTO;
import com.example.portfolio.SkillsSubdomain.DataLayer.Skill;
import com.example.portfolio.SkillsSubdomain.PresentationLayer.SkillRequestModel;
import com.example.portfolio.SkillsSubdomain.PresentationLayer.SkillResponseModel;
import com.example.portfolio.UserSubdomain.DataLayer.User;
import com.example.portfolio.UserSubdomain.PresentationLayer.UserResponseModel;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class EntityDTOUtil {


    public static ZakoResponseModel toZakoResponseDTO(Zako zako) {
        ZakoResponseModel zakoResponseModel  = new ZakoResponseModel ();
        BeanUtils.copyProperties(zako, zakoResponseModel);
        return zakoResponseModel;
    }


    public static SkillResponseModel toSkillResponseModel(Skill skill) {
        SkillResponseModel skillResponseModel  = new SkillResponseModel();
        BeanUtils.copyProperties(skill, skillResponseModel);
        return skillResponseModel;
    }


    public static Skill toSkillEntity(SkillRequestModel skillRequestModel){
        return Skill.builder()
                .skillId(generateOrderIdString())
                .skillName(skillRequestModel.getSkillName())
                .skillLogo(skillRequestModel.getSkillLogo())
                .build();
    }

    public static ProjectResponseModel toProjectResponseModel(Project project) {
        ProjectResponseModel projectResponseModel  = new ProjectResponseModel();
        BeanUtils.copyProperties(project, projectResponseModel);
        return projectResponseModel;
    }


    public static Project toProjectEntity(ProjectRequestModel projectRequestModel){
        return Project.builder()
                .projectId(generateOrderIdString())
                .projectName(projectRequestModel.getProjectName())
                .description(projectRequestModel.getDescription())
                .imageUrl(projectRequestModel.getImageUrl())
                .skills(projectRequestModel.getSkills())
                .projectLink(projectRequestModel.getProjectLink())
                .build();
    }


    public static Zako toZakoEntity(ZakoRequestModel zakoRequestModel){
        return Zako.builder()
                .zakoId(generateOrderIdString())
                .name(zakoRequestModel.getName())
                .title(zakoRequestModel.getTitle())
                .summary(zakoRequestModel.getSummary())
                .languages(zakoRequestModel.getLanguages())
                .build();
    }





    public static UserResponseModel toUserResponseModel(User user) {
        UserResponseModel model = new UserResponseModel();
        model.setUserId(user.getUserId());
        model.setEmail(user.getEmail());
        model.setFirstName(user.getFirstName());
        model.setLastName(user.getLastName());
        model.setRoles(user.getRoles());
        model.setPermissions(user.getPermissions());
        return model;
    }




    public static ReviewResponseDTO toReviewResponseDTO(Review review) {
        ReviewResponseDTO reviewResponseDTO  = new ReviewResponseDTO ();
        BeanUtils.copyProperties(review, reviewResponseDTO);
        return reviewResponseDTO;
    }

    public static Review toReviewEntity(ReviewRequestDTO reviewRequestDTO){
        return Review.builder()
                .reviewId(generateOrderIdString())
                .reviewerName(reviewRequestDTO.getReviewerName())
                .review(reviewRequestDTO.getReview())
                .isApproved(reviewRequestDTO.getIsApproved())
                .reviewDate(reviewRequestDTO.getReviewDate())
                .build();
    }


    public static String generateOrderIdString() {
        return UUID.randomUUID().toString();
    }
}
