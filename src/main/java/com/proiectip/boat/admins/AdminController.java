package com.proiectip.boat.admins;

import com.proiectip.boat.accounts.AccountsRepository;
import com.proiectip.boat.owners.Owners;
import com.proiectip.boat.owners.OwnersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/admins")
@CrossOrigin
public class AdminController {

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    OwnersRepository ownersRepository;

    @Autowired
    AccountsRepository accountsRepository;

    @GetMapping("/list")
    public ResponseEntity<List<Admins>> list(){
        return new ResponseEntity(adminRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Admins admin){
        Optional<Admins> admin1 = adminRepository.findById(admin.getId());
        if(admin1.isPresent())
            return new ResponseEntity("Admin already exists!", HttpStatus.BAD_REQUEST);
        adminRepository.save(admin);
        return new ResponseEntity("Admin added successfully!", HttpStatus.OK);
    }

    @GetMapping("/getRequests")
    public ResponseEntity<List<Owners>> getRequests(){
        return new ResponseEntity(ownersRepository.findByAcceptedFalse(), HttpStatus.OK);
    }

    @PutMapping("/acceptRequest")
    public ResponseEntity<String> acceptRequest(@RequestBody Map<String, String> map){
        Optional<Owners> owner = ownersRepository.findById(map.get("_id"));
        if(owner.isPresent()) {
            if(owner.get().isAccepted())
                return new ResponseEntity("Owner has already been accepted!", HttpStatus.BAD_REQUEST);
        }
        owner.get().setAccepted(true);
        ownersRepository.save(owner.get());
        return new ResponseEntity("Owner has been accepted!", HttpStatus.OK);
    }

    @DeleteMapping("/declineRequest")
    public ResponseEntity<String> declineRequest(@RequestBody Map<String, String> map){
        Optional<Owners> owner = ownersRepository.findById(map.get("_id"));
        if(owner.isPresent()) {
            String idAccount = owner.get().getAccount().getId();
            String idOwner = owner.get().getId();
            ownersRepository.deleteById(idOwner);
            accountsRepository.deleteById(idAccount);
            return new ResponseEntity("Owner request has been declined!", HttpStatus.OK);
        }
        return new ResponseEntity("Owner has not been found!", HttpStatus.BAD_REQUEST);
    }
}
