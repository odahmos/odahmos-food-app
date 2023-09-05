function FoodHeader({results,searchFood,pageSize,handleChange,handleTextSearch}){
  
    return(
        <div>
        <p className="search-results-count">About {results} results</p>
            <div style={{"display":"flex","width":"50%"}}>
                    <label>Search for food:</label>
                    <input type="text" name='searchFood' value={searchFood} onChange={handleTextSearch}/>
                    <label>Page Size:</label>
                    <select value={pageSize} onChange={handleChange}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
            </div>
        </div>
    );
}

export default FoodHeader;