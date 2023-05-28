package com.proiectip.boat.owners;
import com.proiectip.boat.accounts.AccountService;
import com.proiectip.boat.accounts.Accounts;
import com.proiectip.boat.properties.Properties;
import com.proiectip.boat.properties.PropertiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/owners")
@CrossOrigin
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    @Autowired
    private OwnersRepository ownersRepository;

    @Autowired
    private AccountService accountService;

    @Autowired
    private PropertiesRepository propertiesRepository;

    @GetMapping("/list")
    public ResponseEntity<List<Owners>> list(){
        return new ResponseEntity(ownerService.getAllOwners(), HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody Map<String, String> map){
        String idOwner = map.get("_id");
        String idAccount = map.get("account");
        Accounts account = accountService.findById(idAccount);
        if(account != null) {
            accountService.deleteAccount(account);
        }
        else {
            return new ResponseEntity("Account not found!", HttpStatus.BAD_REQUEST);
        }
        ownersRepository.deleteById(idOwner);
        return new ResponseEntity("Owner deleted succesfully!", HttpStatus.OK);
    }

    // adauga id-ul proprietatii in lista de proprietati a ownerului
    @PutMapping("/addPropertyInOwner")
    public ResponseEntity<String> addPropertyInOwner(@RequestBody Map<String,String> map){
        String username = map.get("username");
        Accounts account = accountService.findByUsername(username);
        Owners owner = ownerService.findByAccount(account);
        if(owner == null)
            return new ResponseEntity("Owner not found!", HttpStatus.BAD_REQUEST);

        // Verificare daca proprietatea exista deja
        String name = map.get("name");
        Properties verify_property = propertiesRepository.findPropertyByName(name);
        if(verify_property!=null)
            return new ResponseEntity("Property with the same name already exists!", HttpStatus.BAD_REQUEST);

        // Adaugare proprietate
        String location = map.get("location");
        String description = map.get("description");
        String typeOfProperty = map.get("typeOfProperty");
        String image = map.get("image");
        Properties property = new Properties(name, location, description, typeOfProperty, image);

        propertiesRepository.save(property);
        owner.getProperties().add(property);
        ownersRepository.save(owner);
        return new ResponseEntity("Property added succesfully!", HttpStatus.OK);
    }

//    @DeleteMapping("/deletePropertyInOwner")
//    public ResponseEntity<String> deletePropertyInOwner(@RequestBody Map<String, String> map){
//        String idProperty = map.get("_id");
//        Properties property = propertiesRepository.findById(idProperty).get();
//        if(property == null) {
//            return new ResponseEntity("Property not found!", HttpStatus.BAD_REQUEST);
//        }
//        Optional<Owners> owner = ownersRepository.findById(property.getOwner().getId());
//        if(owner.isPresent()) {
//            owner.get().getProperties().remove(idProperty);
//            ownersRepository.save(owner.get());
//            propertiesRepository.deleteById(idProperty);
//            return new ResponseEntity("Property deleted successfully!", HttpStatus.OK);
//        }
//        return new ResponseEntity("Owner not found!", HttpStatus.BAD_REQUEST);
//    }

    @GetMapping("/getPropertyIdByName")
    public ResponseEntity<String> propertyIdByName(@RequestParam(value = "username") String username,@RequestParam(value = "hotelName") String hotelName){
        Accounts account = accountService.findByUsername(username);
        Owners owner = ownerService.findByAccount(account);
        if(owner == null)
            return new ResponseEntity("Owner not found!", HttpStatus.BAD_REQUEST);

        String hotelId = null;
        for( Properties prop : owner.getProperties())
        {
            if(hotelName.equals(prop.getName()))
                hotelId = prop.getId();
        }
        return new ResponseEntity<>(hotelId, HttpStatus.OK);
    }

    @GetMapping("/getProperties")
    public ResponseEntity<List<Properties>> getPropertiesByOwnerUsername(@RequestBody Map<String, String> map){
        String username = map.get("username");
        Accounts account = accountService.findByUsername(username);
        Owners owner = ownerService.findByAccount(account);
        if(owner == null)
            return new ResponseEntity("Owner not found!", HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(owner.getProperties(), HttpStatus.OK);
    }
}
