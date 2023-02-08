import React, {useEffect, useState} from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { deleteRegion, fetchRegion, updateRegion } from '../http/regionAPI';
import { useMediaQuery } from 'react-responsive'

const DeleteRegion = ({show, onHide}) => {
    const mobile = useMediaQuery({ query: '(max-width: 768px)' })
    const [regions, setRegions] = useState([])

    useEffect(()=>{
        fetchRegion().then(data => setRegions(data))
      }, [])

    const changeRegion = (key, value, id) => {
        setRegions(regions.map(i => i.id === id ? {...i, [key]: value} : i))
    }

    const removeRegions = (id) => {
        deleteRegion(id)
        setRegions(regions.filter(e=> e.id != id))
    }

    const updateRegions = () => {
        for (let el of regions){
            updateRegion(el.id, {name: el.name})
        }
        onHide()
    }

  return (
    <Modal show={show} onHide={onHide} style={mobile? {width: "320px" }:null}>
        <Modal.Header closeButton>
          <Modal.Title>Удалите регион</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Form>
                {regions.map(type =>
                    <Row>
                        <Col md={8}>
                            <Form.Control
                                className={!mobile? 'mb-3':'mb-1'}
                                placeholder={type.name}
                                value={type.name}
                                onChange={e => changeRegion('name', e.target.value, type.id)}
                            />
                        </Col>
                        <Col md={4}>
                            <Button 
                                onClick={() => removeRegions(type.id)}
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
          <Button variant="primary" onClick={updateRegions}>
            Сохранить
          </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default DeleteRegion;