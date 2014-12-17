import sys, time
from socket import *

addr = "127.0.0.1"
port = 8888
BUFSIZE = 1024

def server():
    s = socket(AF_INET, SOCK_DGRAM)
    s.bind(('', 8888))
    print('udp echo server ready')
    while 1:
        data, addr = s.recvfrom(BUFSIZE)
        print('server received %r from %r' % (data, addr))
#        s.sendto(bytes("Hello world \n",'ascii'), (addr, port))
#        print("Sent!")
#        time.sleep(1)


server()
