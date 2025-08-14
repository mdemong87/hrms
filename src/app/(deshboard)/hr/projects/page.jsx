'use client';
import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";

const AllProjects = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://api.nasa.gov/planetary/apod?api_key=vCxZ0QU5Jc2snahiEEtu6dLrzdQconjne8TMGd83&start_date=2025-08-01&end_date=2025-08-14&thumbs=true'
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
                console.log(result);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Loading />;

    return (
        <div>
            {data.map((item, index) => (
                <div key={index} className="mb-2">
                    <h2 className="text-gray-500 text-2xl font-bold">{item.title}</h2>
                    <p className="text-gray-500 pt-1 pb-5">{item?.explanation}</p>
                    <p className="text-gray-500 pt-1 pb-5">{item.copyright}</p>
                    {item.media_type === "image" ? (
                        <img src={item.hdurl} alt={item.title} className="max-w-full rounded-lg " />
                    ) : (
                        <video src={item.url} controls className="max-w-full rounded" />
                    )}

                    <p className="text-gray-500 pt-1 pb-5 italic">{item.date}</p>
                </div>
            ))}
        </div>
    );
};

export default AllProjects;
