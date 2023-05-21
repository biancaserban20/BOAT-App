package com.proiectip.boat.bookings;

import com.proiectip.boat.clients.Clients;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingsRepository  extends MongoRepository<Bookings, String> {
}
