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

    @DocumentReference
    private Rooms room;

    private Interval interval;

    public Bookings() {
    }
    public Bookings(Clients client, Rooms room, Interval interval) {
        this.client = client;
        this.room = room;
        this.interval = interval;
    }

    public Clients getClient() {
        return client;
    }

    public void setClient(Clients client) {
        this.client = client;
    }

    public Rooms getRoom() {
        return room;
    }

    public void setRoom(Rooms room) {
        this.room = room;
    }

    public Interval getInterval() {
        return interval;
    }

    public void setInterval(Interval interval) {
        this.interval = interval;
    }
}
