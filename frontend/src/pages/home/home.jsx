import React from 'react'
import './home.css'
import Header from '../../components/header/header'
import Exploremenu from '../../components/Exploremenu/Exploremenu'
import Fooddisplay from '../../components/fooddisplay/fooddisplay'
import Appdownload from '../../components/appdownload/appdownload'

const Home = () => {

   const [category,setcategory] = React.useState("All")

  return (
    <div>
      <Header />
      <Exploremenu category={category} setcategory={setcategory} />
      <Fooddisplay category={category} />
      <Appdownload />
    </div>
  )
}

export default Home
