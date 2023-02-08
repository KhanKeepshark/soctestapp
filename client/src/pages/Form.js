import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import { fetchAnswers } from '../http/answerAPI';
import { fetchQuestions } from '../http/questionAPI';
import { checkRole, logOut } from '../http/userAPI';
import { createUserChoice, fetchUserChoice } from '../http/userChoiceAPI';
import { EXIT_ROUTE } from '../utils/consts';

const AskForm = observer(() => {
  const {askData} = useContext(Context)
  const [choice, setChoice] = useState([])
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [user1, setUser] = useState([])
  const [position, setPosition] = useState([])
  const [choiceData, setChoiceData] = useState([])
  const [q7, setQ7] = useState(['Отремонтировать подъездные пути к дому', 'Провести освещение', 'Постройка детской-спортивной площадки', 'Обеспечить своевременный вывоз ТБО', 'Благоустройство двора', 'Отремонтировать лифт', 'Починить крышу (многоквартирный дом)', 'Построить школу рядом', 'Отремонтировать двор (дороги во дворе)', 'Сделать парковую зону рядом с домом'])
  const [q7order, setQ7order] = useState([1,2,3,4,5,6,7,8,9,10])
  const [orderCheck, setOrderCheck] = useState([])
  const navigate = useNavigate()
  const {user} = useContext(Context)

  useEffect(()=>{
    fetchQuestions().then(data => setQuestions(data))
    fetchAnswers().then(data => setAnswers(data))
    checkRole().then(data => setUser(data))
    fetchUserChoice().then(data => setChoiceData(data))
    

    navigator.geolocation.getCurrentPosition(function(position) {
      setPosition([position.coords.latitude, position.coords.longitude])
    });
  }, [])


  
  const choiceCreate = (qChoice, aChoice) => {
    choice.map( i => i.questionChoice === qChoice && i.answerChoice === aChoice).indexOf(true) == -1 ?   
    setChoice([...choice, {
      answerChoice: aChoice,
      questionChoice: qChoice,
    }])
    : setChoice(choice.filter(i => i.questionChoice === qChoice ? i.answerChoice != aChoice : null)) 

    choice.map( i => i.questionChoice === qChoice ? i : null).filter(i => i != null).length + 1 < questions.map( e => e.description === qChoice ? e.answerNum : null).filter(i => i != null)[0] ?
    setQuestions(questions.map(i => i.description === qChoice ? {...i, ["dis"]: false} : i))
    :
    setQuestions(questions.map(i => i.description === qChoice ? {...i, ["dis"]: true} : i))
  }

  
  
  const sevenCreate = (num, ans) => {
    setOrderCheck([...orderCheck, Number(num)])
    choice.map( i => ans === i.questionChoice).indexOf(true) != -1 ? 
      choice.map( i => ans === i.questionChoice ? i.answerChoice = num : i)
      : 
      setChoice([...choice, {
        answerChoice: num,
        questionChoice: ans,
        order: 1
      }])
  }

  const freeAnswerChange = (value, description, useId) => { 
    setQuestions(questions.map(i => i.description === description ? {...i, ["freeDescription"]: value} : i)) 
    choice.map(i => i.questionChoice === description && i.useId === useId).indexOf(true) != -1 ? 
    choice.map(i => i.questionChoice === description && i.useId === useId ? i.answerChoice = value : i) 
    :
    setChoice([...choice, {
      useId: useId,
      answerChoice: value,
      questionChoice: description
    }]) 
    
  }
  const hideShow = (description, check, useId) => {
    setQuestions(questions.map(i => i.description === description && check === "Ваш вариант" ? {...i, ["hidden"]: false} : {...i, ["hidden"]: true}))
    setChoice(choice.filter(i => i.questionChoice === description && i.useId === useId ? i.useId != useId : i)) 
  }  

  const addUserData = () => {
    if (choice.map(i => Object.values(i)).indexOf('') == -1 && choice.length == questions.map(i => i.questionnaireId === askData.questionnaire ? i.answerNum : null).reduce((a, b) => a + b, 0) + 10) {
      for (let el of choice){
        el.userId = user1.id
        el.positionX = position[0]
        el.positionY = position[1]
        el.questionnaireType = askData.questionnaire
        el.regionType = askData.district
        createUserChoice(el)
      }
      logOut()
      user.setUser({})
      user.setIsAuth(false)
      navigate(EXIT_ROUTE)
    } else {
      alert("Есть не заполненные поля")
    }
  }

  return (
    
    <Container
      className='d-flex justify-content-center '
    >
      {choiceData.map(e => e.userId).indexOf(user1.id) == -1 || user1.role === 'ADMIN' ?
      <Form className='d-flex flex-column' style={{width: 600}}>
      <h2 className="mx-auto mt-4">АНКЕТА</h2>
      <p align="center" className='mb-1'><strong>Изучение настроения электората перед внеочередными выборами в мажилис и маслихаты 19.03.2023 г.</strong></p>
      <p align="justify" className='mb-0'>⠀⠀⠀⠀Внеочередные выборы депутатов мажилиса парламента назначены на 19 марта 2023 года. Новая модель формирования мажилиса и маслихатов позволит в полной мере защитить интересы избирателей как на общенациональном, так и на региональном уровнях. Также, согласно поправкам, принятым по итогам референдума, <b><i>у казахстанцев есть право проголосовать за отзыв депутата через определенное время после избрания.</i></b> К примеру, если он не справляется со своими обязанностями, потерял связь со своим округом и своими избирателями.
      </p>
      <p align="justify" className='mb-0'>⠀⠀⠀⠀В интересах жителей города мы изучаем наиболее важные проблемные вопросы, которые Ваш депутат будет решать и делать все возможное, чтобы жизнь стала лучше и благоприятней!</p>
      <p align="justify">⠀⠀⠀⠀Анкета анонимная, Вам не нужно указывать фамилию. Все данные будут использованы только в обобщенном виде. Отметьте цифру около варианта ответа, который выражает Ваше мнение, или напишите свой вариант.</p>
      <p align="center">Пожалуйста, ответьте на ВСЕ вопросы, которые указаны в анкете. <br /><b>Ваше мнение очень важно для нас!</b></p>    
        {questions.map(type => type.questionnaireId === askData.questionnaire ?
        <>
          <Form.Label className="mt-4 h5">{type.description}</Form.Label>
          {answers.map((answer =>
            type.id === answer.questiondatumId ? 
            <Form.Group>
                <Form.Check 
                  disabled = {type.dis}
                  name={type.description}
                  type="checkbox"
                  label={answer.description}
                  onChange={e => choiceCreate(type.description, answer.description)}
                  inline
                />
            </Form.Group>
            : null
            ) )}
            
            <Form.Check 
              disabled = {type.dis}
              name={type.description}
              type="checkbox"
              label={type.freeAnswer != true ? "" : "Ваш вариант"}
              value={"Ваш вариант"}
              hidden={type.freeAnswer != true}
              onChange={e => hideShow(type.description, e.target.value, type.id)}
              inline
            />
            <Form.Control
              name={type.description}
              value={type.freeDescription}
              onChange={e => freeAnswerChange(e.target.value, type.description, type.id)}
              className="mt-1"
              placeholder="Введите ваш вариант"
              hidden = {type.hidden != false ? true : false}
            />
        </>
        : null)}
        <Form.Label className="mt-4 h5">Чтобы бы Вы хотели, чтобы решили в 1ую, во 2ую и т.д. очередь (проставьте очередность решения вопросов от 1 до 10)</Form.Label>
        {q7.map( e => 
          <Row>
            <Col md={10} className="d-flex align-items-end">{e}
            </Col>
            <Col>
              <Form.Select className="mt-3 form-select-sm" onChange={x => sevenCreate(x.target.value, e)}>
                <option hidden>-</option>
                {q7order.map(i =>
                <option hidden={!(orderCheck.indexOf(i) == -1)}>{i}</option>
                )}
              </Form.Select>
            </Col>
          </Row>
        )}
        <Button onClick={addUserData} variant='outline-success' className='my-3'>Отправить</Button>
      </Form>
      :
      <div className='d-flex align-items-center' style={{ width: '60vw', height: '60vh'}}>
          <h2>Данный пользователь уже заполнил анкету</h2>
      </div>
      }
    </Container> 
    
  );
})

export default AskForm;