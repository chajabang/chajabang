package com.ssafy.home.house.service;

import com.ssafy.home.house.dto.House;
import com.ssafy.home.house.mapper.HouseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class HouseService {

    @Autowired
    HouseMapper houseMapper;

    public List<House> getHouseDealInfo(Map<String, Object> map) {
        return houseMapper.getHouseDealInfo(map);
    }

    public List<String> getDong(String sido, String gugun) {
        return houseMapper.getDong(sido, gugun);
    }

    public List<String> getGugun(String sido) {
        return houseMapper.getGugun(sido);
    }
}
