import './App.css';
import { ItemRecall } from './Components/ItemRecall'
import { ItemDetail } from './Components/ItemDetail'
import {
  useEffect,
  useState
} from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

function App() {

  // Persisted Data
  let store = window.sessionStorage

  let storedItemData = JSON.parse(store.getItem('itemData'))
  let storedQuery = store.getItem('query')
  let storedYear = store.getItem("year")

  // Set default state for our variables. Use persisted state if exists
  const [searchQuery, setSearchQuery] = useState(storedQuery || "");
  const [searchYear, setSearchYear] = useState(storedYear.toString() || "");
  const [validSearch, setValidSearch] = useState(true)

  // Set default state for items and years (Empty)
  const [years, setYears] = useState([])
  const [items, setItems] = useState(storedItemData || [])
  const [itemNames, setItemNames] = useState([]);

  // Wrapper for setSearchQuery
  const setString = (query) => {
    store.setItem('query', query);
    setSearchQuery(query)
  }

  // Wrapper for setSearchYear
  const setYearSelect = (year) => {
    store.setItem('year', year);
    setSearchYear(year)
  }

  // URLs
  const BASE_URL = "http://localhost:56384"
  const RECALL_SEARCH = "/api/RecallSearch?searchText="
  const YEAR_SEARCH = "/api/YearList"
  const NAME_LIST = "/api/NameList"
  const BASE_FRONTEND_URL = 'http://localhost:3000'

  const detailClicked = (item, year) => {
    let detailURL = BASE_FRONTEND_URL + `/detail?itemID=${item.itemID}&year=${year}`
    window.location.assign(detailURL)
  }

  const fetchItemData = (query) => {

    // Check if search sring is valid
    if (query === null || query.length < 2) {
      setValidSearch(false);
      return;
    }

    // Fecth if so
    setValidSearch(true);

    const YEARPART = searchYear === "" ? "" : `&year=${searchYear}`

    try {
      fetch(BASE_URL + RECALL_SEARCH + query + YEARPART)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setItems(data)
          store.setItem('itemData', JSON.stringify(data));
        })
    } catch (error) {
      console.log('failed', error)
    }
  }

  const fetchYears = () => {
    try {
      fetch(BASE_URL + YEAR_SEARCH)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setYears(data)
        })
    } catch (error) {
      console.log('failed', error)
    }
  }

  const fetchNames = () => {
    try {
      fetch(BASE_URL + NAME_LIST)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setItemNames(data)
        })
    } catch (error) {
      console.log('failed', error)
    }
  }

  useEffect(() => {
    fetchYears()
  }, []);

  useEffect(() => {
    fetchNames()
  }, []);

  // Render
  return (
    <div className='container'>
      <Switch>
        <Route exact path="/">
          <ItemRecall
            years={years}
            items={items}
            searchQuery={searchQuery}
            searchYear={searchYear}
            itemNames={itemNames}
            validSearch={validSearch}
            setString={setString}
            setYearSelect={setYearSelect}
            fetchItemData={fetchItemData}
            detailClicked={detailClicked}
          ></ItemRecall>
        </Route>
        <Route path="/detail">
          <ItemDetail></ItemDetail>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
