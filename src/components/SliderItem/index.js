import React from "react";
import { Container, BannerItem, Title, RateContainer, Rate } from './styles';
import { Ionicons } from '@expo/vector-icons';


function SliderItem() {
 
    return(
        <Container activeOpacity={0.7}>
            <BannerItem 
                source={ {uri: 'https://br.web.img3.acsta.net/r_1920_1080/medias/nmedia/18/79/34/36/19850946.jpg'} }
           />
            <Title numberOfLines={1}> Merlin é uma excente serie </Title>
            <RateContainer>
                <Ionicons name="md-star"  color="#E7A74e" />
                <Rate>9/10</Rate>
            </RateContainer>
        </Container>       
    ) 
}

export default SliderItem;