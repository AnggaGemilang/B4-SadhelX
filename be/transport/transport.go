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
	"strconv"
	"strings"

	"github.com/gorilla/mux"
)

func TmbhTeman(w http.ResponseWriter, r *http.Request) {

	var teman datastruct.Teman
	var member datastruct.Member

	err := json.NewDecoder(r.Body).Decode(&teman)
	if err != nil {
		log.Fatalf("Tidak bisa mendecode dari request body.  %v", err)
	}

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

	teman.Requested_at = logging.GetDateTimeNowInString()
	teman.Responded_at = logging.GetDateTimeNowInString()
	if member.Isprivate {
		teman.Status = "pending"
	} else {
		teman.Status = "approved"
	}

	service.TambahTeman(teman)

	logging.Log(fmt.Sprintf("%d mengirimkan pertemanan ke %d", teman.Pengirim_id, teman.Penerima_id))

	res := datastruct.Response1{
		Status:      "Berhasil",
		Message:     "Data teman telah ditambahkan",
		ID_pengirim: teman.Pengirim_id,
		ID_penerima: teman.Penerima_id,
		Is_private:  member.Isprivate,
	}

	w.WriteHeader(201)
	json.NewEncoder(w).Encode(res)
}

func TmplknTeman(w http.ResponseWriter, r *http.Request) {

	var list_member []datastruct.Member
	var limited_member []datastruct.Member
	var getAPIMember string

	message := ""
	jmlData := 0
	batasAkhir := 0

	params := mux.Vars(r)

	path := strings.Split(r.URL.Path, "/")

	id, err := strconv.Atoi(params["id"])

	limit, limitErr := strconv.Atoi(r.URL.Query().Get("limit"))

	if limitErr != nil {
		limit = 0
	}

	page, pageErr := strconv.Atoi(r.URL.Query().Get("page"))

	if pageErr != nil {
		page = 0
	}

	list_teman, err := service.TampilkanTeman(int64(id), path[2])

	if err != nil {
		log.Fatalf("Tidak bisa mengambil data. %v", err)
	}

	for _, element := range list_teman {

		var member datastruct.Member

		if path[2] == "following" {
			getAPIMember = fmt.Sprintf("https://617774f89c328300175f5973.mockapi.io/api/sadhelx/member/%d", element.Penerima_id)
		} else {
			getAPIMember = fmt.Sprintf("https://617774f89c328300175f5973.mockapi.io/api/sadhelx/member/%d", element.Pengirim_id)
		}

		response, _ := http.Get(getAPIMember)
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

		list_member = append(list_member, member)
		jmlData++
	}

	if page != 0 && limit != 0 {
		if page == 1 {
			for i := 0; i < page*limit; i++ {
				if i < jmlData {
					limited_member = append(limited_member, list_member[i])
					batasAkhir = i + 1
				} else {
					break
				}
			}
			message = fmt.Sprintf("1 - %d data ditampilkan", batasAkhir)
		} else if page > 1 {
			for i := (page * limit) - limit; i < page*limit; i++ {
				if i < jmlData {
					limited_member = append(limited_member, list_member[i])
					batasAkhir = i + 1
				} else {
					break
				}
			}
			message = fmt.Sprintf("%d - %d data ditampilkan", (page*limit)-limit, batasAkhir)
		}
	}

	if path[2] == "following" {
		logging.Log(fmt.Sprintf("%d menampilkan data following", id))
	} else {
		logging.Log(fmt.Sprintf("%d menampilkan data follower", id))
	}

	var response datastruct.Response3
	response.Status = "Berhasil"
	response.TotalData = jmlData
	response.Limit = limit
	response.Page = page
	if limit == 0 || page == 0 {
		response.Message = fmt.Sprintf("%d data ditampilkan", jmlData)
		response.Data = list_member
	} else {
		response.Message = message
		response.Data = limited_member
	}
	json.NewEncoder(w).Encode(response)
}

