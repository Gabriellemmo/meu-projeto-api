# CLONAR PROJETO
git clone https://github.com/Gabriellemmo/meu-projeto-api.git
cd meu-projeto-api

# BACKEND (.NET)
cd meu-projetobackend/dotnet-main
dotnet restore
dotnet ef database update
dotnet run

# FRONTEND (React)
cd meu-projetofrontend/react-base-main
npm install
npm start

# GIT (ATUALIZAR PROJETO)
git add .
git commit -m "update"
git push
