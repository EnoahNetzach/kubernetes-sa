package com.sa.api.controllers

import com.sa.api.dtos.SentenceDto
import com.sa.api.dtos.SentimentDto
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.client.RestTemplate

@RestController
@CrossOrigin("*")
class SentimentController {
    @Value("\${com.sa.logic.url}")
    private val saLogicUrl: String? = null

    private val restTemplate: RestTemplate = RestTemplate()

    @PostMapping("/sentiment")
    fun sentiment(@RequestBody sentence: SentenceDto): ResponseEntity<SentimentDto> {
        return ResponseEntity.ok(
            restTemplate.postForEntity(
                "$saLogicUrl/analyse/sentiment",
                sentence,
                SentimentDto::class.java
            ).body
        )
    }
}
