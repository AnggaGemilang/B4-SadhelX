package datastruct

type Teman struct {
	Pengirim_id  int64  `json:"pengirim_id"`
	Penerima_id  int64  `json:"penerima_id"`
	Requested_at string `json:"requested_at"`
	Responded_at string `json:"responded_at"`
	Status       string `json:"status"`
}

// Identity_no    int64  `json:"identity_no"`
// Emergency_call int64  `json:"emergency_call"`
// User_id        int64  `json:"user_id"`

type Member struct {
	Username       string `json:"username"`
	Firstname      string `json:"firstname"`
	Lastname       string `json:"lastname"`
	Phonenumber    string `json:"phonenumber"`
	Password       string `json:"password"`
	Email_verified string `json:"email_verified"`
	Image_file     string `json:"image_file"`
	Identity_type  string `json:"identity_type"`
	Identity_no    string  `json:"identity_no"`
	Emergency_call string  `json:"emergency_call"`
	Address_ktp    string `json:"address_ktp"`
	Domisili       string `json:"domisili"`
	Create_date    string `json:"create_date"`
	Update_date    string `json:"update_date"`
	Email          string `json:"email"`
	Isprivate      bool   `json:"isPrivate"`
	User_id        string  `json:"user_id"`
}

type Response1 struct {
	ID_pengirim int64  `json:"id_pengirim,omitempty"`
	ID_penerima int64  `json:"id_penerima,omitempty"`
	Is_private  bool   `json:"is_private,omitempty"`
	Message     string `json:"message,omitempty"`
}

type Response2 struct {
	Status  int     `json:"status"`
	Message string  `json:"message"`
	Data    []Teman `json:"data"`
}

type Response3 struct {
	Status  int     `json:"status"`
	Message string  `json:"message"`
	Data    []Member `json:"data"`	
}
