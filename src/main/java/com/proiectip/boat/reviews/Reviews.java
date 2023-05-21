package com.proiectip.boat.reviews;

import com.proiectip.boat.bookings.Bookings;
import com.proiectip.boat.clients.Clients;
import com.proiectip.boat.rooms.Rooms;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Document(collection = "reviews")
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @DocumentReference
    private Clients client;

    @DocumentReference
    private Bookings booking;

    @DocumentReference
    private Rooms room;

    private String review;
    private int noOfStars;
    private Date date;


    public Reviews() {
    }

    public Reviews(Clients client, Bookings booking, Rooms room, String review, int noOfStars, Date date) {
        this.client = client;
        this.booking = booking;
        this.room = room;
        this.review = review;
        this.noOfStars = noOfStars;
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public Clients getClient() {
        return client;
    }

    public void setClient(Clients client) {
        this.client = client;
    }

    public Bookings getBooking() {
        return booking;
    }

    public void setBooking(Bookings booking) {
        this.booking = booking;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public int getNoOfStars() {
        return noOfStars;
    }

    public void setNoOfStars(int noOfStars) {
        this.noOfStars = noOfStars;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
