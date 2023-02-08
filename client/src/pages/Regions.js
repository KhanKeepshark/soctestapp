import React, { useContext, useEffect, useState } from 'react';
import { Card, Container, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Context } from '..';
import '../components/static/Main.css'
import { fetchDistrict } from '../http/districtAPI';
import { fetchRegion } from '../http/regionAPI';



const Regions = () => {
    const {askData} = useContext(Context)
    const [regions, setRegions] = useState([])
    const [districts, setDistricts] = useState([])
    const [currentRegions, setCurrentRegions] = useState([])
    const [currentDistricts, setCurrentDistricts] = useState(['All'])

    useEffect(()=>{
        fetchRegion().then(data => setRegions(data))
        fetchDistrict().then(data => setDistricts(data))
        fetchRegion().then(data => setCurrentRegions(data))
        fetchDistrict().then(data => setCurrentDistricts(data))
      }, [])

    const setDistrictId = (id) => {
        askData.setDistrict(id)
    }

    

    const RegionChange = (e) => {
        e != 'All' ? setCurrentRegions(regions.filter(a => a.id == e)) : setCurrentRegions(regions)
    }
    const DistrictChange = (e) => {
        e != 'All' ? setCurrentDistricts(districts.filter(a => a.id == e)) : setCurrentDistricts(districts)
    }

  return (
    <div>
        <Container>
        <div className='row mt-4 px-1' style={{backgroundColor: 'rgba(0, 139, 139)', borderRadius: '10px'}}>
            <div className='col-md-3 px-4 my-2'>
            
                <Form.Select onChange={e => RegionChange(e.target.value)}>
                    <option hidden>Выберите область</option>
                    <option value={'All'}>Все области</option>
                    {regions.map(region =>
                    <option value={region.id}>{region.name}</option>
                    )}
                </Form.Select>
            </div>
            <div className='col-md-3 px-4 my-2'>
                <Form.Select onChange={e => DistrictChange(e.target.value)}>
                    <option hidden>Выберите округ</option>
                    <option value={'All'}>Все округи</option>
                    {currentRegions.map(region => districts.map(district => region.id === district.regiondatumId ?
                    <option value={district.id}>{district.name}</option> : null
                    ))}
                </Form.Select>
            </div>
        </div>
        </Container>
        <Container className='d-flex justify-content-center align-items-center mt-4'>
            <div className='row'>
                {currentRegions.map(region => currentDistricts.map(district => region.id === district.regiondatumId ? 
                <div className='col-md-6'>
                <Link style={{textDecoration: 'none', color: 'black'}} to='/form' onClick={()=> setDistrictId(district.id)}>
                    <Card className='m-3 cardHover' style={{ width: '18rem', height: '7rem' }}>
                        <Card.Body className='d-flex justify-content-center align-items-center' >
                            <div>
                                <h3>{district.name}</h3>
                                <p>{region.name}</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Link>
                </div>
                : null
                )
                )}
            </div>
        </Container>
    </div>

  );
}

export default Regions;