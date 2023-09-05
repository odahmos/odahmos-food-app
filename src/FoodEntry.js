
import { Link } from "react-router-dom";


function FoodEntry({name,location,avatar,id}){
    return(
      
        <section className="search-result-item">
                <a className="image-link" href="#"><img className="image" src={avatar}/></a>
                
                <div className="search-result-item-body">
                    <div className="row">
                        <div className="col-sm-9">
                            <h4 className="search-result-item-heading"><Link to={`/food/${id}`}>{name}</Link></h4>
                            <p className="fs-mini text-muted">PER WEEK</p>
                        </div>
                        
                    </div>
                </div>
        </section>

    );
}


export default FoodEntry;