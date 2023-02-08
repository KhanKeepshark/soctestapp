import React, { useEffect, useState } from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { fetchUserChoice } from '../http/userChoiceAPI';
import { fetchUsers } from '../http/userAPI';
import { useMediaQuery } from 'react-responsive'

const Maps = () => {
  const mobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [choiceData, setChoiceData] = useState([])
  const [users, setUsers] = useState([])


  const icon = !mobile ?
    L.icon({
      iconUrl: "./mark.png",
      iconSize: [30, 30],
    }) : 
    L.icon({
      iconUrl: "./minimark.png",
      iconSize: [20, 20],
    })
  

  useEffect(()=>{
    fetchUserChoice().then(data => setChoiceData(data))
    fetchUsers().then(data => setUsers(data))
  }, [])

  const position = [51.13, 71.43]
  const a = users.map(i => choiceData.map(e => e.userId === i.id ? {login: i.email, positionX: e.positionX, positionY: e.positionY, id: i.id} : null).filter(i => i != null)[0]).filter(i => i != null)


  return (
    <div className={!mobile? 'mx-auto mt-5' : 'mt-5'} style={!mobile? { width: '70vw', height: '80vh'} : { width: '90vw', height: '90vh'}}>
      <MapContainer center={position} zoom={11} scrollWheelZoom={true} style={!mobile?{ width: '100%', height: '100%'}:{ width: '300px', height: '400px'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=IycY9SpXsIvtoeHUVCdu"
        />
        { a[0] != undefined ?
          a.map(e =>
            e.positionX != null ?
            <Marker position={ [e.positionX, e.positionY] } icon={icon}>
              <Popup >
                <div style={mobile?{width: '130px'}:null}>
                <h6 style={mobile?{fontSize: '13px'}:null}>Логин: {e.login}</h6>
                {choiceData.map(i => i.userId === e.id ? 
                  <p style={mobile?{fontSize: '10px'}:null}>{i.questionChoice} : {i.answerChoice}</p>
                  : null
                )}
                </div>
              </Popup>
            </Marker>
            : null 
        ) : null}
      </MapContainer>
      <div>
      </div>
    </div>
  )
}

export default Maps