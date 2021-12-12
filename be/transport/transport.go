package transport

import (
	"be/datastruct"
	"be/logging"
	"be/service"

	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
)

func GtMultipleMember(w http.ResponseWriter, r *http.Request) {

	var list_member []datastruct.Member
	var getMember datastruct.GetMember

	err := json.NewDecoder(r.Body).Decode(&getMember)
	if err != nil {
		log.Fatalf("Tidak bisa mendecode dari request body.  %v", err)
	}

	list_member, err1 := service.GetMultipleMember(getMember.IdMember)

	if err1 != nil {
		log.Fatalf("Tidak bisa mengambil data. %v", err)
	}

	res := datastruct.GetMember{
		IdMember: getMember.IdMember,
		Data:     list_member,
	}

	json.NewEncoder(w).Encode(res)

}

// ==================================================================

func TmbhTeman(w http.ResponseWriter, r *http.Request) {

	var teman datastruct.Teman
	var getMember datastruct.GetMember
	var list_member []datastruct.Member
	var id_member []int64

	err := json.NewDecoder(r.Body).Decode(&teman)
	if err != nil {
		log.Fatalf("Tidak bisa mendecode dari request body.  %v", err)
	}

	id_member = append(id_member, teman.Penerima_id)

	requestData := datastruct.RequestMember{
		IdMember: id_member,
	}

	jsonPayload, err := json.Marshal(requestData)

	requestMember, _ := http.NewRequest("GET", "http://localhost:8080/api/member", bytes.NewBuffer(jsonPayload))

	requestMember.Header.Set("Content-Type", "application/json; charset=UTF-8")

	client := &http.Client{}
	responseMember, error := client.Do(requestMember)
	if error != nil {
		panic(error)
	}
	defer responseMember.Body.Close()

	if responseMember.StatusCode != 200 {
		w.WriteHeader(responseMember.StatusCode)
		w.Write([]byte("Not found"))
		return
	}

	responseData, err := ioutil.ReadAll(responseMember.Body)
	if err != nil {
		log.Fatal(err)
	}

	json.Unmarshal(responseData, &getMember)

	list_member = getMember.Data

	teman.Requested_at = logging.GetDateTimeNowInString()
	teman.Responded_at = logging.GetDateTimeNowInString()

	if list_member[0].Is_private {
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
		Is_private:  list_member[0].Is_private,
	}

	w.WriteHeader(201)
	json.NewEncoder(w).Encode(res)
}

