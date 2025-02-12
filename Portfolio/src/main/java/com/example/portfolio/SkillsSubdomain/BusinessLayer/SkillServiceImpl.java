package com.example.portfolio.SkillsSubdomain.BusinessLayer;

import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectRequestModel;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectResponseModel;
import com.example.portfolio.SkillsSubdomain.DataLayer.SkillRepository;
import com.example.portfolio.SkillsSubdomain.PresentationLayer.SkillRequestModel;
import com.example.portfolio.SkillsSubdomain.PresentationLayer.SkillResponseModel;
import com.example.portfolio.utils.EntityDTOUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;

    public SkillServiceImpl(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @Override
    public Flux<SkillResponseModel> getALlSkills() {
        return skillRepository.findAll().map(EntityDTOUtil::toSkillResponseModel);
    }

    @Override
    public Mono<SkillResponseModel> addSkill(Mono<SkillRequestModel> requestModel) {
            return requestModel
                    .map(request->{
                        return EntityDTOUtil.toSkillEntity(request);
                    })
                    .flatMap(skillRepository::insert)
                    .flatMap(savedProject-> skillRepository.findSkillById(savedProject.getSkillId()))
                    .map(EntityDTOUtil::toSkillResponseModel);


    }
}
