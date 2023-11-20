import FreeCellPage from '../components/FreeCellPage';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const FreecellPage = ({ data }) => {
  return (
    <div>
      {data ? (
        <FreeCellPage data={data} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export async function getServerSideProps() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const apiUrl = `${baseUrl}/api/visualize`;

    const res = await fetch(apiUrl);

    const data = await res.json();

    return {
      props: {
        data: data.data || null,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: {
        data: null,
      },
    };
  }
}



export default FreecellPage;
