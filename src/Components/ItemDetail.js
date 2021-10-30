import "./ItemDetail.css"

export function ItemDetail() {

    const QUERY_STRING = window.location.search;
    const URL_PARAMS = new URLSearchParams(QUERY_STRING);
    let itemID = URL_PARAMS.get("itemID")
    let year = URL_PARAMS.get("year")

    return (
        <div>
            {itemID} {year}
            <div class="alert alert-primary">
                <h4 class="alert-primary">Recall Information</h4>
                <hr></hr>
                <div class="row">
                    <div class="col-9">
                        {/* <h4><b>Product: </b>@Html.DisplayFor(model => model.Item.ItemName)</h4>
                        <h5><b>Unit Cost: </b>@Html.DisplayFor(model => model.Item.ItemCost)</h5>
                        <p><b>Descritpion: </b>@Html.DisplayFor(model => model.Item.ItemDescription)</p> */}
                    </div>
                    <div class="col-3">
                        {/* <img src=@Model.Item.ItemImage alt="@Model.Item.ItemName" style="max-width: 100%"> */}
                    </div>
                </div>
            </div>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Contact Details</th>
                        <th scope="col">Address</th>
                        <th scope="col">Total Cost</th>
                        <th scope="col">Units Sold</th>
                    </tr>
                </thead>
                {/* <tbody>
                    @foreach (var item in Model.customers)
                    {
                        <tr>
                            <td>@item.fullName</td>
                            <td>
                                @if (@item.phone != "")
                                {
                        @item.phone<br>
                    }

                                    @if (@item.email != "")
                                    {
                        @item.email
                    }
                            </td>
                            <td>@item.streetAddress<br>@item.suburb</td>
                            <td>@Html.DisplayFor(m => item.totalCost)</td>
                            <td>@item.numberOf</td>
                        </tr>
                    }
                </tbody> */}
            </table>        
        </div>
    );
};

