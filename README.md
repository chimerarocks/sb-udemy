
Repositório do curso: https://github.com/cod3rcursos/curso-docker

## Docker Mongo Rest

###Passos utilizados para gerar o backend

####Obtendo o package.json da aplicação

npm init -y
npm i --save express@4.15.3 mongoose@4.11.1 node-restful@0.2.6 body-parser@1.17.2 cors@2.8.3
rm -rf node_modules

###Gerando os containers

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