package com.ingressoapp.ingresso.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @org.hibernate.annotations.Type(type = "uuid-char")
    @Column(columnDefinition = "varchar(36)")
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Date eventDate;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private int totalTickets;

    @ManyToOne(cascade = CascadeType.ALL)
    private EventCategory category;

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String about;

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String image;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date modifiedAt;

    @Temporal(TemporalType.TIMESTAMP)
    @ManyToOne
    private User createdByUser;
}
