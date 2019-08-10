package com.sa.api.dtos

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonProperty

class SentimentDto @JsonCreator constructor(
    @JsonProperty("sentence") val sentence: String,
    @JsonProperty("polarity") val polarity: Double
)