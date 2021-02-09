package com.example.stocks.dataproviders.persistence.jpa;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface StocksRepository extends CrudRepository<StockEntity, UUID> {
    List<StockEntity> findByUserId(UUID userId);
}
