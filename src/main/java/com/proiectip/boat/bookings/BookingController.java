package com.proiectip.boat.bookings;

import com.proiectip.boat.clients.Clients;
import com.proiectip.boat.owners.Owners;
import com.proiectip.boat.rooms.Interval;
import com.proiectip.boat.rooms.Rooms;
import com.proiectip.boat.rooms.RoomsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bookings")
@CrossOrigin
public class BookingController {

    @Autowired
    BookingsRepository bookingsRepository;

    @Autowired
    RoomsRepository roomsRepository;

    @GetMapping("/list")
    public ResponseEntity<List<Bookings>> list(){
        return new ResponseEntity(bookingsRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/listBookingsByRoomId")
    public ResponseEntity<List<Bookings>> listBookingsByRoomId(@RequestBody Map<String, String > map){
        return new ResponseEntity(roomsRepository.findById(map.get("_id")), HttpStatus.OK);
    }

//    @PutMapping("/delete")
//    public ResponseEntity<String> delete(@RequestBody Map<String, String> map){
//        String idBooking = map.get("_id");
//        Bookings booking = bookingsRepository.findById(idBooking).get();
//        if(booking == null)
//            return new ResponseEntity("Booking not found!", HttpStatus.BAD_REQUEST);
//        Rooms room = roomsRepository.findById(booking.getRoom().getId()).get();
//        room.getBookings().remove(booking);
//        Interval interval = booking.getInterval();
//        room.getIntervals().remove(interval);
//        roomsRepository.save(room);
//        bookingsRepository.deleteById(idBooking);
//        return new ResponseEntity("Booking deleted successfully!", HttpStatus.OK);
//    }
}
