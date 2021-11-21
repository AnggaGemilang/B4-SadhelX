package service

import (
	"be/config"
	"be/datastruct"
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

	return teman.Pengirim_id
}

func TampilkanTeman(id int64) ([]datastruct.Teman, error) {
	db := config.CreateConnection()

	defer db.Close()

	var list_teman []datastruct.Teman

	sqlStatement := `SELECT * FROM teman WHERE pengirim_id=$1 AND status='approved'`

	rows, err := db.Query(sqlStatement, id)

	if err != nil {
		log.Fatalf("tidak bisa mengeksekusi query. %v", err)
	}

	defer rows.Close()

	for rows.Next() {
		var teman datastruct.Teman

		err = rows.Scan(&teman.Pengirim_id, &teman.Penerima_id, &teman.Requested_at, &teman.Responded_at, &teman.Status)

		if err != nil {
			log.Fatalf("tidak bisa mengambil data. %v", err)
		}

		list_teman = append(list_teman, teman)

	}
	return list_teman, err
}
