import React, {useEffect, useState} from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { deleteDistrict, fetchDistrict, updateDistrict } from '../http/districtAPI';
import { deleteRegion, fetchRegion, updateRegion } from '../http/regionAPI';
import { useMediaQuery } from 'react-responsive'

const DeleteDistric = ({show, onHide}) => {
    const mobile = useMediaQuery({ query: '(max-width: 768px)' })
    const [districts, setDistricts] = useState([])

    useEffect(()=>{
        fetchDistrict().then(data => setDistricts(data))
      }, [])

    const changeDistrict = (key, value, id) => {
        setDistricts(districts.map(i => i.id === id ? {...i, [key]: value} : i))
    }

    const removeDistricts = (id) => {
        deleteDistrict(id)
        setDistricts(districts.filter(e=> e.id != id))
    }

    const updateDistricts = () => {
        for (let el of districts){
            updateDistrict(el.id, {name: el.name})
        }
        onHide()
    }

  return (
    <Modal show={show} onHide={onHide} style={mobile? {width: "320px" }:null}>
        <Modal.Header closeButton>
          <Modal.Title>Удалите вопрос</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Form>
                {districts.map(type =>
                    <Row>
                        <Col md={8}>
                            <Form.Control
                                className={!mobile? 'mb-3':'mb-1'}
                                placeholder={type.name}
                                value={type.name}
                                onChange={e => changeDistrict('name', e.target.value, type.id)}
                            />
                        </Col>
                        <Col md={4}>
                            <Button 
                                onClick={() => removeDistricts(type.id)}
                                className={mobile? 'mb-3':null} 
                                variant={"outline-danger"}
                            >Удалить</Button>
                        </Col>
                    </Row>  
                )}
                </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={updateDistricts}>
            Сохранить
          </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default DeleteDistric;