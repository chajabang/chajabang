package com.ssafy.home.house.mapper;

import com.ssafy.home.house.dto.House;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface HouseMapper {
    List<House> getHouseDealInfo(Map<String, Object> map);

    List<String> getDong(String sido, String gugun);

    List<String> getGugun(String sido);
}
