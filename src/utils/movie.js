// Retornar uma lista de Filmes Filtrada , apartir do numero de filmes a serem filtrados.
export function getListMovies(size,movies) {
   
    let popularMovies = [];

    for (let i = 0, l= size;  i <  l; i++) {        
        popularMovies.push(movies[i]);
    }    

    return popularMovies;    
}

// Gerar um numero aleatório , com base no tamanho da lista de filmes passada
export function randomBanner(movies) {       
    return Math.floor(Math.random() * movies.length)
}