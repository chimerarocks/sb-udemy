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

