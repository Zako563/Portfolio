package com.example.portfolio.MyselfSubdomain.BusinessLayer;

import com.example.portfolio.MyselfSubdomain.PresentationLayer.ZakoResponseModel;
import reactor.core.publisher.Flux;

public interface ZakoService {
    Flux<ZakoResponseModel> getAllZako();

}
