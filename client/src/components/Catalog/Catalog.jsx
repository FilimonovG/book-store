import './Catalog.css';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {selectCatalog, toggleCatalog} from '../../store/reducers/toggleSlice';
import {useGetAllCategoriesQuery} from "../../services/categoryApi";

function Catalog() {

    const isActive = useSelector(selectCatalog)
    let {data: categories} = useGetAllCategoriesQuery()
    const dispatch = useDispatch()

    return (
        <>
            <div id="catalog" className={`${isActive ? "_active" : ""}`}>
                <h2 className="catalog-header">Каталог</h2>
                {categories?.toSorted((a,b)=>a.id > b.id ? 1 : -1)
                    .map(category => (
                    <Link key={category.id} to={`/category/${category.id}`}>
                        <div className="catalog__item">
                            <span className="catalog__title">{category.title}</span>
                        </div>
                    </Link>
                ))}
            </div>
            <div className={`shading${isActive ? " active" : ""}`} onClick={()=>dispatch(toggleCatalog())}></div>
        </>
    )
}

export default Catalog;