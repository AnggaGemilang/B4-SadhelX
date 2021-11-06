package service

import (
	"be/config"
	"be/datastruct"
	fmt "fmt"
	"log"
)

func TambahTeman(teman datastruct.Teman) int64 {

	db := config.CreateConnection()

	defer db.Close()

	sqlStatement := `INSERT INTO teman (pengirim_id, penerima_id, requested_at, responded_at, status) VALUES ($1, $2, $3, $4, $5) RETURNING pengirim_id`

	err := db.QueryRow(sqlStatement, teman.Pengirim_id, teman.Penerima_id, teman.Requested_at, teman.Responded_at, teman.Status).Scan(&teman.Pengirim_id)

	if err != nil {
		log.Fatalf("Tidak Bisa mengeksekusi query. %v", err)
	}

	fmt.Printf("%v berhasil pengirimkan permintaan pertemanan ke %v", teman.Pengirim_id, teman.Penerima_id)

	return teman.Pengirim_id
}
