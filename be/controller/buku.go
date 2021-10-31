package controller

import (
	"encoding/json"
	"fmt"
	"strconv"

	"log"
	"net/http"

	"api-go-mux/models"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type response struct {
	ID      int64  `json:"id,omitempty"`
	Message string `json:"message,omitempty"`
}

type Response struct {
	Status  int           `json:"status"`
	Message string        `json:"message"`
	Data    []models.Buku `json:"data"`
}

func TmbhBuku(w http.ResponseWriter, r *http.Request) {

	var buku models.Buku

	err := json.NewDecoder(r.Body).Decode(&buku)

	if err != nil {
		log.Fatalf("Tidak bisa mendecode dari request body.  %v", err)
	}

	insertID := models.TambahBuku(buku)

	res := response{
		ID:      insertID,
		Message: "Data buku telah ditambahkan",
	}

	json.NewEncoder(w).Encode(res)
}

func AmbilBuku(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)

	id, err := strconv.Atoi(params["id"])

	if err != nil {
		log.Fatalf("Tidak bisa mengubah dari string ke int.  %v", err)
	}

	buku, err := models.AmbilSatuBuku(int64(id))

	if err != nil {
		log.Fatalf("Tidak bisa mengambil data buku. %v", err)
	}

	json.NewEncoder(w).Encode(buku)
}

func AmbilSemuaBuku(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	bukus, err := models.AmbilSemuaBuku()

	if err != nil {
		log.Fatalf("Tidak bisa mengambil data. %v", err)
	}

	var response Response
	response.Status = 1
	response.Message = "Success"
	response.Data = bukus

	json.NewEncoder(w).Encode(response)
}

func UpdateBuku(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)

	id, err := strconv.Atoi(params["id"])

	if err != nil {
		log.Fatalf("Tidak bisa mengubah dari string ke int.  %v", err)
	}

	var buku models.Buku

	err = json.NewDecoder(r.Body).Decode(&buku)

	if err != nil {
		log.Fatalf("Tidak bisa decode request body.  %v", err)
	}

	updatedRows := models.UpdateBuku(int64(id), buku)

	msg := fmt.Sprintf("Buku telah berhasil diupdate. Jumlah yang diupdate %v rows/record", updatedRows)

	res := response{
		ID:      int64(id),
		Message: msg,
	}

	json.NewEncoder(w).Encode(res)
}

func HapusBuku(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)

	id, err := strconv.Atoi(params["id"])

	if err != nil {
		log.Fatalf("Tidak bisa mengubah dari string ke int.  %v", err)
	}

	deletedRows := models.HapusBuku(int64(id))

	msg := fmt.Sprintf("buku sukses di hapus. Total data yang dihapus %v", deletedRows)

	res := response{
		ID:      int64(id),
		Message: msg,
	}

	json.NewEncoder(w).Encode(res)
}
