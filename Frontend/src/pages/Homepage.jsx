import HomepageContent from "../components/HomepageContent.jsx";
import NavSidebar from "../components/Nav&Sidebar.jsx";

export default function Home() {
    return (
        <div className="bg-white">
            <NavSidebar />
            <HomepageContent/>
        </div>
    );
}
