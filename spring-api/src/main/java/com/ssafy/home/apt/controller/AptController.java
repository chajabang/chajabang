package com.ssafy.home.apt.controller;

import com.ssafy.home.apt.dto.Apartment;
import com.ssafy.home.apt.service.AptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/apt")
public class AptController {

    @Autowired
    AptService aptService;

    @PostMapping("/dealinfo")
    public ResponseEntity<?> getHouseDealInfo(@RequestBody Map<String, Object> map) {
        List<Apartment> list = aptService.getHouseDealInfo(map);
        if(list != null) {
            return new ResponseEntity<>(list, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("아파트 매매정보 불러오기 실패", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/dong")
    public ResponseEntity<?> getDong(@RequestBody Map<String, String> map) {
        List<String> list = aptService.getDong(map);
        if(list != null) {
            return new ResponseEntity<>(list, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("동 목록 불러오기 실패", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/gugun")
    public ResponseEntity<?> getGugun(@RequestBody Map<String, String> map) {
        String sido = map.get("sido");
        List<String> list = aptService.getGugun(sido);
        if(list != null) {
            return new ResponseEntity<>(list, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("구군 목록 불러오기 실패", HttpStatus.NOT_FOUND);
        }
    }
}
