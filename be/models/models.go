package models

import (
	"api-go-mux/config"
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

type Buku struct {
	ID            int64  `json:"id"`
	Judul_buku    string `json:"judul_buku"`
	Penulis       string `json:"penulis"`
	Tgl_publikasi string `json:"tgl_publikasi"`
}

func TambahBuku(buku Buku) int64 {

	db := config.CreateConnection()

	defer db.Close()

	sqlStatement := `INSERT INTO buku (judul_buku, penulis, tgl_publikasi) VALUES ($1, $2, $3) RETURNING id`

	var id int64

	err := db.QueryRow(sqlStatement, buku.Judul_buku, buku.Penulis, buku.Tgl_publikasi).Scan(&id)

	if err != nil {
		log.Fatalf("Tidak Bisa mengeksekusi query. %v", err)
	}

	fmt.Printf("Insert data single record %v", id)

	return id
}

func AmbilSemuaBuku() ([]Buku, error) {
	db := config.CreateConnection()

	defer db.Close()

	var bukus []Buku

	sqlStatement := `SELECT * FROM buku`

	rows, err := db.Query(sqlStatement)

	if err != nil {
		log.Fatalf("tidak bisa mengeksekusi query. %v", err)
	}

	defer rows.Close()

	for rows.Next() {
		var buku Buku

		err = rows.Scan(&buku.ID, &buku.Judul_buku, &buku.Penulis, &buku.Tgl_publikasi)

		if err != nil {
			log.Fatalf("tidak bisa mengambil data. %v", err)
		}

		bukus = append(bukus, buku)

	}

	return bukus, err
}

func AmbilSatuBuku(id int64) (Buku, error) {
	db := config.CreateConnection()

	defer db.Close()

	var buku Buku

	sqlStatement := `SELECT * FROM buku WHERE id=$1`

	row := db.QueryRow(sqlStatement, id)

	err := row.Scan(&buku.ID, &buku.Judul_buku, &buku.Penulis, &buku.Tgl_publikasi)

	switch err {
	case sql.ErrNoRows:
		fmt.Println("Tidak ada data yang dicari!")
		return buku, nil
	case nil:
		return buku, nil
	default:
		log.Fatalf("tidak bisa mengambil data. %v", err)
	}

	return buku, err
}

func UpdateBuku(id int64, buku Buku) int64 {

	db := config.CreateConnection()

	defer db.Close()

	sqlStatement := `UPDATE buku SET judul_buku=$2, penulis=$3, tgl_publikasi=$4 WHERE id=$1`

	res, err := db.Exec(sqlStatement, id, buku.Judul_buku, buku.Penulis, buku.Tgl_publikasi)

	if err != nil {
		log.Fatalf("Tidak bisa mengeksekusi query. %v", err)
	}

	rowsAffected, err := res.RowsAffected()

	if err != nil {
		log.Fatalf("Error ketika mengecheck rows/data yang diupdate. %v", err)
	}

	fmt.Printf("Total rows/record yang diupdate %v\n", rowsAffected)

	return rowsAffected
}

func HapusBuku(id int64) int64 {

	db := config.CreateConnection()

	defer db.Close()

	sqlStatement := `DELETE FROM buku WHERE id=$1`

	res, err := db.Exec(sqlStatement, id)

	if err != nil {
		log.Fatalf("tidak bisa mengeksekusi query. %v", err)
	}

	rowsAffected, err := res.RowsAffected()

	if err != nil {
		log.Fatalf("tidak bisa mencari data. %v", err)
	}

	fmt.Printf("Total data yang terhapus %v", rowsAffected)

	return rowsAffected
}
