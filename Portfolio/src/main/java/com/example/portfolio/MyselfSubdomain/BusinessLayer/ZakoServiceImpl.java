package com.example.portfolio.MyselfSubdomain.BusinessLayer;

import com.example.portfolio.MyselfSubdomain.DataLayer.ZakoRepo;
import com.example.portfolio.MyselfSubdomain.PresentationLayer.ZakoResponseModel;
import com.example.portfolio.utils.EntityDTOUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

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
}
