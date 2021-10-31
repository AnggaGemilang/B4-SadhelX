module api-go-mux

require api-go-mux/router v0.0.0

require api-go-mux/config v0.0.0 // indirect

require api-go-mux/models v0.0.0 // indirect

require api-go-mux/controller v0.0.0 // indirect

require (
	github.com/joho/godotenv v1.4.0 // indirect
	github.com/lib/pq v1.10.3 // indirect
)

replace api-go-mux/router => ./router

replace api-go-mux/config => ./config

replace api-go-mux/models => ./models

replace api-go-mux/controller => ./controller

go 1.13
