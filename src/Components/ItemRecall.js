export function ItemRecall(props) {
    return (

        <div>
            <div className="alert alert-warning text-center"><h2>Item Recall Search</h2></div>
            <div className="alert alert-danger">
                <h4 className="alert-heading">Warning</h4>
                <hr></hr>
                <b>All search activity on this page is logged</b><br></br>
                This page is only to be used for quickly locating customers of a product impacted by a product recall<br></br>
                Do not use this page to search and identify customers of regular shop purchases
            </div>

            {props.word}

            <div className="mb-2 row">
                <div className="col-4">
                    <input className="form-control"
                        value={props.searchQuery}
                        onInput={(e) => props.setString(e.target.value)}
                        type='text'
                        id='header-search'
                        placeholder="Begin typing to search"
                        name='query'
                    />
                </div>

                <datalist id="itemNames" >
                    {/* {props.vm.years.map((item, key) =>
                        <option key={key} value={item} />
                    )} */}
                </datalist>

                <div className="col-2">
                    <select 
                    className="form-control" 
                    id="searchYear"
                    onChange={e => props.setYearSelect(e.target.value)}
                    >
                        <option value=''>Select a year</option>
                        {props.years.map((year, key) =>
                            <option key={key} value={year}>{year}</option>
                        )}
                    </select>
                </div>

                <div className="col-2">
                    <button type="submit" onClick={(e) => props.fetchItemData(props.searchQuery)} className="btn btn-outline-primary">Search</button>
                </div>
            </div>

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Item Name</th>
                        <th scope="col">Item Description</th>
                        <th scope="col">Item Cost</th>
                        <th scope="col">Category</th>
                        <th scope="col">Units Sold</th>
                        <th scope="col">Customers</th>
                    </tr>
                </thead>
                <tbody>

                    {props.items.map((item) => 
                        <tr key={item.itemID}
                            // onclick="detailClick(@item.ItemId)"
                        >
                        <td>{item.itemName}</td>
                        <td>{item.itemDescription}</td>
                        <td>{"$" + item.itemCost}</td>
                        <td>{item.itemCatName}</td>
                        <td>{item.unitsSold}</td>
                        <td>{item.customerCount}</td>
                    </tr>
                    )}


                </tbody>
            </table>

        </div>
    );
};

