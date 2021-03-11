package com.example.stocks.core.domains;

import com.google.gson.Gson;

import java.util.Objects;

public class Stock
{

    private Long id;
    private String isinNumber;
    private Long userId;
    private static Gson gson;



    public Stock() {
        gson = new Gson();
    }

    public Stock(Long id, String isinNumber, Long userId) {
        this.id = id;
        this.isinNumber = isinNumber;
        this.userId = userId;
        gson = new Gson();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIsinNumber() {
        return isinNumber;
    }

    public void setIsinNumber(String isinNumber) {
        this.isinNumber = isinNumber;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if(o instanceof Stock) {
            Stock that = (Stock) o;
            return id.equals(that.id) &&
                    isinNumber.equals(that.isinNumber) &&
                    userId.equals(that.userId);
        }
        else
        {
            return false;
        }
    }

    public String toJson()
    {
        return gson.toJson(this);
    }

    public static Stock fromJson(String json)
    {
        return gson.fromJson(json, Stock.class);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, isinNumber, userId);
    }
}
