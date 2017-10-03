
Repositório do curso: https://github.com/cod3rcursos/curso-docker

## Docker Mongo Rest

### Passos utilizados para gerar o backend

#### Obtendo o package.json da aplicação

npm init -y
npm i --save express@4.15.3 mongoose@4.11.1 node-restful@0.2.6 body-parser@1.17.2 cors@2.8.3
rm -rf node_modules

### Gerando os containers

Depois de definido o docker-compose foi executado o comando:

>docker-compose up

#### Erros

O docker-composer precisa ser instalado:
> https://docs.docker.com/compose/install/#install-compose

Caso você tenha iniciado o serviço como root, é preciso executar o docker-compose up como root também.

## Email worker

### Banco de dados

1. Criado a configuração de banco de dados no compose
2. Iniciado o composer em modo daemon
    ```bash
      $ docker-composer up -d
      Starting emailworker_db_1 ... 
      Starting emailworker_db_1 ... done
      $
    ```
3. Visualizado processos correntes
    ```bash
      $ docker-composer ps
            Name                    Command              State    Ports  
      -------------------------------------------------------------------
      emailworker_db_1   docker-entrypoint.sh postgres   Up      5432/tcp
      $
    ```
    Perceba que foi criada uma porta de rede para esse container
4. Visualizando banco de dados criado
    ```bash
      $ docker-compose exec db psql -U postgres -c '\l' 
                                       List of databases
         Name    |  Owner   | Encoding |  Collate   |   Ctype    |   Access privileges   
      -----------+----------+----------+------------+------------+-----------------------
       postgres  | postgres | UTF8     | en_US.utf8 | en_US.utf8 | 
       template0 | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres          +
                 |          |          |            |            | postgres=CTc/postgres
       template1 | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres          +
                 |          |          |            |            | postgres=CTc/postgres
      (3 rows)
      
      $
    ```
5. Parando daemon do service e redes definidas
    ```bash
      $ docker-compose down 
      Stopping emailworker_db_1 ... done
      Removing emailworker_db_1 ... done
      Removing network emailworker_default
      $
    ```

### Volumes

1. Criado o script de inicialização do banco de daos
2. Configurado o banco no compose

### Frontend

1. Criado index.html
2. Adicionado frontend no composer
3. Verificado logs da aplicação:
   ```bash
     $ docker-compose logs -f -t 
     Attaching to emailworker_frontend_1, emailworker_db_1
     db_1        | 2017-09-27T14:53:31.121697926Z LOG:  database system was shut down at 2017-09-27 14:50:38 UTC
     db_1        | 2017-09-27T14:53:31.125151933Z LOG:  MultiXact member wraparound protections are now enabled
     db_1        | 2017-09-27T14:53:31.129513845Z LOG:  database system is ready to accept connections
     db_1        | 2017-09-27T14:53:31.130606654Z LOG:  autovacuum launcher started
     frontend_1  | 2017-09-27T14:55:00.095626741Z 172.19.0.1 - - [27/Sep/2017:14:55:00 +0000] "GET / HTTP/1.1" 200 606 "-"...
     $
   ```

### Fila

1. criado o script que irá instalar as bibliotecas python no container em app/app.sh
2. criado o scritp em python que exibe o que foi recebedio pela aplicação
3. criado o service no compose

### Proxy Reverso

1. criado a configuração do nginx
2. mapeado o volume do arquivo de configuração do nginx do container para o do arquivo
3. alterado a rota do formulário do index

### Redes
Para tornar as interações entre containers mais seguras é necessário reduzi-las o máximo possivel
. Visto que por padrão todos os container estão em uma mesma rede é necessário definir redes segregadas.

1. definida as redes e seus participantes no compose
2. alterado o sender.py para que cadastre no banco as informações

### Workers
1. definido os services no composer
2. criado service worker

### Múltiplas Instâncias
1. criado um Dockerfile para o service worker e alterado sua confiruação no compose
2. iniciado os service com escalando 3 workers
    ```bash
        $ docker-compose up -d --scale worker=3 
        $
    ```
3. acompanhado o log somente dos workers
    ```bash
        $ docker-compose logs -f -t worker 
        $
    ```

### Boas práticas - variáveis de ambiente
1. Definido váriaveis de ambiente 
([OFF] como o código foi copiado do git ele já estava com essas definições nos commits anteriores)
2. Personalizado o nome do banco no compose

### Override
1. Criado um arquivo de sobreescrita do compose para personalizá-lo

### Atualizações

1. Como remover todos os containers:
> sudo docker rm $(sudo docker ps -a -q)

2. Exemplo de um Dockerfile:
```
FROM node:0.10.38

RUN mkdir /src

RUN npm install nodemon -g

WORKDIR /src
ADD app/package.json /src/package.json
RUN npm install

ADD app/nodemon.json /src/nodemon.json

EXPOSE 3000

CMD npm start
```

3. Exemplo de um docker-compose.yml com link
```
web:
  build: .
  volumes:
    - "./app:/src/app"
  ports:
    - "3030:3000"
  links:
    - "db:redis"

db:
image: redis
```

4. Criando um servidor daemon e um client redis
```
docker run --name packt-redis -p 16379:6379 -d redis:3.2.4
docker run -it --link packt-redis:redis --rm redis redis-cli -h redis -p 6379
```

5. Criando uma imagem baseada em um Dockerfile
```
docker build -t [tag] [path do Dockerfile]
```

6. Iniciando o container em modo iterativo
```
docker run --name [nome] -it -p [host]:[container] -v [host]:[container] [image]
```
7. removendo todos as imagens por tag
```
sudo docker image rm $(sudo docker images | grep '<none>' | tr -s ' ' | cut -d ' ' -f 3)
```
