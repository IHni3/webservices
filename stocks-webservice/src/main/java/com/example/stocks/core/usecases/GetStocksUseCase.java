package com.example.stocks.core.usecases;

import com.example.stocks.core.domains.Stock;

import java.util.List;
import java.util.Optional;

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
    public List<Stock> findByUser(Long userId)
    {
        return dataProvider.findByUser(userId);
    }
    public Optional<Stock> findById(Long id)
    {
        return dataProvider.findById(id);
    }
}
