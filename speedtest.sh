#!/bin/bash



echo Running the speedtest...

/usr/local/bin/speedtest-cli --json > /home/rakesh/speedResults.json

python /home/rakesh/speedtest.py


rm /home/rakesh/speedResults.json