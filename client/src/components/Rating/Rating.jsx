import './Rating.css'

function Rating({item, class_name}) {
    return (
        <div className={class_name}>
            {[...Array(5)].map((_, i) => {
                if (Math.round(item.rating) > i) {
                    return (
                        <span className={'rating__star'}>
                            <svg viewBox="0 0 24 24" fill="#fbb500" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                            </svg>
                        </span>
                    )
                }
                return (
                    <span className={'rating__star'}>
                        <svg viewBox="0 0 24 24" fill="#d3dadf" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                    </span>
                )
            })}
            <span className={'rating__value'}>
                {item.rating}
            </span>
            <span className={'number_of_ratings__value'}>
                ({item.number_of_ratings})
            </span>
        </div>
    )
}

export default Rating;