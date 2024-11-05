package com.jwt.spring_security.repo;

import com.jwt.spring_security.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

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
