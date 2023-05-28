package com.proiectip.boat.rooms;

import com.proiectip.boat.accounts.Accounts;
import com.proiectip.boat.bookings.Bookings;
import com.proiectip.boat.properties.Properties;
import com.proiectip.boat.reviews.Reviews;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "rooms")
public class Rooms {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private double price;

    private int noPeople;

    private String type;

    private String description;

    @DocumentReference
    private List<Bookings> bookings;

    private List<Interval> intervals;

    @DocumentReference
    private List<Reviews> reviews;

    public Rooms() {
    }

    public Rooms(double price, int noPeople, String type, String description) {
        this.price = price;
        this.noPeople = noPeople;
        this.type = type;
        this.description = description;
        this.bookings = new ArrayList<>();
        this.intervals = new ArrayList<>();
        this.reviews = new ArrayList<>();
    }

    public List<Reviews> getReviews() {
        return reviews;
    }

    public List<Interval> getIntervals() {
        return intervals;
    }

    public String getId() {
        return id;
    }

    public int getNoPeople() {
        return noPeople;
    }

    public void setNoPeople(int noPeople) {
        this.noPeople = noPeople;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public List<Bookings> getBookings() {
        return bookings;
    }
}
