module main

require aph-go-service/transport v1.1.0

require aph-go-service/datastruct v0.0.0 // indirect

require aph-go-service/logging v0.0.0 // indirect

require (
	aph-go-service/service v0.0.0 // indirect
	github.com/go-kit/kit v0.12.0
)

replace aph-go-service/transport => ./transport

replace aph-go-service/datastruct => ./datastruct

replace aph-go-service/logging => ./logging

replace aph-go-service/service => ./service

go 1.13
