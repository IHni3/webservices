package com.example.stocks.entrypoints;

import com.example.stocks.core.domains.Stock;
import com.example.stocks.core.domains.User;
import com.example.stocks.core.usecases.CreateStockUseCase;
import com.example.stocks.core.usecases.DeleteStockUseCase;
import com.example.stocks.core.usecases.GetStocksUseCase;
import com.example.stocks.dataproviders.persistence.jpa.JpaStocksDataProvider;
import com.example.stocks.dataproviders.persistence.jpa.StocksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class StocksController {
    CreateStockUseCase createStockUseCase;
    DeleteStockUseCase deleteStockUseCase;
    GetStocksUseCase getStocksUseCase;
    StocksRepository repository;

    private static final String identityManagementUrl = "https://hostess:4000/idmgmt/";
    private static final String identityManagementCheckUrl = identityManagementUrl + "user/checkToken";

    @Autowired
    private RestTemplate restTemplate;

    StocksController(StocksRepository repository) {
        this.repository = repository;

        JpaStocksDataProvider dataProvider = new JpaStocksDataProvider(repository);

        createStockUseCase = new CreateStockUseCase(dataProvider);
        deleteStockUseCase = new DeleteStockUseCase(dataProvider);
        getStocksUseCase = new GetStocksUseCase(dataProvider);
    }

    @RequestMapping(value = "/stocks", method = RequestMethod.GET)
    public ResponseEntity<List<Stock>> getAll(String userToken) {

        if (!userToken.isEmpty()) {
            HttpHeaders headers = getHeaders();
            headers.set("Authorization", userToken);
            HttpEntity<String> jwtEntity = new HttpEntity<String>(headers);
            try {
                ResponseEntity<User> responseEntity = restTemplate.exchange(identityManagementCheckUrl, HttpMethod.GET, jwtEntity, User.class);

                if (responseEntity.getStatusCode().equals(HttpStatus.OK)) {
                    var user = responseEntity.getBody();
                    var id = user.getId();

                    var data = getStocksUseCase.findByUser(id);

                    return new ResponseEntity<>(data, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(new ArrayList<Stock>(), responseEntity.getStatusCode());
                }

            } catch (HttpClientErrorException e) {
                return new ResponseEntity<>(new ArrayList<Stock>(), e.getStatusCode());
            } catch (Exception e) {
                return new ResponseEntity<>(new ArrayList<Stock>(), HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else {
            System.out.println("JWT Token not present");
            return new ResponseEntity<>(new ArrayList<Stock>(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/stocks/{id}", method = RequestMethod.DELETE)

    public ResponseEntity<Stock> delete(@PathVariable("id") Long id, @RequestBody String userToken) {

        if (!userToken.isEmpty()) {
            HttpHeaders headers = getHeaders();
            headers.set("Authorization", userToken);
            HttpEntity<String> jwtEntity = new HttpEntity<String>(headers);
            try {
                ResponseEntity<User> responseEntity = restTemplate.exchange(identityManagementCheckUrl, HttpMethod.GET, jwtEntity, User.class);

                if (responseEntity.getStatusCode().equals(HttpStatus.OK)) {
                    var user = responseEntity.getBody();
                    var userId = user.getId();

                    Optional<Stock> stockOptional = getStocksUseCase.findById(userId);
                    if (stockOptional.isPresent()) {
                        deleteStockUseCase.deleteStock(id);
                        return new ResponseEntity<>(HttpStatus.OK);
                    } else
                        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                } else {
                    return new ResponseEntity<>(responseEntity.getStatusCode());
                }

            } catch (HttpClientErrorException e) {
                return new ResponseEntity<>(e.getStatusCode());
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else {
            System.out.println("JWT Token not present");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }



    }

    @RequestMapping(value = "/stocks", method = RequestMethod.PUT)
    public ResponseEntity<Stock> put(@RequestBody String userToken,@RequestBody String isin) {


        if (!userToken.isEmpty()) {
            HttpHeaders headers = getHeaders();
            headers.set("Authorization", userToken);
            HttpEntity<String> jwtEntity = new HttpEntity<String>(headers);
            try {
                ResponseEntity<User> responseEntity = restTemplate.exchange(identityManagementCheckUrl, HttpMethod.GET, jwtEntity, User.class);

                if (responseEntity.getStatusCode().equals(HttpStatus.OK)) {
                    var user = responseEntity.getBody();
                    var userId = user.getId();


                    var stock = new Stock();
                    stock.setUserId(userId);
                    stock.setIsinNumber(isin);

                    Stock savedPerson = createStockUseCase.create(stock);
                    return new ResponseEntity<>(savedPerson, HttpStatus.OK);

                } else {
                    return new ResponseEntity<>(responseEntity.getStatusCode());
                }

            } catch (HttpClientErrorException e) {
                return new ResponseEntity<>(e.getStatusCode());
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else {
            System.out.println("JWT Token not present");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }




    }

    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        return headers;
    }


}
