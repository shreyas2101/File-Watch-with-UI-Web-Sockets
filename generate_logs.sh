#!/bin/bash

# Function to append the current timestamp to a log file 10 times.
# It uses a for loop and the `date` command.
append_timestamp() {
  local log_file="sample.log"

  # The `date` command formats the current date and time.
  # The `>>` operator appends the output to the specified file.
  echo "Appending timestamps to $log_file..."
  for i in {1..100}; do
    printf "%s\n" "$(date +"%Y-%m-%d %H:%M:%S")" >> "$log_file"
    sleep 1 # Optional: sleep for 1 second to make the timestamps distinct
  done
  echo "Done."
}

# Call the function to run the script
append_timestamp

# for i in {1..100}; do date +"%F %T" >> sample.log; sleep 1; done
