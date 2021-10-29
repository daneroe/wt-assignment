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

  // Set default state for items and years (Empty)
  const [years, setYears] = useState([])
  const [items, setItems] = useState([])

  // URLs
  const BASEURL = "http://localhost:56384"
  const RECALLSEARCH = "/api/RecallSearch?searchText="
  const YEARSEARCH = "/api/YearList"

  const fetchItemData = async (query) => {

    //Tack on year to search if selected
    const YEARPART = searchYear == "" ? "" : `&year=${searchYear}`

    console.log(BASEURL + RECALLSEARCH + query + YEARPART)

    try {
     fetch(BASEURL + RECALLSEARCH + query + YEARPART)
     .then(res => res.json())
     .then(data => {
       console.log(data)
       setItems(data)
      })
    } catch (error) {
      console.log('failed', error)
    }
  }
  
  // Debug wrapper for setSearchQuery
  const setString = (query) => {
    setSearchQuery(query)
  }

  const setYearSelect = (year) => {
    console.log(year)
    setSearchYear(year)
  }

  const fetchYears = async () => {
    try {
     fetch(BASEURL + YEARSEARCH)
     .then(res => res.json())
     .then(data => {
       console.log(data)
       setYears(data)
      })
    } catch (error) {
      console.log('failed', error)
    }
  }

  useEffect(() => {
    fetchYears()
  }, []);

  return (
    <div className='container'>
      <ItemRecall 
        years={years}
        items={items}
        searchQuery={searchQuery}
        searchYear={searchYear}
        setString={setString}
        setYearSelect={setYearSelect}
        fetchItemData={fetchItemData}
      ></ItemRecall>
    </div>
  );
}

export default App;
