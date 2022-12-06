# Nothign to see here.... yet

## Dev notes

I have to stop to write this down... I was wondering why some imports were made from `@aws-cdk/<service>` and
others from `aws-cdk-lib/<service>` well apparently the former is V1 and latter V2. I wish I had just actually
_read_ the documentation instead of doing the normal head first dive. I've spent a good while wondering why some types
are not compatible... Oh well. Hopefully this realization propels me to new heights.

In the end I managed to make the functions callable locally via `sam loval invkoe` so that's something. Still haven't tried
to upload any functions to lambda though. I'll try to make the function handle a discord package, and then I'll upload one
to try it with discord.

Oh yeah. I also created a super sipmle script that'll update param store values. Not sure if I'll even need it now but
hey. At least it exists.