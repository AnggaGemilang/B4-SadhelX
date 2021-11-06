package transport

import (
	"aph-go-service/datastruct"
	"aph-go-service/logging"
	"aph-go-service/service"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func TmbhTeman(w http.ResponseWriter, r *http.Request) {

	var teman datastruct.Teman
	var member datastruct.Member

	err := json.NewDecoder(r.Body).Decode(&teman)

	if err != nil {
		log.Fatalf("Tidak bisa mendecode dari request body.  %v", err)
	}

	teman.Requested_at = logging.GetDateTimeNowInString()
	teman.Responded_at = logging.GetDateTimeNowInString()

	getApiMember := fmt.Sprintf("https://617774f89c328300175f5973.mockapi.io/api/sadhelx/member/%d", teman.Penerima_id)
	response, err := http.Get(getApiMember)

	if err != nil {
		log.Fatalf("Tidak bisa mendecode dari request body member.  %v", err)
	}

	responseData, err := ioutil.ReadAll(response.Body)

	fmt.Println(&responseData)

	json.Unmarshal(responseData, &member)

	if err != nil {
		log.Fatal(err)
	}

	if member.Isprivate {
		teman.Status = "approved"
	} else {
		teman.Status = "pending"
	}

	insertID := service.TambahTeman(teman)

	logging.Log(fmt.Sprintf("%d mengirimkan pertemanan ke %d", teman.Pengirim_id, teman.Penerima_id))

	res := datastruct.Response1{
		ID_pengirim: insertID,
		Message:     "Data teman telah ditambahkan",
	}

	json.NewEncoder(w).Encode(res)
}
