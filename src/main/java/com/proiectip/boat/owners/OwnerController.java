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
    public ResponseEntity<String> addPropertyInOwner(@RequestBody Properties property){
        String idOwner = property.getOwner();
        Optional<Owners> owner = ownersRepository.findById(idOwner);
        if(owner.isPresent()) {
            propertiesRepository.save(property);
            owner.get().getProperties().add(property.getId());
            ownersRepository.save(owner.get());
            return new ResponseEntity("Property added succesfully!", HttpStatus.OK);
        }
        return new ResponseEntity("Owner not found!", HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/deletePropertyInOwner")
    public ResponseEntity<String> deletePropertyInOwner(@RequestBody Map<String, String> map){
        String idOwner = map.get("owner");
        String idProperty = map.get("_id");
        Optional<Owners> owner = ownersRepository.findById(idOwner);
        if(owner.isPresent()) {
            owner.get().getProperties().remove(idProperty);
            ownersRepository.save(owner.get());
            propertiesRepository.deleteById(idProperty);
            return new ResponseEntity("Property deleted succesfully!", HttpStatus.OK);
        }
        return new ResponseEntity("Owner not found!", HttpStatus.BAD_REQUEST);
    }
}
