git do curso https://github.com/johanan/Build-Complex-Express-Sites-with-Redis-and-Socket.io/

### REDIS_CLI

Foi explicado o que é o REDIS, que funciona como um banco de dados em memória.

1. primeiro foi iniciado um container com um daemon do redis mapeado para porta 16379
    ```bash
    sudo docker run --name packt-redis -p 16379:6379 -d redis:3.2.4
    ```

2. foi iniciado um outro container para executar o cli do redis usando a opção --link do docker
    ```bash
    sudo docker run -it --link packt-redis:redis --rm redis redis-cli -h redis -p 6379
    ```
    
    Observe que o host para esse container será 'redis' por causa do link (redis-cli -h redis)
    
    Quanto a opção --link, ela funciona como meio de comunicação entre containers sem ter que 
    deixar portas abertas
    Mais inforfmações: https://www.mundodocker.com.br/link-entre-containers/
    
    A opção --rm define que o container se auto-destruirá depois de encerrado
    
    A partir de 'redis', que é a imagem escolhida para o container, são inseridos os comandos para o modo interativo 

3. foi dado o exemplo de como parar/reiniciar o container
    ```bash
    sudo docker stop packt-redis
    sudo docker start packt-redis
    ```

4. foi mostrado como encontrar ajuda para o redis
    ```bash
    sudo docker run -it --rm redis redis-cli --help
    ```
5. dentro do redis é possível obter ajuda para os comandos
    ```bash
    redis:6379> help SET
    
      SET key value [EX seconds] [PX milliseconds] [NX|XX]
      summary: Set the string value of a key
      since: 1.0.0
      group: string
    
    redis:6379> help GET
    
      GET key
      summary: Get the value of a key
      since: 1.0.0
      group: string
    
    redis:6379> 
    ```
6. foi então exibido como inserir e obter valores no redis
    ```bash
    redis:6379> set TEST value
    OK
    redis:6379> get TEST
    "value"
    redis:6379> 
    ```
    


### Redis Data Types

Foi mostrado os tipos de dados mais usados no Redis: 
    
    String - o tipo mais comum, apenas um valor
    Hashes - hashes são dados no estilo atributo:valor
    Lists  - são coleções de dados ordenados segundo a inserção no final ou no inico da lista, podendo conter dados duplicados definidos por um indice
    Sets   - são coleções de dados únicos que não possuem ordem
    Sorted sets - são coleções de dados único que são ordenados baseado em um score

1. Foi mostrado como adicionar/obter uma string para uma chave
    ```bash
    redis:6379> set user:1:username josh
    OK
    redis:6379> get user:1:username
    "josh"
    ```
2. Foi mostrado como adicionar/obter uma hash
    ```bash
    redis:6379> hmset user:1 first_name Joshua last_name Johanan
    OK
    redis:6379> hgetall user:1
    1) "first_name"
    2) "Joshua"
    3) "last_name"
    4) "Johanan"
    ```
3. Foi mostrado como adicionar/obter dados em uma lista
    ```bash
    redis:6379> lpush user:1:profile_views 5
    (integer) 1
    redis:6379> lpush user:1:profile_views 10
    (integer) 2
    redis:6379> lpush user:1:profile_views 15
    (integer) 3
    redis:6379> lpush user:1:profile_views 18
    (integer) 4
    redis:6379> lrange user:1:profile_views 0 -1
    1) "18"
    2) "15"
    3) "10"
    4) "5"
    redis:6379> lrange user:1:profile_views 0 2
    1) "18"
    2) "15"
    3) "10"
    ```
4. Foi mostrado como adicionar/obter dados em um set
    ```bash
    redis:6379> sadd post:1:users 1 2
    (integer) 2
    redis:6379> sadd post:1:users 1
    (integer) 0
    redis:6379> smembers post:1:users
    1) "1"
    2) "2"
    redis:6379> sadd post:1:users 3
    (integer) 1
    redis:6379> smembers post:1:users
    1) "1"
    2) "2"
    3) "3"    
    ```