func TmplknTeman(w http.ResponseWriter, r *http.Request) {

	var list_member []datastruct.Member
	var limited_member []datastruct.Member
	var id_member []int64
	var getMember datastruct.GetMember

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
		if path[2] == "following" {
			id_member = append(id_member, element.Penerima_id)
		} else {
			id_member = append(id_member, element.Pengirim_id)
		}
		jmlData++
	}

	requestData := datastruct.RequestMember{
		IdMember: id_member,
	}

	jsonPayload, err := json.Marshal(requestData)

	requestMember, _ := http.NewRequest("GET", "http://localhost:8080/api/member", bytes.NewBuffer(jsonPayload))

	requestMember.Header.Set("Content-Type", "application/json; charset=UTF-8")

	client := &http.Client{}
	responseMember, error := client.Do(requestMember)
	if error != nil {
		panic(error)
	}
	defer responseMember.Body.Close()

	if responseMember.StatusCode != 200 {
		w.WriteHeader(responseMember.StatusCode)
		w.Write([]byte("Not found"))
		return
	}

	responseData, err := ioutil.ReadAll(responseMember.Body)
	if err != nil {
		log.Fatal(err)
	}

	json.Unmarshal(responseData, &getMember)

	list_member = getMember.Data

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
			if limited_member == nil {
				message = "0 - 0 data ditampilkan"
			} else {
				message = fmt.Sprintf("%d - %d data ditampilkan", (page*limit)-limit, batasAkhir)
			}
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
	var id_member []int64
	var getMember datastruct.GetMember

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
		if path[2] == "following" {
			id_member = append(id_member, element.Penerima_id)
		} else {
			id_member = append(id_member, element.Pengirim_id)
		}
	}

	requestData := datastruct.RequestMember{
		IdMember: id_member,
	}

	jsonPayload, err := json.Marshal(requestData)

	requestMember, _ := http.NewRequest("GET", "http://localhost:8080/api/member", bytes.NewBuffer(jsonPayload))

	requestMember.Header.Set("Content-Type", "application/json; charset=UTF-8")

	client := &http.Client{}
	responseMember, error := client.Do(requestMember)
	if error != nil {
		panic(error)
	}
	defer responseMember.Body.Close()

	if responseMember.StatusCode != 200 {
		w.WriteHeader(responseMember.StatusCode)
		w.Write([]byte("Not found"))
		return
	}

	responseData, err := ioutil.ReadAll(responseMember.Body)
	if err != nil {
		log.Fatal(err)
	}

	json.Unmarshal(responseData, &getMember)

	list_member = getMember.Data

	keyword := strings.ToLower(params["query"])

	for _, element := range list_member {
		if strings.Contains(strings.ToLower(element.Username), keyword) || strings.Contains(strings.ToLower(element.Firstname), keyword) || strings.Contains(strings.ToLower(element.Lastname), keyword) {
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
			if limited_member == nil {
				message = "0 - 0 data ditampilkan"
			} else {
				message = fmt.Sprintf("%d - %d data ditampilkan", (page*limit)-limit, batasAkhir)
			}
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

func TmplknFollowRequest(w http.ResponseWriter, r *http.Request) {

	var list_member []datastruct.Member
	var limited_member []datastruct.Member
	var id_member []int64
	var getMember datastruct.GetMember

	message := ""
	jmlData := 0
	batasAkhir := 0

	params := mux.Vars(r)

	id, err := strconv.Atoi(params["id"])

	limit, limitErr := strconv.Atoi(r.URL.Query().Get("limit"))

	if limitErr != nil {
		limit = 0
	}

	page, pageErr := strconv.Atoi(r.URL.Query().Get("page"))

	if pageErr != nil {
		page = 0
	}

	list_teman, err := service.TampilkanFollowRequest(int64(id))

	if err != nil {
		log.Fatalf("Tidak bisa mengambil data. %v", err)
	}

	for _, element := range list_teman {
		id_member = append(id_member, element.Pengirim_id)
		jmlData++
	}

	requestData := datastruct.RequestMember{
		IdMember: id_member,
	}

	jsonPayload, err := json.Marshal(requestData)

	requestMember, _ := http.NewRequest("GET", "http://localhost:8080/api/member", bytes.NewBuffer(jsonPayload))

	requestMember.Header.Set("Content-Type", "application/json; charset=UTF-8")

	client := &http.Client{}
	responseMember, error := client.Do(requestMember)
	if error != nil {
		panic(error)
	}
	defer responseMember.Body.Close()

	if responseMember.StatusCode != 200 {
		w.WriteHeader(responseMember.StatusCode)
		w.Write([]byte("Not found"))
		return
	}

	responseData, err := ioutil.ReadAll(responseMember.Body)
	if err != nil {
		log.Fatal(err)
	}

	json.Unmarshal(responseData, &getMember)

	list_member = getMember.Data

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
			if limited_member == nil {
				message = "0 - 0 data ditampilkan"
			} else {
				message = fmt.Sprintf("%d - %d data ditampilkan", (page*limit)-limit, batasAkhir)
			}
		}
	}

	logging.Log(fmt.Sprintf("%d menampilkan data follow request", id))

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

func SuggestMember(w http.ResponseWriter, r *http.Request) {

	var list_member []datastruct.Member
	var limited_member []datastruct.Member
	var getAPIMember string

	message := ""
	jmlData := 0
	batasAkhir := 0

	params := mux.Vars(r)

	id, err := strconv.Atoi(params["id"])

	limit, limitErr := strconv.Atoi(r.URL.Query().Get("limit"))

	if limitErr != nil {
		limit = 0
	}

	page, pageErr := strconv.Atoi(r.URL.Query().Get("page"))

	if pageErr != nil {
		page = 0
	}

	list_teman, err := service.TampilkanTeman(int64(id), "follower")

	if err != nil {
		log.Fatalf("Tidak bisa mengambil data. %v", err)
	}

	for _, element := range list_teman {

		var member datastruct.Member

		getAPIMember = fmt.Sprintf("https://617774f89c328300175f5973.mockapi.io/api/sadhelx/member/%d", element.Pengirim_id)

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
			if limited_member == nil {
				message = "0 - 0 data ditampilkan"
			} else {
				message = fmt.Sprintf("%d - %d data ditampilkan", (page*limit)-limit, batasAkhir)
			}
		}
	}

	logging.Log(fmt.Sprintf("%d menampilkan data following", id))

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

func AcceptFollowRequest(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)

	id1, err := strconv.Atoi(params["pengirim"])

	if err != nil {
		log.Fatalf("Tidak bisa mengubah dari string ke int.  %v", err)
	}

	id2, err := strconv.Atoi(params["penerima"])

	if err != nil {
		log.Fatalf("Tidak bisa mengubah dari string ke int.  %v", err)
	}

	deletedRows := service.UpdateTeman(id1, id2, logging.GetDateTimeNowInString())

	msg := fmt.Sprintf("%v data telah diupdate", deletedRows)

	logging.Log(msg)

	res := datastruct.Response4{
		Status:  "Berhasil",
		Message: msg,
	}

	json.NewEncoder(w).Encode(res)
}
