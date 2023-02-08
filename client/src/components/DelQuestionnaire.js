import React, {useEffect, useState} from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { deleteQuestionnaire, fetchQuestionnaire, updateQuestionnaire } from '../http/questionnaireAPI';
import { useMediaQuery } from 'react-responsive'

const DeleteQuestionnaire = ({show, onHide}) => {
    const mobile = useMediaQuery({ query: '(max-width: 768px)' })
    const [questionnaire, setQuestionnaire] = useState([])

    useEffect(()=>{
        fetchQuestionnaire().then(data => setQuestionnaire(data))
      }, [])

    const changeQuestionnaire = (key, value, id) => {
        setQuestionnaire(questionnaire.map(i => i.id === id ? {...i, [key]: value} : i))
    }

    const removeQuestionnaire = (id) => {
        deleteQuestionnaire(id)
        setQuestionnaire(questionnaire.filter(e=> e.id != id))
    }

    const updateQuestionnaires = () => {
        for (let el of questionnaire){
            updateQuestionnaire(el.id, {name: el.name})
        }
        onHide()
    }

  return (
    <Modal show={show} onHide={onHide}  style={mobile? {width: "320px" }:null}>
        <Modal.Header closeButton>
          <Modal.Title>Отредактируйте или Удалите Анкету</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Form>
                {questionnaire.map(type =>
                    <Row>
                        <Col md={8}>
                            <Form.Control
                                className={!mobile? 'mb-3':'mb-1'}
                                placeholder={type.name}
                                value={type.name}
                                onChange={e => changeQuestionnaire('name', e.target.value, type.id)}
                            />
                        </Col>
                        <Col md={4}>
                            <Button 
                                className={mobile? 'mb-3':null}
                                onClick={() => removeQuestionnaire(type.id)}
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
          <Button variant="primary" onClick={updateQuestionnaires}>
            Сохранить
          </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default DeleteQuestionnaire;