#!/usr/bin/env bash

up(){
    docker-compose up -d --build db viewer
}

down(){
    docker-compose down "$@"
}

$@