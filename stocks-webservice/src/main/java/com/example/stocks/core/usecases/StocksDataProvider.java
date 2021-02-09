package com.example.stocks.core.usecases;

import com.example.stocks.core.domains.Stock;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

public interface StocksDataProvider {
    Optional<Stock> findById(UUID id);
    void deleteById(UUID id);
    List<Stock> findByUser(UUID userId);
    Stock save(Stock stock);
    List<Stock> findAll();
}
