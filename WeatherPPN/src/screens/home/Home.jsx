import React, { useState } from 'react';
import WeatherModal from '../../components/weatherModal/WeatherModal';
import ReportMenu from '../reportmenu/ReportMenu';
// import result from './data.json'
// import forecast from './forecast.json'

const Home = () => {
  const [show, setShow] = useState({prevailing:false,last24hours:false});
                           

                                  

  const showModal = (modalName) => {
    setShow((prev)=>({...prev,[modalName]:true}))
  };

  const hideModal = (modalName) => {
    setShow((prev)=>({...prev,[modalName]:false}))
  };

 

   return( 
    <>
    {!(show.prevailing) && !(show.last24hours) &&  <ReportMenu showModal={showModal}/>}
    { show.prevailing && <WeatherModal show={show}  name={"prevailing"} hideModal={()=>hideModal('prevailing')} />}
    { show.last24hours && <WeatherModal show={show} name={"last24hours"} hideModal={()=>hideModal('last24hours')} />}
    </>
    
)

  // if (show)
  //   return <WeatherModal show={show}  hideModal={hideModal} />;
  // else
  //   return <ReportMenu showModal={showModal} ops={menu}/>

  
};

export default Home;
