package com.ssafy.home.board.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ssafy.home.board.dto.Board;
import com.ssafy.home.board.dto.FileInfo;
import com.ssafy.home.board.service.BoardService;
import com.ssafy.home.member.controller.MemberController;
import com.ssafy.home.member.dto.Member;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/board")
public class BoardController {

    private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private static final String ERROR = "error";

    @Autowired
    BoardService boardService;
    @Autowired
    private ServletContext servletContext;

    @GetMapping("/selectAll")
    public PageInfo<Board> selectAll(HttpServletRequest request) {
        System.out.println(request.getParameter("pageNum"));
        PageHelper.startPage(request);
        List<Board> list = boardService.selectAll();
        return PageInfo.of(list);
    }



    @GetMapping("/view")
    public ResponseEntity<String> view(@RequestParam int articleNo) {
        logger.info("Board View 호출 - {}",articleNo);
        Map<String, Object> map = new HashMap<>();
        Board board = boardService.getView(articleNo);
        if (board != null) {
            boardService.updateHit(articleNo);
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<>(FAIL,HttpStatus.NOT_FOUND);
    }


    @GetMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam int articleNo, HttpServletRequest request) {
        logger.info("deleteArticle - 호출 {}",articleNo);
        Board b = boardService.getView(articleNo);
        HttpSession session = request.getSession(false);
        if (session == null) {//세션 만료
            return new ResponseEntity<>(FAIL, HttpStatus.FORBIDDEN);
        }
        Member m = (Member) session.getAttribute("member");
        if (m != null && m.getId().equals(b.getUserId())) {
            int cnt = boardService.delete(articleNo);
            if (cnt > 0) {
                return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
    }


    @PostMapping("/update")
    public ResponseEntity<String> modifyBoard(@RequestBody Board board, HttpServletRequest request) throws
            Exception {
        logger.info("modifyBoard - 호출 {}", board);

        HttpSession session = request.getSession(false);
        if (session == null) {//세션 만료
            return new ResponseEntity<>(FAIL, HttpStatus.FORBIDDEN);
        }
        Member m = (Member) session.getAttribute("member");
        if (m != null && m.getId().equals(board.getUserId())) { // 세션의 id 값과 board의 userId 값이 동일해야 함!!
            int cnt = boardService.updateBoard(board);
            if (cnt > 0) {
                return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
            }
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);

    }
}
