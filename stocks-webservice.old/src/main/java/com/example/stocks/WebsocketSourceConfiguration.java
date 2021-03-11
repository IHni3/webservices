package com.example.stocks;

import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;

public class WebsocketSourceConfiguration {
    @Bean
    ServletWebServerFactory servletWebServerFactory() {
        return new TomcatServletWebServerFactory();
    }
}