package service

import (
	"be/config"
	"be/datastruct"
	"fmt"
	"log"
	"strings"
)

func GetMultipleMember(idMember []int64) ([]datastruct.Member, error) {

	db := config.CreateConnection()

	defer db.Close()

	var list_member []datastruct.Member

	s := []string{}

	s = append(s, fmt.Sprintf(`SELECT * FROM member WHERE user_id = %d`, idMember[0]))

	for i := 1; i < len(idMember); i++ {
		s = append(s, fmt.Sprintf(`OR user_id = %d`, idMember[i]))
	}

	query := strings.Join(s, " ")

	rows, err := db.Query(query)

	if err != nil {
		log.Fatalf("tidak bisa mengeksekusi query. %v", err)
	}

	defer rows.Close()

	for rows.Next() {

		var member datastruct.Member

		err = rows.Scan(&member.User_id, &member.Username, &member.Email, &member.Firstname, &member.Lastname, &member.Phonenumber, &member.Password, &member.Email_verified, &member.Image_file, &member.Identity_type, &member.Identity_no, &member.Address_ktp, &member.Domisili, &member.Token_hash, &member.Is_private, &member.Emergency_call, &member.Created_date, &member.Updated_date)

		if err != nil {
			log.Fatalf("tidak bisa mengambil data. %v", err)
		}

		list_member = append(list_member, member)
	}

	return list_member, err
}

// =========================================================================

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

func TampilkanFollowRequest(id int64) ([]datastruct.Teman, error) {

	db := config.CreateConnection()

	defer db.Close()

	var list_member []datastruct.Teman

	sqlStatement := `SELECT * FROM teman WHERE penerima_id=$1 AND status='pending'`

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

		list_member = append(list_member, teman)
	}
	return list_member, err
}

func TampilkanTeman(id int64, path string) ([]datastruct.Teman, error) {

	db := config.CreateConnection()

	defer db.Close()

	var list_teman []datastruct.Teman
	var sqlStatement string

	if path == "following" {
		sqlStatement = `SELECT * FROM teman WHERE pengirim_id=$1 AND status='approved'`
	} else {
		sqlStatement = `SELECT * FROM teman WHERE penerima_id=$1 AND status='approved'`
	}

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

func UpdateTeman(pengirim int, penerima int, responded_at string) int64 {

	db := config.CreateConnection()

	defer db.Close()

	sqlStatement := `UPDATE teman SET status = 'approved', responded_at = $3 WHERE pengirim_id = $1 AND penerima_id = $2`

	res, err := db.Exec(sqlStatement, pengirim, penerima, responded_at)

	if err != nil {
		log.Fatalf("tidak bisa mengeksekusi query. %v", err)
	}

	rowsAffected, err := res.RowsAffected()

	if err != nil {
		log.Fatalf("tidak bisa mencari data. %v", err)
	}

	return rowsAffected
}

func HapusTeman(pengirim int, penerima int) int64 {

	db := config.CreateConnection()

	defer db.Close()

	sqlStatement := `DELETE FROM teman WHERE pengirim_id=$1 AND penerima_id=$2`

	res, err := db.Exec(sqlStatement, pengirim, penerima)

	if err != nil {
		log.Fatalf("tidak bisa mengeksekusi query. %v", err)
	}

	rowsAffected, err := res.RowsAffected()

	if err != nil {
		log.Fatalf("tidak bisa mencari data. %v", err)
	}

	return rowsAffected
}

func SuggestMember(id int64) ([]int64, int, error) {

	db := config.CreateConnection()

	defer db.Close()

	var pengirim_id_list []int64
	jmlData := 0

	sqlStatement := `	
		SELECT pengirim_id FROM teman
		WHERE pengirim_id != $1 AND penerima_id IN (
		SELECT penerima_id FROM teman
		WHERE pengirim_id = $1 AND status = 'approved'	
		) GROUP BY pengirim_id
		ORDER BY RANDOM()
		LIMIT 5;
	`
	rows, err := db.Query(sqlStatement, id)

	if err != nil {
		log.Fatalf("tidak bisa mengeksekusi query. %v", err)
	}

	defer rows.Close()

	for rows.Next() {
		var pengirim_id int64

		err = rows.Scan(&pengirim_id)

		if err != nil {
			log.Fatalf("tidak bisa mengambil data. %v", err)
		}

		jmlData = jmlData + 1

		pengirim_id_list = append(pengirim_id_list, pengirim_id)
	}

	return pengirim_id_list, jmlData, err
}
