package com.ssafy.home.member.dto;


public class Member {
    private String name, id, pw;

    public Member() {
    }

    public Member(String name, String id, String pw) {
        setName(name);
        setId(id);
        setPw(pw);
    }

    public Member(String id,String pw){
        setId(id);
        setPw(pw);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name != null)
            this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        if (id != null)
            this.id = id;
    }

    public String getPw() {
        return pw;
    }

    public void setPw(String pw) {
        if (pw != null)
            this.pw = pw;
    }

    @Override
    public String toString() {
        return "Member{" +
                "name='" + name + '\'' +
                ", id='" + id + '\'' +
                ", pw='" + pw + '\'' +
                '}';
    }
}
