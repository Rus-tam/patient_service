import pywhatkit
import time
import datetime



# pywhatkit.sendwhatmsg("+79196114415", "Hakuna matata!!!!", hour, minute, 32, True, 2)

phones = ["+79196114415", "+79876290783"]

for phone in phones:
    current_time = datetime.datetime.now()
    hour = current_time.hour
    minute = current_time.minute + 1

    pywhatkit.sendwhatmsg(phone, "Privet!!!", hour, minute, 32, True, 2)

