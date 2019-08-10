import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.3.41"
    application
}

group = "com.sa"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation(kotlin("stdlib-jdk8"))

    compile("org.springframework.boot", "spring-boot-starter-web", "2.1.7.RELEASE")
    testCompile("org.springframework.boot", "spring-boot-starter-test", "2.1.7.RELEASE")
}

tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}

application {
    mainClassName = "com.sa.api.MainKt"
}
