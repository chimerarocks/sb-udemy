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