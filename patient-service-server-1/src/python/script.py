import sys
import pywhatkit
import time
import datetime

phone_number = sys.argv[1]
message = sys.argv[2]

current_time = datetime.datetime.now()
hour = current_time.hour
minute = current_time.minute + 1

print(minute)

pywhatkit.sendwhatmsg(phone_number, message, hour, minute, 32, True, 2)
# pywhatkit.sendwhatmsg("+79196114415", "Hakuna matata!!!!", hour, minute, 32, True, 2)

