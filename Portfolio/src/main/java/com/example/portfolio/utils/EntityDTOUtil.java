package com.example.portfolio.utils;


import com.example.portfolio.MyselfSubdomain.DataLayer.Zako;
import com.example.portfolio.MyselfSubdomain.PresentationLayer.ZakoRequestModel;
import com.example.portfolio.MyselfSubdomain.PresentationLayer.ZakoResponseModel;
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

    public static String generateOrderIdString() {
        return UUID.randomUUID().toString();
    }
}
