import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="flex-grow flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl mb-4">Welcome to the Leaflet Map Demo</h1>
        <Link to="/map" className="text-blue-500 hover:text-blue-700 underline">
          View Leaflet Map
        </Link>
      </div>
    </div>
  );
};

export default Index;