package router

import (
	"be/transport"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/following", transport.TmbhTeman).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/follower/{id}", transport.TmplknTeman).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/following/{id}", transport.TmplknTeman).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/follower/{id}/{query}", transport.CariTeman).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/following/{id}/{query}", transport.CariTeman).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/teman", transport.TmbhTeman).Methods("DELETE", "OPTIONS")

	return router
}
