package com.example.springbootlibrary.entity;


import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="messages")
@Data
public class Message {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(name="user_email")
    private String userEmail;

    @Column(name="title")
    private String title;

    @Column(name="question")
    private String question;

    @Column(name="admin_email")
    private String adminEmail;

    @Column(name = "response")
    private String response;

    @Column(name="closed")
    private boolean closed;

    public Message(){};

    public Message(String title, String question) {
        this.title = title;
        this.question = question;
    }
}
