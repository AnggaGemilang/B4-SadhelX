package router

import (
	"aph-go-service/transport"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/teman", transport.TmbhTeman).Methods("POST", "OPTIONS")

	return router
}
