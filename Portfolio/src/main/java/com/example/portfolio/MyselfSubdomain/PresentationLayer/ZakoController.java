package com.example.portfolio.MyselfSubdomain.PresentationLayer;

import com.example.portfolio.MyselfSubdomain.BusinessLayer.ZakoService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/v1/zako")
@Validated
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ZakoController {

    private final ZakoService zakoService;

    public ZakoController(ZakoService zakoService) {
        this.zakoService = zakoService;
    }

    @GetMapping()
    public Flux<ZakoResponseModel> getAllZako() {
        return zakoService.getAllZako();
    }

    @GetMapping("/{zakoId}")
    public Mono<ZakoResponseModel> getZakoById(@PathVariable String zakoId) {
        return zakoService.getZakoById(zakoId);
    }

    @PutMapping("/{zakoId}")
    public Mono<ZakoResponseModel> UpdateZako(@PathVariable String zakoId, @RequestBody Mono<ZakoRequestModel> zakoRequestModel) {
        return zakoService.updateZako(zakoId, zakoRequestModel);
    }
}
