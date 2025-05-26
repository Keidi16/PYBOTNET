# PyBotNet Script

A Python-based command and control (C2) script that uses Telegram as its communication channel. This tool allows remote command execution through Telegram bot interactions.

## Prerequisites

Before using this script, ensure you have the following:

- Python 3.x installed on your system
- A Telegram account
- Internet connection

## Setup Instructions

### 1. Create a Telegram Bot

1. Open Telegram and search for `@BotFather` (look for the official bot with a blue verification checkmark)
2. Start a conversation with BotFather by clicking **Start**
3. Send the `/newbot` command
4. Follow the prompts to:
   - Choose a name for your bot
   - Set a unique username (must end with 'bot')
   - Configure general settings as needed
5. Save the bot token provided by BotFather - you'll need this later

### 2. Install Dependencies

```bash
pip install pybotnet
```

### 3. Installation and Usage

Clone the repository:
```bash
git clone https://github.com/Keidi16/PYBOTNET.git
```

Navigate to the project directory:
```bash
cd PYBOTNET
```

Make the script executable:
```bash
chmod +x bot.py
```

Run the script:
```bash
python3 bot.py
```

## Configuration

Make sure to configure your bot token in the script before running it. Replace the placeholder token with the one you received from BotFather.

## Requirements

- Python 3.x
- pybotnet library
- Telegram account and bot token
- Active internet connection

## Security Notice

This tool is intended for educational and authorized testing purposes only. Ensure you have proper authorization before using this on any systems or networks you do not own.

## Troubleshooting

- Verify your bot token is correctly configured
- Ensure all dependencies are properly installed
- Check your internet connection
- Make sure Python 3.x is installed and accessible

## Contributing

Feel free to submit issues and pull requests to improve this project.


