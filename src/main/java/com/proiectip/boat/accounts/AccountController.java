package com.proiectip.boat.accounts;

import com.proiectip.boat.owners.OwnerService;
import com.proiectip.boat.owners.Owners;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/accounts")
@CrossOrigin
public class AccountController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private OwnerService ownerService;

    // for SIGN UP
    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Map<String,String>map){
        // daca exista email-ul sau username-ul in baza de date, nu se mai adauga
        Accounts account = new Accounts(map.get("username"), map.get("password"), map.get("email"),
                    map.get("role"), map.get("firstName"), map.get("lastName"));
        if(checkEmail(account))
            return new ResponseEntity<>("Email already exists!", HttpStatus.BAD_REQUEST);

        if(checkUsername(account.getUsername()))
            return new ResponseEntity<>("Username already exists!", HttpStatus.BAD_REQUEST);

        // altfel, adaugam contul
        accountService.saveAccount(account);

        // dacă contul este de tip owner, adăugăm și owner-ul
        if(account.getRole().equals("Owner")) {
            Owners owner;
            owner = new Owners(account.getId());
            ownerService.saveOwner(owner);
        }
        else if(account.getRole().equals("Client")) {} // de adaugat clientul cand il fac

        return new ResponseEntity<>("Account added successfully!", HttpStatus.OK);
    }

    // for LOG IN
    @GetMapping("/checkEmailAndPassword")
    public ResponseEntity<String> check(@RequestParam(value = "username") String username,
                                        @RequestParam(value = "password") String password){
        if (accountService.findByUsernameAndPassword(username, password) != null)
            return new ResponseEntity<>("Account found!", HttpStatus.OK);

        return new ResponseEntity<>("Account not found!", HttpStatus.BAD_REQUEST);
    }

    // return all accounts
    @GetMapping("/getAll")
    public ResponseEntity< List<Accounts>> list(){
        return new ResponseEntity<>(accountService.getAllAccounts(), HttpStatus.OK);
    }

    public boolean checkEmail(Accounts accounts){
        return accountService.findByEmail(accounts.getEmail()) != null;
    }

    public boolean checkUsername(String username){
        return accountService.findByUsername(username) != null;
    }

    // delete account
    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam(value = "username") String username) {
            if(accountService.findByUsername(username) != null) {
                // DE MODIFICAT - stergere (trebuie sters ori client ori proprietar)
                Accounts account = accountService.findByUsername(username);
                if (account.getRole().equals("Client"))
                    accountService.deleteAccount(accountService.findByUsername(username));
                else
                    ownerService.deleteOwner(ownerService.findByAccountId(account.getId()));

                return new ResponseEntity<>("Account deleted successfully!", HttpStatus.OK);
            }
            return new ResponseEntity<>("Account not found!", HttpStatus.BAD_REQUEST);
    }

    // change password
    @PutMapping("/update")
    public boolean update(@RequestBody Map<String, String> map){
        String username = map.get("username");
        String password = map.get("password");
        if(accountService.findByUsername(username) != null){
            Accounts account = accountService.findByUsername(username);
            account.setPassword(password);
           // accountService.saveAccount(account); => nu stiu daca trebuie save, de testat la change password
            return true;
        }
        return false;
    }
}

