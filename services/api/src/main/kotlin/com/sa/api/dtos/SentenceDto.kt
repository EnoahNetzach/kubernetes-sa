package com.sa.api.dtos

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonProperty

class SentenceDto @JsonCreator constructor(
    @JsonProperty("sentence") val sentence: String
)
