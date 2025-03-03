package com.example.portfolio.MyselfSubdomain.BusinessLayer;

import com.example.portfolio.MyselfSubdomain.PresentationLayer.ZakoRequestModel;
import com.example.portfolio.MyselfSubdomain.PresentationLayer.ZakoResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ZakoService {
    Flux<ZakoResponseModel> getAllZako();
    Mono<ZakoResponseModel> getZakoById(String zakoId);
    Mono<ZakoResponseModel> updateZako(String zakoId, Mono<ZakoRequestModel> zakoRequestModelMono);

}
