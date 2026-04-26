const Dashboard = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold">Admin Dashboard</h2>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded shadow">
          Products
        </div>

        <div className="bg-white p-4 rounded shadow">
          Categories
        </div>

        <div className="bg-white p-4 rounded shadow">
          Orders
        </div>
      </div>
    </div>
  );
};

export default Dashboard;