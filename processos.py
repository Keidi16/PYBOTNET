import psutil

# Lista de processos conhecidos que podem ser usados para criar backdoors
backdoor_processes = ['nc.exe', 'netcat.exe', 'wget.exe', 'curl.exe']

# Obtém a lista de processos ativos no sistema
process_list = psutil.process_iter()

# Verifica se algum dos processos ativos é uma backdoor conhecida
for process in process_list:
    process_info = process.as_dict(attrs=['pid', 'name'])
    if process_info['name'] in backdoor_processes:
        print(f'Backdoor detectada: {process_info["name"]} (PID: {process_info["pid"]})')
