package com.ssafy.home.member.dto;


public class Member {
    private String  id, pw,name,nickname,email,reg_date;



    public Member() {
    }

    public Member(String id,String pw){
        setId(id);
        setPw(pw);
    }
    public Member(String id,String pw,String name,String email){
        setId(id);
        setPw(pw);
        setName(name);
        setEmail(email);
    }




    public Member(String id, String pw, String name, String nickname, String email, String reg_date) {
        setId(id);
        setPw(pw);
        setName(name);
        setEmail(email);
        setReg_date(reg_date);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        if(id!=null  && id != "")
        this.id = id;
    }

    public String getPw() {
        return pw;
    }

    public void setPw(String pw) {
        if(pw!=null  && pw != "" && pw.length()>=8 && pw.length()<=100 )
        this.pw = pw;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if(name!=null && name!="")
        this.name = name;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        if(nickname!=null && nickname!="")
        this.nickname = nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        if(email!=null && email !="" && email.contains("@"))
        this.email = email;
    }

    public String getReg_date() {
        return reg_date;
    }

    public void setReg_date(String reg_date) {
        // reg_date는 자동으로 현재 시각으로 할당됨
        this.reg_date = reg_date;
    }
}
