import Image from "next/image";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import clientPromise from "@/lib/mongodb";
import Navbar from "@/app/components/navbar"
import Layout from "./components/layout";
import MobileNavBar from "./components/mobilenavbar";
import ClothingGraph from "./components/graph";
import GraphView from "./components/GraphView";




export  default async function Home() {
  const client = await clientPromise;

  const db = client.db("Alfaiate");

  const handleClothingClick = (id : String) => {
    console.log('Show outfits with:', id);
    // Maybe open a drawer or modal here
  };

  const fits = await db

      .collection("Fits")

      .find({})

      .toArray();
  return (

    <>  
        <p>{JSON.stringify(fits)}</p>

        <GraphView/>
    </>
  );
}
