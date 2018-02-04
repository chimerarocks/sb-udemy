
Repositório do curso: https://github.com/cod3rcursos/curso-docker

# ATENÇÃO #

## Algumas dicas ao lidar com aplicações PHP
o mysql deve ter um volume de dados, para não demorar mais que outros processos

o container apache deve rodar por ultimo o apache-foreground para ficar como daemon

o local onde o apache busca o arquivo padrão deve ser mudado

para a instalação do composer funcionar corretamente ele deve ser rodado com CMD e não como RUN

pelo fato de já ser necessário rodar o CMD para o apache, é necessário colocar os dois comandos em uma única linha

## Uso básico do docker

### Mapear portas dos containers
docker container run -p 8080:80 nginx

### Mapear diretórios para o container
docker container run -p 8080:80 -v $(pwd)/html:/var/www/html nginx

### Rodar um servidor em background
docker container -d --name ex-daemon-basic run -p 8080:80 -v $(pwd)/html:/var/www/html nginx

### Gerenciar o container em background
docker container start ex-daemon-basic
docker container restart ex-daemon-basic
docker container stop ex-daemon-basic

### Manipulação de containers em modo daemon
docker container ps -a
docker container logs ex-daemon-basic
docker container inspect ex-daemon-basic
docker container exec ex-daemon-basic uname -or
entrar em um container em background: docker exec -it <mycontainer> bash

## Deixando de Ser Apenas um Usuário

Imagens são classes, containers são objetos

### Docker Hub × Docker Registry

Docker Registry é um repositório privado de imagens x Docker Hub é um repositório público (Saas) na frente de um Docker Registry

### Meu primeiro build

Crie um Dockerfile com o seguinte conteúdo:
```
FROM nginx:latest

RUN echo '<h1>Hello World!</h1>' > /usr/share/nginx/html/index.html
```
docker image build -t ex-simple-build .
docker container run -p 8080:80 ex-simple-build

### Uso das instruções de preparação

Crie um Dockerfile com o seguinte conteúdo:
```
FROM debian
LABEL mantainer 'Aluno'

ARG S3_BUCKET=files
ENV S3_BUCKET=${S3_BUCKET}

```
docker image build -t ex-build-arg .
docker container run -p 8080:80 ex-build-arg bash -c 'echo $S3_BUCKET'
>files
docker image build --build-arg S3_BUCKET=myapp -t ex-build-arg .
docker container run -p 8080:80 ex-build-arg bash -c 'echo $S3_BUCKET'
>myapp

### Uso das instruções de povoamento
Crie um Dockerfile com o seguinte conteúdo:
```
FROM debian
LABEL mantainer 'Aluno'

RUN echo '<h1>Sem conteudo</h1>' > /usr/share/nginx/html/conteudo.html
COPY *.html /usr/shar/nginx/html/
```
docker image build -t ex-build-copy .
docker container run -p 8080:80 ex-build-copy

### Uso das instruções para execução do container (Parte 1)

Esta aula é baseada na pasta build-dev no repositório do curso.
Crie um Dockerfile com o seguinte conteúdo:
O interessante deste Dockerfile é que ele vai permitir a visualização dos logs de dentro do container por um outro container
O comando workdir define que o container será iniciado dentro desta pasta
```
FROM python:3.6
LABEL maintainer 'Aluno Cod3r <aluno at cod3r.com.br>'

RUN useradd www && \
    mkdir /app && \
    mkdir /log && \
    chown www /log

USER www
VOLUME /log
WORKDIR /app
EXPOSE 8000

ENTRYPOINT ["/usr/local/bin/python"]
CMD ["run.py"]
```
docker image build -t ex-build-dev .
docker container run -it -v $(pwd):/app -p 8080:8000 --name python-server ex-build-dev
docker container run -it --volumes-from=python-server debiat cat /log/http-server.log

## Redes

### Visão Geral e Tipos de Redes
None Network: sem rede
Bridge Network (padrão): todos os containers se conectam a bridge que faz a ponte com a internet do host
Host Network: Sem a camada bridge fazendo que os containers compartilhem da mesma rede que o host
Overlay Network (Swarm)

docker network ls

### Rede Tipo None (Sem Rede)

Cria um container sem comunicação exterior
docker container run --rm --net none debian -c "ifconfig"

### Rede Tipo Bridge

Veja a rede que está disponivel no bridge
docker network inspect bridge
No campo "Config" você pode ver qual o range disponivel pela bridge
Agora se você criar dois containers verá que eles receberão ips dentro desse range
Você pode também observar que você pode pingar o endereço do outro container que está na bridge pelo container

Criando uma nova rede tipo bridge

docker network create --driver bridge rede_nova
docker network ls
docker network inspect rede_nova -> pra ver o range da nova rede
docker network connect bridge container3 -> conecta o container a outra rede
docker network disconnect bridge container3 -> disconecta o container a outra rede

### Rede Tipo Host

O modo com menor nivel de proteção, mas com mais velocidade.
docker container run -d --name container4 --net host alpine sleep 1000
docker container exec -it container4 ifconfig -> você verá que o container possui as mesmas interfaces de rede que o host

### Configurando Ambiente com Compose
Este capitulo é baseado no diretorio node-mongo-compose do repositório do curso
crie um docker-composer.yml com o seguinte conteudo
```
version: '3'
services:
  db: -> este é o nome do serviço que será chamado pelo backend ('mongodb://db/mydb')
    image: mongo:3.4
  backend:
    image: node:8.1
    volumes:
      - ./backend:/backend -> associando a pasta local ao que será criado no container
    ports:
      - 3000:3000
    command: bash -c "cd /backend && npm i && node app"
  frontend:
    image: nginx:1.13
    volumes:
      - ./frontend:/usr/share/nginx/html/ -> redirecionar onde o nginx busca o arquivo html
    ports:
      - 80:80
```


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
8. Criando um container para desenvolvimento
Dockerfile
```
FROM ruby:2.4.2-jessie

RUN curl -sL https://deb.nodesource.com/setup_6.x > build

RUN /bin/bash build

RUN apt-get install nodejs

RUN gem install rails bundler

VOLUME /log
WORKDIR /app

ENTRYPOINT ["/bin/bash"]
```
scripts/app.sh
```
#!/bin/sh

bundle install
ln -s /app/log /log
rails s
```

iniciando app
```
sudo docker run --name app -v $(pwd):/app -p 8000:3000 udemy-rails ./scripts/app.sh
```

checando log
```
sudo docker run --rm -it --volumes-from=app debian tail -f /log/log/development.log
```
