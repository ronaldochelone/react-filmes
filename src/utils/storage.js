import AsyncStorage from "@react-native-async-storage/async-storage";

// Buscar os filmes salvos.
export async function getMoviesSave(key) {

    const myMovies = await AsyncStorage.getItem(key);
    
    // Convertendo em string    
    let  moviesSave = JSON.parse(myMovies) || [];

    return moviesSave;
}

// Salvar um novo filme. 
export async function saveMovie(key,newMovie) {

    let moviesStored = await getMoviesSave(key);

    // Se tiver algum filme salvo com esse mesmo ID/ ou duplicado precisamos ignorar
    // a função some() procura ocorrencia dentro do objeto moviesStore
    const hasMovie = moviesStored.some( item => item.id === newMovie.id) 

    if(hasMovie) {
        alert('Este Filme já existe na lista.');
       return; 
    }

    moviesStored.push(newMovie);

    await AsyncStorage.setItem(key,JSON.stringify(moviesStored));
    console.log('Fimles salvos com sucesso.')
}

// Deletear algum filme especifico.
export async function deleteMovie(id) {

    let moviesStored = await getMoviesSave('@react-filmes');

    // Procura o filme e retorna todos menos o que tem o id que passamo 
    // para deletar.
    let myMovies = moviesStored.filter(item =>{

        return (item.id !== id)
    })

    // Grava de novo no localStorage
    await AsyncStorage.setItem('@react-filmes',JSON.stringify(myMovies));

    alert('Filme deletado com sucesso!');

    return myMovies;
}

// Filtrar algum filme se já esta salvo.
export async function hasMovie(movie) {

    let moviesStored = await getMoviesSave('@react-filmes');
    
    const hasMovie = moviesStored.find( item => item.id === movie.id)

    if(hasMovie) {
        return true;
    }

    return false;

}