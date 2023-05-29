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
import java.util.Optional;

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

    public BookingsRepository getBookingsRepository() {
        return bookingsRepository;
    }

    public void setBookingsRepository(BookingsRepository bookingsRepository) {
        this.bookingsRepository = bookingsRepository;
    }

    public RoomsRepository getRoomsRepository() {
        return roomsRepository;
    }

    public void setRoomsRepository(RoomsRepository roomsRepository) {
        this.roomsRepository = roomsRepository;
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam(value = "_id") String id, @RequestParam(value = "roomId") String roomId){
        Optional<Bookings> booking = bookingsRepository.findById(id);
        if(booking.isEmpty())
            return new ResponseEntity("Booking not found!", HttpStatus.BAD_REQUEST);
        Rooms room = roomsRepository.findById(roomId).get();
        room.getBookings().removeIf(myBooking -> booking.get().getId().equals(myBooking.getId()));
        Interval interval = booking.get().getInterval();
        room.getIntervals().removeIf(myInterval -> myInterval.equals(interval));
        roomsRepository.save(room);
        bookingsRepository.deleteById(id);
        return new ResponseEntity("Booking deleted successfully!", HttpStatus.OK);
    }
}
