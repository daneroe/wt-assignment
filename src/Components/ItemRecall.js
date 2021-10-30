import "./ItemRecall.css"

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

            <div className="mb-2 row">
                <div className="col-4">
                    <input className="form-control"
                        value={props.searchQuery}
                        onInput={(e) => props.setString(e.target.value)}
                        type='text'
                        list="itemNames"
                        placeholder="Begin typing to search"
                    />
                </div>

                <datalist id="itemNames" >
                    {props.itemNames.map((name, key) =>
                        <option key={key} value={name} />
                    )}
                </datalist>

                <div className="col-2">
                    <select
                        className="form-control"
                        id="searchYear"
                        value={props.searchYear}
                        onChange={e => props.setYearSelect(e.target.value)}
                    >
                        <option value=''>Select a year</option>
                        {props.years.map((year, key) =>
                            <option key={key} value={year}>{year}</option>
                        )}
                    </select>
                </div>

                <div className="col-2">
                    <button onClick={(e) => props.fetchItemData(props.searchQuery)} className="btn btn-outline-primary">Search</button>
                </div>
            </div>

            {!props.validSearch &&
                <div>
                    <p><b>Search must contain at least 2 charachters</b></p>
                </div>
            }

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
                <tbody title="View Effected Customers">

                    {props.items.map((item) =>
                        <tr key={item.itemID}
                        onClick={(e)=> props.detailClicked(item, props.searchYear)}
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

