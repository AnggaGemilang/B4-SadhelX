package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func CreateConnection() *sql.DB {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	port, err := strconv.Atoi(os.Getenv("DB_PORT"))

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+"password=%s dbname=%s sslmode=disable",
		os.Getenv("DB_HOST"), port, os.Getenv("DB_USERNAME"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"))

	db, err := sql.Open("postgres", psqlInfo)

	if err != nil {
		panic(err)
	}

	err = db.Ping()

	if err != nil {
		panic(err)
	}

	return db
}

// type NullString struct {
// 	sql.NullString
// }

// func (s NullString) MarshalJSON() ([]byte, error) {
// 	if !s.Valid {
// 		return []byte("null"), nil
// 	}
// 	return json.Marshal(s.String)
// }

// func (s *NullString) UnmarshalJSON(data []byte) error {
// 	if string(data) == "null" {
// 		s.String, s.Valid = "", false
// 		return nil
// 	}
// 	s.String, s.Valid = string(data), true
// 	return nil
// }
