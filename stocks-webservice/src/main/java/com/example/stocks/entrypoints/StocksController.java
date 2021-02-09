package com.example.stocks.entrypoints;

import com.example.stocks.core.usecases.CreateStockUseCase;
import com.example.stocks.core.usecases.DeleteStockUseCase;
import com.example.stocks.core.usecases.GetStocksUseCase;
import com.example.stocks.dataproviders.persistence.jpa.JpaStocksDataProvider;
import com.example.stocks.dataproviders.persistence.jpa.StocksRepository;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StocksController {
    CreateStockUseCase createStockUseCase;
    DeleteStockUseCase deleteStockUseCase;
    GetStocksUseCase getStocksUseCase;
    StocksRepository repository;

    StocksController(StocksRepository repository) {
        this.repository = repository;

        JpaStocksDataProvider dataProvider = new JpaStocksDataProvider(repository);

        createStockUseCase = new CreateStockUseCase(dataProvider);
        deleteStockUseCase = new DeleteStockUseCase(dataProvider);
        getStocksUseCase = new GetStocksUseCase(dataProvider);
    }
}
