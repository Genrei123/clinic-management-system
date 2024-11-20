package com.jwt.spring_security.service;

import com.jwt.spring_security.model.Item;
import com.jwt.spring_security.repo.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemService {

    @Autowired
    ItemRepo itemRepo;


    public boolean deleteByItemID(Long itemID) {
        Item itemExists = itemRepo.findByItemID(itemID);

        if (itemExists != null) {
            itemRepo.delete(itemExists);
            return true;
        }

        return false;
    }


}
