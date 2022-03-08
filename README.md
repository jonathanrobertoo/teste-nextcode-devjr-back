# Teste para vaga de estágio - NextCode

Projeto implementado para fins de avaliação para a empresa Nextcode, visando uma vaga de estágio como desenvolvedor.

## Funcionalidade
Essa API foi implementada através da linguagem JavaScript rodando em ambiente NodeJS para receber um arquivo nos formatos 'jpg', 'jpeg', 'png', e caso não possua algumas dessas extensões citadas, retorna uma mensagem de formato inválido, e caso o usuário se esqueça de carregar o arquivo, a API retornará uma mensagem indicando que o arquivo não fora encontrado. Além disso, também foi adicionada a funcionalidade de exclusão da imagem enviada.

## Ferramentas
Para a implementação da API, foram utilizados os programas: VS Code, Git, Insomnia e o framework Express. Para banco de dados, foi utilizada uma instância do MongoDB rodando em memória.

# Endpoints

Os endpoints da API estão descritos abaixo.

## Inserir uma imagem

### Request

`POST /images`

    curl -i --request POST 'localhost:3001/images' --form 'photo=@"/path/to/file.jpg"'

### Response

    HTTP/1.1 201 Created
    Date: Mon, 07 Mar 2022 20:44:03 GMT
    Status: 201 Created
    Connection: keep-alive
    Content-Type: application/json
    Content-Length: 267060

    {"message":"New image inserted.","file":{"name":"file.jpg","size":200228,"base64":"/9j/4AAQSkZJR..."}}

## Inserir uma imagem (Arquivo não foi enviado)

### Request

`POST /images`

    curl -i --request POST 'localhost:3001/images'

### Response

    HTTP/1.1 500 Internal Server Error
    Date: Mon, 07 Mar 2022 21:09:57 GMT
    Status: 500 Internal Server Error
    Connection: keep-alive
    Content-Type: text/html; charset=utf-8
    Content-Length: 17

    No file was sent.

## Inserir uma imagem (Formato de arquivo inválido)

### Request

`POST /images`

    curl -i --request POST 'localhost:3001/images' --form 'photo=@"/path/to/file.pdf"'

### Response

    HTTP/1.1 500 Internal Server Error
    Date: Mon, 07 Mar 2022 21:14:40 GMT
    Status: 500 Internal Server Error
    Connection: keep-alive
    Content-Type: text/html; charset=utf-8
    Content-Length: 23

    Invalid file extension.

## Buscar todas as imagens

### Request

`GET /images`

    curl -i GET 'localhost:3001/images'

### Response

    HTTP/1.1 200 OK
    Date: Mon, 07 Mar 2022 20:51:59 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json
    Content-Length: 801160

    [{"_id":"62266d1a25753138946304b5","name":"659159.jpg",...},{"_id":"62266d1a25753138946304b5","name":"659159.jpg",...}]

## Buscar uma imagem específica

### Request

`GET /images/:image`

    curl -i GET 'localhost:3001/images/6226726c8668a3ccc608f2fe'

### Response

    HTTP/1.1 200 OK
    Date: Mon, 07 Mar 2022 21:02:51 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json
    Content-Length: 267052

    {"_id":"6226726c8668a3ccc608f2fe","name":"file.jpg","size":200228,"base64":"/9j/4AAQSkZJRgAB..."}

## Buscar uma imagem específica (Imagem não encontrada)

### Request

`GET /images/:image`

    curl -i GET 'localhost:3001/images/6226726c8668a3ccc608f2fe'

### Response

    HTTP/1.1 404 Not Found
    Date: Mon, 07 Mar 2022 21:07:20 GMT
    Status: 404 Not Found
    Connection: keep-alive
    Content-Type: text/html; charset=utf-8
    Content-Length: 15

    File not found.

## Deletar uma imagem específica

### Request

`DELETE /images/:image`

    curl -i --request DELETE 'localhost:3001/images/6226726c8668a3ccc608f2fe'

### Response

    HTTP/1.1 204 No Content
    Date: Mon, 07 Mar 2022 21:18:35 GMT
    Status: 204 No Content
    Connection: keep-alive
