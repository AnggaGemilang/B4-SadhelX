module be

require be/transport v0.0.0 // indirect

require be/datastruct v0.0.0 // indirect

require be/logging v0.0.0 // indirect

require be/service v0.0.0 // indirect

require be/config v0.0.0 // indirect

require be/router v0.0.0

replace be/transport => ./transport

replace be/datastruct => ./datastruct

replace be/logging => ./logging

replace be/service => ./service

replace be/config => ./config

replace be/router => ./router

require (
	github.com/go-kit/kit v0.12.0 // indirect
	github.com/joho/godotenv v1.4.0 // indirect
	github.com/lib/pq v1.10.3 // indirect
)

go 1.13
