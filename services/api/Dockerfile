FROM gradle:5.5

WORKDIR /home/sa-api

COPY src /home/sa-api/src
COPY build.gradle.kts /home/sa-api/build.gradle.kts
COPY gradle.properties /home/sa-api/gradle.properties
COPY settings.gradle /home/sa-api/settings.gradle

RUN gradle build

ENV SA_LOGIC_URL=http://logic:5000

EXPOSE 8080

ENTRYPOINT ["gradle"]

CMD ["run", "--args=\"--com.sa.logic.url=${SA_LOGIC_URL}\""]
