"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Repertoire {
  name: string;
  description: string;
  img_url: string;
}

export const RepertoireInfo = () => {
  const params = useParams();
  const id = params.id as string;
  const [repertoire, setRepertoire] = useState<Repertoire | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/repertoire/${id}`)
        .then((res) => res.json())
        .then((data) => setRepertoire(data))
        .catch((err) => console.error("Error fetching Repertoire:", err));
    }
  }, [id]);

  return <div>{repertoire?.name}</div>;
};

export default RepertoireInfo;
