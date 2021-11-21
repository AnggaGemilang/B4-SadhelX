package router

import (
	"be/transport"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/teman", transport.TmbhTeman).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/teman/{id}", transport.TmplknTeman).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/teman/{id}/{query}", transport.CariTeman).Methods("GET", "OPTIONS")

	return router
}
