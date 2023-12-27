import Navbar from "@/src/pages/commons/navbar/Navbar.tsx";
import Weights from "@/src/components/weights/weights.tsx";
import Sidebar from "@/src/pages/commons/Sidebar/Sidebar.tsx";

const WeightPage = () => {
    return (
        <div className="w-full">
            <Navbar/>
            <div className="container my-4 grid grid-cols-12">
                <div className="hidden md:inline-flex col-span-2">
                    <Sidebar/>
                </div>
                <div className="col-span-12 md:col-span-10">
                    <Weights/>
                </div>
            </div>
        </div>
    );
}

export default WeightPage;
