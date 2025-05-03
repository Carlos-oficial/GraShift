'use client'

import { fetchFits, Fit } from "@/app/server_functions/fits";
import ProfileHeader from "../../components/ProfileHeader";
import ResponsiveAvatar from "../../components/UserAvatar";
import React from "react";


export default function ProfilePage() {

  const [fits, setFits] = React.useState<(Fit & { imageUrl: string })[]>([]);

  React.useEffect(() => {
    async function loadFits() {
      const fetchedFits = await fetchFits();  
      setFits(fetchedFits);
    }
    loadFits();
  }, []);

  return (
    <div>
      <ProfileHeader imageSrc="/uploads/fit1.jpg" name="Carlos" username="carlitos_mistos" outfitCount={34} />
      {/* <div>
        {fits.map((fit) => (
          <a key={fit._id} href={`/fit/${fit._id}`}>

          <div  className="fit-item">
            <h3>{fit.name}</h3>
            <img src={fit.imageUrl} alt={fit.name} />
          </div>
          </a>
        ))}
      </div>
 */}

    </div>
  )
}