package com.proiectip.boat.accounts;

import java.util.List;

public interface AccountService {
    public Accounts saveAccount(Accounts account);
    public List<Accounts> getAllAccounts();

    void deleteAccount(Accounts account);
}
