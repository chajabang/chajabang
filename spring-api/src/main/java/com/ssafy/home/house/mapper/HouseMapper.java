package com.ssafy.home.house.mapper;

import com.ssafy.home.house.dto.House;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface HouseMapper {
    List<House> getHouseList(String sido, String gugun, String dong);

    List<String> getDong(String sido, String gugun);

    List<String> getGugun(String sido);
}
