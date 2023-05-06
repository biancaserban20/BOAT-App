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
}
