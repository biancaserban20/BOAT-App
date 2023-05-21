package com.proiectip.boat.reviews;

import com.proiectip.boat.rooms.Rooms;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewsRepository extends MongoRepository<Reviews, String> {

    List<Reviews> findByRoomId(String propertyId);
}
