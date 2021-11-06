package transport

import (
	"be/datastruct"
	"be/service"
	"encoding/json"
	"log"
	"net/http"
	"time"
)

func TmbhTeman(w http.ResponseWriter, r *http.Request) {

	var teman datastruct.Teman

	err := json.NewDecoder(r.Body).Decode(&teman)

	teman.Requested_at = time.Now().Format("01-02-2006 15:04:05")
	teman.Responded_at = time.Now().Format("01-02-2006 15:04:05")
	teman.Status = "approved"

	if err != nil {
		log.Fatalf("Tidak bisa mendecode dari request body.  %v", err)
	}

	insertID := service.TambahTeman(teman)

	res := datastruct.Response1{
		ID_pengirim: insertID,
		Message:     "Data teman telah ditambahkan",
	}

	json.NewEncoder(w).Encode(res)
}
