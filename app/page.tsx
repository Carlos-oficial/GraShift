'use client'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import clientPromise from "@/lib/mongodb";
import { useEffect, useState } from 'react';
import { fetchFits, Fit } from './server_functions/fits';
import Navbar from "@/app/components/navbar"
import Layout from "./components/layout";
import MobileNavBar from "./components/mobilenavbar";
// import ClothingGraph from "./components/graph";
import GraphView from "./components/GraphView";




export default function Home() {
  const [fits, setFits] = useState<Fit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const _fetchFits = async () => {
      try {
        const data = await fetchFits()
        setFits(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    _fetchFits();
  }, []);

  return (
    <div>
      {fits.length == 0 && <div>
        <p>
          No fits yet ...
        </p>
        
      </div> ||
        <div>
          <h1>All Fits</h1>
          <ul>
            {fits.map((fit) => (
              <a href={`/fit/${fit._id}`} key={fit._id}>
                <li>
                  <h2>{fit.name}</h2>
                  <p>{fit.note}</p>
                </li>
              </a>
            ))}
          </ul>

        </div>
      }

      <GraphView/>
      <a 
          className='bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300' 
          href='/fits/new'>
          New outfit
        </a>
    </div>
  );
}
