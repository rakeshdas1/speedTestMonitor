#!/usr/bin/python

import os
import json
import time

speedData = {}
os.chdir("/home/rakesh")

with open('speedResults.json') as results:
        data = json.load(results)
        dlSpeed = (data["download"])/1000000
        upSpeed= (data["upload"])/1000000
        time = (data["timestamp"])
        print ("Speedtest run at " + time)
        print("Download speed: %.2f" % (dlSpeed))
        print("Upload speed: %.2f" % (upSpeed))

speedData['time'] = time
speedData['downSpeed'] = dlSpeed
speedData['upSpeed'] = upSpeed

jsonData = json.dumps(speedData)

print(jsonData)


with open('allSpeedData.json', mode='a') as file:
	file.write((jsonData)+"\n")
