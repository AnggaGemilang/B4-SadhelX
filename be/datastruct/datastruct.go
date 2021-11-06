package datastruct

type Teman struct {
	Pengirim_id  int64  `json:"pengirim_id"`
	Penerima_id  int64  `json:"penerima_id"`
	Requested_at string `json:"requested_at"`
	Responded_at string `json:"responded_at"`
	Status       string `json:"status"`
}

type Response1 struct {
	ID_pengirim int64  `json:"id_pengirim,omitempty"`
	Message     string `json:"message,omitempty"`
}

type Response2 struct {
	Status  int     `json:"status"`
	Message string  `json:"message"`
	Data    []Teman `json:"data"`
}