func CariTeman(w http.ResponseWriter, r *http.Request) {

	var list_member []datastruct.Member
	var selected_member []datastruct.Member
	var limited_member []datastruct.Member

	var getAPIMember string

	message := ""
	jmlData := 0
	batasAkhir := 0

	path := strings.Split(r.URL.Path, "/")
	params := mux.Vars(r)

	id, err := strconv.Atoi(params["id"])

	if err != nil {
		log.Fatalf("Tidak bisa mengubah dari string ke int.  %v", err)
	}

	limit, limitErr := strconv.Atoi(r.URL.Query().Get("limit"))

	if limitErr != nil {
		limit = 0
	}

	page, pageErr := strconv.Atoi(r.URL.Query().Get("page"))

	if pageErr != nil {
		page = 0
	}

	list_teman, err := service.TampilkanTeman(int64(id), path[2])

	if err != nil {
		log.Fatalf("Tidak bisa mengambil data. %v", err)
	}

	for _, element := range list_teman {

		var member datastruct.Member

		if path[2] == "following" {
			getAPIMember = fmt.Sprintf("https://617774f89c328300175f5973.mockapi.io/api/sadhelx/member/%d", element.Penerima_id)
		} else {
			getAPIMember = fmt.Sprintf("https://617774f89c328300175f5973.mockapi.io/api/sadhelx/member/%d", element.Pengirim_id)
		}

		response, _ := http.Get(getAPIMember)
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

		list_member = append(list_member, member)
	}

	for _, element := range list_member {
		if strings.Contains(element.Username, params["query"]) || strings.Contains(element.Firstname, params["query"]) || strings.Contains(element.Lastname, params["query"]) {
			selected_member = append(selected_member, element)
			jmlData++
		}
	}

	if page != 0 && limit != 0 {
		if page == 1 {
			for i := 0; i < page*limit; i++ {
				if i < jmlData {
					limited_member = append(limited_member, selected_member[i])
					batasAkhir = i + 1
				} else {
					break
				}
			}
			message = fmt.Sprintf("1 - %d data ditampilkan", batasAkhir)
		} else if page > 1 {
			for i := (page * limit) - limit; i < page*limit; i++ {
				if i < jmlData {
					limited_member = append(limited_member, selected_member[i])
					batasAkhir = i + 1
				} else {
					break
				}
			}
			message = fmt.Sprintf("%d - %d data ditampilkan", (page*limit)-limit, batasAkhir)
		}
	}

	if path[2] == "following" {
		logging.Log(fmt.Sprintf("%d mencari data following dengan kata kunci '%s'", id, params["query"]))
	} else {
		logging.Log(fmt.Sprintf("%d mencari data follower dengan kata kunci '%s'", id, params["query"]))
	}

	var response datastruct.Response3
	response.Status = "Berhasil"
	response.TotalData = jmlData
	response.Limit = limit
	response.Page = page
	if limit == 0 || page == 0 {
		response.Message = fmt.Sprintf("%d data ditampilkan", jmlData)
		response.Data = selected_member
	} else {
		response.Message = message
		response.Data = limited_member
	}

	json.NewEncoder(w).Encode(response)
}

func HapusTeman(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)

	id1, err := strconv.Atoi(params["pengirim"])

	if err != nil {
		log.Fatalf("Tidak bisa mengubah dari string ke int.  %v", err)
	}

	id2, err := strconv.Atoi(params["penerima"])

	if err != nil {
		log.Fatalf("Tidak bisa mengubah dari string ke int.  %v", err)
	}

	deletedRows := service.HapusTeman(id1, id2)

	msg := fmt.Sprintf("%v data telah dihapus", deletedRows)

	logging.Log(msg)

	res := datastruct.Response4{
		Status:  "Berhasil",
		Message: msg,
	}

	json.NewEncoder(w).Encode(res)
}
