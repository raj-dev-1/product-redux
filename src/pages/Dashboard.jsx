import DataTable from "../components/ui/DataTable";


const Dashboard = () => {
  return (
    <>
        <div className="mt-30">
            <div className="px-10 py-10 max-md:px-4 max-w-[1440px] mx-auto relative">
                <h2 className="text-3xl font-bold mb-5 text-center">Data Table</h2>
                <DataTable />
            </div>
        </div>
    </>
  );
};

export default Dashboard;