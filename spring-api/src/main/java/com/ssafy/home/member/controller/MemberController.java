package com.ssafy.home.member.controller;

import com.ssafy.home.member.dto.Member;
import com.ssafy.home.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/member")
public class MemberController {

    @Autowired
    MemberService memberService;

    @PostMapping("/logout")
    @ResponseBody
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session != null) {
            session.invalidate();
        }
        return "로그아웃 되었습니다.";
    }

    @PostMapping("/login")
    @ResponseBody
    public Map<String, Object> login(Member m, HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
        String name = null;
        try {
            name = memberService.login(m);
            if (name != null) {
                m.setName(name);
                HttpSession session = request.getSession();
                session.setAttribute("member", m);
                map.put("member", m);
            } else {
                map.put("msg", "로그인 실패");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return map;
    }

    @PostMapping("/register")
    @ResponseBody
    public String register(Member m) {
        System.out.println(m);
        int idx = 0;
        try {
            idx = memberService.register(m);
            if (idx > 0) {
                return "회원가입 성공";
            }
        } catch (Exception e) {
            e.printStackTrace();

        }
        return "회원가입 실패";
    }

    @GetMapping("/info")
    @ResponseBody
    public Map<String, Object> getInfo(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
        HttpSession session = request.getSession(false);
        if (session != null) {
            Member m = (Member) session.getAttribute("member");
            if (m != null) {
                map.put("id",m.getId());
                map.put("name",m.getName());
                return map;
            }else{
                map.put("msg","fail");
            }
        }else{
            map.put("msg","fail");
        }
        return map;

    }

    @PostMapping("/update")
    @ResponseBody
    public String update(@RequestParam Map<String, String> map, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            Member m = (Member) session.getAttribute("member");
            System.out.println(m);

            String id = map.get("id");
            String pw = map.get("pw");
            String name = map.get("name");
            Member l = new Member(id, pw);
            try {
                String loginM = memberService.login(l);
                if (loginM != null && loginM != "") {
                    if (m != null && m.getId().equals(map.get("id"))) {
                        int i = 0;
                        try {
                            i = memberService.update(map);
                            if (i > 0) {
                                session.setAttribute("member",new Member(name,id,pw));

                                return "업데이트 성공";
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }

                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return "업데이트 실패";

    }

    @PostMapping("/delete")
    @ResponseBody
    public String delete(@RequestParam String id, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        System.out.println("ID" + id);
        if (session != null) {
            int i = 0;
            try {
                i = memberService.delete(id);
                if (i > 0) {
                    session.invalidate();
                    return "delete success";
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return "fail";

    }

}
