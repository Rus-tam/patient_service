import sys
import pywhatkit
import datetime

FIO = sys.argv[1]
phone_numbers = sys.argv[2]
date = sys.argv[3]

names = FIO.split(',')
phones = phone_numbers.split(',')


for i in range(0, len(phones[:(len(phones) - 1)])):
    current_time = datetime.datetime.now()
    hour = current_time.hour
    minute = current_time.minute + 2
    message = f"Уважаемый {names[i]}, приглашаем вас посетить нашу клинику {date}"
    pywhatkit.sendwhatmsg(phones[i], message, hour, minute, 32, True, 2)


