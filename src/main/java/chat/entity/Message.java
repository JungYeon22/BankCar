package chat.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import login.dto.LoginDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.time.LocalDateTime;
@Getter
@Setter
@Entity
@Table(name="message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="messageSeq")
    private Long messageSeq;

    @Column(name="content", nullable = false)
    private String content;

    @Column(name="sentTime", nullable = false)
    private LocalDateTime sentTime;

    // 보낸 사용자의 이름을 저장할 필드
    @Column(name="sender")
    private String sender;
//    @Column(name="profileImage")
//    private String profileImage; // 사용자 프로필 사진 URL

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)//
    @JoinColumn(name = "roomSeq")
    @JsonBackReference
    private MessageRoom messageRoom;

    public MessageRoom getMessageRoom() {
        return messageRoom;
    }

    public void setMessageRoom(MessageRoom messageRoom) {
        this.messageRoom = messageRoom;
    }

    public Long getMessageSeq() {
        return messageSeq;
    }

    public void setMessageSeq(Long messageSeq) {
        this.messageSeq = messageSeq;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getSentTime() {
        return sentTime;
    }

    public void setSentTime(LocalDateTime sentTime) {
        this.sentTime = sentTime;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public Message() {
    }

    public Message(String content, LocalDateTime sentTime, String sender) {
        this.content = content;
        this.sentTime = sentTime;
        this.sender = sender;
//        this.profileImage = profileImage;
    }



}
