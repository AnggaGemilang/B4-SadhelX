package main

import (
	"aph-go-service/router"
	"fmt"
	"log"
	"net/http"
)

func main() {

	// logger := log.NewLogfmtLogger(os.Stdout)

	// transport.RegisterHttpsServicesAndStartListener()

	// port := os.Getenv("PORT")
	// if port == "" {
	// 	port = "8080"
	// }

	// logger.Log("listening-on", port)
	// if err := http.ListenAndServe(":"+port, nil); err != nil {
	// 	logger.Log("listen.error", err)
	// }

	r := router.Router()

	// fs := http.FileServer(http.Dir("build"))
	// http.Handle("/", fs)

	fmt.Println("Server dijalankan pada port 8080...")
	log.Fatal(http.ListenAndServe(":8080", r))

}
