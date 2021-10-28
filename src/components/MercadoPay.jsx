import { useState } from "react";
import MercadoPago from 'mercadopago'
import URLrequests from "./constanteURL";
import { useHistory, Redirect } from "react-router-dom";
import axios from 'axios';

//publick key    APP_USR-5f1128d2-a4bd-4757-bcba-dd9f3c7a206b
//acces token    APP_USR-1247360419343065-102617-5412d22d192acbf4a759f7604a413827-1007313934
//client id      1247360419343065
//client secret  YSc0MuTDhepi5Fs3pRsZV8YwezW04mlp




export default function MercadoPay() {

    const [cantidad, setCantidad] = useState(1);

    const history = useHistory();
    const toLink = (link) => {
        console.log("llego al redirect");
        history.go(`${link}`);
    };
    

   const productoEvento = {
       title: "Fiesta en la ruta dijo el Lean",
       unit_price: 500,
       quantity: 1
   }

   const handleSubmit = async (e) => {
    e.preventDefault();

    const post = {
        title: "Ruta en la fiesta",
        price: 200,
        quantity: 1
    }
    

    async function fetchPost(data) {
        try {
            const {data} =  await axios.post(`${URLrequests}api/payment/new`, post)
            console.log("data",data);

            if (data.LinkMP) {
                window.open(data.LinkMP);
               

            } else if  (data.err){
                alert("error al crear el link");

            }
        } catch (error) {
            console.error(error);
        };
    }
    fetchPost(post)
    console.log("constPost", post) 
};
       
    
  
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="price" value="500"></input>
                <input type="hidden" name="title" value="Fiesta en la ruta"></input>
                <input type="number" name="quantity" onChange={(e)=> setCantidad(parseInt(e.target.value))} value={cantidad}/>
                
                <button>Comprar</button>
            </form>
        </div>
    )
}