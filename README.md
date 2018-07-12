# Empyrion Server Discord Bot

## Run a dedicated Empyrion server

Download [SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD) zip and extract to `C:\steamcmd`.

Download Empyrion sever:

```
PS C:\steamcmd\steamcmd.exe +login anonymous +force_install_dir c:\steamcmd\empyrionDedicatedserver\ +app_update 530870 validate +quit
```

## Setup Bot

1. Copy `secrets.example.yaml` to `secrets.yaml` and enter your bots token.
2. Change the admin id in the `config.yaml` to your Discord user id.