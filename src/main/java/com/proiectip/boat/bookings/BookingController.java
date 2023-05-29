package com.proiectip.boat.bookings;

import com.proiectip.boat.clients.Clients;
import com.proiectip.boat.clients.ClientsRepository;
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

    @Autowired
    ClientsRepository clientsRepository;

    @GetMapping("/list")
    public ResponseEntity<List<Bookings>> list(){
        return new ResponseEntity(bookingsRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/listBookingsByRoomId")
    public ResponseEntity<List<Bookings>> listBookingsByRoomId(@RequestBody Map<String, String > map){
        Rooms room = roomsRepository.findById(map.get("_id")).get();
        return new ResponseEntity(room.getBookings(), HttpStatus.OK);
    }

    @PostMapping("/listBookingsByClientId")
    public ResponseEntity<List<Bookings>> listBookingsByClientId(@RequestBody Map<String, String > map){
        List<Bookings> list = bookingsRepository.findAll();
        list.removeIf(booking -> !booking.getClientId().equals(map.get("_id")));
        return new ResponseEntity(list, HttpStatus.OK);
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
