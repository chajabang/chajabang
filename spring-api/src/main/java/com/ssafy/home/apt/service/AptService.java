package com.ssafy.home.apt.service;

import com.ssafy.home.apt.dto.Apartment;
import com.ssafy.home.apt.mapper.AptMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AptService {

    @Autowired
    AptMapper aptMapper;

    public List<Apartment> getHouseDealInfo(Map<String, Object> map) {
        return aptMapper.getHouseDealInfo(map);
    }

    public List<String> getDong(Map<String, String> map) {
        return aptMapper.getDong(map);
    }

    public List<String> getGugun(String sido) {
        return aptMapper.getGugun(sido);
    }
}
