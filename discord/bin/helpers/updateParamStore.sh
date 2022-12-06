if [ -z $TOKEN ]; then
  echo 'TOKEN not set'
  exit 1
fi

if [ -z $GUILD_ID ]; then
  echo 'GUILD_ID not set'
  exit 1
fi

if [ -z $CLIENT_ID ]; then
  echo 'CLIENT_ID not set'
  exit 1
fi

if [ -z $CLIENT_PUB_KEY ]; then
  echo 'CLIENT_PUB_KEY not set'
  exit 1
fi


if [ -n "$1" ]; then
  echo "Alternate profile selected. Using profile '$1' for cli commands"
  export AWS_PROFILE=$1
fi

STAGE=${STAGE:-'demo'}

NAME_PREFIX="/valtsu-bot/$STAGE"

# Assume everything works. No need to handle errors here. There will never be errors here. Never.
aws ssm put-parameter --name "$NAME_PREFIX/TOKEN" --type "SecureString" --value "$TOKEN" --overwrite >/dev/null 2>&1 && echo "$NAME_PREFIX/TOKEN set"
aws ssm put-parameter --name "$NAME_PREFIX/GUILD_ID" --type "SecureString" --value "$GUILD_ID" --overwrite >/dev/null 2>&1 && echo "$NAME_PREFIX/GUILD_ID set"
aws ssm put-parameter --name "$NAME_PREFIX/CLIENT_ID" --type "SecureString" --value "$CLIENT_ID" --overwrite >/dev/null 2>&1 && echo "$NAME_PREFIX/CLIENT_ID set"
aws ssm put-parameter --name "$NAME_PREFIX/CLIENT_PUB_KEY" --type "SecureString" --value "$CLIENT_PUB_KEY" --overwrite >/dev/null 2>&1 && echo "$NAME_PREFIX/CLIENT_PUB_KEY set"
