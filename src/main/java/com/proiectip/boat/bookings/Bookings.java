package com.proiectip.boat.bookings;

import com.proiectip.boat.accounts.Accounts;
import com.proiectip.boat.clients.Clients;
import com.proiectip.boat.rooms.Interval;
import com.proiectip.boat.rooms.Rooms;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Document(collection = "bookings")
public class Bookings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @DocumentReference
    private Clients client;

    private Interval interval;

    public Bookings() {
    }

    public Bookings(Clients client, Interval interval) {
        this.client = client;
        this.interval = interval;
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

    public Interval getInterval() {
        return interval;
    }

    public void setInterval(Interval interval) {
        this.interval = interval;
    }

    @Override
    public String toString() {
        return "Bookings{" +
                "id='" + id + '\'' +
                ", client=" + client +
                ", interval=" + interval +
                '}';
    }
}
