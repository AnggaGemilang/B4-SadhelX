package transport

import (
	"be/datastruct"
	"be/logging"
	"be/service"
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
	response, _ := http.Get(getApiMember)

	if response.StatusCode != 200 {
		w.WriteHeader(response.StatusCode)
		w.Write([]byte("Not found"))
		return
	}

	responseData, err := ioutil.ReadAll(response.Body)

	if err != nil {
		log.Fatal(err)
	}

	json.Unmarshal(responseData, &member)

	if member.Isprivate {
		teman.Status = "approved"
	} else {
		teman.Status = "pending"
	}

	service.TambahTeman(teman)

	logging.Log(fmt.Sprintf("%d mengirimkan pertemanan ke %d", teman.Pengirim_id, teman.Penerima_id))

	res := datastruct.Response1{
		ID_pengirim: teman.Pengirim_id,
		ID_penerima: teman.Penerima_id,
		Is_private:  member.Isprivate,
		Message:     "Data teman telah ditambahkan",
	}

	w.WriteHeader(201)
	json.NewEncoder(w).Encode(res)
}
