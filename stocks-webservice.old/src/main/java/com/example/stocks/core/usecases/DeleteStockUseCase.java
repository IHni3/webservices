package com.example.stocks.core.usecases;

public class DeleteStockUseCase {
    private StocksDataProvider dataProvider;

    public DeleteStockUseCase(StocksDataProvider dataProvider)
    {
        this.dataProvider = dataProvider;
    }

    public void deleteStock(Long id)
    {
        dataProvider.deleteById(id);
    }
}
