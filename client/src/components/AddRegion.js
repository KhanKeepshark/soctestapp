import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { createDistrict } from '../http/districtAPI';
import { createRegion, fetchRegion } from '../http/regionAPI';
import { useMediaQuery } from 'react-responsive'

const CreateRegion = ({show, onHide}) => {
    const mobile = useMediaQuery({ query: '(max-width: 768px)' })
    const [districtField, setDistrictField] = useState([{name: '', number: Date.now()}])
    const [regionValue, setRegionValue] = useState('')
    const [regions, setRegions] = useState([])

    useEffect(()=>{
        fetchRegion().then(data => setRegions(data))
      }, [])

    const addDistrictField = () => {
        setDistrictField([...districtField, {name: '', number: Date.now()}])
    }
    const removeDistrictField = (number) => {
        setDistrictField(districtField.filter(i => i.number !== number))
    }

    const changeDistrict = (key, value, number) => {
        setDistrictField(districtField.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const AddRegion = () => {
        if (regions.filter(reg => reg.name == regionValue).length != 1) {
            createRegion({name: regionValue}).then(data => {
                for (let el of districtField){
                    el.regiondatumId = data.id
                    createDistrict(el)
                }
                setRegionValue('')
            })
        } else {
            for (let el of districtField){
                el.regiondatumId = regions.filter(reg => reg.name == regionValue)[0].id
                createDistrict(el)
            }
            setRegionValue('')
        }
        onHide()
    }

  return (
    <Modal show={show} onHide={onHide} style={mobile? {width: "320px" }:null}>
        <Modal.Header closeButton>
          <Modal.Title>Создайте область</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control
                    className='mb-3'
                    placeholder={"Введите название области"}
                    value={regionValue}
                    onChange={e => setRegionValue(e.target.value)}
                />

                {districtField.map(i =>
                    <Row key={i.number}>
                        <Col md={8}>
                            <Form.Control
                                value={i.description}
                                onChange={e => changeDistrict('name', e.target.value, i.number)}
                                className='mt-2'
                                placeholder={"Введите название округа области"}
                            />
                        </Col>
                        <Col md={4}>
                            <Button 
                                onClick={() => removeDistrictField(i.number)}
                                className='mt-2' 
                                variant={"outline-danger"}
                            >Удалить</Button>
                        </Col>
                    </Row>  
                )}
                    <Button 
                        className='mt-3'
                        onClick={addDistrictField}
                    >Добавить округ к области
                    </Button>
                </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={AddRegion}>
            Сохранить
          </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default CreateRegion;