package com.ssafy.home.board.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ssafy.home.board.dto.Board;
import com.ssafy.home.board.dto.FileInfo;
import com.ssafy.home.board.service.BoardService;
import com.ssafy.home.member.dto.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/board")
public class BoardController {
    @Autowired
    BoardService boardService;
    @Autowired
    private ServletContext servletContext;

    @PostMapping("/selectAll")
    @ResponseBody
    public PageInfo<Board> selectAll(HttpServletRequest request) {
        System.out.println(request.getParameter("pageNum"));
        PageHelper.startPage(request);
        List<Board> list = boardService.selectAll();
        return PageInfo.of(list);
    }

    @GetMapping("/write")
    public String writeBoard(HttpSession session) {
        // CSRF Token 발행
        String csrfToken = UUID.randomUUID().toString();
        session.setAttribute("CSRF_TOKEN", csrfToken);
        System.out.println(csrfToken);
        return "boardWrite";
    }

    @PostMapping("/write")
    public String writeBoard(Board board, String csrf_token, HttpSession session, HttpServletRequest request,
                             @RequestParam("upfile") MultipartFile[] files) throws Exception {
        System.out.println(board);
        System.out.println("받은 " + csrf_token);

        String CSRF_TOKEN = (String) session.getAttribute("CSRF_TOKEN");
        Member m = (Member) session.getAttribute("member");
        if (CSRF_TOKEN != null && CSRF_TOKEN.equals(csrf_token)) {

            if (!files[0].isEmpty()) {
                String realPath = servletContext.getRealPath("/WEB-INF/upload");
                String today = new SimpleDateFormat("yyMMdd").format(new Date());
                String saveFolder = realPath + File.separator + today;
                File folder = new File(saveFolder);
                if (!folder.exists()) {
                    folder.mkdirs();
                }

                List<FileInfo> fileInfos = new ArrayList<>();
                for (MultipartFile mfile : files) {
                    FileInfo fileInfo = new FileInfo();
                    String originalFileName = mfile.getOriginalFilename();
                    if (!originalFileName.isEmpty()) {
                        String saveFileName = System.nanoTime()
                                + originalFileName.substring(originalFileName.lastIndexOf('.'));
                        fileInfo.setSaveFolder(today);
                        fileInfo.setOriginalFile(originalFileName);
                        fileInfo.setSaveFile(saveFileName);
                        mfile.transferTo(new File(folder, saveFileName));
                    }
                    fileInfos.add(fileInfo);

                }
                board.setFileInfos(fileInfos);
            }
            board.setUserId(m.getId());
            long cnt = boardService.write(board);
            if (cnt > 0) {
                return "writeOk";
            }
        } else {
            System.out.println(request.getRemoteAddr() + " 해킹 시도 감지");
        }
        return "writeFail";
    }

    @ResponseBody
    @PostMapping("/upload")
    public String upload(@RequestParam("file") MultipartFile file) {
        String realPath = servletContext.getRealPath("WEB-INF/upload/webcam");
        String today = new SimpleDateFormat("yyMMdd").format(new Date());
        String saveFolder = realPath + File.separator + today;
        System.out.println(saveFolder);
        File folder = new File(saveFolder);
        if (!folder.exists()) {
            folder.mkdirs();
        }
        String originalFileName = file.getOriginalFilename();
        String saveFileName = System.nanoTime()
                + originalFileName.substring(originalFileName.lastIndexOf('.'));
        try {
            file.transferTo(new File(folder, saveFileName));
            return "upload ok!!!";
        } catch (IllegalStateException e) {
            e.printStackTrace();
            return "upload fail!!!";
        } catch (IOException e) {
            e.printStackTrace();
            return "upload fail!!!";
        }
    }

    @ResponseBody
    @GetMapping("/view/{articleNo}")
    public Map<String, Object> view(@PathVariable("articleNo") String articleNo) {
        Map<String, Object> map = new HashMap<>();
        int no = Integer.parseInt(articleNo);
        Board board = boardService.getView(no);
        if(board != null) {
            boardService.updateHit(no);
            board.setHit(board.getHit()+1);
            map.put("board", board);
        } else {
            map.put("msg", "글이 삭제되었거나 정상적인 URL 접근이 아닙니다.");
        }
        return map;
    }

    @ResponseBody
    @PostMapping("/delete")
    public String delete(String articleNo) {
        int no = Integer.parseInt(articleNo);
        int n = boardService.delete(no);
        if(n > 0) {
            return "삭제되었습니다.";
        } else {
            return "삭제에 실패하였습니다.";
        }
    }
}
