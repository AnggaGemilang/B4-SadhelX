module aph-go-service

require aph-go-service/transport v0.0.0 // indirect

require aph-go-service/datastruct v0.0.0 // indirect

require aph-go-service/logging v0.0.0 // indirect

require aph-go-service/service v0.0.0 // indirect

require aph-go-service/config v0.0.0 // indirect

require aph-go-service/router v0.0.0

replace aph-go-service/transport => ./transport

replace aph-go-service/datastruct => ./datastruct

replace aph-go-service/logging => ./logging

replace aph-go-service/service => ./service

replace aph-go-service/config => ./config

replace aph-go-service/router => ./router

require (
	github.com/go-kit/kit v0.12.0 // indirect
	github.com/joho/godotenv v1.4.0 // indirect
	github.com/lib/pq v1.10.3 // indirect
)

go 1.13
