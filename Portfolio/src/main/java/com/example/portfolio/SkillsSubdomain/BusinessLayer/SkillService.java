package com.example.portfolio.SkillsSubdomain.BusinessLayer;


import com.example.portfolio.SkillsSubdomain.PresentationLayer.SkillRequestModel;
import com.example.portfolio.SkillsSubdomain.PresentationLayer.SkillResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface SkillService {

    Flux<SkillResponseModel> getALlSkills();
    Mono<SkillResponseModel> addSkill(Mono<SkillRequestModel> requestModel);
}
