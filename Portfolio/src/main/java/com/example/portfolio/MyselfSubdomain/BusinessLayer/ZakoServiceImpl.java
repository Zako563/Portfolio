package com.example.portfolio.MyselfSubdomain.BusinessLayer;

import com.example.portfolio.MyselfSubdomain.DataLayer.ZakoRepo;
import com.example.portfolio.MyselfSubdomain.PresentationLayer.ZakoRequestModel;
import com.example.portfolio.MyselfSubdomain.PresentationLayer.ZakoResponseModel;
import com.example.portfolio.utils.EntityDTOUtil;
import com.example.portfolio.utils.exceptions.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@Slf4j
public class ZakoServiceImpl implements ZakoService {

    private final ZakoRepo zakoRepo;

    public ZakoServiceImpl(ZakoRepo zakoRepo) {
        this.zakoRepo = zakoRepo;
    }

    @Override
    public Flux<ZakoResponseModel> getAllZako() {
        return zakoRepo.findAll().map(EntityDTOUtil::toZakoResponseDTO);
    }

    @Override
    public Mono<ZakoResponseModel> getZakoById(String zakoId) {
        return zakoRepo.findZakoByZakoId(zakoId)
                .switchIfEmpty(Mono.defer(()-> Mono.error(new NotFoundException("zako id is not found: "+ zakoId))))
                .doOnNext(c-> log.debug("the review entity is: " + c.toString()))
                .map(EntityDTOUtil::toZakoResponseDTO);

    }

    @Override
    public Mono<ZakoResponseModel> updateZako(String zakoId, Mono<ZakoRequestModel> zakoRequestModelMono) {
        return zakoRepo.findZakoByZakoId(zakoId)
                .switchIfEmpty(Mono.defer(()-> Mono.error(new NotFoundException("review id is not found: "+ zakoId))))
                .flatMap(found->zakoRequestModelMono
                        .map(EntityDTOUtil::toZakoEntity)
                        .doOnNext(e->e.setZakoId(found.getZakoId()))
                        .doOnNext(e->e.setId(found.getId())))
                .flatMap(zakoRepo::save)
                .map(EntityDTOUtil::toZakoResponseDTO);
    }
}
