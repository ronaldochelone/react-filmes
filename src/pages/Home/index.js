import React from "react";
import { ScrollView } from 'react-native';

import { Container, SchearchContainer, Input, SearchButton, Title, BannerButton, Banner, SliderMovie } from './styles';

import { Feather } from '@expo/vector-icons';
import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';


function Home() {
    return (
        <Container>
            <Header title="Os melhores Filmes"/>
            <SchearchContainer>
                <Input 
                    placeholder="Ex: Filmes e Series"
                    placeholderTextColor="#ddd"
                />
                <SearchButton>
                    <Feather name="search" size={30} color="#FFF" />
                </SearchButton>
            </SchearchContainer>


            <ScrollView showsVerficalScrollIndicator={false}>
                <Title> Em Cartaz </Title>
                <BannerButton activeOpacity={0.9} onPress={() => alert('Merlin')}>
                    <Banner
                    resizeMethod="resize"
                    source={{ uri: `https://epipoca.com.br/wp-content/uploads/2021/05/As-Aventuras-de-Merlin-Divulgacao.jpg`}}
                    />
                </BannerButton>

                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={[1,2,3,4,5]}
                    renderItem={ (item)=> <SliderItem/>}
                />             
                
                <Title> Populares </Title>

                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={[1,2,3,4,5]}
                    renderItem={ (item)=> <SliderItem/>}
                /> 

                <Title> Mais Votados </Title>

                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={[1,2,3,4,5]}
                    renderItem={ (item)=> <SliderItem/>}
                /> 

            </ScrollView>

            





        </Container>
    )
}

export default Home;