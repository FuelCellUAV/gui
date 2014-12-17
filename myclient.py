import sys, time
from socket import *

host = "127.0.0.1"
port = 8888
addr = host, port

def client():
    s = socket(AF_INET, SOCK_DGRAM)
    s.bind(('', 0))
    print('udp echo client ready')
    while 1:
        s.sendto(bytes(time.strftime('%X %x %Z'),'ascii'), addr)
        print("Sent!")
        time.sleep(1)


client()
