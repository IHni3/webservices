package com.example.stocks.dataproviders.persistence.jpa;

import com.example.stocks.core.domains.Stock;
import com.example.stocks.core.usecases.StocksDataProvider;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class JpaStocksDataProvider implements StocksDataProvider {

    private final StocksRepository repository;
    public JpaStocksDataProvider(StocksRepository repository) {
        this.repository = repository;
    }

    public static Stock toDto(StockEntity entity) {

        return new Stock(entity.getId(),
                entity.getIsin(),
                entity.getUserId());
    }

    public static StockEntity toEntity(Stock stock) {

        return new StockEntity(stock.getId(),
                stock.getIsinNumber(),
                stock.getUserId());
    }



    private static List<Stock> toDtoList(Iterable<StockEntity> listEntity) {

        List<Stock> listDTO = new LinkedList<>();

        for (StockEntity entity : listEntity) {
            listDTO.add(toDto(entity));
        }

        return listDTO;
    }


    public Optional<Stock> findById(Long id) {
        Optional<StockEntity> entity = repository.findById(id);
        return entity.map(JpaStocksDataProvider::toDto);
    }

    public Stock save(Stock dto) {
        //if (dto.getId() == null) {
        //    dto.setId(UUID.randomUUID());
        //}

        StockEntity entity = toEntity(dto);
        entity = repository.save(entity);
        return toDto(entity);
    }

    @Override
    public List<Stock> findAll() {
        return toDtoList(repository.findAll());
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<Stock> findByUser(Long userId) {
        return toDtoList(repository.findByUserId(userId));
    }


}