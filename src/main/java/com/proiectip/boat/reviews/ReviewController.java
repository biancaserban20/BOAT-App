package com.proiectip.boat.reviews;

import com.proiectip.boat.bookings.Bookings;
import com.proiectip.boat.bookings.BookingsRepository;
import com.proiectip.boat.clients.Clients;
import com.proiectip.boat.clients.ClientsRepository;
import com.proiectip.boat.rooms.Rooms;
import com.proiectip.boat.rooms.RoomsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/reviews")
@CrossOrigin
public class ReviewController {
    @Autowired
    ReviewsRepository reviewsRepository;

    @Autowired
    RoomsRepository roomsRepository;

    @Autowired
    BookingsRepository bookingsRepository;

    @Autowired
    ClientsRepository clientsRepository;


    @GetMapping("/list")
    public ResponseEntity<List<Reviews>> list(){
        return new ResponseEntity(reviewsRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/listReviewsByRoomId")
    public ResponseEntity<List<Reviews>> listReviewsByRoom(@RequestBody Map<String, String> map){
        String idRoom = map.get("_id");
        return new ResponseEntity(reviewsRepository.findByRoomId(idRoom), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Map<String, String> map){
        String reviewMessage = map.get("review");
        int noOfStars = Integer.parseInt(map.get("noOfStars"));
        if(noOfStars < 0 || noOfStars > 5)
            return new ResponseEntity("Invalid data!", HttpStatus.BAD_REQUEST);
        SimpleDateFormat sdformat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        try {
            date = sdformat.parse(map.get("date"));
        } catch (ParseException e) {
            return new ResponseEntity("Invalid date!", HttpStatus.BAD_REQUEST);
        }
        Bookings booking = bookingsRepository.findById(map.get("booking")).get();
        if(booking == null)
            return new ResponseEntity("Invalid booking!", HttpStatus.BAD_REQUEST);
        Reviews review = new Reviews(booking.getClient(), booking, booking.getRoom(),reviewMessage, noOfStars, date);
        reviewsRepository.save(review);
        booking.getRoom().getReviews().add(review);
        roomsRepository.save(booking.getRoom());
        return new ResponseEntity("Review added!", HttpStatus.OK);
    }

}
