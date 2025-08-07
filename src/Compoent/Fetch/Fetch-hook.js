import { useState,useEffect } from "react";
import axios from 'axios '


const useFetchData = ()=>{

    const [data,setData]=useState({});
    const [loading,setLoading]=useState(true);


    useEffect(()=>{


        const fetchData=async () =>{
            try{
                const {data:response}= await axios.get('http://localhost:3000');
                setData(response);
            } catch(error){
                console.log(error)
            }
            setLoading(false)
        };

        fetchData()
    },[]);


    return(

       {

        data,loading
       }
    )
}


