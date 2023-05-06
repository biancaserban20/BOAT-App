package com.proiectip.boat.accounts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
@CrossOrigin
public class AccountController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private AccountsRepository accountsRepository;

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Accounts account){
        // daca exista email-ul sau username-ul in baza de date, nu se mai adauga
        if(checkEmail(account))
            return new ResponseEntity<>("Email already exists!", HttpStatus.BAD_REQUEST);

        if(checkUsername(account))
            return new ResponseEntity<>("Username already exists!", HttpStatus.BAD_REQUEST);

        // altfel, adaugam contul
        accountService.saveAccount(account);
        return new ResponseEntity<>("Account added successfully!", HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity< List<Accounts>> list(){
        return new ResponseEntity<>(accountService.getAllAccounts(), HttpStatus.OK);
    }

    @GetMapping("/checkEmailAndPassword")
    public ResponseEntity<String> check(@RequestBody Accounts accounts){
        if (accountsRepository.findByUsernameAndPassword(accounts.getUsername(), accounts.getPassword()) != null)
            return new ResponseEntity<>("Account found!", HttpStatus.OK);

        return new ResponseEntity<>("Account not found!", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/checkUsernameAndPassword")
    public boolean checkUsernameAndPassword(@RequestBody Accounts accounts){
        List<Accounts> list_aux = accountService.getAllAccounts();
        for (Accounts account : list_aux){
            if(account.getUsername().equals(accounts.getUsername()) && account.getPassword().equals(accounts.getPassword()))
                return true;
        }
        return false;
    }


    public boolean checkEmail(Accounts accounts){
        List<Accounts> list_aux = accountService.getAllAccounts();
        for (Accounts account : list_aux){
            if(account.getEmail().equals(accounts.getEmail()))
                return true;
        }
        return false;
    }

    @GetMapping("/checkUsername")
    public boolean checkUsername(@RequestBody Accounts accounts){
        List<Accounts> list_aux = accountService.getAllAccounts();
        for (Accounts account : list_aux){
            if(account.getUsername().equals(accounts.getUsername()))
                return true;
        }
        return false;
    }

    @DeleteMapping("/delete/{username}")
    public boolean delete(@PathVariable String username){
        List<Accounts> list_aux = accountService.getAllAccounts();
        for (Accounts account : list_aux){
            if(account.getUsername().equals(username)){
                accountService.deleteAccount(account);
                return true;
            }
        }
        return false;
    }

    @PutMapping("/update/{password}/{username}")
    public boolean update(@PathVariable String password, @PathVariable String username){
        List<Accounts> list_aux = accountService.getAllAccounts();
        for (Accounts account : list_aux){
            if(account.getUsername().equals(username)){
                account.setPassword(password);
                return true;
            }
        }
        return false;
    }
}

