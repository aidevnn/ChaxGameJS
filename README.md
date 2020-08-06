# ChaxGameJS
## East africa traditionnal 2 players board game


Clone the repository
```
git clone https://github.com/aidevnn/ChaxGameJS.git


cd ChaxGameJS
```

Install dependencies
```
npm install
```

Run tests
```
npm run test
```

Build and run console example
```
npm run build

nodejs dist/chaxgame.bundle.js
```

Will ouput
```
    X-----#-----O
    |\    |    /|
    | X---#---# |
    | |\  |  /| |        00 10 20      xx0 biggest square
    | | #-#-# | |                
    | | |   | | |        01    21      xx1 middle square
    #-#-#   #-#-#                
    | | |   | | |        02 12 22      xx2 smallest square
    | | #-#-# | |                
    | |/  |  \| |                
    | #---#---# |
    |/    |    \|
    #-----#-----O

# : EmptyCell
X : PlayerOne
O : PlayerTwo

Remain X = 2  -  O = 2
```