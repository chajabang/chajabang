package com.ssafy.home.board.dto;


public class Board {
    private int articleNo;
    private String userId;
    private String userName;
    private String subject;
    private String content;
    private int hit;
    private String registerTime;


    public Board() {
    }

    public Board(int articleNo, String userId, String userName, String subject, String content, int hit, String registerTime) {
        setArticleNo(articleNo);
        setUserId(userId);
        setUserName(userName);
        setSubject(subject);
        setContent(content);
        setHit(hit);
        setRegisterTime(registerTime);

    }

    public int getArticleNo() {
        return articleNo;
    }

    public void setArticleNo(int articleNo) {
        if (articleNo >= 0)
            this.articleNo = articleNo;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        if (userId != null)
            this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        if (userName != null)
            this.userName = userName;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        if (subject != null)
            this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        if (content != null)
            this.content = content;
    }

    public int getHit() {
        return hit;
    }

    public void setHit(int hit) {
        if (hit >= 0)
            this.hit = hit;
    }

    public String getRegisterTime() {
        return registerTime;
    }

    public void setRegisterTime(String registerTime) {
        if (registerTime != null)
            this.registerTime = registerTime;
    }



    @Override
    public String toString() {
        return "Board{" +
                "articleNo=" + articleNo +
                ", userId='" + userId + '\'' +
                ", userName='" + userName + '\'' +
                ", subject='" + subject + '\'' +
                ", content='" + content + '\'' +
                ", hit=" + hit +
                ", registerTime='" + registerTime + '\'' +
                '}';
    }
}