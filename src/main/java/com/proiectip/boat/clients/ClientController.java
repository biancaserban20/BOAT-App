package com.proiectip.boat.clients;

import com.proiectip.boat.accounts.AccountService;
import com.proiectip.boat.accounts.Accounts;
import com.proiectip.boat.owners.Owners;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/clients")
@CrossOrigin
public class ClientController {

    @Autowired
    ClientsRepository clientsRepository;

    @Autowired
    AccountService accountService;

    @GetMapping("/list")
    public ResponseEntity<List<Owners>> list(){
        return new ResponseEntity(clientsRepository.findAll(), HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody Map<String, String> map){
        String idClient = map.get("_id");
        Clients client = clientsRepository.findById(idClient).get();
        if(client == null)
            return new ResponseEntity("Client not found!", HttpStatus.BAD_REQUEST);
        if(client.getAccount() != null) {
            accountService.deleteAccount(client.getAccount());
        }
        else {
            return new ResponseEntity("Account not found!", HttpStatus.BAD_REQUEST);
        }
        clientsRepository.deleteById(idClient);
        return new ResponseEntity("Client deleted succesfully!", HttpStatus.OK);
    }
}
