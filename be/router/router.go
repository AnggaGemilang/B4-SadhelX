package router

import (
	"be/transport"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/following", transport.TmbhTeman).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/follower/{id}", transport.TmplknTeman).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/follower/request/{id}", transport.TmplknFollowRequest).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/following/{id}", transport.TmplknTeman).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/follower/{id}/{query}", transport.CariTeman).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/following/{id}/{query}", transport.CariTeman).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/following/{penerima}/{pengirim}", transport.HapusTeman).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/follower/{penerima}/{pengirim}", transport.AcceptFollowRequest).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/follower/{penerima}/{pengirim}", transport.DeclineFollowRequest).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/member/suggest/{id}", transport.SggstMember).Methods("GET", "OPTIONS")

	// ===============================================================

	router.HandleFunc("/api/member", transport.GtMultipleMember).Methods("GET", "OPTIONS")

	return router
}
