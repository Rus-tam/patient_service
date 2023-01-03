import sys
import pywhatkit
import time
import datetime

FIO = sys.argv[1]
phone_numbers = sys.argv[2]
date = sys.argv[3]

names = FIO.split(',')
phones = phone_numbers.split(',')

# print(phones[:(len(phones) - 1)])

for i in range(0, len(phones)):
    current_time = datetime.datetime.now()
    hour = current_time.hour
    minute = current_time.minute + 1
    message = f"Уважаемый {names[i]}, приглашаем вас посетить нашу клинику {date[i]}"
    pywhatkit.sendwhatmsg(phones[i], message, hour, minute, 32, True, 2)


# current_time = datetime.datetime.now()
# hour = current_time.hour
# minute = current_time.minute + 1
#
# print(minute)
#
# pywhatkit.sendwhatmsg(phone_number, message, hour, minute, 32, True, 2)
# pywhatkit.sendwhatmsg("+79196114415", "Hakuna matata!!!!", hour, minute, 32, True, 2)

