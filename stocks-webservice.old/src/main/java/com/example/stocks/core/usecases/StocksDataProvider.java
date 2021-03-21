package com.example.stocks.core.usecases;

import com.example.stocks.core.domains.Stock;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

public interface StocksDataProvider {
    Optional<Stock> findById(Long id);
    void deleteById(Long id);
    List<Stock> findByUser(Long userId);
    Stock save(Stock stock);
    List<Stock> findAll();
}
