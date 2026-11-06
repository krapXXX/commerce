
import { Link } from "react-router-dom";
import "./ui/Subsection.css";
import type IProductSection from "../../entities/section/model/SectionType";

export default function Subsection({section}: {section: IProductSection}) {

    return <Link
        className="subsection-card text-decoration-none"
        to={"/section/" + section.slug}
    >
        <div className="subsection-card-img">
            <img src={section.imageUrl} alt={section.title} />
        </div>

        <p className="subsection-card-title">{section.title}</p>
    </Link>;
}
