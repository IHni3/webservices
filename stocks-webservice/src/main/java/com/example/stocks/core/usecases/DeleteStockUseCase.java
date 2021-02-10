package com.example.stocks.core.usecases;

import java.util.UUID;

public class DeleteStockUseCase {
    private StocksDataProvider dataProvider;

    public DeleteStockUseCase(StocksDataProvider dataProvider)
    {
        this.dataProvider = dataProvider;
    }

    public void deleteStock(UUID id)
    {
        dataProvider.deleteById(id);
    }
}
