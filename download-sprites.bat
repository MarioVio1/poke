@echo off
REM Script per scaricare sprites da PokeAPI
REM Esegui questo file dalla cartella del progetto

echo ========================================
echo   DOWNLOAD SPRITES BESTIE DE VENETIA
echo ========================================
echo.

REM Crea cartella per gli sprite
if not exist "public\sprites" mkdir "public\sprites"
if not exist "public\sprites\besti" mkdir "public\sprites\besti"

echo Scarico sprites...

REM Scarica alcuni Pokemon come esempio (i primi 151)
REM Nota: devi avere curl installato

REM Esempi di download (scommenta quelli che vuoi)
REM curl -L -o "public\sprites\besti\1.png" "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
REM curl -L -o "public\sprites\besti\4.png" "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
REM curl -L -o "public\sprites\besti\7.png" "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"

echo.
echo Scarico sprites di esempio...

REM Bulbasaur
curl -L -s -o "public\sprites\bulbasaur.png" "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
REM Charmander  
curl -L -s -o "public\sprites\charmander.png" "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
REM Squirtle
curl -L -s -o "public\sprites\squirtle.png" "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
REM Pikachu
curl -L -s -o "public\sprites\pikachu.png" "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"

echo.
echo Fatto! Gli sprite sono in public\sprites\
echo.
echo Per scaricare piu sprite, usa questo formato:
echo curl -L -o "public\sprites\[nome].png" "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/[numero].png"
echo.
pause