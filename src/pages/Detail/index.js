import React from "react";
import { Container, Header, HeaderButton } from './styles';


import { Feather, Ionicons} from '@expo/vector-icons'

function Detail() {
    return (
        <Container>
            <Header>
                <headerButton>
                    <Feather
                        nome="arraw-left"
                        size={28}
                        color="#FFF"
                    />
                </headerButton>

                <HeaderButton>
                   <Ionicons
                    nome="bookmark"
                    size={28}
                    color="#FFF"
                   
                   />
                </HeaderButton>

            </Header>
        </Container>
    )
}

export default Detail;