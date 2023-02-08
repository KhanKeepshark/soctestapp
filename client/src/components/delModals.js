import React, { useEffect, useState} from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { deleteQuestions, fetchQuestions, updateQuestions } from '../http/questionAPI';
import { useMediaQuery } from 'react-responsive'

const DeleteQuestion = ({show, onHide}) => {
    const mobile = useMediaQuery({ query: '(max-width: 768px)' })
    const [questions, setQuestions] = useState([])

    useEffect(()=>{
        fetchQuestions().then(data => setQuestions(data))
      }, [])

    const removeQuestions = (id) => {
        deleteQuestions(id)
        setQuestions(questions.filter(e=> e.id != id))
    }

    const changeQuestions = (key, value, id) => {
      setQuestions(questions.map(i => i.id === id ? {...i, [key]: value} : i))
    }

    const updateQuestion = () => {
      for (let el of questions){
          updateQuestions(el.id, {description: el.description})
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
                {questions.map(type =>
                    <Row>
                        <Col md={8}>
                          <Form.Control
                              className={!mobile? 'mb-3':'mb-1'}
                              placeholder={type.description}
                              value={type.description}
                              onChange={e => changeQuestions('description', e.target.value, type.id)}
                          />
                            {/* <h5 className="mt-2">{type.description}</h5> */}
                        </Col>
                        <Col md={4}>
                            <Button 
                                onClick={() => removeQuestions(type.id)}
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
          <Button variant="primary" onClick={updateQuestion}>
            Сохранить
          </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default DeleteQuestion;