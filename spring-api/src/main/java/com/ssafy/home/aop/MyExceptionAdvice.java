package com.ssafy.home.aop;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class MyExceptionAdvice {

    @ExceptionHandler(Exception.class)
    public Map<String, String> a(Exception e) {
        e.printStackTrace();
        Map<String, String> map = new HashMap<>();
        map.put("msg", "Fail");
        return map;
    }
}
