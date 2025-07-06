import NavSidebar from "../components/NavSidebar.jsx";
import HomepageContent from "../components/HomepageContent.jsx";

export default function Home() {
    return (
        <div className="bg-white">
            <NavSidebar />
            <HomepageContent/>
        </div>
    );
}