import './App.css';
import { ItemRecall } from './Components/ItemRecall'
import {
  useEffect,
  useState
} from 'react';

function App() {

  // Set default state for our variables
  const [searchQuery, setSearchQuery] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [validSearch, setValidSearch] = useState(true)

  // Set default state for items and years (Empty)
  const [years, setYears] = useState([])
  const [items, setItems] = useState([])
  const [itemNames, setItemNames] = useState([]);

  // URLs
  const BASE_URL = "http://localhost:56384"
  const RECALL_SEARCH = "/api/RecallSearch?searchText="
  const YEAR_SEARCH = "/api/YearList"
  const NAME_LIST = "/api/NameList"

  const detailClicked = (item, year) => {
    console.log(item, year)
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

  // Debug wrapper for setSearchQuery
  const setString = (query) => {
    console.log(query)
    setSearchQuery(query)
  }

  // Debug wrapper for setSearchYear
  const setYearSelect = (year) => {
    console.log(year)
    setSearchYear(year)
  }

  useEffect(() => {
    fetchYears()
  }, []);

  useEffect(() => {
    fetchNames()
  }, []);

  useEffect(() => {
    fetchNames()
  }, []);

  return (
    <div className='container'>
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
    </div>
  );
}

export default App;
