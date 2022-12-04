# Nothign to see here.... yet

## Dev notes

So what did I do?
I built a extremely rudementary discord bot (that works!) and thought I'd use that to control a Valheim server in AWS. Well. The bot needs to be on at all times -> costs money. Instead of that I realized that I can configure Discord to send all Interactions (commands inputted by users) to a spesific endpoint. Which should mean that I can create a lambda function to take care of all the commands. Must investigate.
