
Repositório do curso: https://github.com/cod3rcursos/curso-docker

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