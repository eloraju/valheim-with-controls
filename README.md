# Nothign to see here.... yet

## Dev notes

So what did I do?
I built a extremely rudementary discord bot (that works!) and thought I'd use that to control a Valheim server in AWS.
Well. The bot needs to be on at all times -> costs money. Instead of that I realized that I can configure Discord to
send all Interactions (commands inputted by users) to a spesific endpoint. Which should mean that I can create a lambda
function to take care of all the commands. Must investigate.

I have to stop to write this down... I was wondering why some imports were made from `@aws-cdk/<service>` and
others from `aws-cdk-lib/<service>` well apparently the former is V1 and latter V2. I wish I had just actually
_read_ the documentation instead of doing the normal head first dive. I've spent a good while wondering why some types
are not compatible... Oh well. Hopefully this realization propels me to new heights.

In the end I managed to make the functions callable locally via `sam loval invkoe` so that's something. Still haven't
tried to upload any functions to lambda though. I'll try to make the function handle a discord package, and
then I'll upload one to try it with discord.

Oh yeah. I also created a super simple script that'll update param store values. Not sure if I'll even need it now but
hey. At least it exists.

Last update for today. Managed to deploy everything to AWS woopwoop. Discord key validation aint working yet but that's
tomorrow's problem.

New day. Managed to make the whole thing work! Just added a test command that I'll try to call from discrod.