5. Foi mostrado como adcionar/obter dados em um ordered set
    ```bash
    redis:6379> zadd logins 500 1
    (integer) 1
    redis:6379> zadd logins 600 1
    (integer) 0
    redis:6379> zadd logins 600 15
    (integer) 1
    redis:6379> zadd logins 650 18
    (integer) 1
    redis:6379> zrange logins 0 -1
    1) "1"
    2) "15"
    3) "18"
    redis:6379> zadd logins 550 20
    (integer) 1
    redis:6379> zrange logins 0 -1
    1) "20"
    2) "1"
    3) "15"
    4) "18"
    redis:6379> zrange logins 0 -1 WITHSCORES
    1) "20"
    2) "550"
    3) "1"
    4) "600"
    5) "15"
    6) "600"
    7) "18"
    8) "650"
    redis:6379> zrevrange logins 0 -1
    1) "18"
    2) "15"
    3) "1"
    4) "20"
    redis:6379> 
    ```
### Redis Commands
Para mais informações: http://redis.io/commands

1. A Big O Notation:

    O(1) - Significa que o comando leva a mesma quantidade de tempo independente da quantidade de inputs
    
    O(n) - Significa que o tempo de execução de um comando vária conforme o  número de  inputs
    
    É bom estar atento para o custo em mémoria de cada comando.

2. foi mostrado algumas coisas que podem ser feitas com strings, todos são O(1):

    Comandos: set, get, incr, exists, expire, ttl 
    
    Inserindo e obtendo uma string 
    ```bash
    redis:6379> set user:1 test
    OK
    redis:6379> get user:1
    "test"
    ```
    Criando um contador (nesse caso a string deve ser um número)
    ```bash
    redis:6379> set counter 1
    OK
    redis:6379> incr counter
    (integer) 2
    redis:6379> get counter
    "2"
    redis:6379> incr user:1
    (error) ERR value is not an integer or out of range
    redis:6379> exists user:1
    (integer) 1
    ```
    
    Verificando/Removendo uma string
    ```bash
    redis:6379> exists no
    (integer) 0
    redis:6379> expire user:1 1
    (integer) 1
    redis:6379> get user:1
    (nil)
    ```
    
    Inserindo uma string, somente, por um tempo determinado
    ```bash
    redis:6379> set test_key test EX 120
    OK
    redis:6379> ttl test_key
    (integer) 116
    redis:6379> ttl test_key
    (integer) 113
    redis:6379> ttl test_key
    (integer) 103
    redis:6379> ttl test_key
    (integer) 84
    redis:6379> ttl test_key
    (integer) 45
    redis:6379> get test_key
    "test"
    redis:6379> ttl test_key
    (integer) 1
    redis:6379> ttl test_key
    (integer) -2
    redis:6379> ttl test_key
    (integer) -2
    redis:6379> ttl test_key
    (integer) -2
    redis:6379> get test_key
    (nil)
    redis:6379> 
    ```
3. foi mostrado algumas coisas que podem ser feitas com hashs:

    Comandos: hset, hget, hmset, hgetall, hkeys, expire

    Definindo uma hash:
    
    * Você pode definir uma hash com hset ou com multiplos atributos usando hmset
    * hset são comandos O(1)
    * hmset são comandos O(n)
    ```bash
    redis:6379> hset hash_key field value
    (integer) 1
    redis:6379> hget hash_key field
    "value"
    redis:6379> hmset has_key first 1 second 2
    OK
    redis:6379> hgetall hash_key
    1) "field"
    2) "value"
    redis:6379> hgetall has_key
    1) "first"
    2) "1"
    3) "second"
    4) "2"
    redis:6379> hkeys has_key
    1) "first"
    2) "second"
    redis:6379> hset hash_key field value
    (integer) 0
    redis:6379> hget hash_key field
    "value"
    redis:6379> expire hash_key
    (error) ERR wrong number of arguments for 'expire' command
    redis:6379> expire hash_key 1
    (integer) 1
    redis:6379> expire has_key 1
    (integer) 1
    redis:6379> hset hash_key field value
    (integer) 1
    redis:6379> hget hash_key field
    "value"
    redis:6379> hmset hass_key first 1 second 2
    OK
    redis:6379> hgetall hash_key
    1) "field"
    2) "value"
    redis:6379> hmset hash_key first 1 second 2
    OK
    redis:6379> hgetall hash_key
    1) "field"
    2) "value"
    3) "first"
    4) "1"
    5) "second"
    6) "2"
    redis:6379> hkeys hash_key
    1) "field"
    2) "first"
    3) "second"
    ```
