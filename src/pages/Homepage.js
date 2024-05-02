import React,{useState, useEffect} from 'react'
import Search from '../components/Search'
import Pictures from '../components/pictures'

const Homepage = () => {
    const [input, setInput] = useState("")
    let [data, setData] = useState(null)
    let [page,setPage] = useState(1);
    let [currentSearch, setCurrentSearch] = useState("");
    const auth = "請使用自己的API"
    const initialUrl = "https://api.pexels.com/v1/curated?page=1&per_page=15"
    const searchUrl = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=15 `
    const search = async(url)=>{
      setPage(2);
      const dataFetch = await fetch(url,{
        method:"GET",
        headers:{
          Accept:"application/json",
          Authorization:auth,
        }
      })
      let parseData = await dataFetch.json();
      setData(parseData.photos);
  
    }

    const loadHandler =async () =>{
        let newUrl;
        if (input===""){
          newUrl = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`
        }else{
          newUrl =`https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=15&page${page} `
        }
        setPage(page+1);
        const dataFetch = await fetch(newUrl,{
        method:"GET",
        headers:{
          Accept:"application/json",
          Authorization:auth,
        }
      })
      let parseData = await dataFetch.json();
          setData(data.concat(parseData.photos))

    }


    useEffect(()=>{
      search(initialUrl);
    },[])

    useEffect(()=>{
      if (currentSearch === ""){
        search(initialUrl);
      }else{
        search(searchUrl)
      }
    },[currentSearch])
    
  return (
    <div style={{minHeight:"100vh"}}>
        <Search 
        search={()=>{
          setCurrentSearch(input)
          search(searchUrl)}} setInput={setInput}/>
        <div className="pictures">
        {data &&
          data.map((d) => {
            return <Pictures data={d} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={loadHandler}>Load More</button>
      </div>
    </div>
  )
}

export default Homepage