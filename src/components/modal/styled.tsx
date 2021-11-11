import styled from 'styled-components'

export const Overlay = styled.div`
padding: 30px;
    top: 0;
    left: 0;
    display: flex;
    position: absolute;
    z-index:5000;
    background-color: rgba(0,0,0,.6);
    height: 100vh;
    top: 125;
    left: 900;
    -webkit-aling-items: center;
    -webkit-box-aling: center;
    -ms-flex-aling: center;
    aling-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    width: 100vw;
    align-items: center;
`;


export const ContenedorModal = styled.div`
    width: 600px;
    height: 180px;
    border-radius: 5px;
    min-height: 100px;
    padding: 15px;
    background: #fff;
    position: relative;
    h4{
        font-weight: 500;
        font-size:16px;
        color: black;
    }
    `;

export const EncabezadoModal = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom:10px;
        padding-bottom:20px;
        border-bottom:1px solid #00bc8c;   
        h3{
            font-weight: 500;
            font-size:16px;
            color: black;         
        }
      
        `

export const Boton = styled.button`
            position: absolute;
            top:0px;
            right:10px;
            background: none;
            width: 30px;
            height:30px;
            border:none;
            cursor:pointer;
            transition: .3s ease all;
            border-radius:5px;
            color: #1766DC;
           


            &:hover{
                background: #f2f2f2; 
            }      
        
        `

export const BotonEliminar = styled.button`
          
        background: #00bc8c;   
        padding: 10px;    
        border:none;
        cursor:pointer;
        transition: .3s ease all;
        border-radius:5px;
        color: white;
        margin-top:22px;
        &:hover{
            background: black;
            color:white; 
            border:none;
        }      
    
    `