4. foi mostrado alguns comandos com listas

    Comandos: lpush, lrange, rpush

    lpush e rpush são O(1), os outros são O(n)
    ```bash
    redis:6379> lpush dogs dexter
    (integer) 1
    redis:6379> lpush dogs gixmo
    (integer) 2
    redis:6379> lpush dogs gizmo
    (integer) 3
    redis:6379> lrange dogs 0 -1
    1) "gizmo"
    2) "gixmo"
    3) "dexter"
    redis:6379> rpush dogs fido
    (integer) 4
    redis:6379> lrange dogs 0 -1
    1) "gizmo"
    2) "gixmo"
    3) "dexter"
    4) "fido"
    ```
5. foi mostrado alguns comandos com sets

    Comandos: sadd, smembers, sismember, srem, sadd, sdiff, sinter, sunion
     
    Note que utilizar os comandos de sdiff, sinter ou sunion não alteram o set de fato
    
    Todos os s* comandos são O(n)
    
    ```bash
    redis:6379> sadd sdogs dexter
    (integer) 1
    redis:6379> sadd sdogs dexter
    (integer) 0
    redis:6379> sadd sdogs gizmo
    (integer) 1
    redis:6379> smembers sdogs
    1) "gizmo"
    2) "dexter"
    redis:6379> sismember sdogs dexter
    (integer) 1
    redis:6379> sismember sdogs nothing
    (integer) 0
    redis:6379> srem sdogs dexter
    (integer) 1
    redis:6379> sismember sdogs dexter
    (integer) 0
    redis:6379> sadd sdogs dexter
    (integer) 1
    redis:6379> sadd dogs2 fido
    (integer) 1
    redis:6379> sadd dogs2 dexter
    (integer) 1
    redis:6379> sdiff sdogs dogs2
    1) "gizmo"
    redis:6379> sinter sdogs dogs2
    1) "dexter"
    redis:6379> sunion sdogs dogs2
    1) "fido"
    2) "gizmo"
    3) "dexter"
    redis:6379> smembers sdogs
    1) "gizmo"
    2) "dexter"
    ```
    
6. foi mostrado alguns comandos a mais com ordered hashes:
    
    Comandos: zadd, zrange, zrangebyscore
    
    Todos os z* comandos são O(n)
    ```bash
    redis:6379> zadd zdogs 100 dexter
    (integer) 1
    redis:6379> zadd zdogs 200 gizmo
    (integer) 1
    redis:6379> zrange zdogs 0 -1
    1) "dexter"
    2) "gizmo"
    redis:6379> zrange zdogs 0 -1 WITHSCORES
    1) "dexter"
    2) "100"
    3) "gizmo"
    4) "200"
    redis:6379> zadd zdogs 300 dexter
    (integer) 0
    redis:6379> zrange zdogs 0 -1 WITHSCORES
    1) "gizmo"
    2) "200"
    3) "dexter"
    4) "300"
    redis:6379> zrangebyscore zdogs 100 250
    1) "gizmo"
    ```
    
### Redis Storage Structures

Classic Database
    
    * Tables
    * Columns
    * Relationships
    * Indexes

Redis
    
    * Keys
    * Values (Data Types)
    
Então foi mostrado como se cria relacionamentos no Redis

