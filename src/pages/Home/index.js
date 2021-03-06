import React, { 
            useState, 
            useEffect 
        }           from "react";
import  { 
            ScrollView, 
            ActivityIndicator 
        }           from 'react-native';
import  {   Container, 
            SchearchContainer, 
            Input, 
            SearchButton, 
            Title, 
            BannerButton, 
            Banner, 
            SliderMovie 
        }           from './styles';

import { Feather }  from '@expo/vector-icons';
import Header       from '../../components/Header';
import SliderItem   from '../../components/SliderItem';
import api, { key } from '../../services/api';
import { getListMovies, randomBanner } from '../../utils/movie'
import { useNavigation } from '@react-navigation/native';

function Home() {

    const [ nowMovies, setNowMovies]            = useState([]);
    const [ popularMovies, setPopularMovies]    = useState([]);
    const [ topMovies, setTopMovies]            = useState([]);
    const [ loading, setLoading]                = useState(true);
    const [ bannerMovie, setBannerMovie]        = useState({});

    /* Estado do campo de pesquisa */
    const [search, setSearch]                   = useState('');


    const navigation  =   useNavigation();

    
    useEffect(()=>{

        let isActive =true;
        const ac = new AbortController;

        async function getMovies() {

            const [nowData, popularData, topData] = await Promise.all([
                
                    api.get('/movie/now_playing',{
                        params:{
                            api_key:key,
                            language:'pt-br',
                            page:'1'
                        }
                    }),
                    api.get('/movie/popular',{
                            params:{
                                api_key:key,
                                language:'pt-br',
                                page:'1'
                            }
                    }),
                    api.get('/movie/top_rated',{
                            params:{
                                api_key:key,
                                language:'pt-br',
                                page:'1'
                            }
                    }),
            ]);
            
            //Verifica se a pagina est?? ativa se n??o n??o iniciamos os carregamentos
            if(isActive)
            {
                const nowList       = getListMovies(20,nowData.data.results);
                const popularList   = getListMovies(20,popularData.data.results);
                const topList       = getListMovies(20,topData.data.results);
                
                // Seta um numero aleat??rio para ramdomizar o banner principal
                setBannerMovie(nowData.data.results[randomBanner(nowData.data.results)]);

                setNowMovies(nowList);
                setPopularMovies(popularList);
                setTopMovies(topList);
                setLoading(false);
            }            
        }

        getMovies();

        return ()=> {
            //::: Quando trocamos de tela realizamos a chamada da fun????o anonima. ::: 
            // Informamos que n??o est?? mais ativa a pagina
            isActive = false;
            // Abortamos todas as chamadas ass??ncronas
            ac.abort();
        }
    },[]);


    function navigateDetailsPage(item) {
        navigation.navigate('Detail',{ id:item.id });
    }


    function handlerSearchMovie() {

        if(search ==='') {
            alert('Preencha o campo de pesquisa');
            return;
        }

        navigation.navigate('Search',{name:search});
        setSearch('');
    }



    // Verifica se o app est?? carregando
    if(loading) {

        return (
                    <Container>
                        <ActivityIndicator size="large" color="#FFF"/>
                    </Container>
        );
    }


    return (
            <Container>
                <Header title="Os melhores Filmes"/>
                
                <SchearchContainer>
                    <Input 
                        placeholder="Ex: Filmes e Series"
                        placeholderTextColor="#ddd"
                        value={search}
                        onChangeText={(text) =>setSearch(text)}
                    />
                    <SearchButton onPress={handlerSearchMovie}>
                        <Feather name="search" size={30} color="#FFF" />
                    </SearchButton>
                </SchearchContainer>


                <ScrollView showsVerficalScrollIndicator={false}>
                    <Title> Em Cartaz </Title>
                    <BannerButton activeOpacity={0.9} onPress={ () => navigateDetailsPage(bannerMovie) }>
                        <Banner
                            resizeMethod="resize"
                            //source={{ uri: `https://epipoca.com.br/wp-content/uploads/2021/05/As-Aventuras-de-Merlin-Divulgacao.jpg`}}
                            source={ {uri: `https://image.tmdb.org/t/p/original${bannerMovie.poster_path}`} }                    

                        />
                    </BannerButton>

                    <SliderMovie
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={nowMovies}
                        renderItem={ ({item})=> <SliderItem data={item} navigatePage={()=> navigateDetailsPage(item) } /> }
                        keyExtrator={(item) => String(item.id.toString())}
                    />             

                    <Title> Populares </Title>

                    <SliderMovie
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={popularMovies}
                        renderItem={ ({item})=> <SliderItem data={item} navigatePage={()=> navigateDetailsPage(item) } />}
                        keyExtrator={(item) => String(item.id.toString())}
                    /> 

                    <Title> Mais Votados </Title>

                    <SliderMovie
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={topMovies}
                        renderItem={ ({item})=> <SliderItem data={item} navigatePage={()=> navigateDetailsPage(item) } />}
                        keyExtrator={(item) => String(item.id.toString())}
                    /> 

                </ScrollView>

            </Container>
    )
}

export default Home;