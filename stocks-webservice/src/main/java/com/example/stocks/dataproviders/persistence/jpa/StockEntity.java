package com.example.stocks.dataproviders.persistence.jpa;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Entity
public class StockEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private UUID id;
    private String isin;
    private UUID userId;

    protected StockEntity() {}

    public StockEntity(UUID id, String isin, UUID userId) {
        this.id = id;
        this.isin = isin;
        this.userId = userId;
    }

    @Override
    public String toString() {
        return String.format(
                "Stock[id=%s, isin='%s', userId='%s']",
                id, isin, userId);
    }

    public UUID getId() {
        return id;
    }

    public String getIsin() {
        return isin;
    }

    public UUID getUserId() {
        return userId;
    }
    public void setId(UUID id) {
        this.id = id;
    }

    public void setIsin(String isin) {
        this.isin = isin;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }
}