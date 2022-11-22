package com.ssafy.home.house.controller;

import com.ssafy.home.house.dto.House;
import com.ssafy.home.house.dto.HouseDeal;
import com.ssafy.home.house.service.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/house")
public class HouseController {

    @Autowired
    HouseService houseService;

    @GetMapping("/houselist")
    public ResponseEntity<?> getHouseList(@RequestParam("sido") String sido, @RequestParam("gugun") String gugun, @RequestParam("dong") String dong) {
        List<House> list = houseService.getHouseList(sido, gugun, dong);
        if(list != null) {
            return new ResponseEntity<>(list, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("아파트 매매정보 불러오기 실패", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/dong")
    public ResponseEntity<?> getDong(@RequestParam("sido") String sido, @RequestParam("gugun") String gugun) {
        List<String> list = houseService.getDong(sido, gugun);
        if(list != null) {
            return new ResponseEntity<>(list, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("동 목록 불러오기 실패", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/gugun")
    public ResponseEntity<?> getGugun(@RequestParam("sido") String sido) {
        List<String> list = houseService.getGugun(sido);
        if(list != null) {
            return new ResponseEntity<>(list, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("구군 목록 불러오기 실패", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/detail")
    public ResponseEntity<?> getDetail(@RequestParam("aptCode") long aptCode) {
        List<HouseDeal> list = houseService.getHouseDetail(aptCode);
        if(list != null) {
            return new ResponseEntity<>(list, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("상세정보 불러오기 실패", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/deal")
    public ResponseEntity<?> getDeals(@RequestParam("aptCode") long aptCode, @RequestParam("floor") String floor, @RequestParam("area") String area) {
        List<HouseDeal> list = houseService.getHouseDeals(aptCode, floor, area);
        if(list != null) {
            return new ResponseEntity<>(list, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("상세정보 불러오기 실패", HttpStatus.NOT_FOUND);
        }
    }
}
