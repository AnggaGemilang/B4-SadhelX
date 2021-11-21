package service

import (
	"be/config"
	"be/datastruct"
	"fmt"
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

func HapusTeman(teman datastruct.Teman) int64 {

	// mengkoneksikan ke db postgres
	db := config.CreateConnection()

	// kita tutup koneksinya di akhir proses
	defer db.Close()

	// buat sql query

	sqlStatement := `DELETE FROM teman WHERE pengirim_id=$1 AND penerima_id=$2`
	// eksekusi sql statement
	res, err := db.Exec(sqlStatement, teman.Pengirim_id, teman.Penerima_id)

	if err != nil {
		log.Fatalf("tidak bisa mengeksekusi query. %v", err)
	}

	// cek berapa jumlah data/row yang di hapus
	rowsAffected, err := res.RowsAffected()

	if err != nil {
		log.Fatalf("tidak bisa mencari data. %v", err)
	}

	fmt.Printf("Total data yang terhapus %v", rowsAffected)

	return penerima_id
}
