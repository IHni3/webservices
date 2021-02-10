package com.example.stocks.core.usecases;

import com.example.stocks.core.domains.Stock;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class GetStocksUseCase {
    private StocksDataProvider dataProvider;

    public GetStocksUseCase(StocksDataProvider dataProvider)
    {
        this.dataProvider = dataProvider;
    }

    public List<Stock> findAll()
    {
        return dataProvider.findAll();
    }
    public List<Stock> findByUser(UUID userId)
    {
        return dataProvider.findByUser(userId);
    }
    public Optional<Stock> findById(UUID id)
    {
        return dataProvider.findById(id);
    }
}
