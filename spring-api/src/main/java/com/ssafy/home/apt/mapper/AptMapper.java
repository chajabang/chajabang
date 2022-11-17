package com.ssafy.home.apt.mapper;

import com.ssafy.home.apt.dto.Apartment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface AptMapper {
    List<Apartment> getHouseDealInfo(Map<String, Object> map);

    List<String> getDong(Map<String, String> map);

    List<String> getGugun(String sido);
}