```bash
redis:6379> hmset user:1 username josh gender male
OK
redis:6379> hmset user:2 username chris gender female
OK
redis:6379> hmset user:3 username chris2 gender male
OK
redis:6379> hgetall
(error) ERR wrong number of arguments for 'hgetall' command
redis:6379> hgetall user:1
1) "username"
2) "josh"
3) "gender"
4) "male"
redis:6379> set username:josh user:1
OK
redis:6379> set username:chris user:2
OK
redis:6379> set username:chris2 user:3
OK
redis:6379> get username:josh
"user:1"
redis:6379> sadd names:josh user:1
(integer) 1
redis:6379> sadd names:chris user:2 user:3
(integer) 2
redis:6379> smembers names:chris
1) "user:3"
2) "user:2"
redis:6379> sadd gender:male user:1 user:3
(integer) 2
redis:6379> sadd gender:female user:2
(integer) 1
redis:6379> sinter names:chris gender:male
1) "user:3"
redis:6379> hgetall user:3
1) "username"
2) "chris2"
3) "gender"
4) "male"
redis:6379> zadd logins 1476070170914 user:1
(integer) 1
redis:6379> zadd logins 1474774243814 user:1
(integer) 0
redis:6379> zadd logins 1474774243814 user:2
(integer) 1
redis:6379> 
```

### Channels and Subscribe

Assinando um canal

```bash
redis:6379> subscribe user:create
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "user:create"
3) (integer) 1
```

Assinando qualquer canal baseado em um padrão
```bash
redis:6379> psubscribe user:*
Reading messages... (press Ctrl-C to quit)
1) "psubscribe"
2) "user:*"
3) (integer) 1
```

### Publish

Foi mostrado como criar enviar uma mensagem entre um listener e um publisher

1. se criou um listener em um canal (test):

```bash
subscribe test
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "test"
3) (integer) 1
```

2. então em um novo client publicou uma mensagem no canal test:
```bash
redis:6379> publish test 'Is anyone there?'
(integer) 1
```

3. a mensagem chegou no listener:
```bash
1) "message"
2) "test"
3) "Is anyone there?"
```

### Simples Redis Integration

1. foi criado uma aplicação em node que imita o redis-cli

### Messaging

Foi iniciado apps em portas diferentes para mostrar como se comunicam através do redis

### Store Complex Data

1. foi criado um objeto redis para que adicionar promises a biblioteca
2. foi criado uma api com indices

### Store Complex Data with Sorted Sets


1. foi refatorado o objeto redis.
2. foi criado uma api para cães de modo que possa ser selecionado por ordenação de acordo com o tempo da visulização
    
    * http://localhost:8080/dog/latest
    * http://localhost:8080/dog/any
    
### Geospatial Indexes

1. foi criado um app de localização geoespacial
    * http://localhost:8080/around/:long/:lat/:miles
    * http://localhost:8080/aroundsb/:miles
    
### Installing Socket.io

1. foi criado um app para mostrar em log a conexão entre o server e o client por um socket
    * para conectar entre no inspector e chame a função io()
     
### Simple Socket.io application

1. foi criado um app para mostrar a comunicação entre um server e um client

### Interacting with another browser

1. foi criado um app para mostrar a comunicação entre um browser e outro
através de abas, cada aba representa um browser

a diferença entre socket e io é que o socket se refere somente ao socket que emitiu o evento
, enquanto o io é o servidor então ele emitirá a todos os sockets

o único problema nesta abordagem é que o comunicação e emitido também para o servidor,
ou seja, ele está recebendo as mesmas mengagens como fosse um client

### Broadcasting a message

1. Foi criado um app para que mostre como enviar mensagens para todos os sockets
conectadas menos o socket que envia

### Using the disconnect event

1. foi mostrado como usar o disconnect para mostrar quem saiu da sala, bem como 
exibir mensagem quando ocorrer um erro.

### What Are Rooms?

1. foi criado duas salas e mostrado como as mensagens foram exibidas