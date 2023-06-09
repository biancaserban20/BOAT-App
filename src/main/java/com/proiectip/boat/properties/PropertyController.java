package com.proiectip.boat.properties;
import com.fasterxml.jackson.databind.annotation.JsonAppend;
import com.proiectip.boat.accounts.AccountService;
import com.proiectip.boat.accounts.Accounts;
import com.proiectip.boat.accounts.AccountsRepository;
import com.proiectip.boat.owners.OwnerController;
import com.proiectip.boat.owners.OwnerService;
import com.proiectip.boat.owners.Owners;
import com.proiectip.boat.owners.OwnersRepository;
import com.proiectip.boat.rooms.Rooms;
import com.proiectip.boat.rooms.RoomsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.proiectip.boat.rooms.Interval;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


@RestController
@RequestMapping("/properties")
@CrossOrigin
public class PropertyController {
    @Autowired
    private PropertyService propertyService;

    @Autowired
    private PropertiesRepository propertyRepository;

    @Autowired
    private OwnerService ownerService;

    @Autowired
    private AccountService accountService;

    @Autowired
    AccountsRepository accountsRepository;

    @Autowired
    OwnersRepository ownersRepository;

    @Autowired
    RoomsRepository roomsRepository;

    @Autowired
    PropertiesRepository propertiesRepository;

    @GetMapping("/listProperties")
    public ResponseEntity<List<Properties>> list(){
        return new ResponseEntity<>(propertyRepository.findAll(),HttpStatus.OK);
    }

    @PostMapping("/getByName")
    public ResponseEntity<Properties> getByName(@RequestBody Map<String, String> map){
        Properties property = propertyService.findPropertyByName(map.get("name"));
        return new ResponseEntity<>(property, HttpStatus.OK);
    }

    @GetMapping("/getByLocation")
    public ResponseEntity<Properties> getByLocation(@RequestBody Map<String, String> map){
        Properties property = propertyService.findPropertyByLocation(map.get("location"));
        return new ResponseEntity<>(property, HttpStatus.OK);
    }

    public boolean checkName(Properties properties){
        if(propertyService.findPropertyByName(properties.getName()) != null)
            return true;
        return false;
    }

    public boolean checkID(Properties properties){
        if(propertyService.findPropertyByID(properties.getId()) != null)
            return true;
        return false;
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody Map<String, String> map){
        Properties property = propertyService.findPropertyByName(map.get("name"));
        propertyService.deleteProperty(property);
        return new ResponseEntity<>("Property deleted successfully", HttpStatus.OK);
    }



    @PostMapping("/filterByAnythingProperties")
    public ResponseEntity<List<Properties>> filterByAnythingProperties(@RequestBody Map<String, String> map)  {
        String name = map.get("name");
        String location = map.get("location");
        String type = map.get("type");
        String startDate = map.get("startDate");
        String endDate = map.get("endDate");
        String price = map.get("price");
        int maxPrice = -1;
        if(price != null && price.length()>0)
            maxPrice = Integer.parseInt(price);

        SimpleDateFormat sdformat = new SimpleDateFormat("yyyy-MM-dd");
        Interval myInterval;

        List<Properties> properties = propertyRepository.findAll();
        if(properties.isEmpty()){
            return new ResponseEntity<>(properties, HttpStatus.OK);
        }

        if(maxPrice != -1) {
            boolean ok;
            for (Properties property : properties) {
                ok = false;
                for (Rooms room : property.getRooms()) {
                    if (room.getPrice() <= maxPrice) {
                        ok = true;
                        break;
                    }
                }
                if (!ok) {
                    properties.remove(property);
                    if(properties.isEmpty())
                        return new ResponseEntity<>(properties, HttpStatus.OK);
                }
            }
        }
        /*
        if(startDate != null && endDate != null && startDate.length()>0 && endDate.length()>0) {
            try {
                myInterval = new Interval(sdformat.parse(startDate), sdformat.parse(endDate));
            } catch (ParseException e) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            if(!myInterval.checkInterval()){
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            boolean ok;
            for (Properties property : properties) {
                ok = false;
                for (Rooms room : property.getRooms()) {
                    if (Interval.checkDisponibility(room.getIntervals(), myInterval) != -1) {
                        ok = true;
                        break;
                    }
                }
                if (!ok) {
                    properties.remove(property);
                    if (properties.isEmpty())
                        return new ResponseEntity<>(properties, HttpStatus.OK);
                }
            }
        }
        */
        if(name != null && name.length()>0){
            properties.removeIf(property -> !property.getName().startsWith(name));
            if (properties.isEmpty())
                return new ResponseEntity<>(properties, HttpStatus.OK);
        }
        if(location != null && location.length()>0){
            properties.removeIf(property -> !property.getLocation().startsWith(location));
            if (properties.isEmpty())
                return new ResponseEntity<>(properties, HttpStatus.OK);
        }
        if(type != null && type.length()>0){
            properties.removeIf(property -> !property.getType().startsWith(type));
            if (properties.isEmpty())
                return new ResponseEntity<>(properties, HttpStatus.OK);
        }

        return new ResponseEntity<>(properties, HttpStatus.OK);
    }


    @PostMapping("/getRooms")
    public ResponseEntity<List<Rooms>> getRooms(@RequestBody Map<String, String> map){
        Properties property = propertyService.findPropertyByName(map.get("name"));
        return new ResponseEntity<>(property.getRooms(), HttpStatus.OK);
    }

    @PutMapping("/add")
    public ResponseEntity<String> add(@RequestBody Map<String,String > map ){
        String username = map.get("username");
        String hotelName = map.get("hotelName");
        Accounts account = accountsRepository.findByUsername(username);
        Owners owner = ownersRepository.findByAccount(account);
        if(owner == null)
            return new ResponseEntity("Owner not found!", HttpStatus.BAD_REQUEST);

        String hotelId = null;
        for( Properties property : owner.getProperties())
        {
            if(hotelName.equals(property.getName()))
                hotelId = property.getId();
        }
        double price = Double.parseDouble(map.get("price"));
        int noPeople = Integer.parseInt(map.get("noPeople"));
        if(price < 0 || noPeople < 0)
            return new ResponseEntity("Invalid data!", HttpStatus.BAD_REQUEST);

        Optional<Properties> property = propertiesRepository.findById(hotelId);
        if(property.isPresent()) {
            Rooms room = new Rooms(price, noPeople, map.get("type"), map.get("description"));
            roomsRepository.save(room);
            property.get().getRooms().add(room);
            property.get().setNoOfRooms(property.get().getNoOfRooms() + 1);
            propertiesRepository.save(property.get());
            return new ResponseEntity("Room added successfully!", HttpStatus.OK);
        }
        return new ResponseEntity("Property does not exist!", HttpStatus.BAD_REQUEST);
    }


}
