package com.proiectip.boat.rooms;

import com.fasterxml.jackson.databind.annotation.JsonAppend;
import com.proiectip.boat.accounts.Accounts;
import com.proiectip.boat.accounts.AccountsRepository;
import com.proiectip.boat.admins.Admins;
import com.proiectip.boat.bookings.Bookings;
import com.proiectip.boat.bookings.BookingsRepository;
import com.proiectip.boat.clients.Clients;
import com.proiectip.boat.clients.ClientsRepository;
import com.proiectip.boat.owners.Owners;
import com.proiectip.boat.owners.OwnersRepository;
import com.proiectip.boat.properties.Properties;
import com.proiectip.boat.properties.PropertiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/rooms")
@CrossOrigin
public class RoomController {

    @Autowired
    RoomsRepository roomsRepository;

    @Autowired
    PropertiesRepository propertiesRepository;

    @Autowired
    ClientsRepository clientsRepository;

    @Autowired
    BookingsRepository bookingsRepository;

    @Autowired
    AccountsRepository accountsRepository;

    @Autowired
    OwnersRepository ownersRepository;

    @GetMapping("/list")
    public ResponseEntity<List<Rooms>> list(){
        return new ResponseEntity(roomsRepository.findAll(), HttpStatus.OK);
    }

//    @GetMapping("/listRoomsByPropertyId")
//    public ResponseEntity<List<Rooms>> listRoomsByPropertyId(@RequestBody Map<String,String > map){
//        return new ResponseEntity(roomsRepository.findByPropertyId(map.get("_id")), HttpStatus.OK);
//    }

//    @PutMapping("/add")
//    public ResponseEntity<String> add(@RequestBody Map<String,String > map ){
//        String username = map.get("username");
//        String hotelName = map.get("hotelName");
//        Accounts account = accountsRepository.findByUsername(username);
//        Owners owner = ownersRepository.findByAccount(account);
//        if(owner == null)
//            return new ResponseEntity("Owner not found!", HttpStatus.BAD_REQUEST);
//
//        String hotelId = null;
//        for( Properties property : owner.getProperties())
//        {
//            if(hotelName.equals(property.getName()))
//                hotelId = property.getId();
//        }
//        double price = Double.parseDouble(map.get("price"));
//        int noPeople = Integer.parseInt(map.get("noPeople"));
//        if(price < 0 || noPeople < 0)
//            return new ResponseEntity("Invalid data!", HttpStatus.BAD_REQUEST);
//
//        Optional<Properties> property = propertiesRepository.findById(hotelId);
//        if(property.isPresent()) {
//            Rooms room = new Rooms(price, noPeople, map.get("type"), map.get("description"));
//            roomsRepository.save(room);
//            property.get().getRooms().add(room);
//            property.get().setNoOfRooms(property.get().getNoOfRooms() + 1);
//            propertiesRepository.save(property.get());
//            return new ResponseEntity("Room added successfully!", HttpStatus.OK);
//        }
//        return new ResponseEntity("Property does not exist!", HttpStatus.BAD_REQUEST);
//    }

    @PutMapping("/addBooking")
    public ResponseEntity<String> addBooking(@RequestBody Map<String,String > map ){
        SimpleDateFormat sdformat = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = null;
        Date endDate = null;
        try {
            startDate = sdformat.parse(map.get("startDate"));
            endDate = sdformat.parse(map.get("endDate"));
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        Interval interval = new Interval(startDate, endDate);
        if(!interval.checkInterval())
            return new ResponseEntity("Invalid date interval!", HttpStatus.BAD_REQUEST);
        Rooms room = roomsRepository.findById(map.get("room")).get();
        Clients client = clientsRepository.findById(map.get("client")).get();
        int position = Interval.checkDisponibility(room.getIntervals(), interval);
        if(position >=0){
            Bookings booking = new Bookings(client, interval);
            bookingsRepository.save(booking);
            room.getBookings().add(position, booking);
            room.getIntervals().add(position, interval);
            roomsRepository.save(room);
            return new ResponseEntity("Booking added successfully!", HttpStatus.OK);
        }
        return new ResponseEntity("Date interval can't be satisfied!", HttpStatus.BAD_REQUEST);
    }

}
