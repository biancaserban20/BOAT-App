package com.proiectip.boat.accounts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountsRepository accountsRepository;

    @Override
    public Accounts saveAccount(Accounts account) {
        return accountsRepository.save(account);
    }

    @Override
    public List<Accounts> getAllAccounts() {
        return accountsRepository.findAll();
    }

    @Override
    public void deleteAccount(Accounts account) {
        accountsRepository.delete(account);
    }

    @Override
    public Accounts findByUsernameAndPassword(String username, String password) {
        return accountsRepository.findByUsernameAndPassword(username, password);
    }

    @Override
    public Accounts findByEmail(String email) {
        return accountsRepository.findByEmail(email);
    }

    @Override
    public Accounts findByUsername(String username) {
        return accountsRepository.findByUsername(username);
    }

    @Override
    public Accounts findById(String idAccount) {
        return accountsRepository.findAccountById(idAccount);
    }
}
