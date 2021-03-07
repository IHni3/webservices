package com.example.stocks.dataproviders.persistence.jpa;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StocksRepository extends CrudRepository<StockEntity, Long> {
    List<StockEntity> findByUserId(Long userId);
}
