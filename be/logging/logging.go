package logging

import (
	"fmt"
	"os"
	"time"
)

func GetDateTimeNowInString() string {
	t := time.Now()
	return t.Format("2006-01-02 15:04:05")
}

const LOG_PREFIX_LOG string = "LOG"
const ERROR_PREFIX_LOG string = "ERR"
const DEBUG_PREFIX_LOG string = "DEBUG"

const DEFAULT_LOG_FILE_PATH string = "aph-service.log"

var logFileName string = DEFAULT_LOG_FILE_PATH

func SetLogFileName(filename string) {
	logFileName = filename
}

func Debug(msg string) {
	internalLog(msg, DEBUG_PREFIX_LOG)
}

func Log(msg string) {
	internalLog(msg, LOG_PREFIX_LOG)
}

func Error(msg string) {
	internalLog(msg, LOG_PREFIX_LOG)
}

func internalLog(msg string, prefix string) {
	// prepare the message
	output_msg := fmt.Sprintf("[%s] [%s] %s", prefix, GetDateTimeNowInString(), msg)

	// print to screen and append to log file
	fmt.Println(output_msg)
	appendToLogFile(output_msg, prefix)
}

func appendToLogFile(output_msg string, prefix string) {
	// append log to file
	f, err := os.OpenFile(logFileName, os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0600)
	if err != nil {
		panic(err)
	}
	defer f.Close()
	fmt.Fprintln(f, output_msg)
}
