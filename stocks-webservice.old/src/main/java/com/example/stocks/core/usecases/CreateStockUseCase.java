package com.example.stocks.core.usecases;

import com.example.stocks.core.domains.Stock;

public class CreateStockUseCase {
    private StocksDataProvider dataProvider;

    public CreateStockUseCase(StocksDataProvider dataProvider)
    {
        this.dataProvider = dataProvider;
    }

    public Stock create(Stock stock)
    {
        return dataProvider.save(stock);
    }
}
