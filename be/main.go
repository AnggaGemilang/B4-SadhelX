package main

import (
	"be/router"
	"fmt"
	"log"
	"net/http"
)

func main() {

	r := router.Router()

	fmt.Println("Server dijalankan pada port 8080...")
	log.Fatal(http.ListenAndServe(":8080", r))

}
