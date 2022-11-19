package com.ssafy.home.member.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.ssafy.home.member.dto.Member;
import com.ssafy.home.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:8080")
@RequestMapping("/member")
public class MemberController {

    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private static final String ERROR = "error";

    @Autowired
    MemberService memberService;

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        logger.info("Member Logout 호출 ");
        HttpSession session = request.getSession(false);
        if (session != null) {
            // 로그아웃 성공
            session.invalidate();
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } else {
            // 로그아웃 실패 => 해커가 의도적으로 세션을 지우고 시도 or 세션 만료
            logger.warn("Member Logout 해킹시도!! - {}", request.getRemoteAddr());
            return new ResponseEntity<>("해킹 시도 IP 수집중!!", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Member> login(Member m, HttpServletRequest request) {
        logger.info("Member login 호출 - {}", m);
        Map<String, Object> map = new HashMap<>();
        try {
            String username = memberService.login(m);
            if (username != null) {
                // 로그인 성공
                m.setUsername(username);
                HttpSession session = request.getSession();
                session.setAttribute("member", m);
                return new ResponseEntity<>(m, HttpStatus.OK);
            } else {
                //로그인 실패
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            // 에러
            logger.warn("Exception -  {} ", e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Member m) {
        logger.info("Member Register 호출 - {}", m);
        try {
            int idx = memberService.register(m);
            if (idx > 0) {
                // 회원가입 성공
                return new ResponseEntity<>(SUCCESS, HttpStatus.CREATED);
            }
            //회원가입 실패
            return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // 에러
            logger.warn("Exception -  {} ", e.getMessage());
            return new ResponseEntity<>(ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/info")
    public ResponseEntity<Map<String, Object>> getInfo(HttpServletRequest request) {
        logger.info("Member Register 호출 ");
        Map<String, Object> map = new HashMap<>();
        HttpSession session = request.getSession(false);
        if (session != null) {
            // 세션이 있을 경우 member가 있는지 갖고오기
            Member m = (Member) session.getAttribute("member");
            if (m != null) {
                // 멤버가 존재할 때
                map.put("id", m.getId());
                map.put("username", m.getUsername());
                return new ResponseEntity<>(map,HttpStatus.OK);
            } else {
                // 세션에 멤버가 존재하지 않을 때
                return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
            }
        } else {
            // 세션 만료
            map.put("msg", "다시 로그인 해주세요");
            return new ResponseEntity<>(map,HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/id")
    public ResponseEntity<String> idCheck(@RequestParam("id") String id) {
        logger.info("Member ID 중복 체크 호출 - {}", id);
        try {
            int cnt = memberService.idCheck(id);
            if (cnt == 0) {
                return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
            }
            return new ResponseEntity<>(FAIL, HttpStatus.CONFLICT);
        } catch (Exception e) {
            logger.warn("Exception -  {} ", e.getMessage());
        }
        return new ResponseEntity<>(ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/username")
    public ResponseEntity<String> usernameCheck(@RequestParam("username") String username) {
        logger.info("Member username 중복 체크 호출 - {}", username);
        try {
            int cnt = memberService.usernameCheck(username);
            if (cnt == 0) {
                return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
            }
            return new ResponseEntity<>(FAIL, HttpStatus.CONFLICT);
        } catch (Exception e) {
            logger.warn("Exception -  {} ", e.getMessage());
        }
        return new ResponseEntity<>(ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/update")
    public ResponseEntity<String> update(@RequestParam Map<String, String> map, HttpServletRequest request) {
        logger.info("Member Update 호출");
        HttpSession session = request.getSession(false);
        if (session != null) {
            Member m = (Member) session.getAttribute("member");

            String id = map.get("id");
            String pw = map.get("pw");
            String username = map.get("username");
            String email = map.get("email");
            Member l = new Member(id, pw);
            try {
                String loginM = memberService.login(l);
                if (loginM != null && loginM != "") {
                    if (m != null && m.getId().equals(map.get("id"))) {
                        try {
                            int i = memberService.update(map);
                            if (i > 0) {
                                session.setAttribute("member", new Member(id, pw, username, email));
                                return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
                            }
                        } catch (Exception e) {
                            logger.warn("Exception -  {} ", e.getMessage());
                            return new ResponseEntity<>(ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
                        }
                    }
                }
                return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
            } catch (Exception e) {
                logger.warn("Exception -  {} ", e.getMessage());

            }
        }
        return new ResponseEntity<>(ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam String id, HttpServletRequest request) {
        logger.info("Member Update 호출 - ID : {}",id);
        HttpSession session = request.getSession(false);
        if (session != null) {
            try {
                int i = memberService.delete(id);
                if (i > 0) {
                    session.invalidate();
                    return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
                }
                return new ResponseEntity<>(FAIL,HttpStatus.NOT_FOUND);
            } catch (Exception e) {
                logger.warn("Exception -  {} , id : { }", e.getMessage());
            }
        }
        return new ResponseEntity<>(ERROR,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
