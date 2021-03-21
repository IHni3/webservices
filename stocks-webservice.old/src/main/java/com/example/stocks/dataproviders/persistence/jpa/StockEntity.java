package com.example.stocks.dataproviders.persistence.jpa;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name="stocks") //, schema = "myapp")
public class StockEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String isin;
    private Long userId;

    protected StockEntity() {}

    public StockEntity(Long id, String isin, Long userId) {
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

    public Long getId() {
        return id;
    }

    public String getIsin() {
        return isin;
    }

    public Long getUserId() {
        return userId;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public void setIsin(String isin) {
        this.isin = isin;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}