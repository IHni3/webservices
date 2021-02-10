package com.example.stocks.entrypoints;

import com.example.stocks.core.domains.Stock;
import com.example.stocks.core.usecases.CreateStockUseCase;
import com.example.stocks.core.usecases.DeleteStockUseCase;
import com.example.stocks.core.usecases.GetStocksUseCase;
import com.example.stocks.dataproviders.persistence.jpa.JpaStocksDataProvider;
import com.example.stocks.dataproviders.persistence.jpa.StocksRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

    @RequestMapping(value = "/stocks", method = RequestMethod.GET)
    public ResponseEntity<List<Stock>> getAll()
    {
        List<Stock> personList = getStocksUseCase.findAll();
        return new ResponseEntity<>(personList, HttpStatus.OK);
    }

    @RequestMapping(value = "/stocks/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Stock> delete(@PathVariable("id") UUID id)
    {
        Optional<Stock> stockOptional = getStocksUseCase.findById(id);
        if(stockOptional.isPresent()) {
            deleteStockUseCase.deleteStock(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @RequestMapping(value = "/stocks", method = RequestMethod.PUT)
    public ResponseEntity<Stock> put(@RequestBody Stock stock)
    {
        Stock savedPerson = createStockUseCase.create(stock);
        return new ResponseEntity<>(savedPerson, HttpStatus.OK);
    }

}
