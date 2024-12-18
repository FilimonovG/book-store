import './Catalog.css';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";
import { selectCatalog } from '../../store/reducers/toggleSlice';
import {useGetAllCategoriesQuery} from "../../services/categoryApi";

function Catalog() {

    const isActive = useSelector(selectCatalog)
    const {data: categories} = useGetAllCategoriesQuery()

    return (
        <div id="catalog" className={`${isActive ? "_active" : ""}`}>
            <h2 className="catalog-header">Каталог</h2>
            {categories?.map(category=>(
                <Link to={`/category/${category.id}`}>
                    <div className="catalog">
                        <span className="catalog__title">{category.title}</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Catalog;