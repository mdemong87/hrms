'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UnderDevelopment from "@/components/common/UnderDevelopment";

const AllProjects = () => {
    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(
    //                 'https://api.nasa.gov/planetary/apod?api_key=vCxZ0QU5Jc2snahiEEtu6dLrzdQconjne8TMGd83&start_date=2025-08-01&end_date=2025-08-14&thumbs=true'
    //             );

    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }

    //             const result = await response.json();
    //             setData(result);
    //             console.log(result);
    //         } catch (error) {
    //             console.error("Fetch error:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // if (loading) return <Loading />;

    return (
        <div>
            <PageBreadcrumb pageTitle={"All Project"} />
            <UnderDevelopment />
        </div>
    );
};

export default AllProjects;
