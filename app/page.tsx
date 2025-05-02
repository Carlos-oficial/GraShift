'use client'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import clientPromise from "@/lib/mongodb";
import { useEffect, useState } from 'react';
import { fetchFits, Fit } from './server_functions/fits';

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
      <button>
        <div>

          <HomeOutlinedIcon />
        </div>
      </button>
      {fits.length == 0 && <div>
        <p>
          No fits yet ...
        </p>
        <a href='/fits/new'> add yout first outfit here!</a >
      </div> ||
        <div>
          <h1>All Fits</h1>
          <ul>
            {fits.map((fit) => (
              <a href={`/fit/${fit._id}`} key={fit._id}>
                <li>
                  <h2>{fit.name}</h2>
                  <p>{fit.description}</p>
                </li>
              </a>
            ))}
          </ul>
        </div>
      }

    </div>
  );
}
